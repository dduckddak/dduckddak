package com.ssafy.back.photo.service;

import static com.ssafy.back.util.MakeKeyUtil.*;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
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
import com.ssafy.back.photo.dto.request.DeletePhotoRequestDto;
import com.ssafy.back.photo.dto.request.InsertPhotoRequestDto;
import com.ssafy.back.photo.dto.request.PhotoRequestDto;
import com.ssafy.back.photo.dto.response.DeletePhotoResponseDto;
import com.ssafy.back.photo.dto.response.InsertPhotoResponseDto;
import com.ssafy.back.photo.dto.response.ListPhotoResponseDto;
import com.ssafy.back.photo.dto.response.PhotoResponseDto;
import com.ssafy.back.photo.repository.PhotoRepository;
import com.ssafy.back.util.MakeKeyUtil;
import com.ssafy.back.voice.dto.response.InsertVoiceResponseDto;
import com.ssafy.back.voice.service.VoiceServiceImpl;

import lombok.RequiredArgsConstructor;
@Transactional
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

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

		int userSeq = customUserDetails.getUserSeq();

		try {
			MultipartFile photoFile = request.getPhotoFile();
			String photoBase64 = Base64.getEncoder().encodeToString(photoFile.getBytes());

			JsonObject bodyJson = new JsonObject();
			bodyJson.addProperty("userSeq", userSeq);
			//bodyJson.addProperty("photoId", savedPhotoEntity.getPhotoId());
			bodyJson.addProperty("photo", photoBase64); // Base64 인코딩된 이미지 데이터 추가

			String endpoint = fastApiUrl + "/api/v1/f/extract-face/";

			HttpResponse<String> response = Unirest.post(endpoint)
				.header("Content-Type", "application/json")
				.body(bodyJson.toString())
				.asString();

			// FastAPI로부터 받은 JSON 응답을 파싱
			JsonObject jsonResponse = JsonParser.parseString(response.getBody()).getAsJsonObject();
			System.out.println(jsonResponse);
			int status_code = jsonResponse.get("status_code").getAsInt();
			String message = jsonResponse.get("message").getAsString();

			if(status_code != 200) return InsertPhotoResponseDto.fastApierror(HttpStatus.NOT_FOUND, message);

		} catch (Exception e) {
			logger.error(ResponseMessage.UNIREST_ERROR);
			logger.debug("Error message", e);

			return InsertPhotoResponseDto.uniRestError();
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

		List<PhotoDto> photoResult = photoList.stream().map(photo -> {
			PhotoDto photoDto = new PhotoDto();
			String url = generatePublicUrl(bucket) + photo(photo.getUserEntity().getUserSeq(), photo.getPhotoId());

			photoDto.setPhotoId(photo.getPhotoId());
			photoDto.setPhotoFile(url);

			return photoDto;
		}).toList();

		return ListPhotoResponseDto.success(photoResult);
	}

	@Override
	public ResponseEntity<? super DeletePhotoResponseDto> deletePhoto(DeletePhotoRequestDto dto) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

		int userSeq = customUserDetails.getUserSeq();

		// userSeq의 사진인지 확인하는 과정 + list가 0이면 success 로 들어감.
		List<PhotoEntity> photosToDelete = photoRepository.findAllByPhotoIdIn(dto.getPhotoIds());
		for (PhotoEntity photo : photosToDelete) {
			if (!photo.getUserEntity().getUserSeq().equals(userSeq)) {
				// 만약 사진이 해당 사용자의 것이 아니라면, 오류 응답 반환
				return DeletePhotoResponseDto.NotFounderror();
			}
		}

		photoRepository.deleteAllById(dto.getPhotoIds());

		return DeletePhotoResponseDto.success();
	}
}
