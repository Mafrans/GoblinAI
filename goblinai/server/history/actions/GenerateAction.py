from typing import AsyncGenerator, Callable
from goblinai.server.generators.Generator import Generator
from goblinai.server.history.Action import Action
from goblinai.server.history.actions.EraseAction import EraseAction


class GenerateAction(Action):
    """Generates new content"""

    generator: Generator
    generated: str

    def __init__(
        self,
        generator: Generator,
    ) -> None:
        self.generator = generator
        self.generated = ""

    async def apply(self, content: str) -> AsyncGenerator[str, None]:
        stream = self.generator.generate()

        async for chunk in stream:
            self.generated += str(chunk)
            yield content + self.generated

    def undo(self) -> Action:
        if not self.generated:
            raise Exception("Cannot undo a generator that has not been applied yet")

        return EraseAction(len(self.generated))
