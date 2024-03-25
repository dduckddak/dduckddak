package com.ssafy.back.photo.dto.response;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ssafy.back.common.ResponseDto;
import com.ssafy.back.photo.dto.PhotoDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class ListPhotoResponseDto extends ResponseDto {
	private List<PhotoDto> photoList;
	
	public static ResponseEntity<ListPhotoResponseDto> success(List<PhotoDto> photoList) {
		ListPhotoResponseDto responseBody = new ListPhotoResponseDto(photoList);
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}
}
