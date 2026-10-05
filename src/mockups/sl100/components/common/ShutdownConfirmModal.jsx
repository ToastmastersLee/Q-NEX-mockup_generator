/**
 * Shutdown Confirmation Dialog for SL100
 */
export function ShutdownConfirmModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="sl100-modal-overlay" onClick={onCancel}>
      <div className="sl100-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="sl100-modal-content">
          <p className="sl100-modal-message">
            Are you sure to shut down all devices?
          </p>
        </div>
        <div className="sl100-modal-actions">
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
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
