package com.ssafy.back.makebook.service;

import org.springframework.http.ResponseEntity;

import com.ssafy.back.makebook.dto.request.InsertMakeBookRequestDto;
import com.ssafy.back.makebook.dto.response.InsertMakeBookResponseDto;

public interface MakeBookService {
	ResponseEntity<? super InsertMakeBookResponseDto> insertMakeBook(InsertMakeBookRequestDto request);
}
