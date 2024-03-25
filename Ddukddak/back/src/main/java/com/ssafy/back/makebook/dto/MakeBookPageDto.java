package com.ssafy.back.makebook.dto;

import java.util.List;

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
public class MakeBookPageDto {
	String pageImage;
	List<MakeBookScriptDto> pageDetail;
}
