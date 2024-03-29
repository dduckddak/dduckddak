from fastapi import FastAPI, APIRouter, File, UploadFile
from makephoto import get_extract_face_photo, make_fairytale_photo, set_yes_photo
from schemas import MakePhoto, ExtractPhoto, ResponseModel  # 현재 디렉터리 내 schemas.py에서 클래스 가져오기
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
    result = make_fairytale_photo(makephoto.userSeq, makephoto.mainPhoto, makephoto.subPhoto, makephoto.bookId, makephoto.generatedId)
    return {"result": result}

@router.post("/extract-face/", tags=["api"])
async def extract_face(extractphoto : ExtractPhoto):
    status_code, message = get_extract_face_photo(extractphoto.userSeq, extractphoto.photo)
    # print(extractphoto.userSeq, extractphoto.photo)
    return ResponseModel(status_code=status_code, message=message)

@router.post("/stt", tags=["api"])
async def startStt(file: UploadFile = File(...)):
    print("STT 실행")
    result=await stt(file)
    return {'result': result}


# 앱에 라우터 추가
app.include_router(router)

