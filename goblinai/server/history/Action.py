from abc import ABC, abstractmethod
from typing import AsyncGenerator


class Action(ABC):
    @abstractmethod
    def apply(self, content: str) -> AsyncGenerator[str, None]:
        """Apply the action."""
        raise NotImplementedError()

    @abstractmethod
    def undo(self) -> "Action":
        """Return a new action representing the undo operation."""
        raise NotImplementedError()
