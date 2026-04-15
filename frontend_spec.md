# Frontend Spec (Chrome Extension Popup)

## Цели UX
- За 3 секунды пользователь понимает, что нужно выбрать языки и загрузить PDF.
- Большие кликабельные элементы, чистая визуальная иерархия.
- Чёткая обратная связь о состоянии обработки.

## Layout popup
- Ширина: `400px` (допуск 380-420px).
- Блоки по порядку:
  1. Header (иконка + название)
  2. Title: `Translate PDF`
  3. Subtitle
  4. Language selector row
  5. Upload zone
  6. Ограничения
  7. Status block
  8. Result block (после успеха)

## Компоненты
- `AppHeader`
- `LanguageSelector`
- `UploadZone`
- `FileInfo`
- `StatusBlock`
- `ResultBlock`
- `ActionButton`

## Состояния интерфейса
- `idle`: файл не выбран.
- `file_selected`: файл выбран, готов к отправке.
- `uploading`: отправка запроса на backend.
- `processing`: polling по job.
- `success`: результат готов к скачиванию.
- `error`: ошибка валидации/обработки.

## Поведение
- Проверка типа и размера файла на frontend до отправки.
- При отправке блокировка повторного запуска.
- Polling статуса каждые 2 сек до `completed/failed`.
- При `completed` отображается кнопка `Download`.

## Технические решения
- React + TypeScript + Vite + Tailwind.
- Модуль `api/client.ts` для HTTP вызовов backend.
- Типы job/статусов в `types`.
- Простая локальная state-модель (без лишнего state-менеджера).
