export function AppHeader() {
  return (
    <header className="mb-4 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent)] text-lg font-bold text-white">
        T
      </div>
      <div>
        <p className="m-0 text-sm font-semibold text-[var(--color-text)]">PDF Translate</p>
        <p className="m-0 text-xs text-[var(--color-text-soft)]">Chrome Extension</p>
      </div>
    </header>
  );
}
