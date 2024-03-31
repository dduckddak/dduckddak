package com.ssafy.back.talk.dto.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ssafy.back.common.ResponseDto;
import com.ssafy.back.common.ResponseMessage;

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
	private String welcomeComment;
	private String welcomeCommentSound;

	public static ResponseEntity<StartTalkResponseDto> success(String subName, String subBasic, String subTalk,
		String welcomeComment, String welcomeCommentSound) {
		StartTalkResponseDto responseBody = new StartTalkResponseDto(subName, subBasic, subTalk, welcomeComment,
			welcomeCommentSound);
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> S3error() {
		ResponseDto responseBody = new ResponseDto(ResponseMessage.S3_ERROR);
		return ResponseEntity.status(HttpStatus.GONE).body(responseBody);
	}
}
