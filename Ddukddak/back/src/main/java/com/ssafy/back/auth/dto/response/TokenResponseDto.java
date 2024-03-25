package com.ssafy.back.auth.dto.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ssafy.back.common.ResponseDto;
import com.ssafy.back.common.ResponseMessage;

import lombok.Getter;

@Getter
public class TokenResponseDto extends ResponseDto{

	private String accessToken;
	private String refreshToken;

	public TokenResponseDto(String accessToken, String refreshToken){
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
	}

	public static ResponseEntity<TokenResponseDto> newTokenSuccess(String accessToken, String refreshToken){
		TokenResponseDto responseBody = new TokenResponseDto(accessToken, refreshToken);
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> refreshTokenNotFound(){
		ResponseDto responseBody = new ResponseDto(ResponseMessage.REFRESH_TOKEN_ERROR);
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
	}

}
