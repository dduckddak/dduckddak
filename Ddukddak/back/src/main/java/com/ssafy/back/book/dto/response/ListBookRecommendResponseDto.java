package com.ssafy.back.book.dto.response;

import java.util.List;

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
public class ListBookRecommendResponseDto extends ResponseDto {
	private List<BookDetailDto> bookList;
	public static ResponseEntity<ListBookRecommendResponseDto> success(List<BookDetailDto> bookList) {
		ListBookRecommendResponseDto responseBody = new ListBookRecommendResponseDto(bookList);
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}
	//HTTP 요청 실패
	public static ResponseEntity<ResponseDto> HttpRequestError() {
		ResponseDto responseBody = new ResponseDto("fastapi 요청 실패");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
	}

	//HTTP 응답 형식 불일치 , JSON 파싱 실패

	//JSON 파싱 실패

}
