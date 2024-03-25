def hybrid_recommendation(user_id, cf_recommendations, content_based_recommendations, top_n=7):
    # cf_recommendations와 content_based_recommendations는 각각 (book_id, score) 형태의 리스트입니다.
    
    # 두 리스트를 합치기
    combined_recommendations = cf_recommendations + content_based_recommendations
    
    # book_id별로 점수를 합산
    combined_scores = {}
    for book_id, score in combined_recommendations:
        if book_id in combined_scores:
            combined_scores[book_id] += score
        else:
            combined_scores[book_id] = score
    
    # 점수가 높은 순으로 정렬하여 상위 N개 선택
    final_recommendations = sorted(combined_scores.items(), key=lambda x: x[1], reverse=True)[:top_n]
    
    # 최종 추천된 book_id 리스트 반환
    return [book_id for book_id, _ in final_recommendations]

# 예제: cf_model과 content_based_model에서 추천받은 결과를 대입
cf_recommendations = [(book_id, score) for book_id, score in enumerate(np.random.rand(50))]  # 예시 데이터
content_based_recommendations = [(book_id, score) for book_id, score in enumerate(np.random.rand(50), start=50)]  # 예시 데이터

# 사용자 ID에 대해 하이브리드 추천 실행
user_id = 1  # 사용자 ID 예시
final_recommendations = hybrid_recommendation(user_id, cf_recommendations, content_based_recommendations)

print("Final Recommendations (Book IDs):", final_recommendations)
