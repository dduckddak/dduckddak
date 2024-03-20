package com.ssafy.back.talk.service;

import org.springframework.http.ResponseEntity;

import com.ssafy.back.talk.dto.request.SttRequestDto;
import com.ssafy.back.talk.dto.request.TalkRequestDto;
import com.ssafy.back.talk.dto.response.StartTalkResponseDto;
import com.ssafy.back.talk.dto.response.SttResponseDto;
import com.ssafy.back.talk.dto.response.TalkResponseDto;

public interface TalkService {
	ResponseEntity<? super StartTalkResponseDto> startTalk(int bookId);

	ResponseEntity<? super SttResponseDto> stt(SttRequestDto request);

	public ResponseEntity<? super TalkResponseDto> talk(TalkRequestDto request);
}
