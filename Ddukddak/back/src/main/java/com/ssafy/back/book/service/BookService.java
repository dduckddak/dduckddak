package com.ssafy.back.book.service;

import org.springframework.http.ResponseEntity;

import com.ssafy.back.book.dto.response.ListBookRecommendResponseDto;
import com.ssafy.back.book.dto.response.ListBookSearchResponseDto;

public interface BookService {
	ResponseEntity<? super ListBookRecommendResponseDto> listBookRecommend();
	public ResponseEntity<? super ListBookSearchResponseDto> listBookSearch(String keyword);
}
