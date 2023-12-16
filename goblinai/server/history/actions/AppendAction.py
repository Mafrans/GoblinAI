from typing import AsyncGenerator
from goblinai.server.history.Action import Action


class AppendAction(Action):
    """Adds characters to the content, optionally at a given position"""

    newContent: str
    start: int | None

    def __init__(self, newContent: str, start: int | None = None) -> None:
        self.newContent = newContent
        self.start = start

    async def apply(self, content: str) -> AsyncGenerator[str, None]:
        yield content[: self.start] + self.newContent + content[self.start :]

    def undo(self) -> Action:
        # Defer import to avoid circular dependency
        from goblinai.server.history.actions.EraseAction import EraseAction

        if self.newContent is None:
            raise Exception("Cannot undo an addition that has not been applied yet")

        return EraseAction(len(self.newContent), self.start)
