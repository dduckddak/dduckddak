package com.ssafy.back.entity;

import jakarta.persistence.*;
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

    @Column(name = "book_id", nullable = false)
    private Integer bookId;

    @ManyToOne
    @JoinColumn(name="user_seq")
    UserEntity userEntity;

    @Column(name = "make_book_title", nullable = false , length = 20)
    private String makeBookTitle;
}
