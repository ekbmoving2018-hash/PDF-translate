from fastapi import APIRouter, BackgroundTasks, File, Form, HTTPException, UploadFile, status
from fastapi.responses import FileResponse

from app.schemas.translation import JobStatusResponse, TranslateResponse
from app.services.file_service import file_service
from app.services.jobs_service import jobs_service
from app.services.openai_service import openai_service
from app.services.result_service import result_service

router = APIRouter(prefix="/api", tags=["translation"])


def _process_translation(job_id: str) -> None:
    job = jobs_service.get_job(job_id)
    if job is None:
        return

    try:
        jobs_service.update_status(job_id, "sending_to_openai", 35)
        translated_text = openai_service.translate_pdf(
            file_path=job.input_path,
            source_language=job.source_language,
            target_language=job.target_language,
        )
        jobs_service.update_status(job_id, "processing", 70)
        jobs_service.update_status(job_id, "assembling_result", 90)
        output_path, output_filename = result_service.write_markdown_result(job_id, translated_text)
        jobs_service.mark_completed(job_id, output_path=output_path, output_filename=output_filename)
    except Exception as exc:  # noqa: BLE001
        jobs_service.mark_failed(job_id, str(exc))


@router.post("/translate", response_model=TranslateResponse, status_code=status.HTTP_202_ACCEPTED)
async def translate_pdf(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    source_language: str = Form(...),
    target_language: str = Form(...),
) -> TranslateResponse:
    await file_service.validate_pdf(file)
    job = jobs_service.create_job(
        source_language=source_language,
        target_language=target_language,
        input_filename=file.filename or "input.pdf",
        input_path="",
    )
    input_path = await file_service.save_upload(file, job.job_id)
    job.input_path = str(input_path)

    background_tasks.add_task(_process_translation, job.job_id)
    return TranslateResponse(job_id=job.job_id, status="uploaded")


@router.get("/jobs/{job_id}", response_model=JobStatusResponse)
def get_job_status(job_id: str) -> JobStatusResponse:
    job = jobs_service.get_job(job_id)
    if job is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
    return JobStatusResponse(
        job_id=job.job_id,
        status=job.status,  # type: ignore[arg-type]
        progress=job.progress,
        current_stage=job.current_stage,  # type: ignore[arg-type]
        error_message=job.error_message,
        download_url=f"/api/download/{job.job_id}" if job.output_path else None,
    )


@router.get("/download/{job_id}")
def download_result(job_id: str) -> FileResponse:
    job = jobs_service.get_job(job_id)
    if job is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
    if job.status != "completed" or not job.output_path or not job.output_filename:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Result is not ready yet.")

    return FileResponse(
        path=result_service.get_download_path(job.output_path),
        filename=job.output_filename,
        media_type="text/markdown",
    )
