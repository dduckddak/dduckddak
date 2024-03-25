package com.ssafy.back.talk.dto.request;

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
public class SttRequestDto {
	@NotNull
	@Schema(description = "사용자의 음성 파일", format = "binary")
	private MultipartFile talkFile;
}
