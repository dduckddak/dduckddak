package com.ssafy.back.voice.dto.request;

import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
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
public class InsertVoiceRequestDto {
	@NotNull
	@Schema(description = "업로드할 파일", format = "binary")
	private MultipartFile voiceFile;

	@NotNull
	private String voiceName;
}
