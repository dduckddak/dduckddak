package com.ssafy.back.book.dto.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ssafy.back.book.dto.BookDetailDto;
import com.ssafy.back.common.ResponseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class BookDetailResponseDto extends ResponseDto {
	private BookDetailDto book;
	public static ResponseEntity<BookDetailResponseDto> success(BookDetailDto book){
		BookDetailResponseDto responseBody = new BookDetailResponseDto(book);
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}
}
