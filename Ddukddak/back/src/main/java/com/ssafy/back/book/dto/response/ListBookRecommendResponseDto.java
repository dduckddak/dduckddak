package com.ssafy.back.book.dto.response;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ssafy.back.book.dto.BookSummaryDto;
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
public class ListBookRecommendResponseDto extends ResponseDto {
	private List<BookSummaryDto> bookList;

	public static ResponseEntity<ListBookRecommendResponseDto> success(List<BookSummaryDto> bookList) {
		ListBookRecommendResponseDto responseBody = new ListBookRecommendResponseDto(bookList);
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}

	//HTTP 요청 실패
	public static ResponseEntity<ResponseDto> HttpRequestError() {
		ResponseDto responseBody = new ResponseDto("fastapi 요청 실패");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> S3error() {
		ResponseDto responseBody = new ResponseDto(ResponseMessage.S3_ERROR);
		return ResponseEntity.status(HttpStatus.GONE).body(responseBody);
	}

}
