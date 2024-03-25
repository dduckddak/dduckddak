from dataset import review_info_list
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from joblib import dump
from collections import Counter
from itertools import combinations

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


# ------------- 키워드 정보 추출 코드  ------------
# 모든 책에서 사용된 키워드를 추출하여 공백 제거 및 리스트 생성
# all_keywords = []
# for keywords in book_details['keyword']:
#     all_keywords.extend([keyword.strip() for keyword in keywords.split(',')])

# # 고유 키워드의 개수 및 목록을 구함
# unique_keywords = set(all_keywords)
# unique_keywords_count = len(unique_keywords)

# print(f"Total unique keywords: {unique_keywords_count}")

# # 모든 키워드의 등장 횟수를 계산
# keyword_counts = Counter(all_keywords)
# # 등장 횟수에 따라 키워드를 정렬하여 출력
# most_common_keywords = keyword_counts.most_common()
# # 키워드 별 수 
# print("Keyword appearance counts:")
# for keyword, count in most_common_keywords:
#     print(f"{keyword}: {count} 번")

# #가장 다양한 키워드를 포함하고 있는 8권의 책 조합 
# # 책 ID와 키워드만 추출
# book_keywords = pd.DataFrame({
#     'book_id': book_details['book_id'],
#     'keywords': book_details['keyword'].apply(lambda x: set([keyword.strip() for keyword in x.split(',')]))
# })

# # 키워드 빈도 계산
# keyword_freq = Counter(all_keywords)

# # 각 책별 고유 키워드 리스트 생성
# book_keywords['unique_keywords'] = book_keywords['keywords'].apply(lambda x: set(x))

# # 드문 키워드를 포함하는 책 선정
# rare_keywords_books = set()
# for keyword, freq in keyword_freq.items():
#     if freq <= 1:  # 예시로 빈도가 2 이하인 키워드를 드문 키워드로 가정
#         for index, row in book_keywords.iterrows():
#             if keyword in row['unique_keywords']:
#                 rare_keywords_books.add(row['book_id'])
#                 break  # 해당 키워드를 포함하는 첫 번째 책을 선택

# # 남은 책들 중에서 고유 키워드를 최대한 많이 커버할 수 있는 책 선택
# remaining_books = set(book_keywords['book_id']) - rare_keywords_books
# remaining_combinations = combinations(remaining_books, 16 - len(rare_keywords_books))

# max_covered_keywords = 0
# best_combination = None
# for combination in remaining_combinations:
#     combined_keywords = set()
#     for book_id in combination:
#         combined_keywords |= book_keywords.loc[book_keywords['book_id'] == book_id, 'unique_keywords'].values[0]
#     for book_id in rare_keywords_books:
#         combined_keywords |= book_keywords.loc[book_keywords['book_id'] == book_id, 'unique_keywords'].values[0]

#     if len(combined_keywords) > max_covered_keywords:
#         max_covered_keywords = len(combined_keywords)
#         best_combination = combination

# # 최종 선택된 책 조합
# final_selection = list(rare_keywords_books) + list(best_combination)
# print(f"Selected books: {final_selection}")
# print(f"Covered unique keywords: {max_covered_keywords}")

# # 최종 선택된 책들의 키워드 집합 생성
# final_keywords = set()
# for book_id in final_selection:
#     final_keywords |= book_keywords.loc[book_keywords['book_id'] == book_id, 'unique_keywords'].values[0]

# # 최종 선택된 책들의 키워드 등장 횟수 계산
# final_keyword_counts = Counter({keyword: 0 for keyword in final_keywords})
# for book_id in final_selection:
#     book_keywords_set = book_keywords.loc[book_keywords['book_id'] == book_id, 'unique_keywords'].values[0]
#     for keyword in book_keywords_set:
#         if keyword in final_keyword_counts:
#             final_keyword_counts[keyword] += 1

# # 키워드와 등장 횟수 출력
# print("Final keywords and their counts:")
# for keyword, count in final_keyword_counts.items():
#     print(f"{keyword}: {count}번")
