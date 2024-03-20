package com.ssafy.back.talk.dto.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ssafy.back.common.ResponseDto;
import com.ssafy.back.common.ResponseMessage;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class TalkResponseDto extends ResponseDto {
	private String gptScript;
	private byte[] gptVoiceFile;

	public static ResponseEntity<TalkResponseDto> success(String gptScript, byte[] gptVoiceFile) {
		TalkResponseDto responseBody = new TalkResponseDto(gptScript, gptVoiceFile);
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> ElevenLabserror() {
		ResponseDto responseBody = new ResponseDto(ResponseMessage.ELEVENLABS_ERROR);
		return ResponseEntity.status(HttpStatus.GONE).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> Gpterror() {
		ResponseDto responseBody = new ResponseDto(ResponseMessage.GPT_ERROR);
		return ResponseEntity.status(HttpStatus.GONE).body(responseBody);
	}
}
