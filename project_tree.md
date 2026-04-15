# Project Tree

```text
PDF-translate/
├─ extension/
│  ├─ manifest.json
│  ├─ index.html
│  ├─ package.json
│  ├─ tailwind.config.ts
│  ├─ postcss.config.js
│  ├─ tsconfig.json
│  ├─ vite.config.ts
│  └─ src/
│     ├─ popup/
│     │  ├─ App.tsx
│     │  └─ main.tsx
│     ├─ components/
│     │  ├─ ActionButton.tsx
│     │  ├─ AppHeader.tsx
│     │  ├─ FileInfo.tsx
│     │  ├─ LanguageSelector.tsx
│     │  ├─ ResultBlock.tsx
│     │  ├─ StatusBlock.tsx
│     │  └─ UploadZone.tsx
│     ├─ api/client.ts
│     ├─ lib/languages.ts
│     ├─ store/useTranslationState.ts
│     ├─ types/api.ts
│     └─ styles.css
├─ backend/
│  ├─ requirements.txt
│  ├─ app/
│  │  ├─ main.py
│  │  ├─ api/routes/translate.py
│  │  ├─ core/config.py
│  │  ├─ core/prompts.py
│  │  ├─ models/job.py
│  │  ├─ schemas/translation.py
│  │  └─ services/
│  │     ├─ file_service.py
│  │     ├─ jobs_service.py
│  │     ├─ openai_service.py
│  │     └─ result_service.py
│  └─ storage/
│     ├─ uploads/
│     └─ results/
├─ .env.example
├─ README.md
├─ product_spec.md
├─ system_architecture.md
├─ frontend_spec.md
├─ backend_spec.md
├─ api_contracts.md
├─ prompt_strategy.md
├─ project_tree.md
└─ implementation_plan.md
```
