package com.ssafy.back.photo.dto.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ssafy.back.common.ResponseDto;
import com.ssafy.back.common.ResponseMessage;

public class InsertPhotoResponseDto extends ResponseDto {

	public static ResponseEntity<ResponseDto> uniRestError(){
		ResponseDto responseBody = new ResponseDto(ResponseMessage.BAD_REQUEST);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> fastApierror(HttpStatus httpStatus, String message) {
		ResponseDto responseBody = new ResponseDto(message);
		return ResponseEntity.status(httpStatus).body(responseBody);
	}


}
