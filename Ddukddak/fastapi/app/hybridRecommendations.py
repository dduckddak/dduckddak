from CFRecommendations import get_cf_recommendations
from CBRecommendations import get_cb_recommendations

def hybrid_recommendations(user_seq, cf_weight=0.2, cb_weight=0.8, top_n=7):
    """
    CF 모델과 CB 모델로부터의 추천을 결합한 하이브리드 추천을 생성합니다.

    :param user_seq: 사용자 시퀀스 ID
    :param cf_weight: CF 모델의 가중치 (기본값 0.2)
    :param cb_weight: CB 모델의 가중치 (기본값 0.8)
    :param top_n: 반환할 추천 책의 수
    :return: 추천된 책의 ID 목록
    """
    # CF 모델과 CB 모델에서 추천 받기
    cf_books_df = get_cf_recommendations(user_seq, n=30)
    cb_books = get_cb_recommendations(user_seq, n=30)
    # DataFrame에서 (book_id, score) 형태로 데이터를 추출
    cf_books = [(row['book_id'], row['est_rating']) for index, row in cf_books_df.iterrows()]

    # 추천된 책들의 가중치 합산
    combined_scores = {}
    for book_id, score in cf_books:
        combined_scores[book_id] = combined_scores.get(book_id, 0) + score * cf_weight
    for book_id in cb_books:
        combined_scores[book_id] = combined_scores.get(book_id, 0) + cb_weight  # CB 모델의 가중치를 고정값으로 적용

    # 가중치 합산 점수가 높은 순으로 정렬하여 상위 N권 선택
    recommended_books = sorted(combined_scores.items(), key=lambda x: x[1], reverse=True)[:top_n]

    # 최종 추천된 책의 ID 목록 반환
    return [book_id for book_id, _ in recommended_books]

# # 사용자 ID 예시로 하이브리드 추천 실행
# user_seq = 1
# final_recommendations = hybrid_recommendations(user_seq)
# print(f"하이브리드 추천 결과 (Top {len(final_recommendations)}권): {final_recommendations}")
