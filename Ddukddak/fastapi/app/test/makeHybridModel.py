from dataset import review_info_list
import pandas as pd
import numpy as np

from surprise import SVD, BaselineOnly, SVDpp, NMF, SlopeOne, CoClustering, Reader
from surprise import Dataset
from surprise.model_selection import train_test_split
from surprise.prediction_algorithms import KNNBaseline, KNNBasic, KNNWithMeans, KNNWithZScore
from surprise import accuracy
from surprise import dump

# ReviewInfoList에서 reviews 리스트를 추출하여 각 객체의 속성을 딕셔너리로 변환한 후 DataFrame으로 변환
df = pd.DataFrame([review.model_dump() for review in review_info_list.reviews])

# Surprise 라이브러리를 사용하기 위한 Reader 설정
reader = Reader(rating_scale=(0, 1))  # is_like 필드가 0과 1 사이의 값을 가진다고 가정
data = Dataset.load_from_df(df[['user_seq', 'book_id', 'is_like']], reader)

# 데이터를 훈련 세트와 테스트 세트로 분할
trainset, testset = train_test_split(data, test_size=0.2, random_state=42)

# 테스트 세트 출력
print("테스트 데이터")
for item in testset:
    print(item)

# SVD 모델 인스턴스화 및 훈련
model = SVD()
model.fit(trainset)

# 테스트 세트에 대한 예측 수행 및 RMSE 계산
predictions = model.test(testset)
accuracy.rmse(predictions)

def get_top_n_recommendations(user_seq, n=10):
    # 모든 책에 대해 해당 사용자의 예상 평점을 계산
    predictions = [model.predict(user_seq, book_id) for book_id in df['book_id'].unique()]
    
    # 예상 평점이 높은 순으로 책을 정렬하고 상위 N개를 추출
    top_n_predictions = sorted(predictions, key=lambda x: x.est, reverse=True)[:n]
    
    # 추천된 책의 ID와 예상 평점을 출력
    for pred in top_n_predictions:
        print(f"Book ID: {pred.iid}, Estimated Rating: {pred.est}")

# 예시 사용자에 대한 상위 10개 책 추천 생성
get_top_n_recommendations(user_seq=1, n=10)