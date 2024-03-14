import apiClient from './apiClient';
import { isAxiosError } from 'axios';

interface ApiResponse {
  message: string;
}


interface TalkDetailData {
  subName: string;
  // TODO 이거 2개 타입이 명세서엔 gif로 되어 있는데 정확히 뭐로 들어올지 아직 모르겠음
  subBasic: string;
  subTalk: string;
}

type TalkDetailResponse = ApiResponse & TalkDetailData;

interface TalkTriggerParams {
  bookId: number;
  // TODO 음성을 어떻게 전송하는가가 문제인데 base64로 변환해서 전송할 수도 있어서 우선 string
  // 전송방법이 정해졌을 때 수정될 수도 있음
  voiceFile: string;
}

interface  TalkTriggerResponseDataUser {
  userScript: string;
}

interface TalkTriggerResponseDataGpt {
  gptScript: string;
  gptVoiceFile: string;
}

type TalkTriggerResponseUser = ApiResponse & TalkTriggerResponseDataUser;
type TalkTriggerResponseGpt = ApiResponse & TalkTriggerResponseDataGpt;


/**
 * 뚝딱대화 상세 정보 가져오기
 * @remarks
 * GET 요청을 '/api/v1/talks/{bookId}' 엔드포인트에 보냅니다. 성공시 메시지와 함께 뚝딱대화 상세 정보를 반환합니다.
 * @param {string} bookId 상세 정보를 가져오려는 뚝딱대화의 ID
 * @returns {Promise<TalkDetailResponse>} "Success" 메시지와 함께 talkDetail를 반환합니다.
 * @throws 401 "Certification failed." 또는 403 "RefreshToken error.", 404 "Not Found.", 410 "S3 error." 오류를 반환할 수 있습니다.
 */
export const getTalkDetail = async (bookId: string): Promise<TalkDetailResponse> => {
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
 * 뚝딱대화 전송하기
 * @remarks
 * POST 요청을 '/api/v1/talks' 엔드포인트에 보냅니다. 성공시 메시지와 함께 뚝딱대화 스크립트 정보를 반환합니다.
 * @param {TalkTriggerParams} params 뚝딱대화를 시작할 책의 ID와 음성 파일
 * @returns {Promise<TalkTriggerResponseUser|TalkTriggerResponseGpt>} "Success" 메시지와 함께 userScript 혹은 gptScript와 gptVoiceFile를 반환합니다.
 * @throws 400 "Bad request." 또는 401 "Certification failed.", 403 "RefreshToken error.", 404 "Not Found.", 410 "S3 error." 오류를 반환할 수 있습니다.
 */
export const triggerTalk = async (params: TalkTriggerParams): Promise<TalkTriggerResponseUser|TalkTriggerResponseGpt> => {
  try {
    const response = await apiClient.post<TalkTriggerResponseUser|TalkTriggerResponseGpt>('/api/v1/talks', params);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};
