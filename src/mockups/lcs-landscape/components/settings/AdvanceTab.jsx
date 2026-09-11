import { useLcs } from '../../context/LcsContext';
import { RecordSubTab } from './advance/RecordSubTab';
import { LiveSubTab } from './advance/LiveSubTab';
import { ChannelSubTab } from './advance/ChannelSubTab';
import { ServerSubTab } from './advance/ServerSubTab';
import { InteractiveSubTab } from './advance/InteractiveSubTab';
import { SipSubTab } from './advance/SipSubTab';

export function AdvanceTab() {
  const {
    settingsAdvanceSubTab,
    setSettingsAdvanceSubTab
  } = useLcs();

  return (
    <div className="lcs-settings-advance-tab">
      {/* Sub Navigation Bar */}
      <div className="lcs-settings-subnav-row" style={{ justifyContent: 'center' }}>
        {[
          { label: 'Record', value: 'record' },
          { label: 'Live', value: 'live' },
          { label: 'Channel', value: 'channel' },
          { label: 'Server', value: 'server' },
          { label: 'Interactive', value: 'interactive' },
          { label: 'SIP', value: 'sip' }
        ].map((subTab) => (
          <button
            key={subTab.value}
            type="button"
            className={`lcs-subnav-btn ${settingsAdvanceSubTab === subTab.value ? 'is-active' : ''}`}
            onClick={() => setSettingsAdvanceSubTab(subTab.value)}
          >
            {subTab.label}
          </button>
        ))}
      </div>

      {settingsAdvanceSubTab === 'record' ? (
        <RecordSubTab />
      ) : settingsAdvanceSubTab === 'live' ? (
        <LiveSubTab />
      ) : settingsAdvanceSubTab === 'channel' ? (
        <ChannelSubTab />
      ) : settingsAdvanceSubTab === 'server' ? (
        <ServerSubTab />
      ) : settingsAdvanceSubTab === 'interactive' ? (
        <InteractiveSubTab />
      ) : settingsAdvanceSubTab === 'sip' ? (
        <SipSubTab />
      ) : (
        <div className="lcs-settings-row" style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', opacity: 0.7 }}>
          <span style={{ fontSize: '12px' }}>{settingsAdvanceSubTab.toUpperCase()} Settings Panel (Coming Soon)</span>
        </div>
      )}
    </div>
  );
}
