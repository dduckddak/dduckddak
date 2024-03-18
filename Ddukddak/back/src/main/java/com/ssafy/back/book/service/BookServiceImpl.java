package com.ssafy.back.book.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.back.book.dto.BookDto;
import com.ssafy.back.book.dto.ReviewDto;
import com.ssafy.back.book.dto.response.ListBookRecommendResponseDto;
import com.ssafy.back.book.repository.BookRepository;
import com.ssafy.back.book.repository.ReviewRepository;
import com.ssafy.back.common.ResponseMessage;
import com.ssafy.back.entity.BookEntity;
import com.ssafy.back.voice.service.VoiceServiceImpl;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService{

	private final Logger logger = LogManager.getLogger(VoiceServiceImpl.class);
	private final ReviewRepository reviewRepository;
	private final BookRepository bookRepository;
	private final RestTemplate restTemplate; // RestTemplate 주입
	// ObjectMapper 선언
	private final ObjectMapper objectMapper;

	@Override
	public ResponseEntity<ListBookRecommendResponseDto> listBookRecommend() {
		//테스트 코드
		int userSeq = 1;
		try{
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
			List<Integer> bookIds = objectMapper.convertValue(recommendationsNode, new TypeReference<List<Integer>>(){});

			// 응답 처리
			logger.info("fast api 응답 : " + response.getBody());
			List<BookEntity> bookEntities = bookRepository.findAllById(bookIds);
			// BookEntity 목록을 BookDto 목록으로 변환
			List<BookDto> books = bookEntities.stream().map(entity -> new BookDto(
				entity.getBookId(),
				entity.getBookTitle(),
				entity.getBookAuthor(),
				entity.getBookStory()
			)).collect(Collectors.toList());
			logger.info("추천 책 목록 : " + books);

			return ListBookRecommendResponseDto.success(books);
		}catch (Exception e){
			logger.error(ResponseMessage.DATABASE_ERROR);
			logger.error("Database error.", e);
		}
		return null;
	}
}
