from datetime import datetime
from faker import Faker
from shortuuid import uuid

fake = Faker()


class Story:
    id: str
    name: str
    createdAt: datetime
    editedAt: datetime

    def __init__(self, name) -> None:
        self.id = uuid()
        self.name = name
        self.createdAt = datetime.now()
        self.editedAt = datetime.now()
        pass

    @staticmethod
    def mock():
        story = Story(" ".join(fake.words(3)).capitalize())
        story.createdAt = fake.date_time_this_year()
        story.editedAt = fake.date_time_between_dates(story.createdAt, datetime.now())
        return story
