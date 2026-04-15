# PDF Translate (Chrome Extension + FastAPI + OpenAI)

MVP-продукт для перевода PDF через OpenAI API.

Pipeline: `PDF -> Chrome extension popup -> FastAPI backend -> OpenAI -> translated file download`.

## Что реализовано
- Chrome Extension (Manifest V3) popup на React + TypeScript + Vite + Tailwind CSS.
- Выбор исходного и целевого языка.
- Загрузка PDF (drag-and-drop и кнопка выбора файла).
- Backend на FastAPI с job lifecycle и polling.
- Интеграция OpenAI API через отдельный сервис.
- Скачивание результата после завершения обработки.

## Структура
- `extension/` - popup frontend (MV3).
- `backend/` - API и сервисы перевода.
- Документация:
  - `product_spec.md`
  - `system_architecture.md`
  - `frontend_spec.md`
  - `backend_spec.md`
  - `api_contracts.md`
  - `prompt_strategy.md`
  - `project_tree.md`
  - `implementation_plan.md`

## Настройка окружения
1. Скопируйте `.env.example` в `.env` в корне репозитория.
2. Укажите ключ OpenAI:

```env
OPENAI_API_KEY=your_openai_key
API_BASE_URL=http://localhost:8000
APP_ENV=development
MAX_FILE_SIZE_MB=20
ALLOWED_FILE_TYPES=application/pdf
```

## Запуск backend
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cd ..
uvicorn backend.app.main:app --reload
```

Backend будет доступен на `http://localhost:8000`.

## Запуск extension (сборка)
```bash
cd extension
npm install
npm run build
```

После сборки папка `extension/dist` содержит готовые файлы расширения, включая `manifest.json`.

## Подключение extension в Chrome
1. Откройте `chrome://extensions`.
2. Включите `Developer mode`.
3. Нажмите `Load unpacked`.
4. Выберите папку `extension/dist`.

## Локальное тестирование end-to-end
1. Запустите backend.
2. Откройте popup расширения.
3. Выберите языки (например, `Auto Detect -> Russian`).
4. Загрузите PDF до 20MB.
5. Нажмите `Translate PDF`.
6. Дождитесь статуса `completed`.
7. Скачайте файл результата (`translated_<job_id>.md`).

## API endpoints
- `POST /api/translate` - старт перевода.
- `GET /api/jobs/{job_id}` - статус задачи.
- `GET /api/download/{job_id}` - скачивание результата.

## Ограничения v1
- Нет OCR.
- Нет chunking.
- Нет точного восстановления исходного layout PDF.
- Таблицы и сложная верстка могут быть переведены неидеально.