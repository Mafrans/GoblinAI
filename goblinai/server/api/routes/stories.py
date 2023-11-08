from fastapi import APIRouter
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
    return Story.getById(id)


@stories.delete("/{id}/")
def deleteStoryById(id: str):
    story = Story.getById(id)
    story.delete()
    return Story.all()


@stories.patch("/{id}/")
def updateStory(id: str, body: UpdateStorySchema):
    story = Story.getById(id)
    newStory = story.merge(body)
    newStory.save()
    return newStory
