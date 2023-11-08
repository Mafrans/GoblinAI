from pydantic import BaseModel


class GenerateBodySchema(BaseModel):
    startContent: str | None
