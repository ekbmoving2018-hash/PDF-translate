# API Contracts

Base URL: `http://localhost:8000`

## POST /api/translate
Запускает задачу перевода.

### Request (multipart/form-data)
- `file`: PDF
- `source_language`: string (`Auto Detect` или язык)
- `target_language`: string

### Response 202
```json
{
  "job_id": "0df2aafe-6d8c-4e0f-a17b-3f4c4cb6f2c5",
  "status": "uploaded"
}
```

## GET /api/jobs/{job_id}
Возвращает состояние задачи.

### Response 200
```json
{
  "job_id": "0df2aafe-6d8c-4e0f-a17b-3f4c4cb6f2c5",
  "status": "processing",
  "progress": 60,
  "current_stage": "processing",
  "error_message": null,
  "download_url": null
}
```

### Response 200 (completed)
```json
{
  "job_id": "0df2aafe-6d8c-4e0f-a17b-3f4c4cb6f2c5",
  "status": "completed",
  "progress": 100,
  "current_stage": "completed",
  "error_message": null,
  "download_url": "/api/download/0df2aafe-6d8c-4e0f-a17b-3f4c4cb6f2c5"
}
```

## GET /api/download/{job_id}
Скачивание результата.

### Response 200
Файл `translated_{job_id}.md`.

## Коды ошибок
- `400`: невалидный файл или параметры.
- `404`: job не найден.
- `409`: результат ещё не готов.
- `413`: превышен размер файла.
- `500`: внутренняя ошибка (включая ошибки OpenAI).
