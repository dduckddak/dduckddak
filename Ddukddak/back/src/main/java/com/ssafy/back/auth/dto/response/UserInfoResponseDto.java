package com.ssafy.back.auth.dto.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ssafy.back.common.ResponseDto;

import lombok.Getter;

@Getter
public class UserInfoResponseDto extends ResponseDto {

	private String userName;
	private String sex;
	private int birth;

	public UserInfoResponseDto(String userName, String sex, int birth){
		this.userName = userName;
		this.sex = sex;
		this.birth = birth;
	}

	public static ResponseEntity<UserInfoResponseDto> userInfoSuccess(String userName, String sex, int birth){
		UserInfoResponseDto responseBody = new UserInfoResponseDto(userName, sex, birth);
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}
}
