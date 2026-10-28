export function NativeSelect({ value, options, onChange, className = '', ...props }) {
  const selected = options.find(option => (typeof option === 'object' ? option.value : option) === value);
  const title = typeof selected === 'object' ? selected.label : selected;
  return (
    <select {...props} title={title} className={`lcs-web-native-select ${className}`} value={value} onChange={event => onChange(event.target.value)}>
      {options.map(option => {
        const val = typeof option === 'object' && option !== null ? option.value : option;
        const label = typeof option === 'object' && option !== null ? option.label : option;
        return <option key={val} value={val} disabled={typeof option === 'object' && option.disabled}>{label}</option>;
      })}
    </select>
  );
}
