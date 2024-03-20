package com.ssafy.back.photo.dto.request;

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
public class PhotoRequestDto {

	@NotNull
	private Integer bookId;

	@NotNull
	private String makeBookTitle;

	@NotNull
	private Integer mainVoice;

	@NotNull
	private Integer mainPhoto;

	@NotNull
	private Integer subVoice;

	@NotNull
	private Integer subPhoto;

	@NotNull
	private Integer narration;

}
