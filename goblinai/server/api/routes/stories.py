from fastapi import APIRouter, HTTPException
from goblinai.server.api.schemas.UpdateStorySchema import UpdateStorySchema

from goblinai.server.models.Story import Story

stories = APIRouter(prefix="/api/stories")


@stories.get("/")
def getAllStories():
    return Story.all()


@stories.post("/")
def postNewStory():
    story = Story()
    story.save()

    return story


@stories.get("/{id}/")
def getStoryById(id: str):
    story = Story.getById(id)
    if story is None:
        raise HTTPException(status_code=404, detail="Story not found")

    return story


@stories.delete("/{id}/")
def deleteStoryById(id: str):
    story = Story.getById(id)
    if story is None:
        raise HTTPException(status_code=404, detail="Story not found")

    story.delete()
    return Story.all()


@stories.patch("/{id}/")
def updateStory(id: str, body: UpdateStorySchema):
    story = Story.getById(id)
    if story is None:
        raise HTTPException(status_code=404, detail="Story not found")

    newStory = story.merge(body)
    newStory.save()
    return newStory
