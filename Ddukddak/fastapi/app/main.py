from fastapi import FastAPI, APIRouter, File, UploadFile
from schemas import MakePhoto, ExtractPhoto  # 현재 디렉터리 내 schemas.py에서 클래스 가져오기
from hybridRecommendations import hybrid_recommendations
from makephoto import make_fairytale_photo
from stt import stt

app = FastAPI(swagger_ui=True)

# APIRouter를 사용하여 /api/v1/f 아래에 들어갈 경로를 묶음
router = APIRouter(prefix="/api/v1/f", tags=["api"])

@app.get("/")
async def test():
    return "test"

@router.get("/recommendations/{userSeq}", tags=["api"])
async def create_recommendation(userSeq: int):
    recommendations = hybrid_recommendations(user_seq=userSeq)
    return {"recommendations": recommendations}

@router.post("/makephoto/", tags=["api"])
async def create_maked_photo(makephoto: MakePhoto):
    return {"makephoto": makephoto}

@router.post("/extract-face/", tags=["api"])
async def extract_face(extractphoto : ExtractPhoto):
    print("들어옴")
    result = make_fairytale_photo(extractphoto.userSeq, extractphoto.photoId)
    return {"result" : result}

# @app.post("/api/v1/f/test")
# async def test_extract(extractphoto : ExtractPhoto):
#     return upload_file(extractphoto.userSeq, extractphoto.photoId)

@router.post("/stt", tags=["api"])
async def startStt(file: UploadFile = File(...)):
    print("STT 실행")
    result=await stt(file)
    return {'result': result}

# 앱에 라우터 추가
app.include_router(router)