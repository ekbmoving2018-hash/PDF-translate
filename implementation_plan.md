# Implementation Plan

## Этап 1. Документация и контракт
- Зафиксировать product scope, архитектуру и API.
- Определить статусы и UX-мэппинг.

## Этап 2. Scaffold проекта
- Создать `extension` (React + TS + Vite + Tailwind + MV3).
- Создать `backend` (FastAPI + Pydantic + OpenAI SDK).

## Этап 3. Backend MVP
- Реализовать `POST /api/translate`.
- Реализовать `GET /api/jobs/{job_id}`.
- Реализовать `GET /api/download/{job_id}`.
- Сделать job lifecycle и фоновые задачи.

## Этап 4. Frontend MVP
- Реализовать popup UI по компонентам.
- Интегрировать upload + polling + download.
- Обработать состояния `idle/file_selected/uploading/processing/success/error`.

## Этап 5. Интеграция и проверка
- Проверить локальный E2E flow.
- Обновить README с командами и настройкой `.env`.

## Приоритеты
1. Рабочий сквозной flow.
2. Понятные статусы и ошибки.
3. Чистая модульная структура для дальнейших улучшений.
