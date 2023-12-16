from typing import AsyncGenerator


async def waitForGenerator(generator: AsyncGenerator) -> str:
    content = ""
    async for chunk in generator:
        content += str(chunk)
    return content
