package com.ssafy.back.push.dto.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ssafy.back.common.ResponseDto;
import com.ssafy.back.common.ResponseMessage;

import lombok.Getter;

@Getter
public class PushSendResponseDto extends ResponseDto {
	public static ResponseEntity<ResponseDto> FireBaseerror() {
		ResponseDto responseBody = new ResponseDto(ResponseMessage.FIREBASE_ERROR);
		return ResponseEntity.status(HttpStatus.GONE).body(responseBody);
	}
}
