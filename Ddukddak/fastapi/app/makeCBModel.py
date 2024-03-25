from dataset import review_info_list
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from joblib import dump

# review_info_list에서 책의 키워드와 작가 정보를 추출하여 DataFrame 생성
book_details = pd.DataFrame([{
    'book_id': review.book_id,
    'keyword': review.keyword,
    'book_author': review.book_author
} for review in review_info_list.reviews]).drop_duplicates()

# 키워드와 작가 정보를 결합하여 새로운 특징으로 생성
book_details['combine_features'] = book_details['keyword'] + ", " + book_details['book_author']

# TfidfVectorizer 인스턴스화 및 학습
tfidf = TfidfVectorizer()
tfidf_matrix = tfidf.fit_transform(book_details['combine_features'])

# 코사인 유사도 계산
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

# 모델 저장
model_path = 'models/content_based_model.joblib'
dump((tfidf, cosine_sim), model_path)
print(f"Model saved to {model_path}")
