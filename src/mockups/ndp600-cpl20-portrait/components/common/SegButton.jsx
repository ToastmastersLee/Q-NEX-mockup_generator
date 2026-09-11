export function SegButton({ children, active, onClick, className = '', ...props }) {
  return (
    <button 
      className={`ndp-seg-button ${active ? 'is-active' : ''} ${className}`} 
      type="button" 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
