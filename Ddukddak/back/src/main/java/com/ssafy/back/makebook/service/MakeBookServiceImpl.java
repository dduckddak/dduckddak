package com.ssafy.back.makebook.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectsRequest;
import com.amazonaws.services.s3.model.ListObjectsV2Request;
import com.amazonaws.services.s3.model.ListObjectsV2Result;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.ssafy.back.book.repository.BookRepository;
import com.ssafy.back.common.ResponseDto;
import com.ssafy.back.common.ResponseMessage;
import com.ssafy.back.entity.MakeBookEntity;
import com.ssafy.back.makebook.dto.MakeBookDto;
import com.ssafy.back.makebook.dto.MakeBookPageDto;
import com.ssafy.back.makebook.dto.MakeBookScriptDto;
import com.ssafy.back.makebook.dto.MakeBookSummaryDto;
import com.ssafy.back.makebook.dto.ScriptDto;
import com.ssafy.back.makebook.dto.request.DeleteMakeBookRequestDto;
import com.ssafy.back.makebook.dto.request.InsertMakeBookRequestDto;
import com.ssafy.back.makebook.dto.response.DeleteMakeBookResponseDto;
import com.ssafy.back.makebook.dto.response.DetailMakeBookResponseDto;
import com.ssafy.back.makebook.dto.response.InsertMakeBookResponseDto;
import com.ssafy.back.makebook.dto.response.ListMakeBookResponseDto;
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
	public ResponseEntity<? super ListMakeBookResponseDto> listMakeBook() {
		//테스트 코드
		int userSeq = 1;

		List<MakeBookSummaryDto> makeBookList = makeBookRepository.findSummaryByUserSeq(userSeq);

		for (MakeBookSummaryDto summary : makeBookList) {
			String key = MakeKeyUtil.makePageImage(userSeq, summary.getMakeBookId(), 0);
			if (amazonS3.doesObjectExist(bucket, key)) {
				summary.setMakeBookCover(amazonS3.getUrl(bucket, key).toString());

				logger.info(summary.getMakeBookId() + " 커버 이미지를 정상적으로 불러왔습니다.");

			} else {
				logger.debug(ResponseMessage.S3_ERROR);
				logger.error("S3에서 파일을 찾을 수 없습니다.");

				return ListMakeBookResponseDto.S3error();
			}
		}

		return ListMakeBookResponseDto.success(makeBookList);
	}

	@Override
	public ResponseEntity<? super DetailMakeBookResponseDto> detailMakeBook(int makeBookId) {
		//테스트 코드
		int userSeq = 1;

		List<MakeBookPageDto> bookDetail = new ArrayList<>();
		MakeBookDto makeBookDto = makeBookRepository.findDetailByMakeBookId(makeBookId);
		try {
			//페이지별 상세 정보 추가
			for (int i = 1; i <= makeBookDto.getBookPage(); i++) {
				MakeBookPageDto makeBookPage = new MakeBookPageDto();

				//페이지 이미지 경로
				makeBookPage.setPageImage(
					amazonS3.getUrl(bucket, MakeKeyUtil.makePageImage(userSeq, makeBookDto.getBookId(), i)).toString());

				//스크립트별 상세 정보 추가
				List<MakeBookScriptDto> pageDetail = new ArrayList<>();
				int scriptCount = scriptRepository.findScriptCount(makeBookDto.getBookId(), i);

				for (int j = 1; j <= scriptCount; j++) {
					MakeBookScriptDto makeBookScript = new MakeBookScriptDto();
					ScriptDto script = scriptRepository.findByScriptId(makeBookDto.getBookId(), i, j);

					makeBookScript.setScriptContent(script.getScriptContent());

					//스크립트의 음성이 기본 목소리로 고정인 경우
					if (script.getRole() == null) {
						makeBookScript.setScriptSound(
							amazonS3.getUrl(bucket, MakeKeyUtil.bookScriptSound(makeBookDto.getBookId(), i, j))
								.toString());

					} else {//역할이 있는 경우
						if (script.getRole().equals("M")) {
							//음성이 설정되어 있는 경우
							if (makeBookDto.isMainVoice())
								makeBookScript.setScriptSound(
									amazonS3.getUrl(bucket, MakeKeyUtil.makeScriptSound(userSeq, makeBookId, i, j))
										.toString());
						}

						if (script.getRole().equals("S")) {
							if (makeBookDto.isSubVoice())
								makeBookScript.setScriptSound(
									amazonS3.getUrl(bucket, MakeKeyUtil.makeScriptSound(userSeq, makeBookId, i, j))
										.toString());
						}

						if (script.getRole().equals("N")) {
							if (makeBookDto.isNarration())
								makeBookScript.setScriptSound(
									amazonS3.getUrl(bucket, MakeKeyUtil.makeScriptSound(userSeq, makeBookId, i, j))
										.toString());
						}

						//역할별 음성 교체가 가능하지만 설정하지 않은 경우
						if (makeBookScript.getScriptSound() == null) {
							makeBookScript.setScriptSound(
								amazonS3.getUrl(bucket, MakeKeyUtil.bookScriptSound(makeBookDto.getBookId(), i, j))
									.toString());
						}
					}

					pageDetail.add(makeBookScript);
				}
				makeBookPage.setPageDetail(pageDetail);

				bookDetail.add(makeBookPage);
			}
			return DetailMakeBookResponseDto.success(bookDetail);
			
		} catch (Exception e) {
			logger.debug(ResponseMessage.DATABASE_ERROR);
			logger.error(e);

			return ResponseDto.databaseError();
		}
	}

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

				String key = MakeKeyUtil.makeScriptSound(userSeq, makeBookId, page, script);

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

	@Override
	public ResponseEntity<? super DeleteMakeBookResponseDto> deleteMakeBook(DeleteMakeBookRequestDto request) {
		//test코드(user지정)
		int userSeq = 1;

		//S3에서 생성 동화 폴더 삭제
		try {
			for (Integer makeBookId : request.getDeleteMakeBookIds()) {
				String key = MakeKeyUtil.makeBook(userSeq, makeBookId);

				ListObjectsV2Request listObjectsV2Request = new ListObjectsV2Request()
					.withBucketName(bucket)
					.withPrefix(key);

				ListObjectsV2Result result;

				do {
					result = amazonS3.listObjectsV2(listObjectsV2Request);

					if (result.getObjectSummaries().isEmpty()) {
						//해당 생성 동화의 폴더가 S3에 없다면
						if (!amazonS3.doesObjectExist(bucket, key))
							throw new Exception("폴더 없음");
					}

					// 삭제할 객체들의 키 목록 생성
					List<DeleteObjectsRequest.KeyVersion> keysToDelete = new ArrayList<>();

					result.getObjectSummaries().forEach(objectSummary -> {
						keysToDelete.add(new DeleteObjectsRequest.KeyVersion(objectSummary.getKey()));
					});

					// 객체들을 삭제
					if (!keysToDelete.isEmpty()) {
						DeleteObjectsRequest multiObjectDeleteRequest = new DeleteObjectsRequest(bucket)
							.withKeys(keysToDelete)
							.withQuiet(true);
						amazonS3.deleteObjects(multiObjectDeleteRequest);
					}

					// 다음 페이지의 객체들을 가져오기 위한 연속 토큰을 설정
					listObjectsV2Request.setContinuationToken(result.getNextContinuationToken());

				} while (result.isTruncated());

				logger.info(makeBookId + " : S3 삭제 완료");
			}

		} catch (Exception e) {
			logger.debug(ResponseMessage.S3_ERROR);
			logger.error(e);

			return DeleteMakeBookResponseDto.S3error();
		}

		makeBookRepository.deleteAllById(request.getDeleteMakeBookIds());

		return ResponseDto.success();
	}
}
