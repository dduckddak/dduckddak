package com.ssafy.back.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.back.auth.dto.request.LoginRequestDto;
import com.ssafy.back.auth.dto.request.LogoutRequestDto;
import com.ssafy.back.auth.dto.request.SignUpRequestDto;
import com.ssafy.back.auth.dto.response.LoginResponseDto;
import com.ssafy.back.auth.dto.response.LogoutResponseDto;
import com.ssafy.back.auth.dto.response.SignUpResponseDto;
import com.ssafy.back.auth.service.AuthService;
import com.ssafy.back.voice.dto.response.ListVoiceResponseDto;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
	private final AuthService authService;

	@Operation(
		summary = "회원가입",
		description = "사용자 회원가입 함"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success.",
			content = @Content(schema = @Schema(implementation = SignUpResponseDto.class))),
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
		@ApiResponse(responseCode = "200", description = "Success.",
			content = @Content(schema = @Schema(implementation = LogoutResponseDto.class))),
	})
	@PostMapping("/logout")
	public ResponseEntity<? super LogoutResponseDto> logout(@RequestBody @Valid LogoutRequestDto requestBody){
		return authService.logout(requestBody);
	}
}
