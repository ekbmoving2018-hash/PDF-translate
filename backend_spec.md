# Backend Spec (FastAPI)

## Ответственность backend
- Принимать PDF и языковые параметры.
- Валидировать вход.
- Управлять жизненным циклом job.
- Интегрироваться с OpenAI API.
- Сохранять и отдавать результат.

## Сервисы
- `file_service.py`: валидация и сохранение входного PDF.
- `jobs_service.py`: создание job, обновление статуса, хранение метаданных.
- `openai_service.py`: отправка файла и prompt в OpenAI, получение перевода.
- `result_service.py`: запись результата в файл, подготовка download metadata.

## Job flow
1. `uploaded`
2. `sending_to_openai`
3. `processing`
4. `assembling_result`
5. `completed` или `failed`

## Хранение
- `backend/storage/uploads/{job_id}.pdf`
- `backend/storage/results/{job_id}/translated.md`

## Ошибки
- Невалидный файл: `400`.
- Размер превышен: `413`.
- Job не найден: `404`.
- Результат не готов: `409`.
- Внутренняя ошибка/OpenAI ошибка: `500` + `failed` статус job.
