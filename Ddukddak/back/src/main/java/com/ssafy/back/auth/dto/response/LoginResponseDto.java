package com.ssafy.back.auth.dto.response;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ssafy.back.common.ResponseDto;
import com.ssafy.back.common.ResponseMessage;

import lombok.Getter;

@Getter
public class LoginResponseDto extends ResponseDto{

	private String accessToken;
	private String refreshToken;

	public LoginResponseDto(String accessToken, String refreshToken){
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
	}

	public static ResponseEntity<LoginResponseDto> loginSuccess(String accessToken, String refreshToken){
		LoginResponseDto responseBody = new LoginResponseDto(accessToken, refreshToken);
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> loginFail(){
		ResponseDto responseBody = new ResponseDto(ResponseMessage.LOGIN_IN_FAIL);
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
	}

}
