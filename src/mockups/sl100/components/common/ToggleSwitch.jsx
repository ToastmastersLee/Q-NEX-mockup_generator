/**
 * Reusable animated Toggle Switch component for SL100
 */
export function ToggleSwitch({ checked, onChange, size = 'medium', disabled = false }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`sl100-toggle-switch ${checked ? 'is-checked' : ''} ${size} ${disabled ? 'is-disabled' : ''}`}
    >
      <span className="sl100-toggle-thumb" />
    </button>
  );
}
