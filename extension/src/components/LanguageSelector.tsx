interface LanguageSelectorProps {
  sourceLanguage: string;
  targetLanguage: string;
  sourceOptions: string[];
  targetOptions: string[];
  onSourceChange: (value: string) => void;
  onTargetChange: (value: string) => void;
}

const selectStyles =
  "w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]";

export function LanguageSelector(props: LanguageSelectorProps) {
  return (
    <div className="mb-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
      <select
        className={selectStyles}
        value={props.sourceLanguage}
        onChange={(event) => props.onSourceChange(event.target.value)}
      >
        {props.sourceOptions.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>

      <span className="text-lg text-[var(--color-text-soft)]">→</span>

      <select
        className={selectStyles}
        value={props.targetLanguage}
        onChange={(event) => props.onTargetChange(event.target.value)}
      >
        {props.targetOptions.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
}
