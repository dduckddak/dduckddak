package com.ssafy.back.auth.dto.response;

import org.springframework.http.HttpMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ssafy.back.common.ResponseDto;
import com.ssafy.back.common.ResponseMessage;

import lombok.Getter;

@Getter
public class IdCheckResponseDto extends ResponseDto{

	public static ResponseEntity<ResponseDto> duplicateId(){
		ResponseDto responseBody = new ResponseDto(ResponseMessage.DUPLICATE_ID);
		return ResponseEntity.status(HttpStatus.CONFLICT).body(responseBody);
	}

}
