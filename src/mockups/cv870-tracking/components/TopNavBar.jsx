import { Monitor, Film, Network, HelpCircle } from 'lucide-react';

export function TopNavBar({ activeTab, onSelectTab }) {
  return (
    <div className="cms-top-nav">
      <div className="cms-nav-tabs">
        <button
          type="button"
          className={`cms-nav-tab ${activeTab === 'device' ? 'is-active' : ''}`}
          onClick={() => onSelectTab('device')}
        >
          <Network size={16} className="cms-tab-icon" />
          <span>Device Management</span>
        </button>

        <button
          type="button"
          className={`cms-nav-tab ${activeTab === 'mainView' ? 'is-active' : ''}`}
          onClick={() => onSelectTab('mainView')}
        >
          <Monitor size={16} className="cms-tab-icon" />
          <span>Main View</span>
        </button>

        <button
          type="button"
          className={`cms-nav-tab ${activeTab === 'playback' ? 'is-active' : ''}`}
          onClick={() => onSelectTab('playback')}
        >
          <Film size={16} className="cms-tab-icon" />
          <span>Remote Playback</span>
        </button>
      </div>

      <div className="cms-nav-right">
        <button
          type="button"
          className="cms-help-link"
          onClick={() => alert('CameraCMS Surveillance Client v1.0.27\nConnected to LCS 192.167.32.0/24 subnet.')}
        >
          <HelpCircle size={13} />
          <span>Help info</span>
        </button>
      </div>
    </div>
  );
}
