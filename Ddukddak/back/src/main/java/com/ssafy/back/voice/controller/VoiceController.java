package com.ssafy.back.voice.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.back.voice.dto.request.DeleteVoiceRequestDto;
import com.ssafy.back.voice.dto.request.InsertVoiceRequestDto;
import com.ssafy.back.voice.dto.response.DeleteVoiceResponseDto;
import com.ssafy.back.voice.dto.response.InsertVoiceResponseDto;
import com.ssafy.back.voice.dto.response.ListVoiceResponseDto;
import com.ssafy.back.voice.dto.response.PreviewVoiceResponseDto;
import com.ssafy.back.voice.service.VoiceService;

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
@RequestMapping(value = "/api/v1/voices", produces = "application/json; charset=UTF8")
@Tag(name = "voice", description = "목소리 API")
public class VoiceController {

	private final VoiceService voiceService;

	@Operation(
		summary = "목소리 목록",
		description = "사용자의 목소리 리스트를 가져온다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success.",
			content = @Content(schema = @Schema(implementation = ListVoiceResponseDto.class))),
		@ApiResponse(responseCode = "401", description = "토큰 인증 실패."),
		@ApiResponse(responseCode = "403", description = "리프레쉬 토큰 인증 실패.")
	})
	@GetMapping
	public ResponseEntity<? super ListVoiceResponseDto> listVoice() {
		return voiceService.listVoice();
	}

	@Operation(
		summary = "목소리 추가",
		description = "사용자의 목소리를 추가하고 미리듣기 음성을 제작한다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success."),
		@ApiResponse(responseCode = "400", description = "요청 받아야 할 값이 없음."),
		@ApiResponse(responseCode = "401", description = "토큰 인증 실패."),
		@ApiResponse(responseCode = "403", description = "리프레쉬 토큰 인증 실패."),
		@ApiResponse(responseCode = "410", description = "ElevenLabs 요청 실패."),
		@ApiResponse(responseCode = "410", description = "S3 요청 실패.")
	})
	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<? super InsertVoiceResponseDto> uploadVoice(@ModelAttribute InsertVoiceRequestDto request) {
		return voiceService.insertVoice(request);
	}

	@Operation(
		summary = "목소리 삭제",
		description = "사용자의 목소리 정보를 삭제한다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success."),
		@ApiResponse(responseCode = "400", description = "요청 받아야 할 값이 없음."),
		@ApiResponse(responseCode = "401", description = "토큰 인증 실패."),
		@ApiResponse(responseCode = "403", description = "리프레쉬 토큰 인증 실패."),
		@ApiResponse(responseCode = "410", description = "ElevenLabs 요청 실패."),
		@ApiResponse(responseCode = "410", description = "S3 요청 실패.")
	})
	@DeleteMapping
	public ResponseEntity<? super DeleteVoiceResponseDto> deleteVoice(@RequestBody DeleteVoiceRequestDto request) {
		return voiceService.deleteVoice(request);
	}

	@Operation(
		summary = "목소리 미리듣기",
		description = "사용자 목소리의 미리듣기를 제공한다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success.",
			content = @Content(schema = @Schema(implementation = PreviewVoiceResponseDto.class))),
		@ApiResponse(responseCode = "401", description = "토큰 인증 실패."),
		@ApiResponse(responseCode = "403", description = "리프레쉬 토큰 인증 실패."),
		@ApiResponse(responseCode = "410", description = "S3 요청 실패.")
	})
	@GetMapping("/{voiceId}")
	public ResponseEntity<? super PreviewVoiceResponseDto> previewVoice(@PathVariable int voiceId) {
		return voiceService.previewVoice(voiceId);
	}
}
