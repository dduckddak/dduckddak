package com.ssafy.back.auth.service;

import java.time.temporal.ChronoUnit;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ssafy.back.auth.dto.request.LoginRequestDto;
import com.ssafy.back.auth.dto.request.SignUpRequestDto;
import com.ssafy.back.auth.dto.response.LoginResponseDto;
import com.ssafy.back.auth.dto.response.SignUpResponseDto;
import com.ssafy.back.auth.provider.JwtProvider;
import com.ssafy.back.auth.repository.UserRepository;
import com.ssafy.back.entity.UserEntity;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

	private final UserRepository userRepository;
	private final JwtProvider jwtProvider;

	@Override
	public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {
		UserEntity userEntity = new UserEntity(dto);
		userRepository.save(userEntity);

		return SignUpResponseDto.success();
	}

	@Override
	public ResponseEntity<? super LoginResponseDto> login(LoginRequestDto dto) {

		UserEntity userEntity = userRepository.findByUserId(dto.getUserId());
		int userSeq = userEntity.getUserSeq();
		String userName = userEntity.getUserName();
		String sex = userEntity.getSex();
		int birth = userEntity.getBirth();
		String userId = userEntity.getUserId();

		// 토큰 만들어서 반환, 헤더에 실어주기
		String accessToken = jwtProvider.createToken(userSeq,userName,sex,birth,userId,30, ChronoUnit.DAYS);
		String refreshToken = jwtProvider.createToken(userSeq,userName,sex,birth,userId,30, ChronoUnit.DAYS);

		HttpHeaders headers = new HttpHeaders();
		headers.add("accessToken", accessToken);
		headers.add("refreshToken", refreshToken);

		return LoginResponseDto.login_success(headers);
	}

}
