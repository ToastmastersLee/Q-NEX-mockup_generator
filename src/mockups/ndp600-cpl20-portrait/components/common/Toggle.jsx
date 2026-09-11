export function Toggle({ checked, onClick }) {
  return (
    <button className={`ndp-toggle ${checked ? 'is-on' : ''}`} type="button" onClick={onClick} aria-pressed={checked}>
      <span />
    </button>
  );
}
