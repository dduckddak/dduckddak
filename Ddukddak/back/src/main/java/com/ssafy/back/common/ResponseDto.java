package com.ssafy.back.common;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ResponseDto {

	@Schema(description = "응답 메시지", example = "Success.")
	private String message;

	public ResponseDto() {
		this.message = ResponseMessage.SUCCESS;
	}

	public static ResponseEntity<ResponseDto> success() {
		ResponseDto responseBody = new ResponseDto();
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> databaseError() {
		ResponseDto responseBody = new ResponseDto(ResponseMessage.DATABASE_ERROR);
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> validationFail() {
		ResponseDto responseBody = new ResponseDto(ResponseMessage.VALIDATION_FAIL);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> jwtTokenFail() {
		ResponseDto responseBody = new ResponseDto(ResponseMessage.VALIDATION_FAIL);
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(responseBody);
	}
}
