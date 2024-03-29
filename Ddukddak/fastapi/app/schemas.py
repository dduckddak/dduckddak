from pydantic import BaseModel
from typing import List, Optional

class ResponseModel(BaseModel):
    status_code: int
    message: str

#사용자의 좋아요, 싫어요 목록 
class UserPreferences(BaseModel):
    likes: List[int]
    dislikes: List[int]

class MakePhoto(BaseModel):
    userSeq : int
    mainPhoto : int
    subPhoto : int
    bookId : int
    generatedId : int

class ExtractPhoto(BaseModel):
    userSeq : int
    photo: str  # Base64 인코딩된 이미지 데이터

class ReviewInfo(BaseModel):
    book_id: int
    book_author: Optional[str] = None
    user_seq: Optional[int] = None
    is_like: Optional[int] = None
    keyword: Optional[str] = None

class ReviewInfoList(BaseModel):
    reviews: List[ReviewInfo]

class BookInfo(BaseModel):
    book_id: int
    book_title: Optional[str] = None
    book_author: Optional[str] = None

class BookInfoList(BaseModel):
    books: List[BookInfo]