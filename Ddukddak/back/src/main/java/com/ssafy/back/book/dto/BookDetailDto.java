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
	private Integer bookId;
	private String bookTitle;
	private String coverImage;

	public BookDetailDto(Integer bookId, String bookTitle) {
		this.bookId = bookId;
		this.bookTitle = bookTitle;
	}
}
