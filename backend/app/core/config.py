from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

# backend/app/core/config.py -> backend/ -> repo root
_BACKEND_DIR = Path(__file__).resolve().parent.parent.parent
_REPO_ROOT = _BACKEND_DIR.parent


class Settings(BaseSettings):
    openai_api_key: str
    app_env: str = "development"
    max_file_size_mb: int = 20
    allowed_file_types: str = "application/pdf"
    openai_model: str = "gpt-4.1"

    storage_root: Path = Path("backend/storage")
    uploads_dir_name: str = "uploads"
    results_dir_name: str = "results"

    model_config = SettingsConfigDict(
        # Запуск обычно из `backend/`; корневой `.env` лежит на уровень выше.
        env_file=(_REPO_ROOT / ".env", _BACKEND_DIR / ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @property
    def max_file_size_bytes(self) -> int:
        return self.max_file_size_mb * 1024 * 1024

    @property
    def uploads_dir(self) -> Path:
        return self.storage_root / self.uploads_dir_name

    @property
    def results_dir(self) -> Path:
        return self.storage_root / self.results_dir_name


settings = Settings()
