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
public class ListBookChoiceResponseDto extends ResponseDto {
	private List<BookSummaryDto> bookList;

	public static ResponseEntity<ListBookChoiceResponseDto> success(List<BookSummaryDto> bookList) {
		ListBookChoiceResponseDto responseBody = new ListBookChoiceResponseDto(bookList);
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> S3error() {
		ResponseDto responseBody = new ResponseDto(ResponseMessage.S3_ERROR);
		return ResponseEntity.status(HttpStatus.GONE).body(responseBody);
	}
}
