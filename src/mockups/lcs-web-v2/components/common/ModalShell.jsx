import { X } from 'lucide-react';
import { useTranslation } from '../../i18n';

export function ModalShell({ title, onClose, children, className = '' }) {
  const { t } = useTranslation();
  return (
    <div className="lcs-web-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className={`lcs-web-modal ${className}`} role="dialog" aria-modal="true" aria-label={title} onMouseDown={event => event.stopPropagation()}>
        <header>
          <span>{title}</span>
          <button type="button" onClick={onClose} aria-label={t('actions.close')}><X size={17} /></button>
        </header>
        {children}
      </section>
    </div>
  );
}
