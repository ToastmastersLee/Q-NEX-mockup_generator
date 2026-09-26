import React from 'react';

/**
 * SerialImportModal
 * Recreates the CSV configuration auto-detect dialog (media_1790419850109.jpg).
 * "Serial Configuration File Detected, Do you want to import the custom configuration?"
 * [Cancel]  [Import]
 */
export function SerialImportModal({ isOpen, onImport, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="cpd10-serial-import-overlay">
      <div className="cpd10-serial-import-card">
        <p className="cpd10-serial-import-msg">
          Serial Configuration File Detected, Do you want to import the custom configuration?
        </p>
        <div className="cpd10-serial-import-btns">
          <button
            type="button"
            className="cpd10-import-pill-btn cpd10-import-btn-cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="cpd10-import-pill-btn cpd10-import-btn-confirm"
            onClick={onImport}
          >
            Import
          </button>
        </div>
      </div>
    </div>
  );
}
