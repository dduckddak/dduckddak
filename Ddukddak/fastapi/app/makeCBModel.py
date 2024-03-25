from dataset import review_info_list
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from joblib import dump
from collections import Counter

# review_info_list에서 책의 키워드와 작가 정보를 추출하여 DataFrame 생성
book_details = pd.DataFrame([{
    'book_id': review.book_id,
    'keyword': review.keyword,
    'book_author': review.book_author
} for review in review_info_list.reviews]).drop_duplicates()

def combine_features(row):
    # 쉼표와 공백을 기준으로 분리 후 각 키워드의 앞뒤 공백 제거
    keywords = [keyword.strip() for keyword in row['keyword'].split(',')]
    # 수정된 키워드 리스트를 문자열로 변환하고 작가 정보와 결합
    return ', '.join(keywords) + ", " + row['book_author']

# 키워드와 작가 정보를 결합하여 새로운 특징으로 생성
book_details['combine_features'] = book_details.apply(combine_features, axis=1)

# TfidfVectorizer 인스턴스화 및 학습
tfidf = TfidfVectorizer()
tfidf_matrix = tfidf.fit_transform(book_details['combine_features'])

# 코사인 유사도 계산
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

# 모델 저장
model_path = 'models/content_based_model.joblib'
dump((tfidf, cosine_sim), model_path)
print(f"Model saved to {model_path}")


# ------------- 테스트 코드 ------------
# 모든 책에서 사용된 키워드를 추출하여 공백 제거 및 리스트 생성
all_keywords = []
for keywords in book_details['keyword']:
    all_keywords.extend([keyword.strip() for keyword in keywords.split(',')])

# 고유 키워드의 개수 및 목록을 구함
unique_keywords = set(all_keywords)
unique_keywords_count = len(unique_keywords)

print(f"Total unique keywords: {unique_keywords_count}")
print("Unique keywords list:")
print(unique_keywords)


# 모든 키워드의 등장 횟수를 계산
keyword_counts = Counter(all_keywords)
# 키워드 별 수 
print("Keyword appearance counts:")
for keyword, count in keyword_counts.items():
    print(f"{keyword}: {count} times")