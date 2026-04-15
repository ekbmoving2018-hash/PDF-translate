interface ActionButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function ActionButton({ label, onClick, disabled }: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="mb-3 w-full rounded-xl bg-[var(--color-accent)] px-4 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {label}
    </button>
  );
}
