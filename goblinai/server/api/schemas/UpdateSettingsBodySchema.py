from typing import Optional

from pydantic import BaseModel

from goblinai.server.models.Settings import Settings


class UpdateSettingsBodySchema(BaseModel):
    paragraphStyle: Optional[str] = None
