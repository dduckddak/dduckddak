import apiClient from './apiClient';
import { isAxiosError } from 'axios';


interface ApiResponse {
  message: string;
  voiceList?: {
    voiceId: number;
    voiceName: string;
  }[];
}

/**
 * 목소리 목록을 가져오기
 * @remarks
 * GET 요청을 '/api/v1/voices' 엔드포인트에 보냅니다. 성공시 메시지와 함께 목소리 목록을 반환합니다.
 * @returns {Promise<ApiResponse>} "Success" 메시지와 함께 voiceList를 반환합니다.
 * @throws 401 "Certification failed." 또는 403 "RefreshToken error." 오류를 반환할 수 있습니다.
 */
export const getVoices = async (): Promise<ApiResponse> => {
  try {
    const response = await apiClient.get<ApiResponse>('/api/v1/voices/');
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};




interface AddVoiceParams {
  voiceFile: File;
  voiceName: string;
}

/**
 * 목소리 추가
 * @remarks
 * POST 요청을 '/api/v1/voices' 엔드포인트에 보냅니다. 성공시 메시지를 반환합니다.
 * @param {AddVoiceParams} params 추가할 목소리의 파일과 이름 정보
 * @returns {Promise<ApiResponse>} "Success" 메시지를 반환합니다.
 * @throws 400 "Bad request." 또는 401 "Certification failed.", 403 "RefreshToken error.", 410 "ElevenLabs error.", 410 "S3 error." 오류를 반환할 수 있습니다.
 */
export const addVoice = async (params: AddVoiceParams): Promise<ApiResponse> => {
  const formData = new FormData();
  formData.append('voiceFile', params.voiceFile);
  formData.append('voiceName', params.voiceName);

  try {
    const response = await apiClient.post<ApiResponse>('/api/v1/voices/', formData);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};


interface DeleteVoiceParams {
  deleteVoiceIds: number[];
}

/**
 * 목소리 삭제
 * @remarks
 * DELETE 요청을 '/api/v1/voices' 엔드포인트에 보냅니다. 성공시 메시지를 반환합니다.
 * @param {DeleteVoiceParams} params 삭제할 목소리의 ID 목록
 * @returns {Promise<ApiResponse>} "Success" 메시지를 반환합니다.
 * @throws 401 "Certification failed." 또는 403 "RefreshToken error.", 404 "Not found.", 410 "S3 error." 오류를 반환할 수 있습니다.
 */
export const deleteVoices = async (params: DeleteVoiceParams): Promise<ApiResponse> => {
  try {
    const response = await apiClient.delete<ApiResponse>('/api/v1/voices/', { data: params });
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

interface PreviewVoiceParams {
  voiceId: number;
}

interface PreviewVoiceResponse extends ApiResponse {
  previewFile?: string;
}


/**
 * 음성 미리듣기
 * @remarks
 * GET 요청을 '/api/v1/voices/preview' 엔드포인트에 보냅니다. 성공시 메시지와 미리듣기 파일의 경로를 반환합니다.
 * @param {PreviewVoiceParams} params 미리 들어볼 음성의 ID 정보
 * @returns {Promise<PreviewVoiceResponse>} "Success" 메시지와 미리듣기 파일의 경로를 반환합니다.
 * @throws 401 "Certification failed." 또는 403 "RefreshToken error.", 404 "Not found.", 410 "S3 error." 오류를 반환할 수 있습니다.
 */
export const previewVoice = async (params: PreviewVoiceParams): Promise<PreviewVoiceResponse> => {
  try {
    const response = await apiClient.get<PreviewVoiceResponse>('/api/v1/voices/preview/', { params });
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

