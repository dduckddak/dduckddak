from joblib import load
import numpy as np
from pathlib import Path

# 현재 파일 위치에서 상위 디렉토리로 이동한 후, models 디렉토리의 절대 경로 구성
current_directory = Path(__file__).parent
project_root = current_directory.parent
model_file_path = project_root / 'models' / 'contents_based_model.pkl'

# 저장된 cosine_sim 배열 로드
cosine_sim = load(model_file_path)

def get_recommendations(likes, dislikes, top_n=7):
    scores = np.zeros(cosine_sim.shape[0])
    
    # 좋아요 목록에 대한 가중치 적용
    for like in likes:
        like_idx = like - 1  # book_id를 인덱스로 변환
        scores += cosine_sim[like_idx] * 1.5  # 긍정적 가중치 적용

    # 싫어요 목록에 대한 가중치 적용
    for dislike in dislikes:
        dislike_idx = dislike - 1  # book_id를 인덱스로 변환
        scores -= cosine_sim[dislike_idx] * 0.5  # 부정적 가중치 적용

    # 가장 높은 점수를 가진 책들의 인덱스 추출
    recommended_indices = np.argsort(scores)[::-1]
    
    recommended_book_ids = [idx + 1 for idx in recommended_indices if (idx + 1) not in likes + dislikes][:top_n]

    # numpy.int64 타입을 Python 기본 int 타입으로 변환
    recommended_book_ids = [int(id) for id in recommended_book_ids]

    return recommended_book_ids