from pathlib import Path
from typing import Union

from openai import OpenAI

from app.core.config import settings
from app.core.prompts import SYSTEM_PROMPT, build_user_prompt


class OpenAIService:
    def __init__(self) -> None:
        self.client = OpenAI(api_key=settings.openai_api_key)

    def translate_pdf(self, file_path: Union[Path, str], source_language: str, target_language: str) -> str:
        path = Path(file_path)
        uploaded_file = self.client.files.create(
            file=path,
            purpose="assistants",
        )

        response = self.client.responses.create(
            model=settings.openai_model,
            input=[
                {
                    "role": "system",
                    "content": [{"type": "input_text", "text": SYSTEM_PROMPT}],
                },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "input_text",
                            "text": build_user_prompt(source_language, target_language),
                        },
                        {"type": "input_file", "file_id": uploaded_file.id},
                    ],
                },
            ],
        )
        return response.output_text


openai_service = OpenAIService()
