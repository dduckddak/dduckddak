package com.ssafy.back.auth.service;

import java.time.temporal.ChronoUnit;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.ssafy.back.auth.dto.CustomUserDetails;
import com.ssafy.back.auth.dto.request.FCMTokenRequestDto;
import com.ssafy.back.auth.dto.request.IdCheckRequestDto;
import com.ssafy.back.auth.dto.request.LoginRequestDto;
import com.ssafy.back.auth.dto.request.LogoutRequestDto;
import com.ssafy.back.auth.dto.request.SignUpRequestDto;
import com.ssafy.back.auth.dto.response.FCMTokenResponseDto;
import com.ssafy.back.auth.dto.response.IdCheckResponseDto;
import com.ssafy.back.auth.dto.response.LoginResponseDto;
import com.ssafy.back.auth.dto.response.LogoutResponseDto;
import com.ssafy.back.auth.dto.response.SignUpResponseDto;
import com.ssafy.back.auth.provider.JwtProvider;
import com.ssafy.back.auth.repository.UserRepository;
import com.ssafy.back.entity.UserEntity;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

	private final Logger logger = LogManager.getLogger(AuthServiceImpl.class);
	private final UserRepository userRepository;
	private final JwtProvider jwtProvider;
	private final RedisTemplate<String, String> redisTemplate;

	@Override
	public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {
		UserEntity userEntity = new UserEntity(dto);
		userRepository.save(userEntity);

		return SignUpResponseDto.success();
	}

	@Override
	public ResponseEntity<? super LoginResponseDto> login(LoginRequestDto dto) {

		// JwtAuthenticationFilter 에서 redis까서 value 가 logouted 인지 확인하기 (블랙리스트 확인)

		UserEntity userEntity = userRepository.findByUserId(dto.getUserId());

		// 아이디 없음
		if(userEntity == null) return LoginResponseDto.loginFail();

		int userSeq = userEntity.getUserSeq();
		String userName = userEntity.getUserName();
		String sex = userEntity.getSex();
		int birth = userEntity.getBirth();
		String userId = userEntity.getUserId();
		String userPassword = userEntity.getUserPassword();

		// 비밀번호 불일치
		if(!(dto.getUserPassword().equals(userPassword))) return LoginResponseDto.loginFail();

		// 토큰 만들어서 반환, 헤더에 실어주기
		String accessToken = jwtProvider.createToken(userSeq,userName,sex,birth,userId,30, ChronoUnit.DAYS);
		String refreshToken = jwtProvider.createToken(userSeq,userName,sex,birth,userId,30, ChronoUnit.DAYS);

		// redis 에 (refreshToken , userSeq) 저장
		ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
		valueOperations.set(refreshToken, userId);

		return LoginResponseDto.loginSuccess(accessToken, refreshToken);
	}

	@Override
	public ResponseEntity<? super LogoutResponseDto> logout(LogoutRequestDto dto) {
		// redis 에서 refreshToken 있는지 확인함 -> 날리고, accessToken 으로 블랙리스트 처리
		ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

		if(valueOperations.get(dto.getRefreshToken()) != null){
			redisTemplate.delete(dto.getRefreshToken());
			valueOperations.set(dto.getAccessToken(),"loggouted");
		}

		return LogoutResponseDto.success();
	}

	@Override
	public ResponseEntity<? super IdCheckResponseDto> idCheck(IdCheckRequestDto dto) {
		try{

			UserEntity userEntity = userRepository.findByUserId(dto.getUserId());
			if(userEntity != null) return IdCheckResponseDto.duplicateId();

		}catch (Exception e){
			logger.debug(e);
		}

		return IdCheckResponseDto.success();
	}

	@Override
	public ResponseEntity<? super FCMTokenResponseDto> savedFcmToken(FCMTokenRequestDto dto) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

		String userId = customUserDetails.getUserId();

		UserEntity userEntity = userRepository.findByUserId(userId);

		userEntity.setFcmToken(dto.getFcmToken());

		userRepository.save(userEntity);

		return FCMTokenResponseDto.success();
	}


}
