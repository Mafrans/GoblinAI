import asyncio
import time
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from server.model.Message import Message

from server.model.Story import Story

messages = APIRouter(prefix="/api/stories/{storyId}/messages")


@messages.get("/")
def getAllMessages(storyId: str):
    story = Story.load(storyId)
    return story.getMessages()


async def messageStreamer(story: Story):
    message = Message.mock(len(story.getMessages()))
    for c in message.content:
        await asyncio.sleep(0.025)
        yield c


@messages.post("/")
async def generateMessage(storyId: str):
    return StreamingResponse(
        messageStreamer(Story.load(storyId)), media_type="text/event-stream"
    )
