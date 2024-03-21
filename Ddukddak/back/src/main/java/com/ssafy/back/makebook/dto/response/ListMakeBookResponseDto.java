package com.ssafy.back.makebook.dto.response;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ssafy.back.common.ResponseDto;
import com.ssafy.back.common.ResponseMessage;
import com.ssafy.back.makebook.dto.MakeBookSummaryDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class ListMakeBookResponseDto extends ResponseDto {
	private List<MakeBookSummaryDto> makeBookList;

	public static ResponseEntity<ListMakeBookResponseDto> success(List<MakeBookSummaryDto> makeBookList) {
		ListMakeBookResponseDto responseBody = new ListMakeBookResponseDto(makeBookList);
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> S3error() {
		ResponseDto responseBody = new ResponseDto(ResponseMessage.S3_ERROR);
		return ResponseEntity.status(HttpStatus.GONE).body(responseBody);
	}
}
