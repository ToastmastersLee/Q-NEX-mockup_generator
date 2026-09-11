import { X } from 'lucide-react';

export function ModalShell({ title, onClose, children, className = '' }) {
  return (
    <div className="lcs-web-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className={`lcs-web-modal ${className}`} role="dialog" aria-modal="true" aria-label={title} onMouseDown={event => event.stopPropagation()}>
        <header>
          <span>{title}</span>
          <button type="button" onClick={onClose} aria-label="Close"><X size={17} /></button>
        </header>
        {children}
      </section>
    </div>
  );
}
