import { useState } from 'react';
import { ChevronUp, ChevronDown, Check } from 'lucide-react';

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
  const [activeHelp, setActiveHelp] = useState(null);

  const itemsPerPage = 4;
  const totalPages = Math.max(1, Math.ceil((localCodes.length || 22) / itemsPerPage));

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

  const handleNameChange = (id, newName) => {
    setLocalCodes((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name: newName } : item))
    );
  };

  return (
    <div className="sl100-control-code-overlay">
      <div className="sl100-control-code-main">
        {/* Rows area */}
        <div className="sl100-control-code-rows">
          {currentItems.map((item) => (
            <div key={item.id} className="sl100-control-code-row">
              <span className="sl100-code-lbl">Function</span>
              <div className="sl100-code-func-wrap">
                <input
                  type="text"
                  className="sl100-code-func-input"
                  value={item.name || ''}
                  onChange={(e) => handleNameChange(item.id, e.target.value)}
                  placeholder=""
                  spellCheck={false}
                />
                {item.hasHelp && (
                  <button
                    type="button"
                    className="sl100-code-help-badge"
                    onClick={() => setActiveHelp(item)}
                    title="Control code format help"
                  >
                    ?
                  </button>
                )}
              </div>

              <span className="sl100-code-lbl">Control code</span>
              <div className="sl100-code-hex-wrap">
                <input
                  type="text"
                  className="sl100-code-hex-input"
                  value={item.code || ''}
                  onChange={(e) => handleCodeChange(item.id, e.target.value)}
                  placeholder=""
                  spellCheck={false}
                />
              </div>

              <button
                type="button"
                className={`sl100-code-checkbox ${item.enabled ? 'is-checked' : ''}`}
                onClick={() => handleToggle(item.id)}
                title={item.enabled ? 'Enabled' : 'Disabled'}
              >
                {item.enabled && <Check size={16} strokeWidth={3} />}
              </button>
            </div>
          ))}
        </div>

        {/* Vertical Pager column */}
        <div className="sl100-control-code-pager-col">
          <button
            type="button"
            className="sl100-code-vertical-pager-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            title="Previous page"
          >
            <ChevronUp size={22} />
          </button>
          <span className="sl100-code-vertical-page-indicator">
            {currentPage}/{totalPages}
          </span>
          <button
            type="button"
            className="sl100-code-vertical-pager-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            title="Next page"
          >
            <ChevronDown size={22} />
          </button>
        </div>
      </div>

      {/* Right actions column */}
      <div className="sl100-control-code-actions">
        <button
          type="button"
          className="sl100-btn-cancel"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="sl100-btn-confirm"
          onClick={() => onConfirm(localCodes)}
        >
          Confirm
        </button>
      </div>

      {/* Parameter format information popover */}
      {activeHelp && (
        <div
          className="sl100-code-help-popover-overlay"
          onClick={() => setActiveHelp(null)}
        >
          <div
            className="sl100-code-help-popover-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sl100-code-help-title">
              {activeHelp.name} Control Code Format
            </div>
            <div className="sl100-code-help-desc">
              {activeHelp.helpText || 'Variable parameters supported: xx (00-64 value in hex), ** (checksum).'}
            </div>
            <button
              type="button"
              className="sl100-btn-confirm"
              style={{ width: '100%', height: '36px' }}
              onClick={() => setActiveHelp(null)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
