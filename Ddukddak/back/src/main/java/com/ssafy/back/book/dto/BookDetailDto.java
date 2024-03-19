package com.ssafy.back.book.dto;

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
public class BookDetailDto {
	private String bookAuthor;
	private String BookStory;
	private Boolean isLike;
}
