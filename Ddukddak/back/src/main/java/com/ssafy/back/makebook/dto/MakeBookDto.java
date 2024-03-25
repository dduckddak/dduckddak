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
public class MakeBookDto {
	int bookId;
	boolean mainVoice;
	boolean subVoice;
	boolean narration;
	int bookPage;
}
