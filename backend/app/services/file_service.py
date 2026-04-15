from pathlib import Path

from fastapi import HTTPException, UploadFile, status

from app.core.config import settings


class FileService:
    async def validate_pdf(self, file: UploadFile) -> None:
        content_type = (file.content_type or "").lower()
        if content_type not in settings.allowed_file_types.split(","):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only PDF files are allowed.",
            )

        content = await file.read()
        if len(content) > settings.max_file_size_bytes:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail=f"File exceeds {settings.max_file_size_mb}MB limit.",
            )

        if not file.filename or not file.filename.lower().endswith(".pdf"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid file extension. Expected .pdf",
            )

        await file.seek(0)

    async def save_upload(self, file: UploadFile, job_id: str) -> Path:
        settings.uploads_dir.mkdir(parents=True, exist_ok=True)
        target_path = settings.uploads_dir / f"{job_id}.pdf"
        content = await file.read()
        target_path.write_bytes(content)
        await file.seek(0)
        return target_path


file_service = FileService()
