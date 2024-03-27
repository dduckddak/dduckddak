package com.ssafy.back.book.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.amazonaws.services.s3.AmazonS3;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.ssafy.back.auth.dto.CustomUserDetails;
import com.ssafy.back.book.dto.BookDetailDto;
import com.ssafy.back.book.dto.BookSummaryDto;
import com.ssafy.back.book.dto.ReviewDto;
import com.ssafy.back.book.dto.request.ChoiceBookListRequestDto;
import com.ssafy.back.book.dto.request.CreateReviewRequestDto;
import com.ssafy.back.book.dto.response.BookDetailResponseDto;
import com.ssafy.back.book.dto.response.ChoiceBookResponseDto;
import com.ssafy.back.book.dto.response.ListBookChoiceResponseDto;
import com.ssafy.back.book.dto.response.ListBookLikeResponseDto;
import com.ssafy.back.book.dto.response.ListBookRecommendResponseDto;
import com.ssafy.back.book.dto.response.ListBookSearchResponseDto;
import com.ssafy.back.book.dto.response.ReviewResponseDto;
import com.ssafy.back.book.repository.BookRepository;
import com.ssafy.back.book.repository.ReviewRepository;
import com.ssafy.back.common.ResponseDto;
import com.ssafy.back.common.ResponseMessage;
import com.ssafy.back.entity.ReviewEntity;
import com.ssafy.back.entity.compositeKey.ReviewId;
import com.ssafy.back.util.MakeKeyUtil;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class BookServiceImpl implements BookService {

	private final Logger logger = LogManager.getLogger(BookServiceImpl.class);
	private final ReviewRepository reviewRepository;
	private final BookRepository bookRepository;
	private final AmazonS3 amazonS3;
	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	@Value("${fast-api.url}")
	private String fastApiUrl;

	@Override
	public ResponseEntity<? super ListBookRecommendResponseDto> listBookRecommend() {
		//유저 정보 확인
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails customUserDetails = (CustomUserDetails)authentication.getPrincipal();

		int userSeq = customUserDetails.getUserSeq();
		List<Integer> bookIds = new ArrayList<>();

		try {
			//fastapi로 추천 요청
			// 요청 본문 생성
			Map<String, Object> requestMap = new HashMap<>();

			Gson gson = new Gson();
			String jsonRequestBody = gson.toJson(requestMap);

			// FastAPI 엔드포인트 URL
			String url = fastApiUrl + "/api/v1/f/recommendations/" + userSeq;

			// Unirest를 사용하여 GET 요청 보내기
			HttpResponse<String> response = Unirest.get(url)
				.asString();

			JsonObject responseObject = JsonParser.parseString(response.getBody()).getAsJsonObject();

			if (responseObject.has("recommendations")) {
				JsonArray recommendations = responseObject.getAsJsonArray("recommendations");
				for (JsonElement element : recommendations) {
					bookIds.add(element.getAsInt());
				}
			}
			// 로그 출력 및 후속 처리
			logger.info("fast api 응답 : " + response);
		} catch (Exception e) {
			logger.error(e);
			return ListBookRecommendResponseDto.HttpRequestError();
		}
		try {
			List<BookSummaryDto> bookList = bookRepository.findAllById(bookIds);
			for (BookSummaryDto book : bookList) {
				String key = MakeKeyUtil.page(book.getBookId(), 0, true);
				if (amazonS3.doesObjectExist(bucket, key)) {
					String imageUrl = amazonS3.getUrl(bucket, key).toString();
					book.setCoverImage(imageUrl);
				} else {
					if (amazonS3.doesObjectExist(bucket, "default_book/noImage.png")) {
						String imageUrl = amazonS3.getUrl(bucket, "default_book/noImage.png").toString();
						book.setCoverImage(imageUrl);
					} else {
						//s3 error
						return ListBookRecommendResponseDto.S3error();
					}
				}
			}
			logger.info("추천 책 목록 : " + bookList);
			return ListBookRecommendResponseDto.success(bookList);
		} catch (Exception e) {
			logger.error(ResponseMessage.DATABASE_ERROR);
			logger.error(e);
			return ResponseDto.databaseError();
		}
	}

	@Override
	public ResponseEntity<? super ListBookSearchResponseDto> listBookSearch(String keyword) {
		try {
			List<BookSummaryDto> SearchBookList = bookRepository.findByTitleContains(keyword);
			for (BookSummaryDto book : SearchBookList) {
				String key = MakeKeyUtil.page(book.getBookId(), 0, true);
				if (amazonS3.doesObjectExist(bucket, key)) {
					String imageUrl = amazonS3.getUrl(bucket, key).toString();
					book.setCoverImage(imageUrl);
				} else {
					if (amazonS3.doesObjectExist(bucket, "default_book/noImage.png")) {
						String imageUrl = amazonS3.getUrl(bucket, "default_book/noImage.png").toString();
						book.setCoverImage(imageUrl);
					} else {
						//s3 error
						return ListBookSearchResponseDto.S3error();
					}
				}
			}
			logger.info("책 검색 목록 : " + SearchBookList);
			return ListBookSearchResponseDto.success(SearchBookList);

		} catch (Exception e) {
			logger.error(ResponseMessage.DATABASE_ERROR);
			logger.error(e);
			return ResponseDto.databaseError();
		}
	}

	@Override
	public ResponseEntity<? super BookDetailResponseDto> bookDetail(Integer bookId) {
		//유저 정보 확인
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails customUserDetails = (CustomUserDetails)authentication.getPrincipal();

		int userSeq = customUserDetails.getUserSeq();

		try {
			BookDetailDto book = bookRepository.findBookDetailByBookIdAndUserSeq(bookId, userSeq);
			logger.info("책 상세 : " + book);
			return BookDetailResponseDto.success(book);
		} catch (Exception e) {
			logger.error(ResponseMessage.DATABASE_ERROR);
			logger.error(e);
			return ResponseDto.databaseError();
		}
	}

	@Override
	public ResponseEntity<? super ListBookLikeResponseDto> listBookLike() {
		//유저 정보 확인
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails customUserDetails = (CustomUserDetails)authentication.getPrincipal();

		int userSeq = customUserDetails.getUserSeq();

		try {
			List<BookSummaryDto> likeBookList = bookRepository.findLikedBooksByUserSeq(userSeq);
			for (BookSummaryDto book : likeBookList) {
				String key = MakeKeyUtil.page(book.getBookId(), 0, true);
				if (amazonS3.doesObjectExist(bucket, key)) {
					String imageUrl = amazonS3.getUrl(bucket, key).toString();
					book.setCoverImage(imageUrl);
				} else {
					if (amazonS3.doesObjectExist(bucket, "default_book/noImage.png")) {
						String imageUrl = amazonS3.getUrl(bucket, "default_book/noImage.png").toString();
						book.setCoverImage(imageUrl);
					} else {
						//s3 error
						return ListBookLikeResponseDto.S3error();
					}
				}
			}
			logger.info("사용자가 좋아요한 책 목록 : " + likeBookList);
			return ListBookLikeResponseDto.success(likeBookList);
		} catch (Exception e) {
			logger.error(ResponseMessage.DATABASE_ERROR);
			logger.error(e);
			return ResponseDto.databaseError();
		}
	}

	@Override
	public ResponseEntity<? super ReviewResponseDto> createReview(CreateReviewRequestDto dto) {
		//유저 정보 확인
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails customUserDetails = (CustomUserDetails)authentication.getPrincipal();

		int userSeq = customUserDetails.getUserSeq();

		try {
			ReviewId reviewId = new ReviewId(dto.getBookId(), userSeq);
			Optional<ReviewEntity> reviewEntityOptional = reviewRepository.findById(reviewId);
			//해당 책에 사용자의 리뷰가 있다
			if (reviewEntityOptional.isPresent()) {
				ReviewEntity reviewEntity = reviewEntityOptional.get();
				if (reviewEntity.getIsLike() == dto.isLike()) { //들어온 값이 있는 리뷰와 같다면
					reviewRepository.delete(reviewEntity);
					logger.info("delete reviewEntity : " + reviewEntity.toString());
					return ReviewResponseDto.deleteSuccess("delete success", null);
				} else {
					reviewRepository.updateReviewNative(dto.getBookId(), userSeq, dto.isLike());
					logger.info("update reviewEntity : " + reviewEntity.toString());
					return ReviewResponseDto.updateSuccess("update success", dto.isLike());
				}
			} else {
				//해당 책에 사용자의 리뷰가 없다
				reviewRepository.insertReviewNative(dto.getBookId(), userSeq, dto.isLike());
				logger.info("User {}'s review for book {} created.", userSeq, dto.getBookId());
				return ReviewResponseDto.insertSuccess("insert success", dto.isLike());
			}
		} catch (Exception e) {
			logger.error(ResponseMessage.DATABASE_ERROR);
			logger.error(e);
			return ResponseDto.databaseError();
		}
	}

	@Override
	public ResponseEntity<? super ListBookChoiceResponseDto> listBookChoice() {
		//첫 선택 책 id
		Integer[] books = new Integer[]{121, 34, 3, 37, 122, 39, 9, 42, 43, 20, 88, 57, 26, 123, 28, 80};
		ArrayList<Integer> bookIds = new ArrayList<>(Arrays.asList(books));

		try {
			List<BookSummaryDto> bookList = bookRepository.findAllById(bookIds);
			for (BookSummaryDto book : bookList) {
				String key = MakeKeyUtil.page(book.getBookId(), 0, true);
				if (amazonS3.doesObjectExist(bucket, key)) {
					String imageUrl = amazonS3.getUrl(bucket, key).toString();
					book.setCoverImage(imageUrl);
				} else {
					if (amazonS3.doesObjectExist(bucket, "default_book/noImage.png")) {
						String imageUrl = amazonS3.getUrl(bucket, "default_book/noImage.png").toString();
						book.setCoverImage(imageUrl);
					} else {
						//s3 error
						return ListBookRecommendResponseDto.S3error();
					}
				}
			}
			logger.info("선택 책 목록 : " + bookList);
			return ListBookChoiceResponseDto.success(bookList);
		} catch (Exception e) {
			logger.error(ResponseMessage.DATABASE_ERROR);
			logger.error(e);
			return ResponseDto.databaseError();
		}
	}

	@Override
	public ResponseEntity<? super ChoiceBookResponseDto> choiceBook(ChoiceBookListRequestDto dto) {
		//유저 정보 확인
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails customUserDetails = (CustomUserDetails)authentication.getPrincipal();

		int userSeq = customUserDetails.getUserSeq();
		List<Integer> bookIds = dto.getChoiceBookList();

		try {
			bookIds.forEach(bookId -> {
				reviewRepository.insertReviewNative(bookId, userSeq, true);
				System.out.println(bookId);
				logger.info("User {}'s review for book {} created.", userSeq, bookId);
				});
			return ChoiceBookResponseDto.success();

		} catch (Exception e) {
			logger.error(ResponseMessage.DATABASE_ERROR);
			logger.error(e);
			return ResponseDto.databaseError();
		}
	}

}
