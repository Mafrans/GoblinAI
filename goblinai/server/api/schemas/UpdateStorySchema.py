from typing import Optional
from pydantic import BaseModel


class UpdateStorySchema(BaseModel):
    name: Optional[str]
