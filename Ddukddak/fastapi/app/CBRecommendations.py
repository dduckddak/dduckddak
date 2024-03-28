from dataset import review_info_list, book_info_list_schema
from joblib import load
import numpy as np
import pymysql
import os
from dotenv import load_dotenv
# 컨텐츠 기반 필터링 모델 및 TFIDF 벡터라이저 로드
tfidf, cosine_sim = load('models/content_based_model.joblib')

# 데이터베이스 연결 설정
def get_db_connection():
    load_dotenv()
    DB_HOST = os.getenv("DB_HOST")
    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_DATABASE = os.getenv("DB_DATABASE")
    connection = pymysql.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_DATABASE,
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )
    return connection

# 사용자의 선호도 정보 조회
def get_user_preferences(user_seq):
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            # 사용자의 '좋아요'한 책 목록 조회
            cursor.execute("SELECT book_id FROM review WHERE user_seq = %s AND is_like = 1", (user_seq,))
            likes = [row['book_id'] for row in cursor.fetchall()]
            
            # 사용자의 '싫어요'한 책 목록 조회
            cursor.execute("SELECT book_id FROM review WHERE user_seq = %s AND is_like = 0", (user_seq,))
            dislikes = [row['book_id'] for row in cursor.fetchall()]
    finally:
        connection.close()
    return likes, dislikes

def get_cb_recommendations(user_seq, n=30):
    """
    특정 사용자에 대한 컨텐츠 기반 필터링 추천을 생성합니다.
    :param user_seq: 사용자의 고유 번호
    :param n: 추천할 책의 최대 수
    :return: 추천된 책의 ID 목록
    """
    likes, dislikes = get_user_preferences(user_seq)
    scores = np.zeros(len(tfidf.get_feature_names_out()))

    # scores 배열 초기화
    scores = np.zeros(cosine_sim.shape[0])

    # '좋아요' 목록에 대한 가중치 적용
    for like in likes:
        # book_id에 해당하는 인덱스 찾기
        idx = next((i for i, book in enumerate(book_info_list_schema.books) if book.book_id == like), None)
        if idx is not None:
            scores += cosine_sim[idx] * 1.5

    # '싫어요' 목록에 대한 가중치 적용
    for dislike in dislikes:
        # book_id에 해당하는 인덱스 찾기
        idx = next((i for i, book in enumerate(book_info_list_schema.books) if book.book_id == dislike), None)
        if idx is not None:
            scores -= cosine_sim[idx] * 0.5


    # 점수가 높은 책의 인덱스를 추출하고, 그에 해당하는 book_id를 반환
    recommended_indices = np.argsort(scores)[::-1]
    cb_recommended_books = [book_info_list_schema.books[i].book_id for i in recommended_indices if book_info_list_schema.books[i].book_id not in likes + dislikes][:n]

    return cb_recommended_books

# 사용자 ID를 예시로 추천 실행
# user_seq = 1  # 사용자 ID 예시
# recommended_books = get_cb_recommendations(user_seq, n=30)
# print(f"추천된 책 ID 목록: {recommended_books}")
