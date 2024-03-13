package com.ssafy.back.entity;

import com.ssafy.back.entity.compositeKey.PersonId;

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

@Entity
@Table(name = "person")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PersonEntity {
	
	@EmbeddedId
	private PersonId personId;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("bookId")
	@JoinColumn(name = "book_id", nullable = false)
	BookEntity bookEntity;

	@Column(name = "person_name", nullable = false, length = 20)
	private String personName;

	@Column(name = "voice_model_id", nullable = false, length = 40)
	private String voiceModelId;
}
