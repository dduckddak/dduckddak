package com.ssafy.back.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "make_book")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MakeBookEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "make_book_id", nullable = false)
	private Integer makeBookId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "book_id", nullable = false)
	BookEntity bookEntity;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_seq", nullable = false)
	UserEntity userEntity;

	@Column(name = "make_book_title", nullable = false, length = 20)
	private String makeBookTitle;

	@Column(name = "main_voice", nullable = false)
	private boolean mainVoice;

	@Column(name = "sub_voice", nullable = false)
	private boolean subVoice;

	@Column(name = "narration", nullable = false)
	private boolean narration;

	public MakeBookEntity(int bookId, int userSeq, String makeBookTitle) {
		this.bookEntity = new BookEntity();
		this.userEntity = new UserEntity();
		this.bookEntity.setBookId(bookId);
		this.userEntity.setUserSeq(userSeq);
		this.makeBookTitle = makeBookTitle;
	}
}
