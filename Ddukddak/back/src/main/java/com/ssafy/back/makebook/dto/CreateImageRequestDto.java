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
public class CreateImageRequestDto {
	private int userSeq;
	private int mainPhoto;
	private int subPhoto;
	private int bookId;
	private int generatedId;
}
