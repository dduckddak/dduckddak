from allDataset import review_info_list
import pandas as pd
from surprise import Dataset, Reader, SVD
from surprise.model_selection import train_test_split
from surprise import accuracy
from joblib import dump

# ReviewInfoList에서 리뷰 데이터를 DataFrame으로 변환
df = pd.DataFrame([{
    'user_seq': review.user_seq,
    'book_id': review.book_id,
    'rating': review.is_like
} for review in review_info_list.reviews])

# Surprise 라이브러리를 사용하기 위한 Reader 설정
# 여기서는 좋아요(is_like) 필드가 0과 1 사이의 값
reader = Reader(rating_scale=(0, 1))

# 데이터 로드
data = Dataset.load_from_df(df[['user_seq', 'book_id', 'rating']], reader)

# 데이터를 훈련 세트와 테스트 세트로 분할
trainset, testset = train_test_split(data, test_size=0.2)
 
# SVD 모델 인스턴스화 및 훈련
model = SVD()
model.fit(trainset)

# 테스트 세트에 대한 예측 수행 및 RMSE 계산
predictions = model.test(testset)
accuracy.rmse(predictions)

# 모델 저장
model_filename = 'models/cf_model.joblib'
dump(model, model_filename)

# 이 스크립트는 사용자-책 평점 데이터를 사용하여 협업 필터링 모델을 훈련시키고 저장합니다.
# 저장된 모델은 추후 사용자별 책 추천을 생성하는 데 사용할 수 있습니다.
