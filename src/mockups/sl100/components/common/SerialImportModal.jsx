import { FileSpreadsheet, X } from 'lucide-react';

export function SerialImportModal({ isOpen, onImport, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="sl100-modal-overlay" onClick={onCancel}>
      <div className="sl100-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="sl100-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileSpreadsheet size={18} className="sl100-text-cyan" />
            <span style={{ fontWeight: 600 }}>Serial Config Detected</span>
          </div>
          <button type="button" className="sl100-modal-close-btn" onClick={onCancel}>
            <X size={16} />
          </button>
        </div>

        <div className="sl100-modal-content">
          <p className="sl100-modal-message">
            USB storage with serial configuration file detected: <code>sl100_serial_config.xlsx</code>.
            Do you want to import this configuration now?
          </p>
        </div>

        <div className="sl100-modal-actions">
          <button type="button" className="sl100-btn sl100-btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="sl100-btn sl100-btn-confirm" onClick={onImport}>
            Import Config
          </button>
        </div>
      </div>
    </div>
  );
}
