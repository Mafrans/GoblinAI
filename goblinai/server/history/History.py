from collections import deque

from goblinai.server.history.Action import Action


class History:
    """Represents the history of story content."""

    history: deque[Action]
    undoHistory: deque[Action]

    def __init__(self) -> None:
        self.history = deque()
        self.undoHistory = deque()

    def add(self, action: Action) -> None:
        """Adds an action to the history, clearing the undo history."""
        self.history.append(action)
        self.undoHistory.clear()

    def undo(self) -> Action | None:
        """Returns and stores the action that undoes the last action applied to the content."""
        if not self.history:
            return

        lastAction = self.history.pop()
        undoAction = lastAction.undo()
        self.undoHistory.append(undoAction)

        return undoAction

    def redo(self) -> Action | None:
        """Returns and stores the action that redoes the last action undone from the content."""
        if not self.undoHistory:
            return

        lastAction = self.undoHistory.pop()
        redoAction = lastAction.undo()
        self.history.append(redoAction)

        return redoAction

    pass
