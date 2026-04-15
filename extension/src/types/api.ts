export type ProcessingStatus =
  | "uploaded"
  | "sending_to_openai"
  | "processing"
  | "assembling_result"
  | "completed"
  | "failed";

export type UIState =
  | "idle"
  | "file_selected"
  | "uploading"
  | "processing"
  | "success"
  | "error";

export interface TranslateResponse {
  job_id: string;
  status: ProcessingStatus;
}

export interface JobStatusResponse {
  job_id: string;
  status: ProcessingStatus;
  progress: number;
  current_stage: ProcessingStatus;
  error_message: string | null;
  download_url: string | null;
}
