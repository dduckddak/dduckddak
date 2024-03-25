package com.ssafy.back.coloring.service;

import org.springframework.http.ResponseEntity;

import com.ssafy.back.coloring.dto.request.DeleteColoringRequestDto;
import com.ssafy.back.coloring.dto.request.InsertColoringRequestDto;
import com.ssafy.back.coloring.dto.response.DeleteColoringResponseDto;
import com.ssafy.back.coloring.dto.response.InsertColoringResponseDto;
import com.ssafy.back.coloring.dto.response.ListColoringBaseResponseDto;
import com.ssafy.back.coloring.dto.response.ListColoringResponseDto;

public interface ColoringService {
	ResponseEntity<? super ListColoringResponseDto> listColoring();

	ResponseEntity<? super InsertColoringResponseDto> insertColoring(InsertColoringRequestDto request);

	ResponseEntity<? super DeleteColoringResponseDto> deleteColoring(DeleteColoringRequestDto request);

	ResponseEntity<? super ListColoringBaseResponseDto> listColoringBase();
}
