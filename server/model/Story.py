from datetime import datetime
import json
import os
from faker import Faker
from shortuuid import uuid

from server.model.Message import Message

fake = Faker()

savePath = os.path.join(os.curdir, "saves")


class Story:
    id: str
    name: str
    createdAt: datetime
    editedAt: datetime
    _messages: list[Message] = []

    def __init__(self, name="Unnamed Story") -> None:
        self.id = uuid()
        self.name = name
        self.createdAt = datetime.now()
        self.editedAt = datetime.now()

    def save(self):
        dirPath, storyPath, contentPath = self.getPath()

        os.makedirs(dirPath)
        with open(storyPath, "w") as file:
            json.dump(self.json(), file)

        if len(self._messages) > 0:
            with open(contentPath, "w") as file:
                file.truncate(0)
                file.writelines(self._messages)

        pass

    def getPath(self):
        dirPath = os.path.join(savePath, self.id)
        storyPath = os.path.join(dirPath, "story.json")
        contentPath = os.path.join(dirPath, "content.txt")
        return dirPath, storyPath, contentPath

    def getMessages(self):
        if not self._messages:
            _, _, contentPath = self.getPath()
            with open(contentPath, "r") as file:
                for line, i in file.readlines():
                    self._messages[i] = Message.parse(line, i)

        return self._messages

    def json(self):
        return {
            "id": self.id,
            "name": self.name,
            "createdAt": self.createdAt.isoformat(),
            "editedAt": self.editedAt.isoformat(),
        }

    @staticmethod
    def load(id: str):
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

        return story

    @staticmethod
    def all():
        stories = []
        for id in filter(lambda f: not "." in f, os.listdir(savePath)):
            story = Story.load(id)
            if story != None:
                stories.append(story)

        return stories

    @staticmethod
    def mock():
        story = Story(" ".join(fake.words(3)).capitalize())
        story.createdAt = fake.date_time_this_year()
        story.editedAt = fake.date_time_between_dates(story.createdAt, datetime.now())
        return story
