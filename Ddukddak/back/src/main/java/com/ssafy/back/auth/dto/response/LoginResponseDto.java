package com.ssafy.back.auth.dto.response;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ssafy.back.common.ResponseDto;
import com.ssafy.back.common.ResponseMessage;

import lombok.Getter;

@Getter
public class LoginResponseDto extends ResponseDto{


	public static ResponseEntity<LoginResponseDto> login_success(HttpHeaders headers){
		LoginResponseDto responseBody = new LoginResponseDto();
		return ResponseEntity
			.status(HttpStatus.NOT_FOUND)
			.headers(headers)
			.body(responseBody);
	}

	public static ResponseEntity<ResponseDto> login_fail(){
		ResponseDto responseBody = new ResponseDto(ResponseMessage.LOGIN_IN_FAIL);
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
	}
}
