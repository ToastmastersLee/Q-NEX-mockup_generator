export function NativeSelect({ value, options, onChange, className = '', disabled = false }) {
  const selected = options.find(option => (typeof option === 'object' ? option.value : option) === value);
  const selectedLabel = typeof selected === 'object' && selected !== null ? selected.label : selected;
  return (
    <select className={`lcs-web-native-select ${className}`} value={value} disabled={disabled} title={selectedLabel ?? value} onChange={event => onChange(event.target.value)}>
      {disabled && !options.some(o => (typeof o === 'object' ? o.value : o) === value) && <option value={value} hidden>{value}</option>}
      {options.map(option => {
        const val = typeof option === 'object' && option !== null ? option.value : option;
        const label = typeof option === 'object' && option !== null ? option.label : option;
        return <option key={val} value={val} disabled={typeof option === 'object' && !!option.disabled}>{label}</option>;
      })}
    </select>
  );
}
