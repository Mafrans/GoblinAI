from datetime import datetime
from random import randint
from faker import Faker


fake = Faker()


class Message:
    content: str
    createdAt: datetime

    def __init__(self, content="", createdAt=datetime.now()):
        self.content = content
        self.createdAt = createdAt

    def __str__(self):
        return f"{self.createdAt.isoformat()}\t{self.content.encode('unicode_escape')}"

    @staticmethod
    def parse(line: str):
        createdAt, content = line.split("\t", 1)
        if not content:
            return None

        return Message(
            bytes(content).decode("unicode_escape"), datetime.fromisoformat(createdAt)
        )

    @staticmethod
    def mock(startContent: str = ""):
        content = startContent

        for i in range(0, randint(0, 3)):
            if i > 0:
                content += "\n"
            content += " ".join(fake.words(randint(30, 80))).capitalize()

        return Message(content, datetime.now())
