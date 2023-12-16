import asyncio
import time
from faker import Faker
from fastapi import APIRouter, Body, HTTPException
from fastapi.responses import StreamingResponse
from goblinai.server.api.schemas.GenerateBodySchema import GenerateBodySchema
from goblinai.server.generators.MockContentGenerator import MockContentGenerator
from goblinai.server.history.actions.AppendAction import AppendAction
from goblinai.server.history.actions.GenerateAction import GenerateAction
from goblinai.server.models.Story import Story

content = APIRouter(prefix="/api/stories/{storyId}/content")


@content.get("/")
def get(storyId: str):
    story = Story.getById(storyId)
    if story is None:
        raise HTTPException(status_code=404, detail="Story not found")

    return story.content.get()


@content.post("/")
async def generate(storyId: str, body: GenerateBodySchema):
    story = Story.getById(storyId)
    if story is None:
        raise HTTPException(status_code=404, detail="Story not found")

    generator = MockContentGenerator()
    action = GenerateAction(generator)

    previousContent = story.content.get()

    async def preview():
        async for chunk in story.content.apply(action):
            yield chunk[len(previousContent) :]

    return StreamingResponse(
        preview(),
        media_type="text/event-stream",
    )


@content.post("/undo")
async def undo(storyId: str):
    story = Story.getById(storyId)
    if story is None:
        raise HTTPException(status_code=404, detail="Story not found")

    return await story.content.undo()


@content.post("/redo")
async def redo(storyId: str):
    story = Story.getById(storyId)
    if story is None:
        raise HTTPException(status_code=404, detail="Story not found")

    return await story.content.redo()


@content.patch("/")
async def update(storyId: str, content: str):
    story = Story.getById(storyId)
    if story is None:
        raise HTTPException(status_code=404, detail="Story not found")

    story.content.save()
