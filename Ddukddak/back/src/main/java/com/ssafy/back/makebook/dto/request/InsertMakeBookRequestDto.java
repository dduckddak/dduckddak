package com.ssafy.back.makebook.dto.request;

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
public class InsertMakeBookRequestDto {
	@NotNull
	private Integer bookId;

	@NotNull
	private String makeBookTitle;

	private Integer mainVoice;

	private Integer mainPhoto;

	private Integer subVoice;

	private Integer subPhoto;

	private Integer narration;
}
