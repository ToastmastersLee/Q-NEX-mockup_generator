export function WheelPickerDrawer({
  isOpen,
  options = ['Never', '1 min', '2 min', '5 min', '10 min', '30 min'],
  value,
  onSelect,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="sl100-wheel-picker-overlay" onClick={onClose}>
      <div
        className="sl100-wheel-picker-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sl100-wheel-picker-list">
          {options.map((opt) => {
            const isSelected = opt === value;
            return (
              <button
                key={opt}
                type="button"
                className={`sl100-wheel-picker-item ${isSelected ? 'is-selected' : ''}`}
                onClick={() => {
                  onSelect(opt);
                  onClose();
                }}
              >
                <span>{opt}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
