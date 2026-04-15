import { useRef } from "react";

interface UploadZoneProps {
  onFileSelected: (file: File) => void;
  disabled?: boolean;
}

export function UploadZone({ onFileSelected, disabled }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div
      className="mb-3 rounded-xl border border-dashed border-slate-600 bg-slate-900/50 p-4 text-center"
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        if (disabled) return;
        const file = event.dataTransfer.files?.[0];
        if (file) onFileSelected(file);
      }}
    >
      <p className="mb-2 text-sm text-[var(--color-text)]">Drag & drop PDF file</p>
      <p className="mb-3 text-xs text-[var(--color-text-soft)]">or</p>
      <button
        type="button"
        className="rounded-lg bg-[var(--color-card-soft)] px-3 py-2 text-sm text-[var(--color-text)] hover:bg-slate-700 disabled:opacity-50"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
      >
        Select File
      </button>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="application/pdf,.pdf"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onFileSelected(file);
        }}
      />
    </div>
  );
}
