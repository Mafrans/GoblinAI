from datetime import datetime
import json
import os
import csv
import shutil
from typing import Any
from faker import Faker
from shortuuid import uuid
from goblinai.server.models.StoryContent import StoryContent

fake = Faker()

savePath = os.path.join(os.curdir, "saves")
os.makedirs(savePath, exist_ok=True)

cachedStories = 5
storyCache: dict[str, "Story"] = {}


class Story:
    id: str
    name: str
    createdAt: datetime
    editedAt: datetime
    content: StoryContent

    def __init__(self, name="Unnamed Story") -> None:
        self.id = uuid()
        self.name = name
        self.createdAt = datetime.now()
        self.editedAt = datetime.now()
        self.content = StoryContent(self.getPath()[2])

    def save(self):
        dirPath, storyPath, _ = self.getPath()

        os.makedirs(dirPath, exist_ok=True)
        with open(storyPath, "w") as file:
            json.dump(
                {
                    "id": self.id,
                    "name": self.name,
                    "createdAt": self.createdAt.isoformat(),
                    "editedAt": self.editedAt.isoformat(),
                },
                file,
            )
            file.close()

        self.content.save()

        pass

    def getPath(self):
        dirPath = os.path.join(savePath, self.id)
        storyPath = os.path.join(dirPath, "story.json")
        contentPath = os.path.join(dirPath, "content.txt")
        return dirPath, storyPath, contentPath

    def delete(self):
        dirPath, _, _ = self.getPath()
        shutil.rmtree(dirPath)

    def merge(self, other: Any) -> "Story":
        updated_data = self.__dict__
        for field, value in other.__dict__.items():
            if value is not None and field in updated_data:
                updated_data[field] = value
        return Story(**updated_data)

    @staticmethod
    def getById(id: str):
        if id in storyCache:
            return storyCache[id]

        story = Story()
        story.id = id
        _, storyPath, contentPath = story.getPath()

        if not os.path.exists(storyPath):
            return None

        with open(storyPath, "r") as file:
            data = json.load(file)
            story.id = id
            story.name = data["name"]
            story.createdAt = datetime.fromisoformat(data["createdAt"])
            story.editedAt = datetime.fromisoformat(data["editedAt"])
            file.close()

        story.content = StoryContent.load(contentPath)

        storyCache[id] = story
        return story

    @staticmethod
    def all():
        stories = []
        for id in filter(lambda f: "." not in f, os.listdir(savePath)):
            story = Story.getById(id)
            if story is not None:
                stories.append(story)

        return stories

    @staticmethod
    def mock():
        story = Story(" ".join(fake.words(3)).capitalize())
        story.createdAt = fake.date_time_this_year()
        story.editedAt = fake.date_time_between_dates(story.createdAt, datetime.now())
        return story
