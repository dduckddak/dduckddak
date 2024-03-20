package com.ssafy.back.auth.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignUpRequestDto {

	@NotBlank
	private String userName;

	@NotBlank
	private String sex;

	@NotNull
	private Integer birth;

	@NotBlank
	private String userId;

	@NotBlank
	private String userPassword;

}
