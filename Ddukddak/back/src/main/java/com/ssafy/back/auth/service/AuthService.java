package com.ssafy.back.auth.service;

import org.springframework.http.ResponseEntity;

import com.ssafy.back.auth.dto.request.SignUpRequestDto;
import com.ssafy.back.auth.dto.response.SignUpResponseDto;

public interface AuthService {
	ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
}
