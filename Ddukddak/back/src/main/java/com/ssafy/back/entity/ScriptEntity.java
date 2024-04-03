package com.ssafy.back.entity;

import com.ssafy.back.entity.compositekey.ScriptId;

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
@Table(name = "script")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ScriptEntity {

	@EmbeddedId
	private ScriptId scriptId;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("bookId")
	@JoinColumn(name = "book_id", nullable = false)
	BookEntity bookEntity;

	@Column(name = "script_content", columnDefinition = "TEXT", nullable = false)
	private String scriptContent;

	@Column(name = "role", length = 1)
	private String role;

}
