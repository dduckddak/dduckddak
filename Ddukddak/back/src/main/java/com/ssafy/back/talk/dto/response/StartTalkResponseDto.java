package com.ssafy.back.talk.dto.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ssafy.back.common.ResponseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class StartTalkResponseDto extends ResponseDto {
	private String subName;
	private String subBasic;
	private String subTalk;

	public static ResponseEntity<StartTalkResponseDto> success(String subName, String subBasic, String subTalk) {
		StartTalkResponseDto responseBody = new StartTalkResponseDto(subName, subBasic, subTalk);
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}
}
