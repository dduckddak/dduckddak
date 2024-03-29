import apiClient from './apiClient';
import { isAxiosError } from 'axios';

interface PhotoApiResponse {
  message: string;
  photoList?: {
    photoId: number;
    photoFile: string;
  }[];
}

/**
 * 사진 목록을 가져오기
 * @remarks
 * GET 요청을 '/api/v1/photos' 엔드포인트에 보냅니다. 성공시 메시지와 함께 사진 목록을 반환합니다.
 * @returns {Promise<PhotoApiResponse>} "Success" 메시지와 함께 photoList를 반환합니다.
 * @throws 401 "Certification failed." 또는 403 "RefreshToken error.", 410 "S3 error." 오류를 반환할 수 있습니다.
 */
export const getPhotos = async (): Promise<PhotoApiResponse> => {
  try {
    const response = await apiClient.get<PhotoApiResponse>('/api/v1/photos');
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

interface AddPhotoParams {
  photoFile: File;
}

/**
 * 사진 추가
 * @remarks
 * POST 요청을 '/api/v1/photos' 엔드포인트에 보냅니다. 성공시 메시지를 반환합니다.
 * @param {AddPhotoParams} params 추가할 사진의 파일 정보
 * @returns {Promise<ApiResponse>} "Success" 메시지를 반환합니다.
 * @throws 400 "Bad request." 또는 401 "Certification failed.", 403 "RefreshToken error.", 410 "S3 error." 오류를 반환할 수 있습니다.
 */

export const addPhoto = async (
  params: AddPhotoParams,
): Promise<PhotoApiResponse> => {
  const formData = new FormData();
  formData.append('photoFile', params.photoFile);

  try {
    const response = await apiClient.post<PhotoApiResponse>(
      '/api/v1/photos',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

interface DeletePhotoParams {
  photoIds: number[];
}

/**
 * 사진 삭제
 * @remarks
 * DELETE 요청을 '/api/v1/photos' 엔드포인트에 보냅니다. 성공시 메시지를 반환합니다.
 * @param {DeletePhotoParams} params 삭제할 사진의 ID 목록
 * @returns {Promise<ApiResponse>} "Success" 메시지를 반환합니다.
 * @throws 401 "Certification failed." 또는 403 "RefreshToken error.", 404 "Not found.", 410 "S3 error." 오류를 반환할 수 있습니다.
 */
export const deletePhotos = async (
  params: DeletePhotoParams,
): Promise<PhotoApiResponse> => {
  try {
    const response = await apiClient.delete<PhotoApiResponse>(
      '/api/v1/photos',
      { data: params },
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};
