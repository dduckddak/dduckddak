from CFRecommendations import get_cf_recommendations
from CBRecommendations import get_cb_recommendations
import database_helper 
import pandas as pd

def hybrid_recommendations(user_seq, cf_weight=0.2, cb_weight=0.8, top_n=7):
    # 사용자 선호도 정보와 리뷰된 책 목록 가져오기
    likes, dislikes, reviewed_books = database_helper.get_user_preferences_and_reviewed_books(user_seq)
    
    # CF 및 CB 추천 실행
    cf_books = get_cf_recommendations(user_seq, likes, dislikes, reviewed_books, n=30)
    cb_books = get_cb_recommendations(user_seq, likes, dislikes, reviewed_books, n=30)


     # cf_books와 cb_books를 합침
    combined_books = pd.concat([cf_books, cb_books], ignore_index=True)


    # 추천된 책들의 가중치 합산, 이미 리뷰된 책은 제외
    combined_scores = {}
    for index, row in combined_books.iterrows():
        book_id = row['book_id']
        if book_id not in reviewed_books:
            combined_scores[book_id] = combined_scores.get(book_id, 0) + row['est_rating'] * (cf_weight if index < len(cf_books) else cb_weight)

    # # 가중치 합산 점수가 높은 순으로 정렬하여 상위 N권 선택
    # recommended_books = sorted(combined_scores.items(), key=lambda x: x[1], reverse=True)[:top_n]

    # # 최종 추천된 책의 ID 목록 반환
    # return [int(book_id) for book_id, _ in recommended_books]
            
    # 가중치 합산 점수가 높은 순으로 정렬하여 상위 N권 선택 (여기서는 4권을 선택)
    recommended_books = sorted(combined_scores.items(), key=lambda x: x[1], reverse=True)[:4]

    # 최종 추천된 책의 ID 목록 생성
    final_recommendation_ids = [121, 122, 123] + [int(book_id) for book_id, _ in recommended_books]

    # 최종 추천된 책의 ID 목록 반환 (지정된 책 3권 + 추천된 상위 4권)
    return final_recommendation_ids[:top_n]

# 사용자 ID 예시로 하이브리드 추천 실행
# user_seq = 30
# final_recommendations = hybrid_recommendations(user_seq)
# print(f"하이브리드 추천 결과 (Top {len(final_recommendations)}권): {final_recommendations}")
