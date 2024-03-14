from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from recommendations import get_recommendations

app = FastAPI ()

#사용자의 좋아요, 싫어요 목록 
class UserPreferences(BaseModel):
    likes: List[int]
    dislikes: List[int]

@app.get("/")
async def test():
    return "test"

@app.post("/api/v1/k/recommendations/")
async def create_recommendation(preferences: UserPreferences):
    recommendations = get_recommendations(preferences.likes, preferences.dislikes, top_n=7)
    return {"recommendations": recommendations}