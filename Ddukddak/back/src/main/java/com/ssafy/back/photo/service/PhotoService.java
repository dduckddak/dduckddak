package com.ssafy.back.photo.service;

import org.springframework.http.ResponseEntity;

import com.ssafy.back.photo.dto.request.InsertPhotoRequestDto;
import com.ssafy.back.photo.dto.request.PhotoRequestDto;
import com.ssafy.back.photo.dto.response.InsertPhotoResponseDto;
import com.ssafy.back.photo.dto.response.PhotoResponseDto;

public interface PhotoService {

	ResponseEntity<? super InsertPhotoResponseDto> insertPhoto(InsertPhotoRequestDto dto);

}
