package com.ssafy.back.book.dto.response;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ssafy.back.book.dto.BookSummaryDto;
import com.ssafy.back.common.ResponseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class ListBookSearchResponseDto extends ResponseDto {
	private List<BookSummaryDto> bookList;
	public static ResponseEntity<ListBookSearchResponseDto> success(List<BookSummaryDto> bookList) {
		ListBookSearchResponseDto responseBody = new ListBookSearchResponseDto(bookList);
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}
}