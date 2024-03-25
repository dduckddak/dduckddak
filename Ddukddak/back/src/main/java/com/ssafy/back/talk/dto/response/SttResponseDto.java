package com.ssafy.back.talk.dto.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ssafy.back.common.ResponseDto;
import com.ssafy.back.common.ResponseMessage;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class SttResponseDto extends ResponseDto {
	private String userScript;

	public static ResponseEntity<SttResponseDto> success(String userScript) {
		SttResponseDto responseBody = new SttResponseDto(userScript);
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> FastAPIerror() {
		ResponseDto responseBody = new ResponseDto(ResponseMessage.FASTAPI_ERROR);
		return ResponseEntity.status(HttpStatus.GONE).body(responseBody);
	}
}
