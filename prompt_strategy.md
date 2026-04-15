# Prompt Strategy

## Принципы
- Prompt-логика не хранится в route handlers.
- System prompt и user template задаются централизованно.
- Языки подставляются параметрами (`source_language`, `target_language`).

## System Prompt
You are a professional document translator.
Translate the document accurately into the requested target language.
Do not shorten the text.
Preserve the meaning, paragraph structure, headings, and list structure where possible.
Do not add commentary.
Return only the translated content.

## User Prompt Template
Translate this PDF document from {source_language} to {target_language}.
If source language is Auto Detect, detect it automatically.
Preserve structure as much as possible.
Do not summarize.
Do not omit any content.

## Конфигурация
- `backend/app/core/prompts.py` хранит prompt-константы и helper-функцию рендера user prompt.
- В дальнейшем можно вынести в YAML/БД с версионированием.

## Эволюция
- Добавить `prompt_version` в metadata job.
- Тестировать новые prompt-версии через feature flag.
