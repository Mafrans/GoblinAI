import asyncio
import time
from faker import Faker
from fastapi import APIRouter, Body
from fastapi.responses import StreamingResponse
from goblinai.server.api.schemas.GenerateBodySchema import GenerateBodySchema
from goblinai.server.generators.MockContentGenerator import MockContentGenerator
from goblinai.server.models.Story import Story

content = APIRouter(prefix="/api/stories/{storyId}/content")


@content.get("/")
def get(storyId: str):
    story = Story.getById(storyId)
    return story.content.get()


@content.post("/")
async def generate(storyId: str, body: GenerateBodySchema):
    story = Story.getById(storyId)
    generator = MockContentGenerator()

    def onFinish(newContent):
        story.content.append(newContent)
        story.content.save()

    return StreamingResponse(
        generator.generate(onFinish=onFinish),
        media_type="text/event-stream",
    )


@content.patch("/")
async def update(storyId: str, content: str):
    story = Story.getById(storyId)
    _, _, contentPath = story.getPath()

    story.content.update(content)
    story.content.save(contentPath)
