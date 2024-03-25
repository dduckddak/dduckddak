package com.ssafy.back.book.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.ssafy.back.book.dto.request.ChoiceBookListRequestDto;
import com.ssafy.back.book.dto.request.CreateReviewRequestDto;
import com.ssafy.back.book.dto.response.BookDetailResponseDto;
import com.ssafy.back.book.dto.response.ChoiceBookResponseDto;
import com.ssafy.back.book.dto.response.ListBookChoiceResponseDto;
import com.ssafy.back.book.dto.response.ListBookLikeResponseDto;
import com.ssafy.back.book.dto.response.ListBookRecommendResponseDto;
import com.ssafy.back.book.dto.response.ListBookSearchResponseDto;
import com.ssafy.back.book.dto.response.ReviewResponseDto;

public interface BookService {
	ResponseEntity<? super ListBookRecommendResponseDto> listBookRecommend();

	ResponseEntity<? super ListBookSearchResponseDto> listBookSearch(String keyword);

	ResponseEntity<? super BookDetailResponseDto> bookDetail(Integer bookId);

	ResponseEntity<? super ListBookLikeResponseDto> listBookLike();

	ResponseEntity<? super ReviewResponseDto> createReview(CreateReviewRequestDto dto);
	ResponseEntity<? super ListBookChoiceResponseDto> listBookChoice();
	ResponseEntity<? super ChoiceBookResponseDto> choiceBook(ChoiceBookListRequestDto dto);
}
