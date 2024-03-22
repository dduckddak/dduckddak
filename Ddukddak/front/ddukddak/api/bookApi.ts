import apiClient from './apiClient';
import { isAxiosError } from 'axios';

interface ApiResponse {
  message: string;
}

export interface BookListData {
  bookList?: {
    bookId: string;
    bookTitle: string;
    coverImage: string;
  }[];
}

export interface BookSearchData {
  searchBookList?: {
    bookId: string;
    bookTitle: string;
    bookAuthor: string;
    bookStory: string;
    coverImage: string;
  }[];
}

export interface BookDetailData {
  book: {
    bookTitle: string;
    bookAuthor: string;
    bookStory: string;
    coverImage: string;
  };
}

type BookListResponse = ApiResponse & BookListData;

type BookSearchResponse = ApiResponse & BookSearchData;

type BookDetailResponse = ApiResponse & BookDetailData;

type ReviewCreateResponse = ApiResponse;

/**
 * 추천 책 목록을 가져오기
 * @remarks
 * GET 요청을 '/api/v1/books/list' 엔드포인트에 보냅니다. 성공시 메시지와 함께 책 목록을 반환합니다.
 * @returns {Promise<BookListResponse>} "Success" 메시지와 함께 bookList를 반환합니다.
 * @throws 401 "Certification failed." 또는 403 "RefreshToken error.", 404 "Not Found.", 410 "S3 error." 오류를 반환할 수 있습니다.
 */
export const getBookList = async (): Promise<BookListResponse> => {
  try {
    const response = await apiClient.get<BookListResponse>(
      '/api/v1/books/list',
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
 * 책 검색
 * @remarks
 * GET 요청을 '/api/v1/books/search/{searchKeyword}' 엔드포인트에 보냅니다. 성공시 메시지와 함께 검색된 책 목록을 반환합니다.
 * @param {string} searchKeyword 검색할 키워드
 * @returns {Promise<BookSearchResponse>} "Success" 메시지와 함께 searchBookList를 반환합니다.
 * @throws 401 "Certification failed." 또는 403 "RefreshToken error.", 410 "S3 error." 오류를 반환할 수 있습니다.
 */
export const searchBooks = async (
  searchKeyword: string,
): Promise<BookSearchResponse> => {
  try {
    const response = await apiClient.get<BookSearchResponse>(
      `/api/v1/books/search/${searchKeyword}`,
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
 * 책 상세 정보 가져오기
 * @remarks
 * GET 요청을 '/api/v1/books/{bookId}' 엔드포인트에 보냅니다. 성공시 메시지와 함께 책의 상세 정보를 반환합니다.
 * @param {string} bookId 상세 정보를 가져오려는 책의 ID
 * @returns {Promise<BookDetailResponse>} "Success" 메시지와 함께 book를 반환합니다.
 * @throws 401 "Certification failed." 또는 403 "RefreshToken error.", 404 "Not Found." 오류를 반환할 수 있습니다.
 */
export const getBookDetail = async (
  bookId: string,
): Promise<BookDetailResponse> => {
  try {
    const response = await apiClient.get<BookDetailResponse>(
      `/api/v1/books/${bookId}`,
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

interface ReviewCreateParams {
  bookId: number;
  isLike: boolean;
}

interface ApiResponse {
  message: string;
}

/**
 * 리뷰 생성
 * @remarks
 * POST 요청을 '/api/v1/books/reviews' 엔드포인트에 보냅니다. 성공시 메시지를 반환합니다.
 * @param {ReviewCreateParams} params 리뷰를 작성할 책의 ID와 좋아요 여부
 * @returns {Promise<ReviewCreateResponse>} "Success" 메시지를 반환합니다.
 * @throws 400 "Bad request." 또는 401 "Certification failed.", 403 "RefreshToken error.", 404 "Not Found." 오류를 반환할 수 있습니다.
 */
export const createReview = async (
  params: ReviewCreateParams,
): Promise<ReviewCreateResponse> => {
  try {
    const response = await apiClient.post<ReviewCreateResponse>(
      '/api/v1/books/reviews',
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

interface ReviewUpdateParams {
  bookId: number;
  isLike: boolean;
}

interface ReviewDetailData {
  review: {
    isLike: boolean;
  };
}

type ReviewDetailResponse = ApiResponse & ReviewDetailData;

/**
 * 리뷰 수정
 * @remarks
 * PUT 요청을 '/api/v1/books/reviews/{bookId}' 엔드포인트에 보냅니다. 성공시 메시지를 반환합니다.
 * @param {ReviewUpdateParams} params 수정할 리뷰의 책 ID와 좋아요 여부
 * @returns {Promise<ReviewCreateResponse>} "Success" 메시지를 반환합니다.
 * @throws 400 "Bad request." 또는 401 "Certification failed.", 403 "RefreshToken error.", 404 "Not Found." 오류를 반환할 수 있습니다.
 */
export const updateReview = async (
  params: ReviewUpdateParams,
): Promise<ApiResponse> => {
  try {
    const response = await apiClient.put<ApiResponse>(
      `/api/v1/books/reviews/${params.bookId}`,
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
 * 리뷰 삭제
 * @remarks
 * DELETE 요청을 '/api/v1/books/reviews/{bookId}' 엔드포인트에 보냅니다. 성공시 메시지를 반환합니다.
 * @param {number} bookId 삭제할 리뷰의 책 ID
 * @returns {Promise<ApiResponse>} "Success" 메시지를 반환합니다.
 * @throws 401 "Certification failed." 또는 403 "RefreshToken error.", 404 "Not Found." 오류를 반환할 수 있습니다.
 */
export const deleteReview = async (bookId: number): Promise<ApiResponse> => {
  try {
    const response = await apiClient.delete<ApiResponse>(
      `/api/v1/books/reviews/${bookId}`,
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
 * 리뷰 상세 정보 가져오기
 * @remarks
 * GET 요청을 '/api/v1/books/reviews/{bookId}' 엔드포인트에 보냅니다. 성공시 메시지와 함께 리뷰 정보를 반환합니다.
 * @param {string} bookId 상세 정보를 가져오려는 리뷰의 책 ID
 * @returns {Promise<ReviewDetailResponse>} "Success" 메시지와 함께 review를 반환합니다.
 * @throws 401 "Certification failed." 또는 403 "RefreshToken error.", 404 "Not Found." 오류를 반환할 수 있습니다.
 */
export const getReviewDetail = async (
  bookId: string,
): Promise<ReviewDetailResponse> => {
  try {
    const response = await apiClient.get<ReviewDetailResponse>(
      `/api/v1/books/reviews/${bookId}`,
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};
