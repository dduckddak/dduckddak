import dataset
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


# basic collaborative filtering algorithm taking into account a baseline rating.
sim_options = {'name': 'cosine',
               'user_based': False  # compute  similarities between items
               }
knnbaseline_algo = KNNBaseline(sim_options=sim_options)

knnbaseline_algo.fit(trainset)
knnbaseline_predictions = knnbaseline_algo.test(testset)

file_name = 'KnnBaseline_model'
dump.dump(file_name, algo=knnbaseline_predictions)
# _, loaded_algo = dump.load(file_name)

accuracy.rmse(knnbaseline_predictions)
accuracy.mae(knnbaseline_predictions)
print("Done!")

svd_algo = SVD()

svd_algo.fit(trainset)
svd_predictions = svd_algo.test(testset)

file_name = 'svd_model'
dump.dump(file_name, algo=svd_algo)
# _, loaded_algo = dump.load(file_name)

accuracy.rmse(svd_predictions)
accuracy.mae(svd_predictions)
print("Done!")

svdpp_algo = SVDpp()

svdpp_algo.fit(trainset)
svdpp_predictions = svdpp_algo.test(testset)

file_name = 'svd_model'
dump.dump(file_name, algo=svdpp_algo)
# _, loaded_algo = dump.load(file_name)

accuracy.rmse(svdpp_predictions)
accuracy.mae(svdpp_predictions)
print("Done!")