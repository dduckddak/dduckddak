package com.ssafy.back.book.service;

import org.springframework.http.ResponseEntity;

import com.ssafy.back.book.dto.BookDetailDto;
import com.ssafy.back.book.dto.response.BookDetailResponseDto;
import com.ssafy.back.book.dto.response.ListBookLikeResponseDto;
import com.ssafy.back.book.dto.response.ListBookRecommendResponseDto;
import com.ssafy.back.book.dto.response.ListBookSearchResponseDto;

public interface BookService {
	ResponseEntity<? super ListBookRecommendResponseDto> listBookRecommend();
	ResponseEntity<? super ListBookSearchResponseDto> listBookSearch(String keyword);
	ResponseEntity<? super BookDetailResponseDto> bookDetail(Integer bookId);
	ResponseEntity<? super ListBookLikeResponseDto> listBookLike();
}
