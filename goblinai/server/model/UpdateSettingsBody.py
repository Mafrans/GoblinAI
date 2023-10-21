from typing import Optional

from pydantic import BaseModel

from goblinai.server.model.Settings import Settings


class UpdateSettingsBody(BaseModel):
    paragraphStyle: Optional[str] = None
