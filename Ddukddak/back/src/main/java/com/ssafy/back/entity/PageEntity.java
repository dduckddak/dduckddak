package com.ssafy.back.entity;

import com.ssafy.back.entity.compositeKey.PageId;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "page")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PageEntity {

	@EmbeddedId
	private PageId pageId;

	@ManyToOne
	@MapsId("bookId")
	@JoinColumn(name="book_id", nullable = false)
	BookEntity bookEntity;

}
