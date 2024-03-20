package com.ssafy.back.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
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

	@Id
	@Column(name = "book_id", nullable = false)
	private Integer bookId;

	@OneToOne(fetch = FetchType.LAZY)
	@MapsId
	@JoinColumn(name = "book_id")
	private BookEntity bookEntity;

	@Column(name = "person_name", nullable = false, length = 20)
	private String personName;

	@Column(name = "voice_model_id", nullable = false, length = 40)
	private String voiceModelId;
}
