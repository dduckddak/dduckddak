package com.ssafy.back.book.dto.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ssafy.back.common.ResponseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class ReviewResponseDto extends ResponseDto {
	public static ResponseEntity<ResponseDto> insertSuccess() {
		ResponseDto responseBody = new ResponseDto("review insert");
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> updateSuccess() {
		ResponseDto responseBody = new ResponseDto("review update");
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> deleteSuccess() {
		ResponseDto responseBody = new ResponseDto("review delete");
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}

}
