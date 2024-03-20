package com.ssafy.back.photo.dto.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ssafy.back.common.ResponseDto;
import com.ssafy.back.common.ResponseMessage;

public class InsertPhotoResponseDto extends ResponseDto {

	public static ResponseEntity<ResponseDto> S3error() {
		ResponseDto responseBody = new ResponseDto(ResponseMessage.S3_ERROR);
		return ResponseEntity.status(HttpStatus.GONE).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> fastApierror() {
		ResponseDto responseBody = new ResponseDto(ResponseMessage.FastApi_ERROR);
		return ResponseEntity.status(HttpStatus.GONE).body(responseBody);
	}
}
