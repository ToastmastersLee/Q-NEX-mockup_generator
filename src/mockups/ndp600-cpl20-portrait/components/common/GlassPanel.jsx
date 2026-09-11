export function GlassPanel({ children, className = '', style, ...props }) {
  return (
    <section className={`ndp-panel ${className}`} style={style} {...props}>
      {children}
    </section>
  );
}
