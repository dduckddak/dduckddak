import apiClient from './apiClient';
import { isAxiosError } from 'axios';

interface ColoringApiResponse {
  message: string;
  coloringList?: {
    coloringId: number;
    coloringFile: string;
  }[];
}

/**
 * 그림 목록을 가져오기
 * @remarks
 * GET 요청을 '/api/v1/colorings' 엔드포인트에 보냅니다. 성공시 메시지와 함께 그림 목록을 반환합니다.
 * @returns {Promise<ColoringApiResponse>} "Success" 메시지와 함께 coloringList를 반환합니다.
 * @throws 401 "Certification failed." 또는 403 "RefreshToken error.", 410 "S3 error." 오류를 반환할 수 있습니다.
 */
export const getColorings = async (): Promise<ColoringApiResponse> => {
  try {
    const response = await apiClient.get<ColoringApiResponse>('/api/v1/colorings/');
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};


interface AddColoringParams {
  coloringFile: File;
}

/**
 * 그림 저장
 * @remarks
 * POST 요청을 '/api/v1/colorings' 엔드포인트에 보냅니다. 성공시 메시지를 반환합니다.
 * @param {AddColoringParams} params 저장할 그림의 파일 정보
 * @returns {Promise<ApiResponse>} "Success" 메시지를 반환합니다.
 * @throws 400 "Bad request." 또는 401 "Certification failed.", 403 "RefreshToken error.", 410 "S3 error." 오류를 반환할 수 있습니다.
 */
export const addColoring = async (params: AddColoringParams): Promise<ColoringApiResponse> => {
  const formData = new FormData();
  formData.append('coloringFile', params.coloringFile);

  try {
    const response = await apiClient.post<ColoringApiResponse>('/api/v1/colorings/', formData);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};



interface DeleteColoringParams {
  deleteColoringIds: number[];
}

/**
 * 그림 삭제
 * @remarks
 * DELETE 요청을 '/api/v1/colorings' 엔드포인트에 보냅니다. 성공시 메시지를 반환합니다.
 * @param {DeleteColoringParams} params 삭제할 그림의 ID 목록
 * @returns {Promise<ApiResponse>} "Success" 메시지를 반환합니다.
 * @throws 401 "Certification failed." 또는 403 "RefreshToken error.", 404 "Not found.", 410 "S3 error." 오류를 반환할 수 있습니다.
 */
export const deleteColorings = async (params: DeleteColoringParams): Promise<ColoringApiResponse> => {
  try {
    const response = await apiClient.delete<ColoringApiResponse>('/api/v1/colorings/', { data: params });
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

interface ColoringBaseApiResponse {
  message: string;
  coloringBaseList?: {
    coloringBaseId: number;
    coloringBaseFile: string;
  }[];
}

/**
 * 베이스 그림 목록을 가져오기
 * @remarks
 * GET 요청을 '/api/v1/colorings/base' 엔드포인트에 보냅니다. 성공시 메시지와 함께 베이스 그림 목록을 반환합니다.
 * @returns {Promise<ColoringBaseApiResponse>} "Success" 메시지와 함께 coloringBaseList를 반환합니다.
 * @throws 401 "Certification failed." 또는 403 "RefreshToken error.", 410 "S3 error." 오류를 반환할 수 있습니다.
 */
export const getColoringBases = async (): Promise<ColoringBaseApiResponse> => {
  try {
    const response = await apiClient.get<ColoringBaseApiResponse>('/api/v1/colorings/base/');
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};
