import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

export function ControlCodeEditorModal({
  isOpen,
  codes = [],
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <ControlCodeEditorDialog
      codes={codes}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}

function ControlCodeEditorDialog({ codes, onConfirm, onCancel }) {
  const [localCodes, setLocalCodes] = useState(() => JSON.parse(JSON.stringify(codes || [])));
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const totalPages = Math.max(1, Math.ceil((localCodes.length || 21) / itemsPerPage));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = localCodes.slice(startIndex, startIndex + itemsPerPage);

  const handleToggle = (id) => {
    setLocalCodes((prev) =>
      prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item))
    );
  };

  const handleCodeChange = (id, newCode) => {
    setLocalCodes((prev) =>
      prev.map((item) => (item.id === id ? { ...item, code: newCode } : item))
    );
  };

  return (
    <div className="sl100-control-code-overlay">
      <div className="sl100-control-code-main">
        <div className="sl100-control-code-rows">
          {currentItems.map((item) => (
            <div key={item.id} className="sl100-control-code-row">
              <span className="sl100-code-lbl">Function</span>
              <div className="sl100-code-func-box" title={item.name}>
                <span>{item.name}</span>
              </div>

              <span className="sl100-code-lbl">Code</span>
              <input
                type="text"
                className="sl100-code-hex-input"
                value={item.code || ''}
                onChange={(e) => handleCodeChange(item.id, e.target.value)}
                placeholder=""
                spellCheck={false}
              />

              <button
                type="button"
                className={`sl100-code-checkbox ${item.enabled ? 'is-checked' : ''}`}
                onClick={() => handleToggle(item.id)}
                title={item.enabled ? 'Enabled' : 'Disabled'}
              >
                {item.enabled && <Check size={14} strokeWidth={3} />}
              </button>
            </div>
          ))}
        </div>

        <div className="sl100-control-code-pagination">
          <button
            type="button"
            className="sl100-code-page-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft size={16} />
          </button>
          <span className="sl100-code-page-text">
            {currentPage}/{totalPages}
          </span>
          <button
            type="button"
            className="sl100-code-page-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="sl100-control-code-actions">
        <button
          type="button"
          className="sl100-btn sl100-btn-cancel"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="sl100-btn sl100-btn-confirm"
          onClick={() => onConfirm(localCodes)}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
