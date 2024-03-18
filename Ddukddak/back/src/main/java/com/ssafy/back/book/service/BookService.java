package com.ssafy.back.book.service;

import org.springframework.http.ResponseEntity;

import com.ssafy.back.book.dto.response.ListBookRecommendResponseDto;

public interface BookService {
	ResponseEntity<ListBookRecommendResponseDto> listBookRecommend();
}
