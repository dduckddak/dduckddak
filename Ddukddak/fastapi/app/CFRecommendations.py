from dataset import review_info_list, book_info_list_schema
import pandas as pd
from joblib import load
from surprise import Dataset, Reader, SVD
from surprise.model_selection import train_test_split
import pymysql
import os
from dotenv import load_dotenv

# 협업 필터링 모델 로드
model = load('models/cf_model.joblib')

# ReviewInfoList에서 리뷰 데이터를 DataFrame으로 변환
df = pd.DataFrame([{
    'user_seq': review.user_seq,
    'book_id': review.book_id,
    'rating': review.is_like
} for review in review_info_list.reviews])

# BookInfoList에서 책 데이터를 DataFrame으로 변환
book_df = pd.DataFrame([{
    'book_id': book.book_id,
    'book_title': book.book_title,
    'book_author': book.book_author
} for book in book_info_list_schema.books])

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

def get_cf_recommendations(user_seq, n=30):
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            # 사용자의 리뷰 데이터 조회
            cursor.execute("SELECT book_id, user_seq, is_like FROM review WHERE user_seq = %s", (user_seq,))
            review_data = cursor.fetchall()
            df = pd.DataFrame(review_data)
            
            # 책 데이터 조회
            cursor.execute("SELECT book_id, book_title, book_author FROM book")
            book_data = cursor.fetchall()
            book_df = pd.DataFrame(book_data)
    
        # 모든 책에 대해 해당 사용자의 예상 평점을 계산
        unique_books = book_df['book_id'].unique()
        predictions = [model.predict(str(user_seq), str(iid)).est for iid in unique_books]

        # 예상 평점과 책 ID를 결합
        predictions_df = pd.DataFrame(list(zip(unique_books, predictions)), columns=['book_id', 'est_rating'])

        # 예상 평점이 높은 순으로 책 정렬 및 상위 N개 선택
        top_n_books = predictions_df.nlargest(n, 'est_rating')
    
        # 선택된 책의 상세 정보 가져오기
        cf_recommended_books = top_n_books.merge(book_df, on='book_id', how='left')

    finally:
        connection.close()

    return cf_recommended_books

# 예시 사용자에 대한 추천 실행
# user_seq = 1  # 사용자 ID 예시
# recommended_books = get_cf_recommendations(user_seq, n=10)
# print(recommended_books)
