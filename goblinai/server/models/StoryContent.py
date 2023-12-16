import asyncio
import os
from typing import AsyncGenerator
from goblinai.server.history.Action import Action

from goblinai.server.history.History import History
from goblinai.server.history.actions.AppendAction import AppendAction
from goblinai.server.utils import waitForGenerator


class StoryContent:
    history: History
    _filePath: str
    _text: str

    def __init__(self, filePath, text="") -> None:
        self.history = History()
        self._filePath = filePath
        self._text = text

    async def apply(self, action: Action, incognito=False) -> AsyncGenerator[str, None]:
        async for result in action.apply(self._text):
            self._text = result
            yield self._text

        if not incognito:
            self.history.add(action)

    async def undo(self) -> str | None:
        action = self.history.undo()

        if action is not None:
            generator = self.apply(action, incognito=True)
            return await waitForGenerator(generator)

    async def redo(self) -> str | None:
        action = self.history.redo()

        if action is not None:
            generator = self.apply(action, incognito=True)
            return await waitForGenerator(generator)

    def get(self) -> str:
        return self._text

    def save(self) -> None:
        text = self._text

        with open(self._filePath, "w") as file:
            file.truncate()
            file.write(text)
            file.close()

    @staticmethod
    def load(filePath: str):
        text = ""
        if os.path.exists(filePath):
            with open(filePath, "r") as file:
                text = file.read()
                file.close()

        return StoryContent(filePath, text)
