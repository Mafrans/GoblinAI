from fastapi import APIRouter

from goblinai.server.model.Settings import Settings
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
