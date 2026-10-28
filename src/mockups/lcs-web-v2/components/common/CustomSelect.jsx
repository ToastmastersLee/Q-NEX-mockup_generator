import { useState, useRef, useEffect } from 'react';

export function CustomSelect({ value, options, onChange, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const normalizedOptions = options.map(opt =>
    typeof opt === 'object' && opt !== null ? opt : { value: opt, label: opt }
  );

  const selectedOption = normalizedOptions.find(opt => opt.value === value) || normalizedOptions[0];

  return (
    <div className={`lcs-web-custom-select-wrapper ${className}`} ref={containerRef} onKeyDown={event => { if (event.key === 'Escape') setIsOpen(false); }}>
      <button
        type="button"
        className={`lcs-web-custom-select-trigger ${isOpen ? 'is-open' : ''}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        title={selectedOption?.label}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span className="whitespace-normal text-left">{selectedOption?.label}</span>
        <span className="lcs-web-select-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="lcs-web-custom-select-menu" role="listbox">
          {normalizedOptions.map(opt => {
            const isSelected = opt.value === value;
            return (
              <button
                type="button"
                role="option"
                aria-selected={isSelected}
                key={opt.value}
                className={`lcs-web-custom-select-item ${isSelected ? 'is-selected' : ''}`}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
