from dotenv import load_dotenv
import os
import pymysql
import pandas as pd
from schemas import ReviewInfo

load_dotenv()
db_user = os.getenv("DB_USER")
print(f"DB_USER: {db_user}")

# 환경 변수에서 데이터베이스 접속 정보 가져오기
DB_HOST = os.getenv("DB_HOST")
DB_PORT = int(os.getenv("DB_PORT"))
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_DATABASE = os.getenv("DB_DATABASE")

# MySQL 데이터베이스 연결
connection = pymysql.connect(
    host=DB_HOST,
    port=DB_PORT,
    user=DB_USER,
    password=DB_PASSWORD,
    database=DB_DATABASE,
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor)


try:
    # book 테이블 조회
    with connection.cursor() as cursor:
        sql = "SELECT book_id, book_author FROM book"
        cursor.execute(sql)
        book_data = cursor.fetchall()
    book_df = pd.DataFrame(book_data)

    # review 테이블에서 user_seq와 isLike 조회
    with connection.cursor() as cursor:
        sql = "SELECT book_id, user_seq, is_like FROM review"
        cursor.execute(sql)
        review_data = cursor.fetchall()
    review_df = pd.DataFrame(review_data)
    # isLike 값을 1과 0으로 변환
    review_df['is_like'] = review_df['is_like'].apply(lambda x: 1 if x else 0)

finally:
    connection.close()

# bookKeyword.csv 파일에서 'book_id'와 'keyword' 열만 읽기
keyword_df = pd.read_csv('bookKeyword.csv', encoding='CP949', usecols=['book_id', 'keyword'])


# book_id를 기준으로 데이터 합치기
merged_df = pd.merge(keyword_df, book_df, on='book_id', how='left')
merged_df = pd.merge(merged_df, review_df, on='book_id', how='left')

# Pydantic 모델 리스트 생성
review_info_list = [ReviewInfo(**row) for index, row in merged_df.iterrows()]
for review_info in review_info_list[:10]:
    print(review_info)

# 각 책의 키워드를 쉼표로 분리하고, 중복을 제거한 후 전체 키워드 개수 계산
all_keywords = set()
for keywords in keyword_df['keyword']:
    # 쉼표로 분리하고, 공백을 제거한 후 리스트로 변환
    keyword_list = [keyword.strip() for keyword in keywords.split(',')]
    # 중복을 제거하기 위해 집합에 추가
    all_keywords.update(keyword_list)

# 전체 키워드 개수 출력
# total_keywords_count = len(all_keywords)
# total_keywords_count

# print(total_keywords_count)
# print(all_keywords)