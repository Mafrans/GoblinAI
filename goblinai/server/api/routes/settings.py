import os
from fastapi import APIRouter

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
    dir, _, _ = Story.getById(storyId).getPath()
    return Settings.load(os.path.join(dir, "settings.json"))


@settings.post("/{storyId}/")
def updateStorySettings(storyId: str, body: UpdateSettingsBodySchema):
    dir, _, _ = Story.getById(storyId).getPath()
    settings = Settings.load(os.path.join(dir, f"settings.json"))
    settings.merge(body)
    settings.save()
    return settings
