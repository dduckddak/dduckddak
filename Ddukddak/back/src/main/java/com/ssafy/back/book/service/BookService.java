package com.ssafy.back.book.service;

import org.springframework.http.ResponseEntity;

import com.ssafy.back.book.dto.request.CreateReviewRequestDto;
import com.ssafy.back.book.dto.response.BookDetailResponseDto;
import com.ssafy.back.book.dto.response.CreateReviewResponseDto;
import com.ssafy.back.book.dto.response.DeleteReviewResponseDto;
import com.ssafy.back.book.dto.response.ListBookLikeResponseDto;
import com.ssafy.back.book.dto.response.ListBookRecommendResponseDto;
import com.ssafy.back.book.dto.response.ListBookSearchResponseDto;
import com.ssafy.back.book.dto.response.UpdateReviewResponseDto;

public interface BookService {
	ResponseEntity<? super ListBookRecommendResponseDto> listBookRecommend();

	ResponseEntity<? super ListBookSearchResponseDto> listBookSearch(String keyword);

	ResponseEntity<? super BookDetailResponseDto> bookDetail(Integer bookId);

	ResponseEntity<? super ListBookLikeResponseDto> listBookLike();

	ResponseEntity<? super CreateReviewResponseDto> createReview(CreateReviewRequestDto dto);

	ResponseEntity<? super UpdateReviewResponseDto> updateReview(CreateReviewRequestDto dto);

	ResponseEntity<? super DeleteReviewResponseDto> deleteReview(Integer bookId);
}
