import apiClient from './apiClient';
import { isAxiosError } from 'axios';
import { BookSummary } from '../types/types';

interface ApiResponse {
  message: string;
}

export interface BookListData {
  bookList?: BookSummary[];
}

export interface BookSearchData {
  searchBookList?: {
    bookId: number;
    bookTitle: string;
    bookAuthor: string;
    bookStory: string;
    coverImage: string;
  }[];
}

export interface BookDetailData {
  book: {
    bookAuthor: string;
    bookStory: string;
    isLike: Boolean;
    mainName: string;
    subName: string;
  };
}

export interface LikeBookListData {
  likeBookList?: {
    bookId: number;
    bookTitle: string;
    coverImage: string;
  }[];
}

export interface reviewData {
  isLike: Boolean;
}

type BookListResponse = ApiResponse & BookListData;

type BookSearchResponse = ApiResponse & BookSearchData;

type BookDetailResponse = ApiResponse & BookDetailData;

type ReviewCreateResponse = ApiResponse & reviewData;

type LikeBookListResponse = ApiResponse & LikeBookListData;

type PostLikeBooksResponse = ApiResponse;

/**
 * 선호도 조사 책 목록 가져오기*/
export const getLikeBookList = async (): Promise<BookListResponse> => {
  try {
    const response = await apiClient.get<BookListResponse>(
      '/api/v1/books/choice-list',
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

interface LikeBooksParams {
  choiceBookList: number[];
}

// 선호도 조사 책 선택목록 보내기
export const postLikeBooks = async (
  params: LikeBooksParams,
): Promise<PostLikeBooksResponse> => {
  try {
    const response = await apiClient.post<PostLikeBooksResponse>(
      '/api/v1/books/choice-list',
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
    console.log(response.data);
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
  bookId: number,
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
  like: Boolean;
}

interface ApiResponse {
  message: string;
}

/**
 * 리뷰 생성
 * @remarks
 * POST 요청을 '/api/v1/books/reviews' 엔드포인트에 보냅니다. 성공시 메시지를 반환합니다.
 * @param {ReviewCreateParams} params 리뷰를 작성할 책의 ID와 좋아요 여부
 * @returns {Promise<ReviewCreateResponse>}
 * {"message": "insert success",
  "like": Boolean}
  {"message": "update success",
  "like": Boolean}
  {"message": "delete success",
  "like": Boolean}
  ( insert, update 인 경우는 true or false 값이 오고 ,
  delete인 경우에는 null이 옵니다. )
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

// interface ReviewUpdateParams {
//   bookId: number;
//   isLike: Boolean;
// }

// interface ReviewDetailData {
//   review: {
//     isLike: Boolean;
//   };
// }

// type ReviewDetailResponse = ApiResponse & ReviewDetailData;

// /**
//  * 리뷰 수정
//  * @remarks
//  * PUT 요청을 '/api/v1/books/reviews/{bookId}' 엔드포인트에 보냅니다. 성공시 메시지를 반환합니다.
//  * @param {ReviewUpdateParams} params 수정할 리뷰의 책 ID와 좋아요 여부
//  * @returns {Promise<ReviewCreateResponse>} "Success" 메시지를 반환합니다.
//  * @throws 400 "Bad request." 또는 401 "Certification failed.", 403 "RefreshToken error.", 404 "Not Found." 오류를 반환할 수 있습니다.
//  */
// export const updateReview = async (
//   params: ReviewUpdateParams,
// ): Promise<ApiResponse> => {
//   try {
//     const response = await apiClient.put<ApiResponse>(
//       `/api/v1/books/reviews/${params.bookId}`,
//       params,
//     );
//     return response.data;
//   } catch (error) {
//     if (isAxiosError(error) && error.response) {
//       throw error.response.data;
//     }
//     throw error;
//   }
// };

// /**
//  * 리뷰 삭제
//  * @remarks
//  * DELETE 요청을 '/api/v1/books/reviews/{bookId}' 엔드포인트에 보냅니다. 성공시 메시지를 반환합니다.
//  * @param {number} bookId 삭제할 리뷰의 책 ID
//  * @returns {Promise<ApiResponse>} "Success" 메시지를 반환합니다.
//  * @throws 401 "Certification failed." 또는 403 "RefreshToken error.", 404 "Not Found." 오류를 반환할 수 있습니다.
//  */
// export const deleteReview = async (bookId: number): Promise<ApiResponse> => {
//   try {
//     const response = await apiClient.delete<ApiResponse>(
//       `/api/v1/books/reviews/${bookId}`,
//     );
//     return response.data;
//   } catch (error) {
//     if (isAxiosError(error) && error.response) {
//       throw error.response.data;
//     }
//     throw error;
//   }
// };

// /**
//  * 리뷰 상세 정보 가져오기
//  * @remarks
//  * GET 요청을 '/api/v1/books/reviews/{bookId}' 엔드포인트에 보냅니다. 성공시 메시지와 함께 리뷰 정보를 반환합니다.
//  * @param {string} bookId 상세 정보를 가져오려는 리뷰의 책 ID
//  * @returns {Promise<ReviewDetailResponse>} "Success" 메시지와 함께 review를 반환합니다.
//  * @throws 401 "Certification failed." 또는 403 "RefreshToken error.", 404 "Not Found." 오류를 반환할 수 있습니다.
//  */
// export const getReviewDetail = async (
//   bookId: string,
// ): Promise<ReviewDetailResponse> => {
//   try {
//     const response = await apiClient.get<ReviewDetailResponse>(
//       `/api/v1/books/reviews/${bookId}`,
//     );
//     return response.data;
//   } catch (error) {
//     if (isAxiosError(error) && error.response) {
//       throw error.response.data;
//     }
//     throw error;
//   }
// };

/**
 * 좋아요 한 책 목록을 가져오기 (BookList랑 데이터 값 똑같아서 그대로 사용)
 * @remarks
 * GET 요청을 '/api/v1/books/like' 엔드포인트에 보냅니다. 성공시 메시지와 함께 좋아요 한 책 목록을 반환합니다.
 * @returns {Promise<BookListResponse>} "Success" 메시지와 함께 LikeBookList를 반환합니다.
 * @throws 401 "Certification failed." 또는 403 "RefreshToken error.", 404 "Not Found." 오류를 반환할 수 있습니다.
 */
export const getLikeList = async (): Promise<LikeBookListResponse> => {
  try {
    const response = await apiClient.get<LikeBookListResponse>(
      '/api/v1/books/like',
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};
