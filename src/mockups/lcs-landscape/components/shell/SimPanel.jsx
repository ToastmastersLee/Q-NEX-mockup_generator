import { Lock, Sun, Moon, Circle, Play, Sliders, Monitor } from 'lucide-react';
import { useLcs } from '../../context/LcsContext';

export function SimPanel() {
  const {
    isRemoteClassroomView,
    theme,
    setTheme,
    setIsAdvanceVerified,
    setShowAdvanceAuth,
    activeSettingsTab,
    setActiveSettingsTab,
    showToast,
    isRecording,
    handleRecordToggle,
    isLive,
    setIsLive,
    currentLayout,
    setCurrentLayout
  } = useLcs();

  if (isRemoteClassroomView) return null;

  return (
    <>
      {/* Right Side floating simulation panel */}
      <div className="lcs-right-simulator-panel">
        <div style={{ fontSize: '10px', fontWeight: 'bold', color: theme === 'light' ? '#4b5563' : '#cbd5e0', textTransform: 'uppercase', textAlign: 'center', marginBottom: '4px', opacity: 0.8 }}>
          Simulation
        </div>
        <button 
          type="button" 
          className="lcs-right-sim-btn" 
          onClick={() => {
            setIsAdvanceVerified(false);
            setShowAdvanceAuth(false);
            if (activeSettingsTab === 'advance') {
              setActiveSettingsTab('device');
            }
            showToast("Advance Login Reset!");
          }}
        >
          <Lock size={14} />
          <span>Reset Login</span>
        </button>
        <div style={{ fontSize: '9px', color: theme === 'light' ? '#4b5563' : '#cbd5e0', opacity: 0.8, textAlign: 'center', marginTop: '6px', lineHeight: '1.2', borderTop: theme === 'light' ? '1px solid #e5e7eb' : '1px solid rgba(255,255,255,0.08)', paddingTop: '6px' }}>
          <div style={{ opacity: 0.6 }}>Default Auth:</div>
          <div style={{ fontWeight: 'bold', marginTop: '2px' }}>admin / admin</div>
        </div>
      </div>
      
      {/* Simulation Controls Panel (floating outside device) */}
      <div className="lcs-simulation-toolbar">
        <div className="lcs-sim-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>LCS Simulation Controls</span>
        </div>
        <div className="lcs-sim-buttons">
          <button 
            type="button" 
            className="lcs-sim-btn" 
            onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          
          <button 
            type="button" 
            className={`lcs-sim-btn ${isRecording ? 'is-active' : ''}`}
            onClick={handleRecordToggle}
          >
            <Circle size={12} fill={isRecording ? '#ef4444' : 'transparent'} className={isRecording ? 'animate-pulse' : ''} />
            <span>Record</span>
          </button>

          <button 
            type="button" 
            className={`lcs-sim-btn ${isLive ? 'is-active' : ''}`}
            onClick={() => setIsLive(!isLive)}
          >
            <Play size={12} fill={isLive ? '#3b82f6' : 'transparent'} />
            <span>Live Stream</span>
          </button>

          <button 
            type="button" 
            className={`lcs-sim-btn ${currentLayout === 'l5' ? 'is-active' : ''}`}
            onClick={() => {
              setCurrentLayout('l5');
            }}
          >
            <Sliders size={12} />
            <span>Director View (Orig)</span>
          </button>

          <button 
            type="button" 
            className={`lcs-sim-btn ${isRemoteClassroomView ? 'is-active' : ''}`}
            onClick={() => {
              const url = new URL(window.location.href);
              url.searchParams.set('mode', 'remote_classroom');
              window.open(url.toString(), '_blank');
            }}
            title="Open Remote Classroom View in a new tab"
          >
            <Monitor size={12} />
            <span>Remote Classroom View</span>
          </button>
        </div>
      </div>
    </>
  );
}
