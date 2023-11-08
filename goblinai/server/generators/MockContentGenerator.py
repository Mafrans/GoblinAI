import asyncio
from faker import Faker
from goblinai.server.generators.Generator import Generator

fake = Faker()


class MockContentGenerator(Generator):
    async def generate(self, onFinish: callable) -> str:
        mockedContent = fake.paragraph()
        for c in mockedContent:
            await asyncio.sleep(0.01)
            yield c

        onFinish(mockedContent)
