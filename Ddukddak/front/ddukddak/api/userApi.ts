import apiClient from './apiClient';
import { isAxiosError } from 'axios';

interface ApiResponse {
  message: string;
  accessToken?: string;
  refreshToken?: string;
}

interface SignUpRequest {
  userName: string;
  sex: string;
  birth: number;
  userId: string;
  userPassword: string;
}

type UserInfo = {
  message: string;
  birth?: string;
  firstLogin?: boolean;
  userName?: string;
  sex?: string;
};

interface LoginResponse {
  message: string;
  accessToken?: string;
  refreshToken?: string;
  firstLogin?: boolean;
}

/**
 * 회원가입
 * @param signUpRequest 회원가입 요청 데이터
 * @remarks
 * POST 요청을 '/api/v1/auth/sign-up' 엔드포인트에 보냅니다. 성공시 메시지를 반환합니다.
 * @returns {Promise<ApiResponse>} "Success." 메시지를 반환합니다.
 * @throws 400 "Bad request." 오류를 반환할 수 있습니다.
 */
export const signUp = async (
  signUpRequest: SignUpRequest,
): Promise<ApiResponse> => {
  try {
    const response = await apiClient.post<ApiResponse>(
      '/api/v1/auth/sign-up',
      signUpRequest,
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
 * 아이디 중복 확인
 * @remarks
 * GET 요청을 '/api/v1/auth/idcheck' 엔드포인트에 보냅니다. 성공시 메시지를 반환합니다.
 * @param {string} userId 중복 확인할 사용자 ID
 * @returns {Promise<ApiResponse>} "Success." 또는 "Duplicate." 메시지를 반환합니다.
 * @throws 409 "Duplicate." 오류를 반환할 수 있습니다.
 */
export const checkUserIdDuplicate = async (
  userId: string,
): Promise<ApiResponse> => {
  try {
    const response = await apiClient.post<ApiResponse>('/api/v1/auth/idcheck', {
      userId: userId,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
};

/**
 * 리프레쉬 토큰
 * @remarks
 * POST 요청을 '/api/v1/auth/refresh-token' 엔드포인트에 보냅니다. 성공시 메시지와 헤더를 반환합니다.
 * @param {string} refreshToken 리프레쉬 토큰 값
 * @returns {Promise<ApiResponse>} "Success." 메시지와 함께 accessToken, refreshToken을 반환합니다.
 * @throws 403 "Expired Refresh Token" 오류를 반환할 수 있습니다.
 */
export const refreshToken = async (
  refreshToken: string,
): Promise<ApiResponse> => {
  try {
    const response = await apiClient.post<ApiResponse>(
      '/api/v1/auth/refresh-token',
      {
        refreshToken,
      },
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
 * 알림 - Firebase Cloud Messaging 토큰 업데이트
 * @remarks
 * POST 요청을 '/api/v1/auth/fcmToken' 엔드포인트에 보냅니다. 성공시 메시지를 반환합니다.
 * @param {string} fcmToken 새 FCM 토큰 값
 * @returns {Promise<ApiResponse>} "Success." 메시지를 반환합니다.
 * @throws 에러 발생 시 적절한 오류 메시지를 반환합니다.
 */
export const updateFcmToken = async (
  fcmToken: string
): Promise<ApiResponse> => {
  try {
    const response = await apiClient.post<ApiResponse>(
      '/api/v1/auth/fcmToken',
      { fcmToken }
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
 * 로그인
 * @remarks
 * POST 요청을 '/api/v1/auth/login' 엔드포인트에 보냅니다. 성공시 메시지와 헤더를 반환합니다.
 * @param {string} userId 로그인할 사용자 ID
 * @param {string} userPassword 사용자 비밀번호
 * @returns {Promise<LoginResponse>} "Success." 메시지와 함께 accessToken, refreshToken을 반환합니다.
 * @throws 400 "Bad request." 또는 404 "Not found." 오류를 반환할 수 있습니다.
 */
export const login = async (
  userId: string,
  userPassword: string,
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>('/api/v1/auth/login', {
      userId,
      userPassword,
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
 * 로그아웃
 * @remarks
 * POST 요청을 '/api/v1/auth/logout' 엔드포인트에 보냅니다. 성공시 메시지를 반환합니다.
 * @returns {Promise<ApiResponse>} "Success." 메시지를 반환합니다.
 * @throws 401 "Certification failed." 또는 403 "RefreshToken error." 오류를 반환할 수 있습니다.
 */
export const logout = async (): Promise<ApiResponse> => {
  try {
    const response = await apiClient.post<ApiResponse>('/api/v1/auth/logout');
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

/**
 * 유저정보 받아오기
 * @remarks
 * GET 요청을 '/api/v1/auth/user-info' 엔드포인트에 보냅니다. 성공 시 message와 유저 정보를 반환합니다.
 * @returns {Promise<UserInfo>} message와 유저 정보를 반환합니다.
 * @throws 401 "Certification failed." 또는 403 "RefreshToken error." 오류를 반환할 수 있습니다.
 */
export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    const response = await apiClient.get<UserInfo>('/api/v1/auth/user-info');
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    }
    throw error;
  }
};
