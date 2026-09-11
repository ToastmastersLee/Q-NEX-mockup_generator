export function NativeSelect({ value, options, onChange, className = '' }) {
  return (
    <select className={`lcs-web-native-select ${className}`} value={value} onChange={event => onChange(event.target.value)}>
      {options.map(option => {
        const val = typeof option === 'object' && option !== null ? option.value : option;
        const label = typeof option === 'object' && option !== null ? option.label : option;
        return <option key={val} value={val}>{label}</option>;
      })}
    </select>
  );
}
