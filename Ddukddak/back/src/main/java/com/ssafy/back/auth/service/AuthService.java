package com.ssafy.back.auth.service;

import org.springframework.http.ResponseEntity;

import com.amazonaws.Response;
import com.ssafy.back.auth.dto.request.FCMTokenRequestDto;
import com.ssafy.back.auth.dto.request.IdCheckRequestDto;
import com.ssafy.back.auth.dto.request.LoginRequestDto;
import com.ssafy.back.auth.dto.request.LogoutRequestDto;
import com.ssafy.back.auth.dto.request.SignUpRequestDto;
import com.ssafy.back.auth.dto.request.TokenRequestDto;
import com.ssafy.back.auth.dto.response.FCMTokenResponseDto;
import com.ssafy.back.auth.dto.response.IdCheckResponseDto;
import com.ssafy.back.auth.dto.response.LoginResponseDto;
import com.ssafy.back.auth.dto.response.LogoutResponseDto;
import com.ssafy.back.auth.dto.response.SignUpResponseDto;
import com.ssafy.back.auth.dto.response.TokenResponseDto;

public interface AuthService {
	ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);

	ResponseEntity<? super LoginResponseDto> login(LoginRequestDto dto);

	ResponseEntity<? super LogoutResponseDto> logout(LogoutRequestDto dto);

	ResponseEntity<? super IdCheckResponseDto> idCheck(IdCheckRequestDto dto);

	ResponseEntity<? super FCMTokenResponseDto> savedFcmToken(FCMTokenRequestDto dto);

	ResponseEntity<? super TokenResponseDto> createNewToken(TokenRequestDto dto);
}
