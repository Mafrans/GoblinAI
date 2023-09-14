from fastapi import APIRouter

from server.model.story import Story

stories = APIRouter(prefix="/api/stories")


@stories.get("/")
def get():
    return {"stories": {Story.mock(), Story.mock()}}
