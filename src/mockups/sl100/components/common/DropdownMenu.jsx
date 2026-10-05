/**
 * SL100 Floating Dropdown Menu Component
 * Matches authentic hardware popup menu layout (Photo media_1791173615028.jpg)
 */

export function DropdownMenu({
  isOpen,
  options = [],
  value,
  onSelect,
  onClose,
  align = 'right',
  minWidth = '160px',
}) {
  if (!isOpen) return null;

  return (
    <>
      <div className="sl100-dropdown-backdrop" onClick={onClose} />
      <div
        className={`sl100-dropdown-menu align-${align}`}
        style={{ minWidth }}
      >
        {options.map((opt) => {
          const optValue = typeof opt === 'object' ? opt.value : opt;
          const optLabel = typeof opt === 'object' ? opt.label : opt;
          const isSelected = optValue === value;

          return (
            <button
              key={optValue}
              type="button"
              className={`sl100-dropdown-item ${isSelected ? 'is-selected' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(optValue);
                onClose();
              }}
            >
              {optLabel}
            </button>
          );
        })}
      </div>
    </>
  );
}
