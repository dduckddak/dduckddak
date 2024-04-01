package com.ssafy.back.push.service;

import org.springframework.http.ResponseEntity;

import com.ssafy.back.push.dto.request.PushSendRequestDto;
import com.ssafy.back.push.dto.response.PushSendResponseDto;

public interface PushAlarmService {
	public ResponseEntity<? super PushSendResponseDto> sendNotification(PushSendRequestDto pushSendRequestDto);
}
