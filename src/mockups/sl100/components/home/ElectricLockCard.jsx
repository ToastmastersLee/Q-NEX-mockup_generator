import { useSl100 } from '../../context/useSl100';

export function ElectricLockCard() {
  const { electricLock, setElectricLock } = useSl100();

  return (
    <div className="sl100-panel sl100-electric-lock-panel">
      <div className="sl100-panel-header center">
        <span className="sl100-panel-title">Electric Lock</span>
      </div>

      <div className="sl100-lock-segmented-control">
        <button
          type="button"
          className={`sl100-seg-btn ${electricLock === 'unlock' ? 'is-active' : ''}`}
          onClick={() => setElectricLock('unlock')}
        >
          Unlock
        </button>
        <button
          type="button"
          className={`sl100-seg-btn ${electricLock === 'lock' ? 'is-active' : ''}`}
          onClick={() => setElectricLock('lock')}
        >
          Lock
        </button>
      </div>
    </div>
  );
}
