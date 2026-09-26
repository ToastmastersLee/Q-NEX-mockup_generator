import { useCpd10 } from '../../context/Cpd10Context';

export function ThreeMPanel() {
  const { threeMState, setThreeMState } = useCpd10();

  const updatePower = (val) => {
    setThreeMState((prev) => ({ ...prev, power: val }));
  };

  return (
    <div className="cpd10-serial-device-container">
      <div className="cpd10-3m-layout">
        <div className="cpd10-serial-card cpd10-3m-power-card">
          <span className="cpd10-serial-card-title">Power</span>
          <div className="cpd10-circular-btn-group">
            <button
              type="button"
              className={`cpd10-circle-btn ${threeMState.power === true ? 'is-active' : ''}`}
              onClick={() => updatePower(true)}
            >
              ON
            </button>
            <button
              type="button"
              className={`cpd10-circle-btn ${threeMState.power === false ? 'is-active' : ''}`}
              onClick={() => updatePower(false)}
            >
              OFF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
