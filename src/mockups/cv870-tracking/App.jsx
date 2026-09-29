import { useState } from 'react';
import './styles.css';
import { WindowHeader } from './components/WindowHeader';
import { TopNavBar } from './components/TopNavBar';
import { DeviceManagementView } from './components/DeviceManagementView';
import { MainView } from './components/MainView';
import { RemotePlaybackView } from './components/RemotePlaybackView';
import { GuideAssistantDrawer } from './components/GuideAssistantDrawer';

export default function Cv870TrackingApp() {
  const [activeTab, setActiveTab] = useState('device'); // 'device' | 'mainView' | 'playback'
  const [toastMessage, setToastMessage] = useState(null);

  // Managed Devices State
  const [managedDevices, setManagedDevices] = useState([
    {
      id: '1',
      no: '001',
      nickname: 'Teacher Camera (CV870Pro)',
      deviceName: 'Teacher Camera (CV870Pro)',
      ip: '192.167.32.65',
      serialNo: '7556X302MLORQUV327W4',
      mac: '00:04:05:0F:46:99',
      type: 'IP Camera',
      version: '1.0.40',
      status: 'connected'
    }
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  const handleAutoPopulate = () => {
    setManagedDevices([
      {
        id: '1',
        no: '001',
        nickname: 'Teacher Camera (CV870Pro)',
        deviceName: 'Teacher Camera (CV870Pro)',
        ip: '192.167.32.65',
        serialNo: '7556X302MLORQUV327W4',
        mac: '00:04:05:0F:46:99',
        type: 'IP Camera',
        version: '1.0.40',
        status: 'connected'
      },
      {
        id: '2',
        no: '002',
        nickname: 'Student Camera (CV870Pro)',
        deviceName: 'Student Camera (CV870Pro)',
        ip: '192.167.32.66',
        serialNo: 'J2E54102MLOMQUS5X464',
        mac: '00:04:05:0F:45:E5',
        type: 'IP Camera',
        version: '1.0.40',
        status: 'connected'
      }
    ]);
    setActiveTab('mainView');
  };

  return (
    <div className="cms-app-root">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="cms-global-toast">
          <span className="cms-toast-dot" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Authentic CameraCMS Desktop Window */}
      <div className="cms-window-container">
        {/* 1. Titlebar */}
        <WindowHeader
          title="CameraCMS - [V1.0.27.97-2023.030]"
          onClose={() => showToast('Close window request')}
          onMinimize={() => showToast('Window minimized')}
          onMaximize={() => showToast('Window maximized')}
        />

        {/* 2. Top Navigation Tabs */}
        <TopNavBar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
        />

        {/* 3. Main Client Viewport */}
        <div className="cms-app-body">
          {activeTab === 'device' && (
            <DeviceManagementView
              managedDevices={managedDevices}
              setManagedDevices={setManagedDevices}
              onNavigateToMainView={() => setActiveTab('mainView')}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'mainView' && (
            <MainView
              managedDevices={managedDevices}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'playback' && (
            <RemotePlaybackView
              onShowToast={showToast}
            />
          )}
        </div>
      </div>

      {/* 4. Collapsible Setup Guide Drawer */}
      <GuideAssistantDrawer
        onSelectTab={setActiveTab}
        onAutoPopulate={handleAutoPopulate}
        onShowToast={showToast}
      />
    </div>
  );
}
