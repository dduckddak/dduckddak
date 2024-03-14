package com.ssafy.back.voice.service;

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
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.ssafy.back.common.ResponseDto;
import com.ssafy.back.common.ResponseMessage;
import com.ssafy.back.entity.UserEntity;
import com.ssafy.back.entity.VoiceEntity;
import com.ssafy.back.util.MakeKeyUtil;
import com.ssafy.back.voice.dto.VoiceDto;
import com.ssafy.back.voice.dto.request.DeleteVoiceRequestDto;
import com.ssafy.back.voice.dto.request.InsertVoiceRequestDto;
import com.ssafy.back.voice.dto.response.DeleteVoiceResponseDto;
import com.ssafy.back.voice.dto.response.InsertVoiceResponseDto;
import com.ssafy.back.voice.dto.response.ListVoiceResponseDto;
import com.ssafy.back.voice.dto.response.PreviewVoiceResponseDto;
import com.ssafy.back.voice.repository.VoiceRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VoiceServiceImpl implements VoiceService {
	private final Logger logger = LogManager.getLogger(VoiceServiceImpl.class);

	private final VoiceRepository voiceRepository;

	private final AmazonS3 amazonS3;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	@Value("${eleven-labs.key}")
	private String elevenLabsKey;

	@Override
	@Transactional
	public ResponseEntity<? super ListVoiceResponseDto> listVoice() {
		//로그인 토큰 유효성 확인
		// Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		// if (authentication == null || !(authentication.getPrincipal() instanceof LoginUserDto)) {
		// 	return ResponseDto.jwtTokenFail();
		// }
		// LoginUserDto loginUser = (LoginUserDto)authentication.getPrincipal();
		// int userSeq =loginUser.getUserSeq();

		//테스트 코드
		int userSeq = 1;

		List<VoiceDto> voiceList = voiceRepository.findByUserEntity_UserSeq(userSeq);

		logger.info(userSeq + " 유저 목소리 리스트 : " + voiceList);
		return ListVoiceResponseDto.success(voiceList);
	}

	@Override
	@Transactional
	public ResponseEntity<? super InsertVoiceResponseDto> insertVoice(InsertVoiceRequestDto request) {
		VoiceEntity voiceEntity = new VoiceEntity();
		voiceEntity.setVoiceName(request.getVoiceName());

		//test코드(user지정)
		voiceEntity.setUserEntity(new UserEntity());
		voiceEntity.getUserEntity().setUserSeq(1);

		//미리듣기 음성 저장
		InputStream inputStream;

		try {
			//목소리를 ElevenLabs에 추가하고 voice_id를 얻어옴
			HttpResponse<String> response = Unirest.post("https://api.elevenlabs.io/v1/voices/add")
				.header("xi-api-key", elevenLabsKey)
				.field("files", request.getVoiceFile().getInputStream(), request.getVoiceFile().getOriginalFilename())
				.field("name", voiceEntity.getVoiceName())
				.asString();

			JsonObject json = JsonParser.parseString(response.getBody()).getAsJsonObject();
			String voiceModelId = json.get("voice_id").getAsString();

			voiceEntity.setVoiceModelId(voiceModelId);

			logger.info(voiceEntity.getVoiceName() + " 추가 : " + voiceModelId);

			//학습된 목소리를 이용해 미리듣기 음성 생성
			Gson gson = new Gson();
			json = new JsonObject();
			json.addProperty("model_id", "eleven_multilingual_v2");
			json.addProperty("text", "안녕하세요 테스트 중입니다.");

			HttpResponse<InputStream> preview = Unirest.post(
					"https://api.elevenlabs.io/v1/text-to-speech/" + voiceModelId)
				.header("xi-api-key", elevenLabsKey)
				.header("Content-Type", "application/json")
				.header("Accept", "audio/mpeg")
				.body(gson.toJson(json))
				.asBinary();

			inputStream = preview.getBody();

			logger.info(voiceEntity.getVoiceName() + " 미리듣기 음성 생성");

		} catch (Exception e) {
			logger.error(ResponseMessage.ELEVENLABS_ERROR);
			logger.debug(e);

			return InsertVoiceResponseDto.ElevenLabserror();
		}

		int voiceId = voiceRepository.save(voiceEntity).getVoiceId();
		String key = MakeKeyUtil.voice(voiceId);

		// S3에 미리듣기 추가
		try {
			ObjectMetadata metadata = new ObjectMetadata();
			metadata.setContentLength(inputStream.available());
			metadata.setContentType("audio/mpeg");

			amazonS3.putObject(bucket, key, inputStream, metadata);

			logger.info(voiceEntity.getVoiceName() + " " + key + " 미리듣기 음성 S3 저장");

		} catch (Exception e) {
			logger.error(ResponseMessage.S3_ERROR);
			logger.debug(e);

			return InsertVoiceResponseDto.S3error();
		}

		return ResponseDto.success();
	}

	@Override
	@Transactional
	public ResponseEntity<? super DeleteVoiceResponseDto> deleteVoice(DeleteVoiceRequestDto request) {
		//ElevenLabs에서 목소리 삭제
		try {
			for (Integer voiceId : request.getVoiceIds()) {
				String voiceModelId = voiceRepository.findVoiceModelIdByVoiceId(voiceId);
				Unirest.delete("https://api.elevenlabs.io/v1/voices/" + voiceModelId)
					.header("xi-api-key", elevenLabsKey)
					.asString();

				logger.info(voiceId + "-" + voiceModelId + "ElevenLabs 삭제 완료");
			}
		} catch (Exception e) {
			logger.error(ResponseMessage.ELEVENLABS_ERROR);
			logger.debug(e);

			return DeleteVoiceResponseDto.ElevenLabserror();
		}

		//DB에서 지우기
		voiceRepository.deleteAllById(request.getVoiceIds());

		logger.info(request.getVoiceIds() + " 삭제 완료");

		//S3에서 미리 듣기 음성 삭제
		try {
			request.getVoiceIds().forEach(voiceId -> {
				String key = MakeKeyUtil.voice(voiceId);
				DeleteObjectRequest s3request = new DeleteObjectRequest(bucket, key);
				amazonS3.deleteObject(s3request);

				logger.info(key + " S3 삭제 완료");
			});
		} catch (Exception e) {
			logger.error(ResponseMessage.S3_ERROR);
			logger.debug(e);

			DeleteVoiceResponseDto.S3error();
		}
		return ResponseDto.success();
	}

	@Override
	public ResponseEntity<? super PreviewVoiceResponseDto> previewVoice(int voiceId) {
		try {
			String key = MakeKeyUtil.voice(voiceId);
			String previewFile = amazonS3.getUrl(bucket, key).toString();

			logger.info(voiceId + " 미리듣기 음성 : " + previewFile);

			return PreviewVoiceResponseDto.success(previewFile);

		} catch (Exception e) {
			logger.error(ResponseMessage.S3_ERROR);
			logger.debug(e);

			return PreviewVoiceResponseDto.S3error();
		}
	}
}