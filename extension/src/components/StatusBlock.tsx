import type { ProcessingStatus } from "../types/api";

interface StatusBlockProps {
  status: ProcessingStatus | null;
  message: string;
  error?: string | null;
}

export function StatusBlock({ status, message, error }: StatusBlockProps) {
  const color = status === "failed" ? "text-[var(--color-error)]" : "text-[var(--color-text)]";
  return (
    <div className="mb-3 rounded-lg bg-slate-900/80 px-3 py-2">
      <p className={`m-0 text-sm ${color}`}>{message}</p>
      {status ? <p className="m-0 mt-1 text-xs text-[var(--color-text-soft)]">Stage: {status}</p> : null}
      {error ? <p className="m-0 mt-1 text-xs text-[var(--color-error)]">{error}</p> : null}
    </div>
  );
}
