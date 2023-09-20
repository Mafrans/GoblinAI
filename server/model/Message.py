from datetime import datetime
from random import randint
from faker import Faker


fake = Faker()


class Message:
    index: int
    content: str
    createdAt: datetime

    def __init__(self, index=0, content="", createdAt=datetime.now()):
        self.index = index
        self.content = content
        self.createdAt = createdAt

    def __str__(self):
        return f"{self.createdAt.isoformat()}\t{self.content}"

    @staticmethod
    def parse(line: str, index: int = 0):
        createdAt, *content = "\t".split(line)
        return Message(index, content, datetime.fromisoformat(createdAt))

    @staticmethod
    def mock(index: int):
        return Message(
            index, " ".join(fake.words(randint(30, 150))).capitalize(), datetime.now()
        )
