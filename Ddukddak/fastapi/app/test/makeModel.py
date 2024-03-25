from joblib import load
import numpy as np
import pandas as pd
from surprise import Dataset, Reader
from surprise.model_selection import train_test_split
from surprise import SVD, accuracy

# 컨텐츠 기반 필터링 함수 (이미 정의되었다고 가정)
def get_recommendations(likes, dislikes, top_n=7):
    # 컨텐츠 기반 필터링 로직 (더미 데이터로 대체)
    all_book_ids = np.arange(1, 101)  # 1부터 100까지의 책 ID를 가정
    recommended_book_ids = np.random.choice(all_book_ids, size=top_n, replace=False)
    return recommended_book_ids.tolist()

# 사용자의 좋아요 및 싫어요 목록 (더미 데이터)
likes = [1, 2, 3,30,89,91,92,93]
dislikes = [4, 5]

# 컨텐츠 기반 필터링으로 추천받은 책의 목록
content_based_recommendations = get_recommendations(likes, dislikes, top_n=7)

# 협업 필터링 (더미 데이터로 구현)
ratings = pd.DataFrame({
    'user_id': np.random.randint(1, 100, size=100),
    'book_id': np.random.randint(1, 101, size=100),
    'rating': np.random.rand(100)
})
reader = Reader(rating_scale=(0, 1))
data = Dataset.load_from_df(ratings[['user_id', 'book_id', 'rating']], reader)
trainset, testset = train_test_split(data, test_size=0.25)
algo = SVD()
algo.fit(trainset)
predictions = algo.test(testset)

# 협업 필터링으로 추천받은 책의 목록 정렬 및 선택
predictions_sorted = sorted(predictions, key=lambda x: x.est, reverse=True)
collaborative_recommendations = [pred.iid for pred in predictions_sorted][:7]

# 두 추천 목록을 합침
final_recommendations = list(set(content_based_recommendations + collaborative_recommendations))

# 최종 추천 목록에서 최대 7권 선택
final_recommendations = final_recommendations[:7]

print("Final Recommendations:", final_recommendations)
