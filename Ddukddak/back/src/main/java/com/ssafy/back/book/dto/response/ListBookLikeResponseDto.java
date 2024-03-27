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
public class ListBookLikeResponseDto extends ResponseDto {
	private List<BookSummaryDto> likeBookList;

	public static ResponseEntity<ListBookLikeResponseDto> success(List<BookSummaryDto> bookList) {
		ListBookLikeResponseDto responseBody = new ListBookLikeResponseDto(bookList);
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> S3error() {
		ResponseDto responseBody = new ResponseDto(ResponseMessage.S3_ERROR);
		return ResponseEntity.status(HttpStatus.GONE).body(responseBody);
	}
}
