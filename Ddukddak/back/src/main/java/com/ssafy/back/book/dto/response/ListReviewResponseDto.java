package com.ssafy.back.book.dto.response;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ssafy.back.book.dto.ReviewDto;
import com.ssafy.back.common.ResponseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class ListReviewResponseDto extends ResponseDto {
	private List<ReviewDto> reviewList;

	private static ResponseEntity<ListReviewResponseDto> success(List<ReviewDto> reviewList) {
		ListReviewResponseDto responseBody = new ListReviewResponseDto(reviewList);
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}
}
