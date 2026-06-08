import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { Home } from './pages/Home';
import { VideoSwitch } from './pages/VideoSwitch';
import { Settings } from './pages/Settings';
import { PowerControl } from './pages/PowerControl';
import { Volume } from './pages/Volume';
import { AirConditioner } from './pages/AirConditioner';
import { ProjectionScreen } from './pages/ProjectionScreen';
import { RemoteControl } from './pages/RemoteControl';
import { Disconnection } from './pages/Disconnection';
import { LockCountdownModal } from './components/LockCountdownModal';
import { LockScreen } from './pages/LockScreen';
import { Sun, Moon } from 'lucide-react';

function App() {
  const [theme, setTheme] = useState('dark'); // 'dark' | 'wireframe'
  const [activeTab, setActiveTab] = useState('powerCtrl');
  const [activeOutA, setActiveOutA] = useState('hdmi1');
  const [activeOutB, setActiveOutB] = useState('hdmi1');
  const [activeOutC, setActiveOutC] = useState('hdmi1');
  const [isDuplicateMode, setIsDuplicateMode] = useState(false);
  const [activeDuplicate, setActiveDuplicate] = useState('hdmi1');
  const [isDisconnected, setIsDisconnected] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isLockCountdown, setIsLockCountdown] = useState(false);
  const [lockCountdownTime, setLockCountdownTime] = useState(10);
  
  const [navConfig, setNavConfig] = useState({
      powerCtrl: true,
      video: true,
      vol: true,
      serial: true,
      air: true,
      projector: true,
      remote: true
  });

  const isDark = theme === 'dark';

  // Lock screen countdown effect
  useEffect(() => {
    let timer;
    if (isLockCountdown && lockCountdownTime > 0) {
      timer = setTimeout(() => {
        setLockCountdownTime(prev => prev - 1);
      }, 1000);
    } else if (isLockCountdown && lockCountdownTime === 0) {
      setIsLocked(true);
      setIsLockCountdown(false);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLockCountdown, lockCountdownTime]);

  const handleLockClick = () => {
    setLockCountdownTime(10);
    setIsLockCountdown(true);
  };

  const cancelLockCountdown = () => {
    setIsLockCountdown(false);
    setLockCountdownTime(10);
  };

  const executeLockNow = () => {
    setIsLocked(true);
    setIsLockCountdown(false);
  };

  const allNavItems = [
      { id: 'powerCtrl', label: 'Power Control', icon: 'powerControl' },
      { id: 'video', label: 'Video Switch', icon: 'videoSwitch' },
      { id: 'vol', label: 'Vol.', icon: 'volume-2' },
      { id: 'serial', label: 'Serial Control', icon: 'serial' },
      { id: 'air', label: 'Air Conditioner', icon: 'airConditioner' },
      { id: 'projector', label: 'Projection Screen', icon: 'projectorScreen' },
      { id: 'remote', label: 'Remote Control', icon: 'remoteControl' }
  ];

  const renderContent = () => {
      if (activeTab === 'home') {
          return (
              <Home 
                  isDark={isDark} 
                  isDuplicateMode={isDuplicateMode}
                  setIsDuplicateMode={setIsDuplicateMode}
                  activeDuplicate={activeDuplicate}
                  setActiveDuplicate={setActiveDuplicate}
                  activeOutA={activeOutA}
                  setActiveOutA={setActiveOutA}
                  activeOutB={activeOutB}
                  setActiveOutB={setActiveOutB}
                  activeOutC={activeOutC}
                  setActiveOutC={setActiveOutC}
              />
          );
      }
      
      if (activeTab === 'powerCtrl') {
          return <PowerControl isDark={isDark} />;
      }
      
      if (activeTab === 'vol') {
          return <Volume isDark={isDark} />;
      }
      
      if (activeTab === 'air') {
          return <AirConditioner isDark={isDark} />;
      }

      if (activeTab === 'projector') {
          return <ProjectionScreen isDark={isDark} />;
      }
      
      if (activeTab === 'remote') {
          return <RemoteControl isDark={isDark} />;
      }

      if (activeTab === 'video') {
          return (
              <VideoSwitch 
                  isDark={isDark}
                  isDuplicateMode={isDuplicateMode}
                  setIsDuplicateMode={setIsDuplicateMode}
                  activeDuplicate={activeDuplicate}
                  setActiveDuplicate={setActiveDuplicate}
                  activeOutA={activeOutA}
                  setActiveOutA={setActiveOutA}
                  activeOutB={activeOutB}
                  setActiveOutB={setActiveOutB}
                  activeOutC={activeOutC}
                  setActiveOutC={setActiveOutC}
              />
          );
      }
      
      if (activeTab === 'settings') {
          return <Settings isDark={isDark} onDisconnectionClick={() => setIsDisconnected(true)} />;
      }

      return (
          <div className="flex items-center justify-center h-full">
              <h2 className="text-4xl opacity-50 capitalize">{activeTab} View</h2>
          </div>
      );
  };

  const containerClass = isDark ? 'bg-gradient-to-br from-[#414a5e] to-[#252a36] text-white border-none' : 'bg-white border-4 border-black text-black';

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 p-8 w-full">
      <div className="w-full max-w-5xl relative">
        <div className="flex flex-col items-end gap-4 w-full">
            {/* External Controls */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between w-full gap-4 mb-2">
                <div className="flex flex-wrap gap-4 items-center">
                    {/* Connection Status Toggle */}
                    <div className={`flex items-center gap-3 p-4 rounded-xl shadow-md ${isDark ? 'bg-gray-800/80 border border-gray-700' : 'bg-white border-2 border-black'}`}>
                        <span className={`text-sm font-bold ${isDark ? 'text-gray-300' : 'text-black'}`}>Status:</span>
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input 
                                type="checkbox" 
                                className="w-4 h-4 cursor-pointer accent-red-500"
                                checked={isDisconnected} 
                                onChange={() => setIsDisconnected(!isDisconnected)} 
                            />
                            <span className={`text-xs font-bold transition-colors ${isDisconnected ? 'text-red-500' : (isDark ? 'text-emerald-400 group-hover:text-emerald-300' : 'text-emerald-600 group-hover:text-emerald-700')}`}>
                                {isDisconnected ? 'Disconnected' : 'Connected'}
                            </span>
                        </label>
                    </div>

                    {/* Dynamic Menu Visibility Checkboxes */}
                    <div className={`flex flex-wrap gap-4 p-4 rounded-xl shadow-md ${isDark ? 'bg-gray-800/80 border border-gray-700' : 'bg-white border-2 border-black'}`}>
                        <span className={`text-sm font-bold mr-2 ${isDark ? 'text-gray-300' : 'text-black'}`}>Menu Config:</span>
                        {allNavItems.map(item => (
                            <label key={item.id} className="flex items-center gap-2 cursor-pointer group">
                                <input 
                                    type="checkbox" 
                                    className="w-4 h-4 cursor-pointer"
                                    checked={navConfig[item.id]} 
                                    onChange={() => setNavConfig({...navConfig, [item.id]: !navConfig[item.id]})} 
                                />
                                <span className={`text-xs ${isDark ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-700 font-semibold group-hover:text-black'}`}>{item.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* External Theme Toggle */}
                <button onClick={() => setTheme(isDark ? 'wireframe' : 'dark')} className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold ${isDark ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700' : 'bg-white border-2 border-black text-black hover:bg-gray-100'} transition-colors shadow-md`} title="Toggle Theme">
                    {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    <span>{isDark ? 'Light Theme' : 'Dark Theme'}</span>
                </button>
            </div>

            <div className={`w-full shadow-2xl rounded-2xl overflow-hidden aspect-video-container flex flex-col font-sans ${containerClass}`}>
                {isDisconnected ? (
                    <Disconnection 
                        isDark={isDark} 
                        onConnect={() => setIsDisconnected(false)} 
                    />
                ) : isLocked ? (
                    <LockScreen 
                        isDark={isDark} 
                        onUnlock={() => setIsLocked(false)} 
                    />
                ) : (
                    <>
                        <TopBar 
                            isDark={isDark} 
                            activeTab={activeTab} 
                            onSettingsClick={() => setActiveTab('settings')} 
                            onHomeClick={() => setActiveTab('home')}
                            onLockClick={handleLockClick}
                        />

                        {/* Main Content Area */}
                        <div className="flex-1 overflow-auto relative">
                            {renderContent()}
                            {isLockCountdown && (
                                <LockCountdownModal 
                                    isDark={isDark}
                                    countdown={lockCountdownTime}
                                    onCancel={cancelLockCountdown}
                                    onExecute={executeLockNow}
                                />
                            )}
                        </div>

                        <BottomNav 
                            isDark={isDark} 
                            activeTab={activeTab} 
                            setActiveTab={setActiveTab} 
                            navConfig={navConfig} 
                            allNavItems={allNavItems} 
                        />
                    </>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
