package com.ssafy.back.voice.dto.response;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ssafy.back.common.ResponseDto;
import com.ssafy.back.voice.dto.VoiceDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class ListVoiceResponseDto extends ResponseDto {
	private List<VoiceDto> voiceList;
	
	public static ResponseEntity<ListVoiceResponseDto> success(List<VoiceDto> voiceList) {
		ListVoiceResponseDto responseBody = new ListVoiceResponseDto(voiceList);
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}
}
