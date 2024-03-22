package com.ssafy.back.makebook.dto.response;

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
public class InsertMakeBookResponseDto extends ResponseDto {
	public static ResponseEntity<ResponseDto> ElevenLabserror() {
		ResponseDto responseBody = new ResponseDto(ResponseMessage.ELEVENLABS_ERROR);
		return ResponseEntity.status(HttpStatus.GONE).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> S3error() {
		ResponseDto responseBody = new ResponseDto(ResponseMessage.S3_ERROR);
		return ResponseEntity.status(HttpStatus.GONE).body(responseBody);
	}
}
