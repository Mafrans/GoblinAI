from datetime import datetime
import json
import os
import shutil
from faker import Faker
from shortuuid import uuid
from server.model.Message import Message

fake = Faker()

savePath = os.path.join(os.curdir, "saves")
os.makedirs(savePath, exist_ok=True)

cachedStories = 5
storyCache = {}


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

        os.makedirs(dirPath, exist_ok=True)
        with open(storyPath, "w") as file:
            json.dump(self.json(), file)

        if len(self._messages) > 0:
            with open(contentPath, "w") as file:
                file.truncate(0)
                print([str(message) for message in self._messages])
                file.writelines(
                    "\n".join([str(m) for m in self._messages if m.content != ""])
                )
                file.close()

        pass

    def getPath(self):
        dirPath = os.path.join(savePath, self.id)
        storyPath = os.path.join(dirPath, "story.json")
        contentPath = os.path.join(dirPath, "content.txt")
        return dirPath, storyPath, contentPath

    def getMessages(self):
        if not self._messages:
            _, _, contentPath = self.getPath()
            if os.path.exists(contentPath):
                with open(contentPath, "r") as file:
                    self._messages = [Message.parse(line) for line in file.readlines()]

        return self._messages

    def addMessage(self, message: Message):
        if not self._messages:
            self.getMessages()

        self._messages.append(message)

    def json(self):
        return {
            "id": self.id,
            "name": self.name,
            "createdAt": self.createdAt.isoformat(),
            "editedAt": self.editedAt.isoformat(),
        }

    def delete(self):
        dirPath, _, _ = self.getPath()
        shutil.rmtree(dirPath)

    @staticmethod
    def getById(id: str):
        if id in storyCache:
            return storyCache[id]

        story = Story()
        story.id = id
        _, storyPath, _ = story.getPath()

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
            story = Story.getById(id)
            if story != None:
                stories.append(story)

        return stories

    @staticmethod
    def mock():
        story = Story(" ".join(fake.words(3)).capitalize())
        story.createdAt = fake.date_time_this_year()
        story.editedAt = fake.date_time_between_dates(story.createdAt, datetime.now())
        return story
