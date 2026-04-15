interface FileInfoProps {
  file: File | null;
}

export function FileInfo({ file }: FileInfoProps) {
  if (!file) return null;
  return (
    <div className="mb-3 rounded-lg bg-slate-900 px-3 py-2 text-xs text-[var(--color-text-soft)]">
      <p className="m-0 truncate">
        <span className="text-[var(--color-text)]">File:</span> {file.name}
      </p>
      <p className="m-0">
        <span className="text-[var(--color-text)]">Size:</span>{" "}
        {(file.size / 1024 / 1024).toFixed(2)} MB
      </p>
    </div>
  );
}
