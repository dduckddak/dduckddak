package com.ssafy.back.voice.service;

import org.springframework.http.ResponseEntity;

import com.ssafy.back.voice.dto.request.DeleteVoiceRequestDto;
import com.ssafy.back.voice.dto.request.InsertVoiceRequestDto;
import com.ssafy.back.voice.dto.response.DeleteVoiceResponseDto;
import com.ssafy.back.voice.dto.response.InsertVoiceResponseDto;
import com.ssafy.back.voice.dto.response.ListVoiceResponseDto;
import com.ssafy.back.voice.dto.response.PreviewVoiceResponseDto;

public interface VoiceService {
	ResponseEntity<? super ListVoiceResponseDto> listVoice();

	ResponseEntity<? super InsertVoiceResponseDto> insertVoice(InsertVoiceRequestDto request);

	ResponseEntity<? super DeleteVoiceResponseDto> deleteVoice(DeleteVoiceRequestDto request);

	ResponseEntity<? super PreviewVoiceResponseDto> previewVoice(int voiceId);
}
