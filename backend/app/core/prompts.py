SYSTEM_PROMPT = """You are a professional document translator.
Translate the document accurately into the requested target language.
Do not shorten the text.
Preserve the meaning, paragraph structure, headings, and list structure where possible.
Do not add commentary.
Return only the translated content."""


USER_PROMPT_TEMPLATE = """Translate this PDF document from {source_language} to {target_language}.
If source language is Auto Detect, detect it automatically.
Preserve structure as much as possible.
Do not summarize.
Do not omit any content."""


def build_user_prompt(source_language: str, target_language: str) -> str:
    return USER_PROMPT_TEMPLATE.format(
        source_language=source_language,
        target_language=target_language,
    )
