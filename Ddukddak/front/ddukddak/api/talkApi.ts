import apiClient from './apiClient';
import { isAxiosError } from 'axios';

interface ApiResponse {
  message: string;
}


interface TalkDetailData {
  subName: string;
  subBasic: string;
  subTalk: string;
  welcomeComment: string;
  welcomeCommentSound: string;
}

type TalkDetailResponse = ApiResponse & TalkDetailData;

interface TalkSTTResponseData {
  userScript: string;
}

type TalkSTTResponse = ApiResponse & TalkSTTResponseData;

interface TalkParms {
  bookId: number;
  userScript: string;
}

interface TalkResponseData {
  gptScript: string;
  gptVoiceFile: string;
}

type TalkResponse = ApiResponse & TalkResponseData;

/**
 * 뚝딱대화 상세 정보 가져오기
 * @remarks
 * GET 요청을 '/api/v1/talks/{bookId}' 엔드포인트에 보냅니다. 성공시 메시지와 함께 뚝딱대화 상세 정보를 반환합니다.
 * @param {number} bookId 상세 정보를 가져오려는 뚝딱대화의 책 ID
 * @returns {Promise<TalkDetailResponse>} "Success" 메시지와 함께 talkDetail를 반환합니다.
 * @throws 401 "Certification failed." 또는 403 "RefreshToken error.", 404 "Not Found.", 410 "S3 error." 오류를 반환할 수 있습니다.
 */
export const getTalkDetail = async (bookId: number): Promise<TalkDetailResponse> => {
  try {
    const response = await apiClient.get<TalkDetailResponse>(`/api/v1/talks/${bookId}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

/**
 * 사용자 음성 전송하기
 * @remarks
 * POST 요청을 '/api/v1/talks/stt' 엔드포인트에 보냅니다. 성공시 메시지와 함께 사용자의 발화 정보를 반환합니다.
 * @param {File} params 뚝딱대화 사용자의 음성 파일
 * @returns {Promise<TalkSTTResponse>} "Success" 메시지와 함께 userScript 혹은 gptScript와 gptVoiceFile를 반환합니다.
 * @throws 400 "Bad request." 또는 401 "Certification failed.", 403 "RefreshToken error.", 404 "Not Found.", 410 "FastAPI error." 오류를 반환할 수 있습니다.
 */
export const sttTalk = async (params: File): Promise<TalkSTTResponse> => {
  const formData = new FormData();
  formData.append('talkFile', params);

  try {
    const response = await apiClient.post<TalkSTTResponse>('/api/v1/talks/stt', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

/**
 * 뚝딱대화 결과받기
 * @remarks
 * POST 요청을 '/api/v1/talks' 엔드포인트에 보냅니다. 성공시 메시지와 함께 뚝딱대화 스크립트 정보를 반환합니다.
 * @param {TalkParms} params 뚝딱대화 사용자의 음성 파일
 * @returns {Promise<TalkResponse>} "Success" 메시지와 함께 userScript 혹은 gptScript와 gptVoiceFile를 반환합니다.
 * @throws 400 "Bad request." 또는 401 "Certification failed.", 403 "RefreshToken error.", 404 "Not Found.", 410 "S3 error." 오류를 반환할 수 있습니다.
 */
export const triggerTalk = async (params: TalkParms): Promise<TalkResponse> => {
  try {
    const response = await apiClient.post<TalkResponse>('/api/v1/talks', params);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};