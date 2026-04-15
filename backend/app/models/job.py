from dataclasses import dataclass
from typing import Optional


@dataclass
class JobRecord:
    job_id: str
    status: str
    progress: int
    current_stage: str
    source_language: str
    target_language: str
    input_filename: str
    input_path: str
    output_path: Optional[str] = None
    output_filename: Optional[str] = None
    error_message: Optional[str] = None
