import type { JobStatusResponse, TranslateResponse } from "../types/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

export async function startTranslation(params: {
  file: File;
  sourceLanguage: string;
  targetLanguage: string;
}): Promise<TranslateResponse> {
  const formData = new FormData();
  formData.append("file", params.file);
  formData.append("source_language", params.sourceLanguage);
  formData.append("target_language", params.targetLanguage);

  const response = await fetch(`${API_BASE_URL}/api/translate`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.detail ?? "Failed to start translation.");
  }
  return response.json() as Promise<TranslateResponse>;
}

export async function getJobStatus(jobId: string): Promise<JobStatusResponse> {
  const response = await fetch(`${API_BASE_URL}/api/jobs/${jobId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch job status.");
  }
  return response.json() as Promise<JobStatusResponse>;
}

export function getDownloadUrl(downloadPath: string): string {
  return `${API_BASE_URL}${downloadPath}`;
}
