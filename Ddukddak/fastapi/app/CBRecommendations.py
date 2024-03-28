from joblib import load
from allDataset import book_info_list_schema
import numpy as np
import pandas as pd

# 컨텐츠 기반 필터링 모델 및 TFIDF 벡터라이저 로드
tfidf, cosine_sim = load('models/content_based_model.joblib')

def get_cb_recommendations(user_seq, likes, dislikes, reviewed_books, n=30):
    scores = np.zeros(cosine_sim.shape[0])

    # '좋아요' 목록에 대한 가중치 적용
    for like in likes:
        idx = next((i for i, book in enumerate(book_info_list_schema.books) if book.book_id == like), None)
        if idx is not None:
            scores += cosine_sim[idx] * 1.5

    # '싫어요' 목록에 대한 가중치 적용
    for dislike in dislikes:
        idx = next((i for i, book in enumerate(book_info_list_schema.books) if book.book_id == dislike), None)
        if idx is not None:
            scores -= cosine_sim[idx] * 0.5

    # 점수가 높은 책의 인덱스를 추출하고, 그에 해당하는 book_id를 반환
    recommended_indices = np.argsort(scores)[::-1][:n]
    recommended_books = [book_info_list_schema.books[i].book_id for i in recommended_indices if book_info_list_schema.books[i].book_id not in reviewed_books][:n]
    
    # 추천된 책의 ID와 해당하는 점수를 데이터프레임으로 변환
    recommended_books_info = pd.DataFrame({
        'book_id': recommended_books,
        'est_rating': [scores[i] for i in recommended_indices[:len(recommended_books)]]
    })

    return recommended_books_info

# 사용자 ID를 예시로 추천 실행
# user_seq = 1  # 사용자 ID 예시
# recommended_books = get_cb_recommendations(user_seq, likes, dislikes, reviewed_books, n=30)
# print(f"추천된 책 정보: \n{recommended_books}")
