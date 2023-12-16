import os
from fastapi import APIRouter, HTTPException

from goblinai.server.models.Settings import Settings
from goblinai.server.models.Story import Story
from goblinai.server.api.schemas.UpdateSettingsBodySchema import (
    UpdateSettingsBodySchema,
)

settings = APIRouter(prefix="/api/settings")


@settings.get("/")
def getSettings():
    return Settings.load()


@settings.post("/")
def updateSettings(body: UpdateSettingsBodySchema):
    settings = Settings.load()
    settings.merge(body)
    settings.save()
    return settings


@settings.get("/{storyId}/")
def getStorySettings(storyId: str):
    story = Story.getById(storyId)
    if story is None:
        raise HTTPException(status_code=404, detail="Story not found")

    dir, _, _ = story.getPath()
    return Settings.load(os.path.join(dir, "settings.json"))


@settings.post("/{storyId}/")
def updateStorySettings(storyId: str, body: UpdateSettingsBodySchema):
    story = Story.getById(storyId)
    if story is None:
        raise HTTPException(status_code=404, detail="Story not found")

    dir, _, _ = story.getPath()
    settings = Settings.load(os.path.join(dir, f"settings.json"))
    settings.merge(body)
    settings.save()
    return settings
