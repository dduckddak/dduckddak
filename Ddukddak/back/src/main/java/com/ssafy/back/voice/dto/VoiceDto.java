package com.ssafy.back.voice.dto;

import com.ssafy.back.entity.VoiceEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class VoiceDto {
	private int voiceId;
	private String voiceName;

	public VoiceDto(VoiceEntity entity) {
		this.voiceId = entity.getVoiceId();
		this.voiceName = entity.getVoiceName();
	}
}
