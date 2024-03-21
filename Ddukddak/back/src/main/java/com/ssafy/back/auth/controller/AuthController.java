package com.ssafy.back.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
import com.ssafy.back.auth.service.AuthService;
import com.ssafy.back.photo.dto.response.DeletePhotoResponseDto;
import com.ssafy.back.voice.dto.response.ListVoiceResponseDto;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "auth", description = "사용자 인증관련 API")
public class AuthController {
	private final AuthService authService;

	@Operation(
		summary = "회원가입",
		description = "사용자 회원가입 함"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success.")
	})
	@PostMapping("/sign-up")
	public ResponseEntity<? super SignUpResponseDto> signUp(@RequestBody @Valid SignUpRequestDto requestBody){
		return authService.signUp(requestBody);
	}

	@Operation(
		summary = "로그인",
		description = "사용자 로그인 함"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success.",
			content = @Content(schema = @Schema(implementation = LoginResponseDto.class))),
		@ApiResponse(responseCode = "404", description = "Login Fail.")
	})
	@PostMapping("/login")
	public ResponseEntity<? super LoginResponseDto> login(@RequestBody @Valid LoginRequestDto requestBody){
		return authService.login(requestBody);
	}

	@Operation(
		summary = "로그아웃",
		description = "사용자 로그아웃 함"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success."),
	})
	@PostMapping("/logout")
	public ResponseEntity<? super LogoutResponseDto> logout(@RequestBody @Valid LogoutRequestDto requestBody){
		return authService.logout(requestBody);
	}

	@Operation(
		summary = "아이디 중복 체크",
		description = "사용자 회원가입 할 때, 아이디 중복 체크 함"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success."),
	})
	@PostMapping("/idcheck")
	public ResponseEntity<? super IdCheckResponseDto> login(@RequestBody @Valid IdCheckRequestDto requestBody){
		return authService.idCheck(requestBody);
	}

	@Operation(
		summary = "fcmToken 발급",
		description = "사용자 로그인 할 때, fcmToken 발급 받음"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success."),
	})
	@PostMapping("/fcmToken")
	public ResponseEntity<? super FCMTokenResponseDto> login(@RequestBody @Valid FCMTokenRequestDto requestBody){
		return authService.savedFcmToken(requestBody);
	}

	@Operation(
		summary = "refreshToken 새롭게 발급",
		description = "accessToken 만료되었을때, refreshToken 발급 받음"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success."),
	})
	@PostMapping("/refresh-token")
	public ResponseEntity<? super TokenResponseDto> createNewToken(
		@RequestBody @Valid TokenRequestDto requestBody
	){
		return authService.createNewToken(requestBody);
	}

}
