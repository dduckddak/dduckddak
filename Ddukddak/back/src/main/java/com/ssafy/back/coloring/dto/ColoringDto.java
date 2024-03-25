package com.ssafy.back.coloring.dto;

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
public class ColoringDto {
	private int coloringId;
	private String coloringFile;

	public ColoringDto(int coloringId) {
		this.coloringId = coloringId;
	}
}
