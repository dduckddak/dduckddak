package com.ssafy.back.makebook.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.back.makebook.dto.request.InsertMakeBookRequestDto;
import com.ssafy.back.makebook.dto.response.InsertMakeBookResponseDto;
import com.ssafy.back.makebook.dto.response.ListMakeBookResponseDto;
import com.ssafy.back.makebook.service.MakeBookService;

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
@RequestMapping(value = "/api/v1/make-books", produces = "application/json; charset=UTF8")
@Tag(name = "make-book", description = "생성 동화 API")
public class MakeBookController {

	private final MakeBookService makeBookService;

	@Operation(
		summary = "생성 동화 목록",
		description = "사용자의 생성 동화 목록을 보여준다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success.",
			content = @Content(schema = @Schema(implementation = ListMakeBookResponseDto.class))),
		@ApiResponse(responseCode = "400", description = "요청 받아야 할 값이 없음."),
		@ApiResponse(responseCode = "401", description = "토큰 인증 실패."),
		@ApiResponse(responseCode = "403", description = "리프레쉬 토큰 인증 실패."),
		@ApiResponse(responseCode = "410", description = "S3 요청 실패.")
	})
	@GetMapping
	public ResponseEntity<? super ListMakeBookResponseDto> listMakeBook() {
		return makeBookService.listMakeBook();
	}

	@Operation(
		summary = "동화 생성",
		description = "사용자의 커스텀 동화를 생성한다"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success."),
		@ApiResponse(responseCode = "400", description = "요청 받아야 할 값이 없음."),
		@ApiResponse(responseCode = "401", description = "토큰 인증 실패."),
		@ApiResponse(responseCode = "403", description = "리프레쉬 토큰 인증 실패."),
		@ApiResponse(responseCode = "410", description = "ElevenLabs 요청 실패."),
		@ApiResponse(responseCode = "410", description = "S3 요청 실패.")
	})
	@PostMapping
	public ResponseEntity<? super InsertMakeBookResponseDto> insertMakeBook(
		@RequestBody InsertMakeBookRequestDto request) {
		return makeBookService.insertMakeBook(request);
	}
}
