from allDataset import book_info_list_schema
import pandas as pd
from joblib import load
from surprise import Dataset, Reader, SVD
from surprise.model_selection import train_test_split
from dotenv import load_dotenv

# 협업 필터링 모델 로드
model = load('models/cf_model.joblib')

def get_cf_recommendations(user_seq, likes, dislikes, reviewed_books, n=30):
    # book_info_list_schema에서 모든 책의 book_id를 추출하여 set으로 변환
    all_book_ids = {book.book_id for book in book_info_list_schema.books}
    
    # 이미 리뷰된 책들의 ID를 set으로 변환
    reviewed_book_ids = set(reviewed_books)

    # 리뷰되지 않은 책들만을 포함하는 unique_books 생성
    unique_books = all_book_ids - reviewed_book_ids
    
    predictions = []
    for book_id in unique_books:
        # model.predict() 함수는 문자열 형태의 user_seq와 book_id를 받습니다.
        pred = model.predict(str(user_seq), str(book_id)).est
        predictions.append((book_id, pred))

    # 예상 평점이 높은 순으로 책 정렬
    predictions.sort(key=lambda x: x[1], reverse=True)
    
    # 상위 N개 책 선택
    top_n_predictions = predictions[:n]

    # 선택된 책의 상세 정보를 DataFrame으로 생성
    recommended_books_info = pd.DataFrame(top_n_predictions, columns=['book_id', 'est_rating'])
    
    return recommended_books_info


