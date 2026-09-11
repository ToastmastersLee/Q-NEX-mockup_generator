import { menuConfigItems } from '../../constants/nav';

export function LeftControls({ isDisconnected, onDisconnectedChange, navConfig, onNavConfigChange }) {
  return (
    <div className="ndp-left-controls">
      <div className="ndp-control-row ndp-status-row">
        <span>Status:</span>
        <label>
          <input 
            type="checkbox" 
            checked={isDisconnected} 
            onChange={(e) => onDisconnectedChange(e.target.checked)} 
          />
          <strong className={isDisconnected ? 'is-disconnected' : ''}>
            {isDisconnected ? 'Disconnected' : 'Connected'}
          </strong>
        </label>
      </div>
      
      <div className="ndp-control-row ndp-menu-row">
        <span>Menu Config:</span>
        {menuConfigItems.map((item) => (
          <label key={item.id}>
            <input
              type="checkbox"
              checked={navConfig[item.id]}
              onChange={() => onNavConfigChange(item.id)}
            />
            <span>{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
