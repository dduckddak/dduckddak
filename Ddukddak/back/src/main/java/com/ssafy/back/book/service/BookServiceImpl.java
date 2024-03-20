package com.ssafy.back.book.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.amazonaws.services.s3.AmazonS3;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.back.book.dto.BookDetailDto;
import com.ssafy.back.book.dto.BookSummaryDto;
import com.ssafy.back.book.dto.ReviewDto;
import com.ssafy.back.book.dto.request.CreateReviewRequestDto;
import com.ssafy.back.book.dto.response.BookDetailResponseDto;
import com.ssafy.back.book.dto.response.CreateReviewResponseDto;
import com.ssafy.back.book.dto.response.ListBookLikeResponseDto;
import com.ssafy.back.book.dto.response.ListBookRecommendResponseDto;
import com.ssafy.back.book.dto.response.ListBookSearchResponseDto;
import com.ssafy.back.book.repository.BookRepository;
import com.ssafy.back.book.repository.ReviewRepository;
import com.ssafy.back.common.ResponseDto;
import com.ssafy.back.common.ResponseMessage;
import com.ssafy.back.util.MakeKeyUtil;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

	private final Logger logger = LogManager.getLogger(BookServiceImpl.class);
	private final ReviewRepository reviewRepository;
	private final BookRepository bookRepository;
	private final RestTemplate restTemplate; // RestTemplate 주입
	private final EntityManager entityManager;

	// ObjectMapper 선언
	private final ObjectMapper objectMapper;
	private final AmazonS3 amazonS3;
	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	@Override
	public ResponseEntity<? super ListBookRecommendResponseDto> listBookRecommend() {
		//테스트 코드
		int userSeq = 1;
		try {
			List<ReviewDto> reviewList = reviewRepository.findByUserEntity_UserSeq(userSeq);
			// 좋아요한 리뷰의 bookId 리스트
			List<Integer> likeList = reviewList.stream()
				.filter(ReviewDto::getIsLike)
				.map(ReviewDto::getBookId)
				.toList();

			// 좋아하지 않은 리뷰의 bookId 리스트
			List<Integer> unLikeList = reviewList.stream()
				.filter(reviewDto -> !reviewDto.getIsLike())
				.map(ReviewDto::getBookId)
				.toList();

			//fastapi로 추천 요청
			// 요청 본문 생성
			Map<String, Object> requestMap = new HashMap<>();
			requestMap.put("likes", likeList);
			requestMap.put("dislikes", unLikeList);

			// HTTP 헤더 설정
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);

			// HttpEntity 생성
			HttpEntity<Map<String, Object>> httpEntity = new HttpEntity<>(requestMap, headers);

			// FastAPI 엔드포인트 URL
			String url = "http://localhost:8000/api/v1/k/recommendations/";

			// POST 요청 보내기
			ResponseEntity<String> response = restTemplate.postForEntity(url, httpEntity, String.class);

			// JSON 응답을 Java 객체로 변환
			JsonNode rootNode = objectMapper.readTree(response.getBody());
			JsonNode recommendationsNode = rootNode.path("recommendations");
			List<Integer> bookIds = objectMapper.convertValue(recommendationsNode, new TypeReference<List<Integer>>() {
			});

			// 응답 처리
			logger.info("fast api 응답 : " + response.getBody());

			List<BookSummaryDto> bookList = bookRepository.findAllById(bookIds).stream().map(bookDetail -> {
				String imageUrl = amazonS3.getUrl(bucket, MakeKeyUtil.page(bookDetail.getBookId(), 0, true)).toString();
				bookDetail.setCoverImage(imageUrl);
				return bookDetail;
			}).collect(Collectors.toList());
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
			List<BookSummaryDto> SearchBookList = bookRepository.findByTitleContains(keyword)
				.stream()
				.map(bookDetail -> {
					String imageUrl = amazonS3.getUrl(bucket, MakeKeyUtil.page(bookDetail.getBookId(), 0, true))
						.toString();
					bookDetail.setCoverImage(imageUrl);
					return bookDetail;
				})
				.toList();
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
		//테스트 코드
		int userSeq = 1;
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
		//테스트 코드
		int userSeq = 1;
		try {
			List<BookSummaryDto> likeBookList = bookRepository.findLikedBooksByUserSeq(userSeq)
				.stream()
				.map(bookDetail -> {
					String imageUrl = amazonS3.getUrl(bucket, MakeKeyUtil.page(bookDetail.getBookId(), 0, true))
						.toString();
					bookDetail.setCoverImage(imageUrl);
					return bookDetail;
				})
				.toList();
			logger.info("사용자가 좋아요한 책 목록 : " + likeBookList);
			return ListBookLikeResponseDto.success(likeBookList);
		} catch (Exception e) {
			logger.error(ResponseMessage.DATABASE_ERROR);
			logger.error(e);
			return ResponseDto.databaseError();
		}
	}

	@Override
	public ResponseEntity<? super CreateReviewResponseDto> createReview(CreateReviewRequestDto dto) {
		//테스트 코드
		int userSeq = 1;

		try {
			reviewRepository.insertReviewNative(dto.getBookId(), userSeq, dto.isLike());
			logger.info("User {}'s review for book {} created.", userSeq, dto.getBookId());
			return ResponseDto.success();

		} catch (Exception e) {
			logger.error(ResponseMessage.DATABASE_ERROR);
			logger.error(e);
			return ResponseDto.databaseError();
		}
	}
}
