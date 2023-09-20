from fastapi import APIRouter

from server.model.Story import Story

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
    return Story.load(id)


@stories.delete("/{id}/")
def deleteStoryById(id: str):
    story = Story.load(id)
    story.delete()
    return Story.all()
