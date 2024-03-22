package com.ssafy.back.makebook.dto.response;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ssafy.back.common.ResponseDto;
import com.ssafy.back.makebook.dto.MakeBookPageDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class DetailMakeBookResponseDto extends ResponseDto {
	private List<MakeBookPageDto> bookDetail;

	public static ResponseEntity<DetailMakeBookResponseDto> success(List<MakeBookPageDto> bookDetail) {
		DetailMakeBookResponseDto responseBody = new DetailMakeBookResponseDto(bookDetail);
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}
}


