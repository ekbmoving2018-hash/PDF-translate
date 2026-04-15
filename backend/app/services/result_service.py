from pathlib import Path

from app.core.config import settings


class ResultService:
    def write_markdown_result(self, job_id: str, translated_text: str) -> tuple[str, str]:
        target_dir = settings.results_dir / job_id
        target_dir.mkdir(parents=True, exist_ok=True)
        file_name = f"translated_{job_id}.md"
        output_path = target_dir / file_name
        output_path.write_text(translated_text, encoding="utf-8")
        return str(output_path), file_name

    def get_download_path(self, output_path: str) -> Path:
        return Path(output_path)


result_service = ResultService()
