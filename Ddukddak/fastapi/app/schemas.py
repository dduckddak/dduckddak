from pydantic import BaseModel
from typing import List

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