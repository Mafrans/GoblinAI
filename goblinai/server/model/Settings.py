import json
import os

settingsPath = os.path.join(os.curdir, "settings.json")


class Settings:
    paragraphStyle: str

    def __init__(self, paragraphStyle: str = "indent"):
        self.paragraphStyle = paragraphStyle

    def save(self):
        with open(settingsPath, "w") as file:
            json.dump({
                "paragraphStyle": self.paragraphStyle
            }, file)
            file.close()

    def merge(self, other: 'Settings') -> 'Settings':
        updated_data = self.__dict__
        for field, value in other.__dict__.items():
            # If the value from `other` is not None, update it in the current object
            if value is not None:
                updated_data[field] = value
        return Settings(**updated_data)

    @staticmethod
    def load():
        if not os.path.exists(settingsPath):
            settings = Settings()
            settings.save()
            return settings

        with open(settingsPath, "r") as file:
            data = json.load(file)
            settings = Settings(**data)
            file.close()

        return settings
