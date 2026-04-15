from typing import Literal, Optional
from pydantic import BaseModel


JobStatus = Literal[
    "uploaded",
    "sending_to_openai",
    "processing",
    "assembling_result",
    "completed",
    "failed",
]


class TranslateResponse(BaseModel):
    job_id: str
    status: JobStatus


class JobStatusResponse(BaseModel):
    job_id: str
    status: JobStatus
    progress: int
    current_stage: JobStatus
    error_message: Optional[str] = None
    download_url: Optional[str] = None
