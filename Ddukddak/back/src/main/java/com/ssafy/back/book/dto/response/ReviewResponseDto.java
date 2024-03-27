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
	private String message;
	private Boolean isLike;
	public static ResponseEntity<ResponseDto> insertSuccess(String message, Boolean isLike) {
		ReviewResponseDto responseBody = new ReviewResponseDto(message, isLike);
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> updateSuccess(String message, Boolean isLike) {
		ReviewResponseDto responseBody = new ReviewResponseDto(message, isLike);
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> deleteSuccess(String message, Boolean isLike) {
		ReviewResponseDto responseBody = new ReviewResponseDto(message, isLike);
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}

}
