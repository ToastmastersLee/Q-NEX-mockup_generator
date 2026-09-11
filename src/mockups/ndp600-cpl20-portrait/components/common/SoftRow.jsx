export function SoftRow({ label, children, className = '', style, ...props }) {
  return (
    <div className={`ndp-soft-row ${className}`} style={style} {...props}>
      <span>{label}</span>
      <div className="ndp-soft-row-actions">{children}</div>
    </div>
  );
}
