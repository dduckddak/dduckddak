package com.ssafy.back.talk.service;

import java.io.IOException;
import java.io.InputStream;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.amazonaws.services.s3.AmazonS3;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.ssafy.back.auth.dto.CustomUserDetails;
import com.ssafy.back.common.ResponseDto;
import com.ssafy.back.common.ResponseMessage;
import com.ssafy.back.talk.dto.request.SttRequestDto;
import com.ssafy.back.talk.dto.request.TalkRequestDto;
import com.ssafy.back.talk.dto.response.StartTalkResponseDto;
import com.ssafy.back.talk.dto.response.SttResponseDto;
import com.ssafy.back.talk.dto.response.TalkResponseDto;
import com.ssafy.back.talk.repository.TalkRepository;
import com.ssafy.back.util.AssistantAPI;
import com.ssafy.back.util.MakeKeyUtil;

import lombok.RequiredArgsConstructor;

@Transactional
@Service
@RequiredArgsConstructor
public class TalkServiceImpl implements TalkService {
	private final Logger logger = LogManager.getLogger(TalkServiceImpl.class);

	private final TalkRepository talkRepository;

	private final RedisTemplate<String, String> redisTemplate;

	// 책이름을 가져오기 위해
	// private final BookRepository bookRepository;

	private final AmazonS3 amazonS3;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	@Value("${fast-api.url}")
	private String FastapiURL;

	@Value("${eleven-labs.key}")
	private String elevenLabsKey;

	@Value("${open-ai.key}")
	private String openAIKey;

	@Override
	public ResponseEntity<? super StartTalkResponseDto> startTalk(int bookId) {
		String subName = talkRepository.findPersonName_bookId(bookId);

		//찾는 값이 없는 경우
		if (subName == null) {
			logger.debug(bookId + " : " + ResponseMessage.DATABASE_ERROR);

			return ResponseDto.databaseError();
		}

		String basicKey = MakeKeyUtil.subBasic(bookId);
		String talkKey = MakeKeyUtil.subTalk(bookId);

		if (amazonS3.doesObjectExist(bucket, basicKey) && amazonS3.doesObjectExist(bucket, talkKey)) {
			String subBasic = amazonS3.getUrl(bucket, basicKey).toString();
			String subTalk = amazonS3.getUrl(bucket, talkKey).toString();

			logger.info(bookId + " :\n"
				+ "역할 이름 - " + subName + "\n"
				+ "기본 이미지 경로 - " + subBasic + "\n"
				+ "대화 이미지 경로 - " + subTalk);

			return StartTalkResponseDto.success(subName, subBasic, subTalk);
		} else {
			logger.debug(ResponseMessage.S3_ERROR);
			logger.error("S3에서 파일을 찾을 수 없습니다.");

			return StartTalkResponseDto.S3error();
		}
	}

	@Override
	public ResponseEntity<? super SttResponseDto> stt(SttRequestDto request) {
		//FastAPI로 요청을 보내고 사용자의 말을 받아옴
		try (InputStream inputStream = request.getTalkFile().getInputStream()) {
			HttpResponse<String> response = Unirest.post(FastapiURL + "/api/v1/f/stt")
				.field("file", inputStream, request.getTalkFile().getOriginalFilename())
				.asString();

			JsonObject json = JsonParser.parseString(response.getBody()).getAsJsonObject();
			String results = json.get("result").getAsString();
			if (!results.isEmpty()) {
				logger.info("사용자의 말 : " + results);

				return SttResponseDto.success(results);

			} else {
				logger.info("빈 오디오 파일");

				return SttResponseDto.success("");
			}
		} catch (Exception e) {
			logger.debug(ResponseMessage.FASTAPI_ERROR);
			logger.error(e);

			return SttResponseDto.FastAPIerror();
		}
	}

	@Override
	public ResponseEntity<? super TalkResponseDto> talk(TalkRequestDto request) {
		//유저 정보 확인
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails customUserDetails = (CustomUserDetails)authentication.getPrincipal();

		int userSeq = customUserDetails.getUserSeq();

		//gpt 답변 생성
		String gptScript;

		//사용자의 기존 쓰레드 정보를 레디스를 통해 얻어오고 없다면 생성해서 레디스에 저장
		String threadKey = String.valueOf(userSeq) + "-" + String.valueOf(request.getBookId());
		ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

		String threadId = valueOperations.get(threadKey);

		if (threadId == null) {
			threadId = AssistantAPI.createThread(openAIKey);
			valueOperations.set(String.valueOf(threadKey), threadId);
		}

		try {
			AssistantAPI.sendMessage(openAIKey, threadId, request.getUserScript());
			String runId = AssistantAPI.createRun(openAIKey, threadId, request.getBookId());

			//답변 생성이 완료될 때 메시지를 얻는 요청을 함
			while (true) {
				if (AssistantAPI.checkRun(openAIKey, threadId, runId).equals("completed"))
					break;

				java.lang.Thread.sleep(200);
			}

			gptScript = AssistantAPI.getMessage(openAIKey, threadId);

			logger.info("Gpt 답변 : " + gptScript);

		} catch (Exception e) {
			logger.debug(ResponseMessage.GPT_ERROR);
			logger.error(e);

			return TalkResponseDto.Gpterror();
		}

		//gpt 답변으로 음성 생성
		InputStream inputStream = null;

		try {
			Gson gson = new Gson();
			JsonObject json = new JsonObject();
			json.addProperty("model_id", "eleven_multilingual_v2");
			json.addProperty("text", gptScript);

			//책에 맞는 등장인물의 목소리 모델을 찾음
			String voiceModelId = talkRepository.findVoiceModelId_bookId(request.getBookId());

			HttpResponse<InputStream> response = Unirest.post(
					"https://api.elevenlabs.io/v1/text-to-speech/" + voiceModelId)
				.header("xi-api-key", elevenLabsKey)
				.header("Content-Type", "application/json")
				.header("Accept", "audio/mp3")
				.body(gson.toJson(json))
				.asBinary();

			inputStream = response.getBody();

			// InputStream에서 byte 배열로 변환
			byte[] audioBytes = inputStream.readAllBytes();

			logger.info(request.getBookId() + " 음성 답변 생성");

			//byte 배열이 base64로 인코딩 후 String으로 response로 전달 됨
			return TalkResponseDto.success(gptScript, audioBytes);

		} catch (Exception e) {
			logger.debug(ResponseMessage.ELEVENLABS_ERROR);
			logger.error(e);

			return TalkResponseDto.ElevenLabserror();
		} finally {
			try {
				if (inputStream != null)
					inputStream.close();
			} catch (IOException ex) {
				logger.error(ex);
			}
		}
	}
}
