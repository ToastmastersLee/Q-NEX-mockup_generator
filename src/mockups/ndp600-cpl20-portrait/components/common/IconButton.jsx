export function IconButton({ children, active, onClick, label, className = '', ...props }) {
  return (
    <button 
      className={`ndp-icon-btn ${active ? 'is-active' : ''} ${className}`} 
      type="button" 
      onClick={onClick} 
      title={label} 
      aria-label={label}
      {...props}
    >
      {children}
    </button>
  );
}
