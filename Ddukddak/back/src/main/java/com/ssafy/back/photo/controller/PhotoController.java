package com.ssafy.back.photo.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.back.photo.dto.request.DeletePhotoRequestDto;
import com.ssafy.back.photo.dto.request.InsertPhotoRequestDto;
import com.ssafy.back.photo.dto.response.DeletePhotoResponseDto;
import com.ssafy.back.photo.dto.response.InsertPhotoResponseDto;
import com.ssafy.back.photo.dto.response.ListPhotoResponseDto;
import com.ssafy.back.photo.service.PhotoService;
import com.ssafy.back.voice.dto.response.ListVoiceResponseDto;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/photos", produces = "application/json; charset=UTF8")
@Tag(name = "photos", description = "사진 목록, 추가, 삭제 API")
public class PhotoController {

	private final PhotoService photoService;

	@Operation(
		summary = "사진 목록",
		description = "사용자의 사진 리스트를 가져온다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success.",
			content = @Content(schema = @Schema(implementation = ListPhotoResponseDto.class))),
	})
	@GetMapping
	public ResponseEntity<? super ListPhotoResponseDto> listPhoto() {
		return photoService.listPhoto();
	}

	@Operation(
		summary = "사진 추가",
		description = "사용자 사진을 추가함"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success."),
	})
	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<? super InsertPhotoResponseDto> insertPhoto(@ModelAttribute InsertPhotoRequestDto request) {
		return photoService.insertPhoto(request);
	}

	@Operation(
		summary = "사진 삭제",
		description = "사용자 사진을 삭제함"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success.")
	})
	@DeleteMapping
	public ResponseEntity<? super DeletePhotoResponseDto> deletePhoto(@RequestBody DeletePhotoRequestDto request){
		return photoService.deletePhoto(request);
	}
}
