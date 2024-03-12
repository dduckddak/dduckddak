package com.ssafy.back.entity;

import jakarta.persistence.*;
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

    @Column(name = "book_title", nullable = false, length = 20)
    private String bookTitle;

    @Column(name = "book_author", nullable = false, length = 10)
    private String bookAuthor;

    @Column(name = "book_story", columnDefinition = "TEXT")
    private String bookStory;

}
