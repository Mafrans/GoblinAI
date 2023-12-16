import asyncio
from faker import Faker
from goblinai.server.generators.Generator import (
    Generator,
)

fake = Faker()


class MockContentGenerator(Generator):
    async def generate(
        self, onFinish: Generator.FinishCallback | None = None
    ) -> Generator.Stream:
        mockedContent: str = fake.paragraph()
        for c in mockedContent:
            await asyncio.sleep(0.01)
            yield c

        if onFinish is not None:
            onFinish(mockedContent)
