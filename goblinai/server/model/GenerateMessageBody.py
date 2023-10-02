from pydantic import BaseModel


class GenerateMessageBody(BaseModel):
    startContent: str | None
