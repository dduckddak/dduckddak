package com.ssafy.back.makebook.dto;

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
public class MakeBookSummaryDto {
	private int makeBookId;
	private String makeBookTitle;
	private String makeBookCover;

	public MakeBookSummaryDto(int makeBookId, String makeBookTitle) {
		this.makeBookId = makeBookId;
		this.makeBookTitle = makeBookTitle;
	}
}
