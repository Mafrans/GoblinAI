from typing import AsyncGenerator
from goblinai.server.history.Action import Action


class ReplaceAction(Action):
    """Replaces characters from the content"""

    start: int
    end: int
    replacement: str
    replaced: str

    def __init__(self, start: int, end: int, replacement: str) -> None:
        self.start = start
        self.end = end
        self.replacement = replacement

    async def apply(self, content: str) -> AsyncGenerator[str, None]:
        self.replaced = content[self.start : self.end]
        yield content[: self.start] + self.replacement + content[self.end :]

    def undo(self) -> Action:
        if self.replaced is None:
            raise Exception("Cannot undo a replacement that has not been applied yet")

        return ReplaceAction(
            self.start, self.start + len(self.replacement), self.replaced
        )
