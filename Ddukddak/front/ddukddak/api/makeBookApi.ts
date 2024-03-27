import apiClient from './apiClient';
import { isAxiosError } from 'axios';

interface ApiResponse {
  message: string;
}

interface ScriptData {
  scriptSeq: number;
  scriptContent: string;
  role: string;
  voiceFile: string; // TODO return이 명세서에는 file로 되어 있는데 file로 보낼 순 없을거라 우선 string
}

interface PageData {
  pageSeq: number;
  pageImage: string;
  scripts: ScriptData[];
}

interface MakeBookDetailData {
  bookId: number;
  makeBookTitle: string;
  bookDetail: PageData[];
}

interface MakeBookRequest {
  bookId: number;
  makeBookTitle: string;
  mainVoice: number;
  mainPhoto: number;
  subVoice: number;
  subPhoto: number;
  narration: number;
}

type MakeBookDetailResponse = ApiResponse & MakeBookDetailData;

/**
 * 동화뚝딱 상세 정보 가져오기
 * @remarks
 * GET 요청을 '/api/v1/make-books/{makeBookId}' 엔드포인트에 보냅니다. 성공시 메시지와 함께 동화뚝딱 상세 정보를 반환합니다.
 * @param {string} makeBookId 상세 정보를 가져오려는 동화뚝딱의 ID
 * @returns {Promise<MakeBookDetailResponse>} "Success" 메시지와 함께 makeBookDetail를 반환합니다.
 * @throws 401 "Certification failed." 또는 403 "RefreshToken error.", 404 "Not Found.", 410 "S3 error." 오류를 반환할 수 있습니다.
 */
export const getMakeBookDetail = async (
  makeBookId: string,
): Promise<MakeBookDetailResponse> => {
  try {
    const response = await apiClient.get<MakeBookDetailResponse>(
      `/api/v1/make-books/${makeBookId}`,
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

/**
 * 동화뚝딱 생성
 * @remarks
 * POST 요청을 '/api/v1/make-books' 엔드포인트에 보냅니다. 성공시 메시지를 반환합니다.
 * @param {MakeBookRequest} params 화뚝딱의 ID들을 담은 배열
 * @returns {Promise<ApiResponse>} "Success." 메시지를 반환합니다.
 * @throws 400 "요청 받아야할 값이 없음" 또는 401 "토큰인증 실패." 또는 403 "RefreshToken error.", 410 "FastAPI" 오류를 반환할 수 있습니다.
 */
export const postMakeBook = async (
  params: MakeBookRequest,
): Promise<ApiResponse> => {
  try {
    const response = await apiClient.post<ApiResponse>(
      '/api/v1/make-books',
      params,
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

/**
 * 동화뚝딱 삭제
 * @remarks
 * DELETE 요청을 '/api/v1/make-books' 엔드포인트에 보냅니다. 성공시 메시지를 반환합니다.
 * @param {number[]} makeBookIds 삭제할 동화뚝딱의 ID들을 담은 배열
 * @returns {Promise<ApiResponse>} "Success." 메시지를 반환합니다.
 * @throws 401 "Certification failed." 또는 403 "RefreshToken error.", 404 "Not Found." 오류를 반환할 수 있습니다.
 */
export const deleteMakeBook = async (
  makeBookIds: number[],
): Promise<ApiResponse> => {
  try {
    const response = await apiClient.delete<ApiResponse>(`/api/v1/make-books`, {
      data: { makeBookIds }, // DELETE 메서드의 본문에 makeBookId 배열을 담아 전송
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

export interface MakeBookListData {
  makeBookList?: {
    bookId: number;
    makeBookTitle: string;
    makeBookCover: string;
  }[];
}

type MakeBookListResponse = ApiResponse & MakeBookListData;

/**
 * 동화뚝딱 목록 가져오기
 * @remarks
 * GET 요청을 '/api/v1/make-books/list' 엔드포인트에 보냅니다. 성공시 메시지와 함께 동화뚝딱 목록을 반환합니다.
 * @returns {Promise<MakeBookListResponse>} "Success" 메시지와 함께 makeBookList를 반환합니다.
 * @throws 401 "Certification failed." 또는 403 "RefreshToken error.", 404 "Not Found.", 410 "S3 error." 오류를 반환할 수 있습니다.
 */
export const getMakeBookList = async (): Promise<MakeBookListResponse> => {
  try {
    const response = await apiClient.get<MakeBookListResponse>(
      '/api/v1/make-books',
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};
