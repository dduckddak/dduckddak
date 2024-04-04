import pymysql
import os

def get_database_connection():
    return pymysql.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_DATABASE"),
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

def get_user_preferences_and_reviewed_books(user_seq):
    connection = get_database_connection()
    likes, dislikes, reviewed_books = [], [], []
    try:
        with connection.cursor() as cursor:
            # 사용자가 리뷰를 남긴 책 목록 조회 (좋아요, 싫어요 포함)
            cursor.execute("""
                SELECT book_id, is_like 
                FROM review 
                WHERE user_seq = %s
            """, (user_seq,))
            reviews = cursor.fetchall()
            
            # 조회 결과에서 좋아요, 싫어요 분리
            for review in reviews:
                reviewed_books.append(review['book_id'])
                if review['is_like']:
                    likes.append(review['book_id'])
                else:
                    dislikes.append(review['book_id'])

    finally:
        connection.close()

    return likes, dislikes, reviewed_books
