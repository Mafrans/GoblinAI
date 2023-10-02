from fastapi import APIRouter

from goblinai.server.model.Story import Story

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
