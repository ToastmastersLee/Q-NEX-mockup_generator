import { SerialCableIcon } from '../common/SerialCableIcon';
import { useSl100 } from '../../context/useSl100';

export function SerialPortCard() {
  const { setScreen } = useSl100();

  return (
    <div
      className="sl100-panel sl100-serial-port-card"
      onClick={() => setScreen('serial-ptz')}
      role="button"
      tabIndex={0}
      title="Open Serial Port Controls"
    >
      <div className="sl100-serial-card-icon-wrap">
        <SerialCableIcon />
      </div>

      <div className="sl100-serial-card-footer">
        <span className="sl100-serial-card-title">Serial Port</span>
        <span className="sl100-serial-card-caret">▾</span>
      </div>
    </div>
  );
}
