from abc import ABC, abstractmethod
from typing import Any, AsyncGenerator, Callable, Coroutine


class Generator(ABC):
    Stream = AsyncGenerator[Any, str]
    FinishCallback = Callable[[str], None | Coroutine[Any, Any, None]]

    @abstractmethod
    def generate(self, onFinish: FinishCallback | None = None) -> Stream:
        raise NotImplementedError()
