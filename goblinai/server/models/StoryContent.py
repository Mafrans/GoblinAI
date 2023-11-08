import os


class StoryContent:
    _filePath: str
    _text: str

    def __init__(self, filePath, text="") -> None:
        self._filePath = filePath
        self._text = text

    def append(self, text: str) -> None:
        self._text = self._text + text

    def update(self, text: str) -> None:
        pass

    def get(self) -> str:
        return self._text

    def patch(self, start: int, end: int, text: str) -> None:
        pass

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
