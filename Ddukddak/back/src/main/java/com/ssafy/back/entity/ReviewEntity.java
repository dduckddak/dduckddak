package com.ssafy.back.entity;

import com.ssafy.back.entity.compositeKey.ReviewId;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "review")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReviewEntity {

	@EmbeddedId
	private ReviewId id;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("bookId")
	@JoinColumn(name = "book_id", nullable = false)
	BookEntity bookEntity;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("userSeq")
	@JoinColumn(name = "user_seq", nullable = false)
	UserEntity userEntity;

	@Column(name = "is_like", nullable = false)
	private Boolean isLike;
}
