from pydantic import BaseModel
from typing import List, Optional

#사용자의 좋아요, 싫어요 목록 
class UserPreferences(BaseModel):
    likes: List[int]
    dislikes: List[int]

class MakePhoto(BaseModel):
    mainPhoto : int
    subPhoto : int
    bookId : int

class ExtractPhoto(BaseModel):
    userSeq : int
    photoId : int

class ReviewInfo(BaseModel):
    book_id: int
    book_author: Optional[str] = None
    user_seq: Optional[int] = None
    is_like: Optional[int] = None
    keyword: Optional[str] = None

class ReviewInfoList(BaseModel):
    reviews: List[ReviewInfo]