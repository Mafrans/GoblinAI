import os
from fastapi import APIRouter

from goblinai.server.model.Settings import Settings
from goblinai.server.model.Story import Story
from goblinai.server.model.UpdateSettingsBody import UpdateSettingsBody

settings = APIRouter(prefix="/api/settings")


@settings.get("/")
def getSettings():
    return Settings.load()


@settings.post("/")
def updateSettings(body: UpdateSettingsBody):
    settings = Settings.load()
    settings.merge(body)
    settings.save()
    return settings


@settings.get("/{storyId}/")
def getStorySettings(storyId: str):
    dir, _, _ = Story.getById(storyId).getPath()
    return Settings.load(os.path.join(dir, "settings.json"))


@settings.post("/{storyId}/")
def updateStorySettings(storyId: str, body: UpdateSettingsBody):
    dir, _, _ = Story.getById(storyId).getPath()
    settings = Settings.load(os.path.join(dir, f"settings.json"))
    settings.merge(body)
    settings.save()
    return settings
