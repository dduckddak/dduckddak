package com.ssafy.back.makebook.service;

import java.io.IOException;
import java.io.InputStream;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.ssafy.back.book.repository.BookRepository;
import com.ssafy.back.common.ResponseDto;
import com.ssafy.back.common.ResponseMessage;
import com.ssafy.back.entity.MakeBookEntity;
import com.ssafy.back.makebook.dto.ScriptDto;
import com.ssafy.back.makebook.dto.request.InsertMakeBookRequestDto;
import com.ssafy.back.makebook.dto.response.InsertMakeBookResponseDto;
import com.ssafy.back.makebook.repository.MakeBookRepository;
import com.ssafy.back.makebook.repository.ScriptRepository;
import com.ssafy.back.util.MakeKeyUtil;
import com.ssafy.back.voice.repository.VoiceRepository;

import lombok.RequiredArgsConstructor;

@Transactional
@Service
@RequiredArgsConstructor
public class MakeBookServiceImpl implements MakeBookService {
	private final Logger logger = LogManager.getLogger(MakeBookServiceImpl.class);

	private final MakeBookRepository makeBookRepository;

	private final BookRepository bookRepository;

	private final ScriptRepository scriptRepository;

	private final VoiceRepository voiceRepository;

	private final AmazonS3 amazonS3;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	@Value("${eleven-labs.key}")
	private String elevenLabsKey;

	@Override
	public ResponseEntity<? super InsertMakeBookResponseDto> insertMakeBook(InsertMakeBookRequestDto request) {
		//test
		int userSeq = 1;

		MakeBookEntity makeBookEntity = new MakeBookEntity(request.getBookId(), userSeq, request.getMakeBookTitle());

		//목소리 설정 여부 확인하고 설정했다면 목소리 모델 키를 가져옴
		Integer mainVoice = request.getMainVoice();
		Integer subVoice = request.getSubVoice();
		Integer narration = request.getNarration();

		String mainVoiceModelId = null;
		String subVoiceModelId = null;
		String narrationModelId = null;
		String voiceModelId = null;

		if (mainVoice != null) {
			makeBookEntity.setMainVoice(true);
			mainVoiceModelId = voiceRepository.findVoiceModelIdByVoiceId(mainVoice);
		}

		if (subVoice != null) {
			makeBookEntity.setSubVoice(true);
			subVoiceModelId = voiceRepository.findVoiceModelIdByVoiceId(subVoice);
		}

		if (narration != null) {
			makeBookEntity.setNarration(true);
			narrationModelId = voiceRepository.findVoiceModelIdByVoiceId(narration);
		}

		makeBookRepository.save(makeBookEntity);
		int makeBookId = makeBookEntity.getMakeBookId();

		logger.info(userSeq + " 책 생성 : " + makeBookId + " " + makeBookEntity.getMakeBookTitle());

		int bookPage = bookRepository.findBookPage(request.getBookId());
		//사진 처리
		// {
		//
		// }

		//음성 파일 처리
		for (int page = 1; page <= bookPage; page++) {
			int scriptCount = scriptRepository.findScriptCount(request.getBookId(), page);

			for (int script = 1; script <= scriptCount; script++) {
				ScriptDto scriptDto = scriptRepository.findByScriptId(request.getBookId(), page, script);

				//목소리를 바꿀 역할이 지정되지 않은 경우
				if (scriptDto.getRole() == null)
					continue;

				//역할별 목소리를 설정
				if (scriptDto.getRole().equals("M")) {
					if (!makeBookEntity.isMainVoice())
						continue;
					voiceModelId = mainVoiceModelId;
				}

				if (scriptDto.getRole().equals("S")) {
					if (!makeBookEntity.isSubVoice())
						continue;
					voiceModelId = subVoiceModelId;
				}

				if (scriptDto.getRole().equals("N")) {
					if (!makeBookEntity.isNarration())
						continue;
					voiceModelId = narrationModelId;
				}

				//사용자가 설정한 목소리를 이용해 스크립트 음성 생성
				InputStream inputStream = null;

				try {
					Gson gson = new Gson();
					JsonObject json = new JsonObject();
					json.addProperty("model_id", "eleven_multilingual_v2");
					json.addProperty("text", scriptDto.getScriptContent());

					HttpResponse<InputStream> preview = Unirest.post(
							"https://api.elevenlabs.io/v1/text-to-speech/" + voiceModelId)
						.header("xi-api-key", elevenLabsKey)
						.header("Content-Type", "application/json")
						.header("Accept", "audio/mpeg")
						.body(gson.toJson(json))
						.asBinary();

					inputStream = preview.getBody();

					logger.info(makeBookId + " : " + page + "-" + script + " 음성 생성");

				} catch (Exception e) {
					logger.debug(ResponseMessage.ELEVENLABS_ERROR);
					logger.error(e);

					try {
						if (inputStream != null)
							inputStream.close();
					} catch (IOException ex) {
						logger.error(ex);
					}

					return InsertMakeBookResponseDto.ElevenLabserror();
				}

				String key = MakeKeyUtil.scriptSound(userSeq, makeBookId, page, script);

				// S3에 생성된 음성 추가
				try {
					ObjectMetadata metadata = new ObjectMetadata();
					metadata.setContentLength(inputStream.available());
					metadata.setContentType("audio/mpeg");

					amazonS3.putObject(bucket, key, inputStream, metadata);

					logger.info(key + " : 음성 S3 저장");

				} catch (Exception e) {
					logger.debug(ResponseMessage.S3_ERROR);
					logger.error(e);

					return InsertMakeBookResponseDto.S3error();

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
		return ResponseDto.success();
	}
}
