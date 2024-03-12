package com.ssafy.back.entity.compositeKey;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class ScriptId {

	@Column(name = "book_id")
	private Integer bookId;

	@Column(name = "page_seq")
	private Integer pageSeq;

	@Column(name = "script_seq")
	private Integer scriptSeq;

}
