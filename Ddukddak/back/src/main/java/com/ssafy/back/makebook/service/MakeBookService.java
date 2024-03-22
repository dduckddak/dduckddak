package com.ssafy.back.makebook.service;

import org.springframework.http.ResponseEntity;

import com.ssafy.back.makebook.dto.request.DeleteMakeBookRequestDto;
import com.ssafy.back.makebook.dto.request.InsertMakeBookRequestDto;
import com.ssafy.back.makebook.dto.response.DeleteMakeBookResponseDto;
import com.ssafy.back.makebook.dto.response.DetailMakeBookResponseDto;
import com.ssafy.back.makebook.dto.response.InsertMakeBookResponseDto;
import com.ssafy.back.makebook.dto.response.ListMakeBookResponseDto;

public interface MakeBookService {
	ResponseEntity<? super ListMakeBookResponseDto> listMakeBook();

	ResponseEntity<? super DetailMakeBookResponseDto> detailMakeBook(int makeBookId);

	ResponseEntity<? super InsertMakeBookResponseDto> insertMakeBook(InsertMakeBookRequestDto request);

	ResponseEntity<? super DeleteMakeBookResponseDto> deleteMakeBook(DeleteMakeBookRequestDto request);
}
