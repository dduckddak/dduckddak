package com.ssafy.back.book.dto;

import com.ssafy.back.entity.BookEntity;

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
public class BookDto {
	private Integer bookId;
	private String bookTitle;
	private String bookAuthor;
	private String bookStory;
}
