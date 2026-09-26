import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

/**
 * ControlCodeEditorModal
 * Recreates the full Control Code Editor page seen in real device photo (media_1790428419263.jpg).
 * Features:
 * - 7 Function & Hex Code rows per page
 * - Bottom pagination: < 1/3 >
 * - Right panel with [Cancel] and [Confirm] capsule buttons
 * - Custom cyan checkmark checkboxes & interactive hex input boxes
 */
export function ControlCodeEditorModal({
  isOpen,
  codes = [],
  onConfirm,
  onCancel,
}) {
  const [localCodes, setLocalCodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const totalPages = Math.max(1, Math.ceil((localCodes.length || 21) / itemsPerPage));

  // Sync state whenever opened
  useEffect(() => {
    if (isOpen && codes) {
      setLocalCodes(JSON.parse(JSON.stringify(codes)));
      setCurrentPage(1);
    }
  }, [isOpen, codes]);

  if (!isOpen) return null;

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
    <div className="cpd10-control-code-overlay">
      {/* Left/Main Column: 7 Function Rows + Pagination */}
      <div className="cpd10-control-code-main">
        <div className="cpd10-control-code-rows">
          {currentItems.map((item) => (
            <div key={item.id} className="cpd10-control-code-row">
              <span className="cpd10-code-lbl">Function</span>
              <div className="cpd10-code-func-box" title={item.name}>
                <span>{item.name}</span>
              </div>

              <span className="cpd10-code-lbl">Code</span>
              <input
                type="text"
                className="cpd10-code-hex-input"
                value={item.code || ''}
                onChange={(e) => handleCodeChange(item.id, e.target.value)}
                placeholder=""
                spellCheck={false}
              />

              <button
                type="button"
                className={`cpd10-code-checkbox ${item.enabled ? 'is-checked' : ''}`}
                onClick={() => handleToggle(item.id)}
                title={item.enabled ? 'Enabled' : 'Disabled'}
              >
                {item.enabled && <Check size={14} strokeWidth={3} />}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Pagination (< 1/3 >) */}
        <div className="cpd10-control-code-pagination">
          <button
            type="button"
            className="cpd10-code-page-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft size={18} strokeWidth={2.4} />
          </button>
          <span className="cpd10-code-page-text">
            {currentPage}/{totalPages}
          </span>
          <button
            type="button"
            className="cpd10-code-page-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            <ChevronRight size={18} strokeWidth={2.4} />
          </button>
        </div>
      </div>

      {/* Right Column: Cancel and Confirm capsule buttons */}
      <div className="cpd10-control-code-actions">
        <button
          type="button"
          className="cpd10-code-action-pill cpd10-code-action-cancel"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="cpd10-code-action-pill cpd10-code-action-confirm"
          onClick={() => onConfirm(localCodes)}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
