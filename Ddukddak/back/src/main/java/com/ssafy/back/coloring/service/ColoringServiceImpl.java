package com.ssafy.back.coloring.service;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ListObjectsV2Request;
import com.amazonaws.services.s3.model.ListObjectsV2Result;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.ssafy.back.auth.dto.CustomUserDetails;
import com.ssafy.back.coloring.dto.ColoringDto;
import com.ssafy.back.coloring.dto.request.DeleteColoringRequestDto;
import com.ssafy.back.coloring.dto.request.InsertColoringRequestDto;
import com.ssafy.back.coloring.dto.response.DeleteColoringResponseDto;
import com.ssafy.back.coloring.dto.response.InsertColoringResponseDto;
import com.ssafy.back.coloring.dto.response.ListColoringBaseResponseDto;
import com.ssafy.back.coloring.dto.response.ListColoringResponseDto;
import com.ssafy.back.coloring.repository.ColoringRepository;
import com.ssafy.back.common.ResponseDto;
import com.ssafy.back.common.ResponseMessage;
import com.ssafy.back.entity.ColoringEntity;
import com.ssafy.back.entity.UserEntity;
import com.ssafy.back.util.MakeKeyUtil;

import lombok.RequiredArgsConstructor;

@Transactional
@Service
@RequiredArgsConstructor
public class ColoringServiceImpl implements ColoringService {
	private final Logger logger = LogManager.getLogger(ColoringServiceImpl.class);

	private final ColoringRepository coloringRepository;

	private final AmazonS3 amazonS3;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	@Override
	public ResponseEntity<? super ListColoringResponseDto> listColoring() {
		//유저 정보 확인
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails customUserDetails = (CustomUserDetails)authentication.getPrincipal();

		int userSeq = customUserDetails.getUserSeq();

		List<ColoringDto> coloringList = coloringRepository.findByUserEntity_UserSeq(userSeq);
		for (ColoringDto coloring : coloringList) {
			String key = MakeKeyUtil.coloring(userSeq, coloring.getColoringId());

			if (amazonS3.doesObjectExist(bucket, key)) {
				coloring.setColoringFile(amazonS3.getUrl(bucket, key).toString());

				logger.info(coloring.getColoringId() + " 경로 : " + coloring.getColoringFile());

			} else {
				logger.debug(ResponseMessage.S3_ERROR);
				logger.error("S3에서 파일을 찾을 수 없습니다.");

				return ListColoringResponseDto.S3error();
			}
		}

		logger.info(userSeq + " 색칠 그림 리스트 : " + coloringList);

		return ListColoringResponseDto.success(coloringList);
	}

	@Override
	public ResponseEntity<? super InsertColoringResponseDto> insertVoice(InsertColoringRequestDto request) {
		//유저 정보 확인
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails customUserDetails = (CustomUserDetails)authentication.getPrincipal();

		int userSeq = customUserDetails.getUserSeq();

		ColoringEntity coloringEntity = new ColoringEntity();
		coloringEntity.setUserEntity(new UserEntity());
		coloringEntity.getUserEntity().setUserSeq(userSeq);

		int coloringId = coloringRepository.save(coloringEntity).getColoringId();
		String key = MakeKeyUtil.coloring(userSeq, coloringId);

		// S3에 색칠 그림 추가
		try (InputStream inputStream = request.getColoringFile().getInputStream()) {
			ObjectMetadata metadata = new ObjectMetadata();
			metadata.setContentLength(inputStream.available());
			metadata.setContentType("image/jpeg");

			amazonS3.putObject(bucket, key, inputStream, metadata);

			logger.info(coloringId + " " + key + " 색칠 그림 S3 저장");

			return ResponseDto.success();

		} catch (Exception e) {
			logger.debug(ResponseMessage.S3_ERROR);
			logger.error(e);

			return InsertColoringResponseDto.S3error();
		}
	}

	@Override
	public ResponseEntity<? super DeleteColoringResponseDto> deleteVoice(DeleteColoringRequestDto request) {
		//유저 정보 확인
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails customUserDetails = (CustomUserDetails)authentication.getPrincipal();

		int userSeq = customUserDetails.getUserSeq();

		//DB에서 지우기
		coloringRepository.deleteAllById(request.getDeleteColoringIds());

		logger.info(request.getDeleteColoringIds() + " 삭제 완료");

		//S3에서 색칠 그림 삭제
		try {
			request.getDeleteColoringIds().forEach(coloringId -> {
				String key = MakeKeyUtil.coloring(userSeq, coloringId);
				DeleteObjectRequest s3request = new DeleteObjectRequest(bucket, key);
				amazonS3.deleteObject(s3request);

				logger.info(key + " S3 삭제 완료");
			});
		} catch (Exception e) {
			logger.debug(ResponseMessage.S3_ERROR);
			logger.error(e);

			DeleteColoringResponseDto.S3error();
		}
		return ResponseDto.success();
	}

	@Override
	public ResponseEntity<? super ListColoringBaseResponseDto> listColoringBase() {
		try {
			//S3로 coloring 폴더 안의 파일 목록 요청
			ListObjectsV2Request request = new ListObjectsV2Request()
				.withBucketName(bucket)
				.withPrefix("coloring/");

			ListObjectsV2Result result = amazonS3.listObjectsV2(request);
			List<S3ObjectSummary> objects = result.getObjectSummaries();

			List<String> coloringBaseList = new ArrayList<>();
			objects.forEach(object -> {
				coloringBaseList.add(amazonS3.getUrl(bucket, object.getKey()).toString());
			});

			//폴더 객체는 제외
			coloringBaseList.remove(0);

			return ListColoringBaseResponseDto.success(coloringBaseList);

		} catch (Exception e) {
			logger.debug(ResponseMessage.S3_ERROR);
			logger.error(e);

			return ListColoringBaseResponseDto.S3error();
		}
	}
}
