interface ResultBlockProps {
  resultName: string | null;
  onDownload: () => void;
}

export function ResultBlock({ resultName, onDownload }: ResultBlockProps) {
  if (!resultName) return null;
  return (
    <div className="rounded-lg border border-green-500/30 bg-green-900/20 px-3 py-3">
      <p className="m-0 text-sm text-[var(--color-text)]">Result ready</p>
      <p className="m-0 mt-1 truncate text-xs text-[var(--color-text-soft)]">{resultName}</p>
      <button
        type="button"
        className="mt-2 rounded-lg bg-[var(--color-success)] px-3 py-2 text-sm font-medium text-white"
        onClick={onDownload}
      >
        Download
      </button>
    </div>
  );
}
