import asyncio
import time
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from goblinai.server.model.Message import Message

from goblinai.server.model.Story import Story

messages = APIRouter(prefix="/api/stories/{storyId}/messages")


@messages.get("/")
def getAllMessages(storyId: str):
    story = Story.getById(storyId)
    return story.getMessages()


async def messageStreamer(story: Story):
    message = Message.mock()
    for c in message.content:
        await asyncio.sleep(0.01)
        yield c

    story.addMessage(message)
    story.save()


@messages.post("/")
async def generateMessage(storyId: str):
    return StreamingResponse(
        messageStreamer(Story.getById(storyId)), media_type="text/event-stream"
    )
