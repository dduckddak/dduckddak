from fastapi import FastAPI
from schemas import UserPreferences, MakePhoto, ExtractPhoto  # 현재 디렉터리 내 schemas.py에서 클래스 가져오기
from recommendations import get_recommendations
from makephoto import make_fairytale_photo

app = FastAPI()

@app.get("/")
async def test():
    return "test"

@app.post("/api/v1/f/recommendations/")
async def create_recommendation(preferences: UserPreferences):
    recommendations = get_recommendations(preferences.likes, preferences.dislikes, top_n=7)
    return {"recommendations": recommendations}

@app.post("/api/v1/f/makephoto/")
async def create_maked_photo(makephoto: MakePhoto):
    return {"makephoto": makephoto}

@app.post("/api/v1/f/extract-face/")
async def extract_face(extractphoto : ExtractPhoto):
    print("들어옴")
    result = make_fairytale_photo(extractphoto.userSeq, extractphoto.photoId)
    return {"result" : result}

# @app.post("/api/v1/f/test")
# async def test_extract(extractphoto : ExtractPhoto):
#     return upload_file(extractphoto.userSeq, extractphoto.photoId)
