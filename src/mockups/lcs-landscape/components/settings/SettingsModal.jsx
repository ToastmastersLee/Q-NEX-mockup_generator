import { Settings } from 'lucide-react';
import { useLcs } from '../../context/LcsContext';
import { DeviceTab } from './DeviceTab';
import { StorageTab } from './StorageTab';
import { NetworkTab } from './NetworkTab';
import { VersionTab } from './VersionTab';
import { AdvanceTab } from './AdvanceTab';
import { AdvanceAuthModal } from './auth/AdvanceAuthModal';

export function SettingsModal() {
  const {
    activeMenuSection,
    setActiveMenuSection,
    activeSettingsTab,
    displayTab,
    handleSettingsTabChange,
  } = useLcs();

  if (activeMenuSection !== 'set') {
    return null;
  }

  return (
    <div className="lcs-full-settings-overlay">
      {/* Sidebar */}
      <div className="lcs-settings-sidebar">
        <div className="lcs-settings-sidebar-top">
          <button 
            type="button" 
            className={`lcs-sidebar-btn ${activeSettingsTab === 'device' ? 'is-active' : ''}`}
            onClick={() => handleSettingsTabChange('device')}
          >
            Device set
          </button>
          <button 
            type="button" 
            className={`lcs-sidebar-btn ${activeSettingsTab === 'storage' ? 'is-active' : ''}`}
            onClick={() => handleSettingsTabChange('storage')}
          >
            Storage set
          </button>
          <button 
            type="button" 
            className={`lcs-sidebar-btn ${activeSettingsTab === 'network' ? 'is-active' : ''}`}
            onClick={() => handleSettingsTabChange('network')}
          >
            Network set
          </button>
          <button 
            type="button" 
            className={`lcs-sidebar-btn ${activeSettingsTab === 'version' ? 'is-active' : ''}`}
            onClick={() => handleSettingsTabChange('version')}
          >
            Version
          </button>
          <button 
            type="button" 
            className={`lcs-sidebar-btn ${activeSettingsTab === 'advance' ? 'is-active' : ''}`}
            onClick={() => handleSettingsTabChange('advance')}
          >
            Advance
          </button>
        </div>
        
        <button 
          type="button" 
          className="lcs-sidebar-btn"
          onClick={() => setActiveMenuSection(null)}
        >
          Exit
        </button>
      </div>

      {/* Main Content Area */}
      <div className="lcs-settings-main">
        {displayTab === 'device' ? (
          <DeviceTab />
        ) : displayTab === 'storage' ? (
          <StorageTab />
        ) : displayTab === 'network' ? (
          <NetworkTab />
        ) : displayTab === 'version' ? (
          <VersionTab />
        ) : displayTab === 'advance' ? (
          <AdvanceTab />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '12px', opacity: 0.7 }}>
            <Settings size={32} className="animate-spin" style={{ animationDuration: '4s' }} />
            <span style={{ fontSize: '13px' }}>{activeSettingsTab.toUpperCase()} Settings Panel (Coming Soon)</span>
          </div>
        )}

        {/* OK Button */}
        <div className="lcs-settings-ok-container">
          <button 
            type="button" 
            className="lcs-settings-ok-btn"
            onClick={() => setActiveMenuSection(null)}
          >
            OK
          </button>
        </div>
      </div>

      {/* Advance settings authentication modal & virtual keyboard */}
      <AdvanceAuthModal />
    </div>
  );
}
