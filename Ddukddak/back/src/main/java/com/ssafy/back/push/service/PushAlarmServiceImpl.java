package com.ssafy.back.push.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.ssafy.back.common.ResponseDto;
import com.ssafy.back.common.ResponseMessage;
import com.ssafy.back.push.dto.request.PushSendRequestDto;
import com.ssafy.back.push.dto.response.PushSendResponseDto;

@Service
public class PushAlarmServiceImpl implements PushAlarmService {
	private final Logger logger = LogManager.getLogger(PushAlarmServiceImpl.class);

	public ResponseEntity<? super PushSendResponseDto> sendNotification(PushSendRequestDto pushSendRequestDto) {
		//Notification (push알림)
		Notification notification = Notification.builder()
			.setTitle(pushSendRequestDto.getTitle())
			.setBody(pushSendRequestDto.getBody())
			.build();

		//일반 알림
		Message message = Message.builder()
			.setNotification(notification)
			.putData("title", pushSendRequestDto.getTitle())
			.putData("body", pushSendRequestDto.getBody())
			.setToken(pushSendRequestDto.getToken())
			.build();

		try {
			FirebaseMessaging.getInstance().send(message);

			logger.info("알림 전송 성공");

			return ResponseDto.success();

		} catch (FirebaseMessagingException e) {
			logger.debug(ResponseMessage.FIREBASE_ERROR);
			logger.error("알림 전송 실패", e);

			return PushSendResponseDto.FireBaseerror();
		}
	}
}
