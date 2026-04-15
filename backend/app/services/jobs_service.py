from dataclasses import asdict
from threading import Lock
from typing import Dict, Optional
from uuid import uuid4

from app.models.job import JobRecord


class JobsService:
    def __init__(self) -> None:
        self._jobs: Dict[str, JobRecord] = {}
        self._lock = Lock()

    def create_job(
        self,
        source_language: str,
        target_language: str,
        input_filename: str,
        input_path: str,
    ) -> JobRecord:
        with self._lock:
            job_id = str(uuid4())
            job = JobRecord(
                job_id=job_id,
                status="uploaded",
                progress=10,
                current_stage="uploaded",
                source_language=source_language,
                target_language=target_language,
                input_filename=input_filename,
                input_path=input_path,
            )
            self._jobs[job_id] = job
            return job

    def get_job(self, job_id: str) -> Optional[JobRecord]:
        return self._jobs.get(job_id)

    def update_status(self, job_id: str, status: str, progress: int) -> None:
        with self._lock:
            job = self._jobs[job_id]
            job.status = status
            job.current_stage = status
            job.progress = progress

    def mark_failed(self, job_id: str, error_message: str) -> None:
        with self._lock:
            job = self._jobs[job_id]
            job.status = "failed"
            job.current_stage = "failed"
            job.progress = 100
            job.error_message = error_message

    def mark_completed(self, job_id: str, output_path: str, output_filename: str) -> None:
        with self._lock:
            job = self._jobs[job_id]
            job.status = "completed"
            job.current_stage = "completed"
            job.progress = 100
            job.output_path = output_path
            job.output_filename = output_filename

    def to_dict(self, job_id: str) -> dict:
        job = self._jobs[job_id]
        data = asdict(job)
        data["download_url"] = f"/api/download/{job.job_id}" if job.output_path else None
        return data


jobs_service = JobsService()
