package com.ssafy.back.auth.dto.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ssafy.back.common.ResponseDto;
import com.ssafy.back.common.ResponseMessage;

public class SignUpResponseDto extends ResponseDto {

	ResponseEntity<ResponseDto> duplicateId(){
		ResponseDto responseBody = new ResponseDto(ResponseMessage.DUPLICATE_ID);
		return ResponseEntity.status(HttpStatus.CONFLICT).body(responseBody);
	}
}
