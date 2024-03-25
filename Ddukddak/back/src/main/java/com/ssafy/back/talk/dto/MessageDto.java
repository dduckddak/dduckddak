package com.ssafy.back.talk.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MessageDto {
	private String role = "user";

	private String content;

	public MessageDto(String content) {
		this.content = content;
	}
}
