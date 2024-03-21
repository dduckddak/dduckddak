package com.ssafy.back.talk.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.back.talk.dto.request.SttRequestDto;
import com.ssafy.back.talk.dto.request.TalkRequestDto;
import com.ssafy.back.talk.dto.response.StartTalkResponseDto;
import com.ssafy.back.talk.dto.response.SttResponseDto;
import com.ssafy.back.talk.dto.response.TalkResponseDto;
import com.ssafy.back.talk.service.TalkService;

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
@RequestMapping(value = "/api/v1/talks", produces = "application/json; charset=UTF8")
@Tag(name = "talk", description = "대화 API")
public class TalkController {

	private final TalkService talkService;

	@Operation(
		summary = "대화 시작",
		description = "대화 시작 전 필요한 역할 이름과 이미지를 보내준다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success.",
			content = @Content(schema = @Schema(implementation = StartTalkResponseDto.class))),
		@ApiResponse(responseCode = "400", description = "요청 받아야 할 값이 없음."),
		@ApiResponse(responseCode = "401", description = "토큰 인증 실패."),
		@ApiResponse(responseCode = "403", description = "리프레쉬 토큰 인증 실패."),
		@ApiResponse(responseCode = "404", description = "DB에 값이 없음."),
		@ApiResponse(responseCode = "410", description = "S3 요청 실패.")
	})
	@GetMapping("/{bookId}")
	public ResponseEntity<? super StartTalkResponseDto> startTalk(@PathVariable int bookId) {
		return talkService.startTalk(bookId);
	}

	@Operation(
		summary = "사용자의 말 STT",
		description = "사용자의 음성 파일을 텍스트로 바꿔준다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success.",
			content = @Content(schema = @Schema(implementation = SttResponseDto.class))),
		@ApiResponse(responseCode = "400", description = "요청 받아야 할 값이 없음."),
		@ApiResponse(responseCode = "401", description = "토큰 인증 실패."),
		@ApiResponse(responseCode = "403", description = "리프레쉬 토큰 인증 실패."),
		@ApiResponse(responseCode = "410", description = "FastAPI 요청 실패.")
	})
	@PostMapping("/stt")
	public ResponseEntity<? super SttResponseDto> stt(SttRequestDto request) {
		return talkService.stt(request);
	}

	@Operation(
		summary = "gpt 답변 요청",
		description = "사용자의 발언에 대한 gpt의 답을 얻어온다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success.",
			content = @Content(schema = @Schema(implementation = TalkResponseDto.class))),
		@ApiResponse(responseCode = "400", description = "요청 받아야 할 값이 없음."),
		@ApiResponse(responseCode = "401", description = "토큰 인증 실패."),
		@ApiResponse(responseCode = "403", description = "리프레쉬 토큰 인증 실패."),
		@ApiResponse(responseCode = "410", description = "ElevenLabs 요청 실패."),
		@ApiResponse(responseCode = "410", description = "GPT 요청 실패.")
	})
	@PostMapping
	public ResponseEntity<? super TalkResponseDto> talk(@RequestBody TalkRequestDto request) {
		return talkService.talk(request);
	}
}
