/**
 * Reusable animated Toggle Switch component
 */
export function ToggleSwitch({ checked, onChange, size = 'medium', disabled = false }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`cpd10-toggle-switch ${checked ? 'is-checked' : ''} ${size} ${disabled ? 'is-disabled' : ''}`}
    >
      <span className="cpd10-toggle-thumb" />
    </button>
  );
}
