package com.ssafy.back.photo.service;

import static com.ssafy.back.util.MakeKeyUtil.*;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.ssafy.back.auth.dto.CustomUserDetails;
import com.ssafy.back.auth.repository.UserRepository;
import com.ssafy.back.common.ResponseDto;
import com.ssafy.back.common.ResponseMessage;
import com.ssafy.back.entity.PhotoEntity;
import com.ssafy.back.entity.UserEntity;
import com.ssafy.back.entity.VoiceEntity;
import com.ssafy.back.photo.dto.PhotoDto;
import com.ssafy.back.photo.dto.request.InsertPhotoRequestDto;
import com.ssafy.back.photo.dto.request.PhotoRequestDto;
import com.ssafy.back.photo.dto.response.InsertPhotoResponseDto;
import com.ssafy.back.photo.dto.response.ListPhotoResponseDto;
import com.ssafy.back.photo.dto.response.PhotoResponseDto;
import com.ssafy.back.photo.repository.PhotoRepository;
import com.ssafy.back.util.MakeKeyUtil;
import com.ssafy.back.voice.dto.response.InsertVoiceResponseDto;
import com.ssafy.back.voice.service.VoiceServiceImpl;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PhotoServiceImpl implements PhotoService {

	private final Logger logger = LogManager.getLogger(VoiceServiceImpl.class);

	private final PhotoRepository photoRepository;
	private final UserRepository userRepository;

	private final AmazonS3 amazonS3;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	@Value("${fast-api.url}")
	private String fastApiUrl;

	@Override
	@Transactional
	public ResponseEntity<? super InsertPhotoResponseDto> insertPhoto(InsertPhotoRequestDto request) {

		// 1. 얼굴 먼저 디비, S3 에 저장
		// 2. 반환된 사진 id 로 fastapi 요청 ( fastapi 는 얼굴 인식해서 추출한 사진 저장함 )
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

		int userSeq = customUserDetails.getUserSeq();

		UserEntity userEntity = new UserEntity();
		userEntity.setUserSeq(userSeq);

		PhotoEntity photoEntity = new PhotoEntity();
		photoEntity.setUserEntity(userEntity);

		PhotoEntity savedPhotoEntity = photoRepository.save(photoEntity);

		try {
			String key = photo(userSeq, savedPhotoEntity.getPhotoId());

			MultipartFile photoFile = request.getPhotoFile();
			InputStream inputStream = photoFile.getInputStream();

			ObjectMetadata metadata = new ObjectMetadata();
			metadata.setContentLength(photoFile.getSize());
			metadata.setContentType(photoFile.getContentType());

			amazonS3.putObject(bucket, key, inputStream, metadata);

			inputStream.close();

		} catch (Exception e) {
			logger.error(ResponseMessage.S3_ERROR);
			logger.debug("Error message", e);

			return InsertPhotoResponseDto.S3error();
		}

		try {
			JsonObject bodyJson = new JsonObject();
			bodyJson.addProperty("userSeq", userSeq);
			bodyJson.addProperty("photoId", savedPhotoEntity.getPhotoId());

			String endpoint = fastApiUrl + "/api/v1/f/extract-face/";

			HttpResponse<String> response = Unirest.post(endpoint)
				.header("Content-Type", "application/json")
				.body(bodyJson.toString())
				.asString();

			// FastAPI로부터 받은 JSON 응답을 파싱
			JsonObject jsonResponse = JsonParser.parseString(response.getBody()).getAsJsonObject();

			boolean isSuccess = jsonResponse.get("result").getAsBoolean();

			logger.info("fastapi 로 부터 받은 값 : {}", isSuccess);

		} catch (Exception e) {
			logger.error(ResponseMessage.FastApi_ERROR);
			logger.debug("Error message", e);

			return InsertPhotoResponseDto.fastApierror();
		}

		return ResponseDto.success();

	}

	@Override
	public ResponseEntity<? super ListPhotoResponseDto> listPhoto() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

		String userId = customUserDetails.getUserId();
		UserEntity userEntity = userRepository.findByUserId(userId);

		List<PhotoEntity> photoList = photoRepository.findByUserEntity(userEntity);

		List<PhotoDto> photoResult = new ArrayList<>();
		photoList.stream().forEach(photo -> {
			PhotoDto photoDto = new PhotoDto();
			String url = generatePublicUrl(bucket) + photo(photo.getUserEntity().getUserSeq(), photo.getPhotoId());

			photoDto.setPhotoId(photo.getPhotoId());
			photoDto.setPhotoFile(url);

			photoResult.add(photoDto);
		});

		return ListPhotoResponseDto.success(photoResult);
	}
}
