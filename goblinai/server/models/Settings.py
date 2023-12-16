import json
import os
from typing import Any

settingsPath = os.path.join(os.curdir, "settings.json")


class Settings:
    paragraphStyle: str

    def __init__(self, paragraphStyle: str = "indent"):
        self.paragraphStyle = paragraphStyle

    def save(self):
        with open(settingsPath, "w") as file:
            json.dump({"paragraphStyle": self.paragraphStyle}, file)
            file.close()

    def merge(self, other: Any) -> "Settings":
        updated_data = self.__dict__
        for field, value in other.__dict__.items():
            if value is not None and field in updated_data:
                updated_data[field] = value
        return Settings(**updated_data)

    @staticmethod
    def load(path=settingsPath):
        if os.path.exists(path):
            with open(path, "r") as file:
                data = json.load(file)
                settings = Settings(**data)
                file.close()
            return settings

        if os.path.exists(settingsPath):
            return Settings.load(settingsPath)

        settings = Settings()
        settings.save()
        return settings
