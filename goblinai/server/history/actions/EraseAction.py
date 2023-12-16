from typing import AsyncGenerator
from goblinai.server.history.Action import Action


class EraseAction(Action):
    """Erases the last n characters from the content, optionally from a given position"""

    amount: int
    start: int | None
    erased: str

    def __init__(self, amount: int, start: int | None = None) -> None:
        self.amount = amount
        self.start = start

    async def apply(self, content: str) -> AsyncGenerator[str, None]:
        if self.start is None:
            self.start = len(content) - self.amount

        self.erased = content[self.start : self.start + self.amount]
        yield content[: self.start] + content[self.start + self.amount :]

    def undo(self) -> Action:
        # Defer import to avoid circular dependency
        from goblinai.server.history.actions.AppendAction import AppendAction

        if self.erased is None:
            raise Exception("Cannot undo an erase that has not been applied yet")

        return AppendAction(self.erased, self.start)
