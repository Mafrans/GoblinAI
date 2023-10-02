import asyncio
import time
from fastapi import APIRouter, Body
from fastapi.responses import StreamingResponse
from goblinai.server.model.GenerateMessageBody import GenerateMessageBody
from goblinai.server.model.Message import Message
from goblinai.server.model.Story import Story

messages = APIRouter(prefix="/api/stories/{storyId}/messages")


@messages.get("/")
def getAllMessages(storyId: str):
    story = Story.getById(storyId)
    return story.getMessages()


async def messageStreamer(story: Story, startContent: str = ""):
    message = Message.mock(startContent)

    for c in message.content:
        await asyncio.sleep(0.01)
        yield c

    story.addMessage(message)
    story.save()


@messages.post("/")
async def generateMessage(storyId: str, body: GenerateMessageBody):
    return StreamingResponse(
        messageStreamer(Story.getById(storyId), body.startContent),
        media_type="text/event-stream",
    )
