package com.ssafy.back.entity;

import com.ssafy.back.entity.compositeKey.ReviewId;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;


@Entity
@Table(name = "review")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewEntity {
    @EmbeddedId
    private ReviewId id;

    @ManyToOne
    @MapsId("bookId")
    @JoinColumn(name="book_id")
    BookEntity bookEntity;

    @ManyToOne
    @MapsId("userSeq")
    @JoinColumn(name="user_seq")
    UserEntity userEntity;

    @Column(name="is_like")
    private Boolean isLike;
}
