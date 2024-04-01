package com.ssafy.back.push.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.back.push.dto.request.PushSendRequestDto;
import com.ssafy.back.push.dto.response.PushSendResponseDto;
import com.ssafy.back.push.service.PushAlarmService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/api/v1/push", produces = "application/json; charset=UTF8")
@RequiredArgsConstructor
@Tag(name = "push", description = "push 알림 API")
public class PushController {
	private final PushAlarmService pushAlarmService;

	@Operation(
		summary = "push 알림 요청",
		description = "사용자에게 push 알림을 보냅니다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Success."),
		@ApiResponse(responseCode = "410", description = "FireBase error.")
	})
	@PostMapping
	public ResponseEntity<? super PushSendResponseDto> sendMessage(
		@RequestBody @Valid PushSendRequestDto pushSendRequestDto) {
		return pushAlarmService.sendNotification(pushSendRequestDto);
	}
}
