package com.ssafy.back.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "book")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "book_id", nullable = false)
	private Integer bookId;

    @Column(name = "book_title", nullable = false, length = 30)
    private String bookTitle;

    @Column(name = "book_author", nullable = false, length = 30)
    private String bookAuthor;

	@Column(name = "book_story", columnDefinition = "TEXT", nullable = false)
	private String bookStory;

	@OneToMany(mappedBy = "bookEntity", fetch = FetchType.LAZY)
	private List<MakeBookEntity> makeBookEntities = new ArrayList<>();

	@OneToMany(mappedBy = "bookEntity", fetch = FetchType.LAZY)
	private List<PageEntity> pageEntities = new ArrayList<>();

	@OneToMany(mappedBy = "bookEntity", fetch = FetchType.LAZY)
	private List<PersonEntity> personEntities = new ArrayList<>();

	@OneToMany(mappedBy = "bookEntity", fetch = FetchType.LAZY)
	private List<ReviewEntity> reviewEntities = new ArrayList<>();

	@OneToMany(mappedBy = "bookEntity", fetch = FetchType.LAZY)
	private List<ScriptEntity> scriptEntities = new ArrayList<>();

}
