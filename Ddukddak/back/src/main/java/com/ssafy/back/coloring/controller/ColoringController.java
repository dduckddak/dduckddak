package com.ssafy.back.coloring.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.back.coloring.dto.request.DeleteColoringRequestDto;
import com.ssafy.back.coloring.dto.request.InsertColoringRequestDto;
import com.ssafy.back.coloring.dto.response.DeleteColoringResponseDto;
import com.ssafy.back.coloring.dto.response.InsertColoringResponseDto;
import com.ssafy.back.coloring.dto.response.ListColoringResponseDto;
import com.ssafy.back.coloring.service.ColoringService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/colorings", produces = "application/json; charset=UTF8")
@Tag(name = "coloring", description = "색칠 그림 API")
public class ColoringController {

	private final ColoringService coloringService;

	@Operation(
		summary = "색칠 그림 목록",
		description = "사용자의 색칠 그림 리스트를 가져온다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success.",
			content = @Content(schema = @Schema(implementation = ListColoringResponseDto.class))),
		@ApiResponse(responseCode = "401", description = "토큰 인증 실패."),
		@ApiResponse(responseCode = "403", description = "리프레쉬 토큰 인증 실패."),
		@ApiResponse(responseCode = "410", description = "S3 요청 실패.")
	})
	@GetMapping
	public ResponseEntity<? super ListColoringResponseDto> listColoring() {
		return coloringService.listColoring();
	}

	@Operation(
		summary = "색칠 그림 추가",
		description = "사용자의 색칠 그림을 추가한다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success."),
		@ApiResponse(responseCode = "400", description = "요청 받아야 할 값이 없음."),
		@ApiResponse(responseCode = "401", description = "토큰 인증 실패."),
		@ApiResponse(responseCode = "403", description = "리프레쉬 토큰 인증 실패."),
		@ApiResponse(responseCode = "410", description = "S3 요청 실패.")
	})
	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<? super InsertColoringResponseDto> uploadColoring(
		@ModelAttribute InsertColoringRequestDto request) {
		return coloringService.insertVoice(request);
	}

	@Operation(
		summary = "색칠 그림 삭제",
		description = "사용자의 색칠 그림을 삭제한다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success."),
		@ApiResponse(responseCode = "400", description = "요청 받아야 할 값이 없음."),
		@ApiResponse(responseCode = "401", description = "토큰 인증 실패."),
		@ApiResponse(responseCode = "403", description = "리프레쉬 토큰 인증 실패."),
		@ApiResponse(responseCode = "410", description = "S3 요청 실패.")
	})
	@DeleteMapping
	public ResponseEntity<? super DeleteColoringResponseDto> deleteColoring(
		@RequestBody DeleteColoringRequestDto request) {
		return coloringService.deleteVoice(request);
	}
}
