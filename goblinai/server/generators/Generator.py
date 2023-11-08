from abc import ABC, abstractmethod


class Generator(ABC):
    @abstractmethod
    async def generate(self, onFinish: callable) -> str:
        raise NotImplementedError()
