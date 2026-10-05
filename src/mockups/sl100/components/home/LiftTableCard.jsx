import { useSl100 } from '../../context/useSl100';

export function LiftTableCard() {
  const { liftTableHeight, setLiftTableHeight } = useSl100();

  const presets = [
    { id: 'high', label: 'High' },
    { id: 'middle', label: 'Middle' },
    { id: 'low', label: 'Low' },
  ];

  return (
    <div className="sl100-panel sl100-lift-table-panel">
      <div className="sl100-panel-header center">
        <span className="sl100-panel-title">Lift Table</span>
      </div>

      <div className="sl100-lift-buttons-stack">
        {presets.map((preset) => {
          const isActive = liftTableHeight === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              className={`sl100-lift-btn ${isActive ? 'is-active' : ''}`}
              onClick={() => setLiftTableHeight(preset.id)}
            >
              {preset.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
