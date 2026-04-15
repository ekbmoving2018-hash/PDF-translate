import { useMemo, useState } from "react";

import type { ProcessingStatus, UIState } from "../types/api";

export function useTranslationState() {
  const [uiState, setUiState] = useState<UIState>("idle");
  const [status, setStatus] = useState<ProcessingStatus | null>(null);
  const [statusMessage, setStatusMessage] = useState("Select a PDF to begin.");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const canSubmit = useMemo(
    () => uiState === "file_selected" || uiState === "error" || uiState === "success",
    [uiState],
  );

  return {
    uiState,
    setUiState,
    status,
    setStatus,
    statusMessage,
    setStatusMessage,
    errorMessage,
    setErrorMessage,
    canSubmit,
  };
}
