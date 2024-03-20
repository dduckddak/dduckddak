package com.ssafy.back.auth.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ssafy.back.auth.dto.request.SignUpRequestDto;
import com.ssafy.back.auth.dto.response.SignUpResponseDto;
import com.ssafy.back.auth.repository.UserRepository;
import com.ssafy.back.entity.UserEntity;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

	private final UserRepository userRepository;

	@Override
	public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {
		UserEntity userEntity = new UserEntity(dto);
		userRepository.save(userEntity);

		return SignUpResponseDto.success();
	}


}
