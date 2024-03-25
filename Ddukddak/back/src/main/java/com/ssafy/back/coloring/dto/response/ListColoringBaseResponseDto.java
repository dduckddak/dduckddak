package com.ssafy.back.coloring.dto.response;

import java.util.List;

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
public class ListColoringBaseResponseDto extends ResponseDto {
	private List<String> coloringBaseList;

	public static ResponseEntity<ListColoringBaseResponseDto> success(List<String> coloringBaseList) {
		ListColoringBaseResponseDto responseBody = new ListColoringBaseResponseDto(coloringBaseList);
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> S3error() {
		ResponseDto responseBody = new ResponseDto(ResponseMessage.S3_ERROR);
		return ResponseEntity.status(HttpStatus.GONE).body(responseBody);
	}
}
