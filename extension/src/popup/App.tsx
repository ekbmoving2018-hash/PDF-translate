import { useEffect, useMemo, useState } from "react";

import { getDownloadUrl, getJobStatus, startTranslation } from "../api/client";
import { ActionButton } from "../components/ActionButton";
import { AppHeader } from "../components/AppHeader";
import { FileInfo } from "../components/FileInfo";
import { LanguageSelector } from "../components/LanguageSelector";
import { ResultBlock } from "../components/ResultBlock";
import { StatusBlock } from "../components/StatusBlock";
import { UploadZone } from "../components/UploadZone";
import { MAX_FILE_SIZE_MB, SOURCE_LANGUAGES, TARGET_LANGUAGES } from "../lib/languages";
import { useTranslationState } from "../store/useTranslationState";

import type { ProcessingStatus } from "../types/api";

const statusToMessage: Record<ProcessingStatus, string> = {
  uploaded: "File uploaded.",
  sending_to_openai: "Sending file to OpenAI...",
  processing: "Translation in progress...",
  assembling_result: "Preparing translated file...",
  completed: "Translation completed.",
  failed: "Translation failed.",
};

function validatePdfFile(file: File): string | null {
  if (file.type !== "application/pdf") return "Only PDF files are supported.";
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    return `File is larger than ${MAX_FILE_SIZE_MB}MB.`;
  }
  return null;
}

export default function App() {
  const [sourceLanguage, setSourceLanguage] = useState("Auto Detect");
  const [targetLanguage, setTargetLanguage] = useState("English");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [resultName, setResultName] = useState<string | null>(null);
  const state = useTranslationState();

  useEffect(() => {
    if (!jobId || state.uiState !== "processing") return;

    const timer = window.setInterval(async () => {
      try {
        const result = await getJobStatus(jobId);
        state.setStatus(result.status);
        state.setStatusMessage(statusToMessage[result.status]);

        if (result.status === "completed" && result.download_url) {
          state.setUiState("success");
          setDownloadUrl(getDownloadUrl(result.download_url));
          setResultName(`translated_${result.job_id}.md`);
          window.clearInterval(timer);
        } else if (result.status === "failed") {
          state.setUiState("error");
          state.setErrorMessage(result.error_message ?? "Unexpected backend error.");
          window.clearInterval(timer);
        }
      } catch (error) {
        state.setUiState("error");
        state.setErrorMessage(error instanceof Error ? error.message : "Failed to poll status.");
        window.clearInterval(timer);
      }
    }, 2000);

    return () => window.clearInterval(timer);
  }, [jobId, state]);

  const buttonLabel = useMemo(() => {
    if (state.uiState === "uploading") return "Uploading...";
    if (state.uiState === "processing") return "Processing...";
    return "Translate PDF";
  }, [state.uiState]);

  async function handleTranslate(): Promise<void> {
    if (!selectedFile) {
      state.setUiState("error");
      state.setErrorMessage("Select a file first.");
      return;
    }

    const validationError = validatePdfFile(selectedFile);
    if (validationError) {
      state.setUiState("error");
      state.setErrorMessage(validationError);
      return;
    }

    try {
      state.setUiState("uploading");
      state.setErrorMessage(null);
      state.setStatusMessage("Uploading file...");
      const result = await startTranslation({
        file: selectedFile,
        sourceLanguage,
        targetLanguage,
      });
      setJobId(result.job_id);
      state.setStatus(result.status);
      state.setStatusMessage(statusToMessage[result.status]);
      state.setUiState("processing");
    } catch (error) {
      state.setUiState("error");
      state.setErrorMessage(error instanceof Error ? error.message : "Failed to start translation.");
    }
  }

  return (
    <main className="min-h-[580px] bg-[var(--color-bg)] p-4 text-[var(--color-text)]">
      <AppHeader />
      <h1 className="m-0 text-2xl font-bold">Translate PDF</h1>
      <p className="mb-4 mt-2 text-sm text-[var(--color-text-soft)]">
        Upload a PDF, choose languages, and get a translated file.
      </p>

      <LanguageSelector
        sourceLanguage={sourceLanguage}
        targetLanguage={targetLanguage}
        sourceOptions={SOURCE_LANGUAGES}
        targetOptions={TARGET_LANGUAGES}
        onSourceChange={setSourceLanguage}
        onTargetChange={setTargetLanguage}
      />

      <UploadZone
        disabled={state.uiState === "uploading" || state.uiState === "processing"}
        onFileSelected={(file) => {
          const validationError = validatePdfFile(file);
          if (validationError) {
            state.setUiState("error");
            state.setErrorMessage(validationError);
            return;
          }
          setSelectedFile(file);
          setJobId(null);
          setDownloadUrl(null);
          setResultName(null);
          state.setUiState("file_selected");
          state.setErrorMessage(null);
          state.setStatus(null);
          state.setStatusMessage("File selected. Ready to translate.");
        }}
      />

      <p className="mb-2 text-xs text-[var(--color-text-soft)]">Only PDF files. Max size: {MAX_FILE_SIZE_MB}MB.</p>

      <FileInfo file={selectedFile} />
      <ActionButton
        label={buttonLabel}
        onClick={() => {
          void handleTranslate();
        }}
        disabled={!state.canSubmit || state.uiState === "uploading" || state.uiState === "processing"}
      />
      <StatusBlock status={state.status} message={state.statusMessage} error={state.errorMessage} />
      <ResultBlock
        resultName={resultName}
        onDownload={() => {
          if (downloadUrl) window.open(downloadUrl, "_blank");
        }}
      />
    </main>
  );
}
