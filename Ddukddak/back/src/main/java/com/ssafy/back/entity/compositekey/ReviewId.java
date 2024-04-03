package com.ssafy.back.entity.compositekey;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
@EqualsAndHashCode
public class ReviewId implements Serializable {

	@Column(name = "book_id", nullable = false)
	private Integer bookId;

	@Column(name = "user_seq", nullable = false)
	private Integer userSeq;

}