package com.ssafy.back.coloring.service;

import java.io.InputStream;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.back.coloring.dto.ColoringDto;
import com.ssafy.back.coloring.dto.request.DeleteColoringRequestDto;
import com.ssafy.back.coloring.dto.request.InsertColoringRequestDto;
import com.ssafy.back.coloring.dto.response.DeleteColoringResponseDto;
import com.ssafy.back.coloring.dto.response.InsertColoringResponseDto;
import com.ssafy.back.coloring.dto.response.ListColoringResponseDto;
import com.ssafy.back.coloring.repository.ColoringRepository;
import com.ssafy.back.common.ResponseDto;
import com.ssafy.back.common.ResponseMessage;
import com.ssafy.back.entity.ColoringEntity;
import com.ssafy.back.entity.UserEntity;
import com.ssafy.back.util.MakeKeyUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ColoringServiceImpl implements ColoringService {
	private final Logger logger = LogManager.getLogger(ColoringServiceImpl.class);

	private final ColoringRepository coloringRepository;

	private final AmazonS3 amazonS3;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	@Override
	@Transactional
	public ResponseEntity<? super ListColoringResponseDto> listColoring() {
		//로그인 토큰 유효성 확인
		// Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		// if (authentication == null || !(authentication.getPrincipal() instanceof LoginUserDto)) {
		// 	return ResponseDto.jwtTokenFail();
		// }
		// LoginUserDto loginUser = (LoginUserDto)authentication.getPrincipal();
		// int userSeq =loginUser.getUserSeq();

		//테스트 코드
		int userSeq = 1;
		try {
			List<ColoringDto> coloringList = coloringRepository.findByUserEntity_UserSeq(userSeq);
			coloringList.forEach(coloring -> {
				String key = MakeKeyUtil.coloring(coloring.getColoringId());
				coloring.setColoringFile(amazonS3.getUrl(bucket, key).toString());

				logger.info(coloring.getColoringId() + " 경로 : " + coloring.getColoringFile());
			});
			logger.info(coloringList);

			return ListColoringResponseDto.success(coloringList);

		} catch (Exception e) {
			logger.info(ResponseMessage.S3_ERROR);
			logger.debug(e);

			return ListColoringResponseDto.S3error();
		}
	}

	@Override
	@Transactional
	public ResponseEntity<? super InsertColoringResponseDto> insertVoice(InsertColoringRequestDto request) {
		ColoringEntity coloringEntity = new ColoringEntity();

		//test코드(user지정)
		coloringEntity.setUserEntity(new UserEntity());
		coloringEntity.getUserEntity().setUserSeq(1);

		int coloringId = coloringRepository.save(coloringEntity).getColoringId();
		String key = MakeKeyUtil.coloring(coloringId);

		// S3에 색칠 그림 추가
		try {
			InputStream inputStream = request.getColoringFile().getInputStream();

			ObjectMetadata metadata = new ObjectMetadata();
			metadata.setContentLength(inputStream.available());
			metadata.setContentType("image/jpeg");

			amazonS3.putObject(bucket, key, inputStream, metadata);

			logger.info(coloringId + " " + key + " 색칠 그림 S3 저장");

		} catch (Exception e) {
			logger.error(ResponseMessage.S3_ERROR);
			logger.debug(e);

			return InsertColoringResponseDto.S3error();
		}

		return ResponseDto.success();
	}

	@Override
	@Transactional
	public ResponseEntity<? super DeleteColoringResponseDto> deleteVoice(DeleteColoringRequestDto request) {
		//DB에서 지우기
		coloringRepository.deleteAllById(request.getColoringIds());

		logger.info(request.getColoringIds() + " 삭제 완료");

		//S3에서 색칠 그림 삭제
		try {
			request.getColoringIds().forEach(coloringId -> {
				String key = MakeKeyUtil.coloring(coloringId);
				DeleteObjectRequest s3request = new DeleteObjectRequest(bucket, key);
				amazonS3.deleteObject(s3request);

				logger.info(key + " S3 삭제 완료");
			});
		} catch (Exception e) {
			logger.error(ResponseMessage.S3_ERROR);
			logger.debug(e);

			DeleteColoringResponseDto.S3error();
		}
		return ResponseDto.success();
	}
}
