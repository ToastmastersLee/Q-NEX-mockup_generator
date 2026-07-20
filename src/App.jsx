import { useState, useEffect, useRef } from 'react';
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
import { AndroidEthernet } from './pages/AndroidEthernet';
import { Customize } from './pages/Customize';
import { ScheduledPowerOff } from './pages/ScheduledPowerOff';
import { SerialControl } from './pages/SerialControl';
import { DivisibleRoom } from './pages/DivisibleRoom';
import { AudioSwitch } from './pages/AudioSwitch';
import { NavigationBarConfig } from './pages/NavigationBarConfig';
import { Sun, Moon } from 'lucide-react';

const FaqModal = ({ isOpen, onClose, isDark }) => {
  const scrollRef = useRef(null);
  const isDown = useRef(false);
  const startY = useRef(0);
  const scrollTop = useRef(0);

  const onMouseDown = (e) => {
    isDown.current = true;
    startY.current = e.pageY - scrollRef.current.offsetTop;
    scrollTop.current = scrollRef.current.scrollTop;
    scrollRef.current.style.cursor = 'grabbing';
    scrollRef.current.style.userSelect = 'none';
  };

  const onMouseLeave = () => {
    isDown.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
    }
  };

  const onMouseUp = () => {
    isDown.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
      scrollRef.current.style.removeProperty('user-select');
    }
  };

  const onMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const y = e.pageY - scrollRef.current.offsetTop;
    const walk = (y - startY.current) * 1.5; // drag scroll speed factor
    scrollRef.current.scrollTop = scrollTop.current - walk;
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/45 z-[150] flex items-center justify-center p-4">
      <div 
        className={`w-full max-w-lg rounded-3xl p-6 shadow-2xl relative flex flex-col justify-between transition-colors duration-300 ${
          isDark 
            ? 'bg-[#1b2535] border border-slate-700/50' 
            : 'bg-white border border-gray-200'
        }`}
        style={{ minHeight: '340px' }}
      >
        <div>
          <h3 className={`font-bold text-base mb-4 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>FAQ</h3>
          
          <div 
            ref={scrollRef}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            className="max-h-[220px] overflow-y-auto no-scrollbar flex flex-col gap-3 text-left px-1 cursor-grab"
            style={{ touchAction: 'none' }}
          >
            <div>
              <h4 className={`font-bold text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>1.What if encounter a power outage?</h4>
              <p className={`text-[11px] mt-1 leading-relaxed font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Once you've set up the divisible room,NMP will store all the configurations. You don't have to reconfigure anything after power recovery.
              </p>
            </div>
            
            <div className={`border-b border-dashed w-full my-1 ${isDark ? 'border-gray-600/30' : 'border-gray-200'}`} />
            
            <div>
              <h4 className={`font-bold text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>2. When turning on the divisible room mode, no devices are available for selection</h4>
              <p className={`text-[11px] mt-1 leading-relaxed font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Make sure that NMP is connected to the network. If it is not connected, please add the devices manually.
              </p>
            </div>
            
            <div className={`border-b border-dashed w-full my-1 ${isDark ? 'border-gray-600/30' : 'border-gray-200'}`} />
            
            <div>
              <h4 className={`font-bold text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>3. I cannot find the divisible room mode on the Touch Panel.</h4>
              <p className={`text-[11px] mt-1 leading-relaxed font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                The room you're controlling might be designated as a secondary room.<br />
                To access the divisible room function, untie it from the primary room's touch panel.<br />
                Then, the secondary room's touch panel will display the option.
              </p>
            </div>
            
            <div className={`mt-2 text-[10px] leading-relaxed border-t pt-2 font-medium ${isDark ? 'text-gray-500 border-slate-700/50' : 'text-gray-400 border-gray-200'}`}>
              <p>•If the issue remains unresolved, kindly reach out to your local agent, or contact the manufacturer by email for further assistance.</p>
              <p className="mt-0.5">Email: info@qnextech.com</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button 
            onClick={onClose}
            className="px-12 py-2 rounded-full text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-95 font-semibold text-xs shadow-md active:scale-95 cursor-pointer"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

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
  
  const [isAndroidEthernetOpen, setIsAndroidEthernetOpen] = useState(false);
  const [panelIpAddress, setPanelIpAddress] = useState('192.168.101.108');
  const [settingsSubPage, setSettingsSubPage] = useState(null); // null | 'customize' | 'power-off' | 'divisible-room' | 'device-select' | 'edit-device'
  const [isScheduledPowerOffEnabled, setIsScheduledPowerOffEnabled] = useState(false);
  const [scheduledPowerOffTime, setScheduledPowerOffTime] = useState(null);

  // Divisible Room Mode State
  const [isDivisibleRoomModeEnabled, setIsDivisibleRoomModeEnabled] = useState(false);
  const [primaryRoomNmpName, setPrimaryRoomNmpName] = useState('3F-NMP/12345678');
  const [secondaryDevices, setSecondaryDevices] = useState([
    { name: '3F-Left Room', id: '0A501D7F0602', ip: '192.168.101.109', checked: false },
    { name: '3F-Right Room', id: '74151B770608', ip: '192.168.101.110', checked: false },
    { name: '3F-Rear Classroom', id: '7C171B770608', ip: '192.168.101.111', checked: false },
    { name: '3F-Sub Meeting Room', id: '924578600107', ip: '192.168.101.112', checked: false }
  ]);
  const [editingDeviceId, setEditingDeviceId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [activeConnectionPage, setActiveConnectionPage] = useState(1);

  // Connection Testing States (Lifting up from DivisibleRoom)
  const [simulatedBranch, setSimulatedBranch] = useState('success'); // 'success' | 'failed'
  const [testResult, setTestResult] = useState('loading'); // 'loading' | 'success' | 'failed'
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  const simulatedBranchRef = useRef(simulatedBranch);
  useEffect(() => {
    simulatedBranchRef.current = simulatedBranch;
  }, [simulatedBranch]);

  useEffect(() => {
    if (settingsSubPage === 'control-binding') {
      const timer = setTimeout(() => {
        setTestResult(simulatedBranchRef.current);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [settingsSubPage]);

  const handleSelectBranch = (branch) => {
    setSimulatedBranch(branch);
    setTestResult(branch);
  };

  // Automatically default connection instruction page based on checked device count
  useEffect(() => {
    if (settingsSubPage === 'connection-instruction') {
      const count = secondaryDevices.filter(d => d.checked).length;
      const timer = setTimeout(() => {
        setActiveConnectionPage(count > 1 ? 2 : 1);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [settingsSubPage, secondaryDevices]);

  const [navConfig, setNavConfig] = useState({
      powerCtrl: true,
      video: true,
      vol: true,
      serial: true,
      air: true,
      projector: true,
      remote: true,
      audioSwitch: false // Obsolete NMP211 feature, default hidden
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
      const lockTimer = setTimeout(() => {
        setIsLocked(true);
        setIsLockCountdown(false);
      }, 0);
      return () => clearTimeout(lockTimer);
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
      { id: 'remote', label: 'Remote Control', icon: 'remoteControl' },
      { id: 'audioSwitch', label: 'Audio Switch', icon: 'audioSwitch', isObsolete: true }
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

      if (activeTab === 'serial') {
          return <SerialControl isDark={isDark} />;
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
      
      if (activeTab === 'audioSwitch') {
          return <AudioSwitch isDark={isDark} />;
      }

      if (activeTab === 'settings') {
          if (settingsSubPage === 'customize') {
              return (
                  <Customize 
                      isDark={isDark}
                      onItemClick={(subItem) => {
                          if (subItem === 'Scheduled Power-Off') {
                              setSettingsSubPage('power-off');
                          } else if (subItem === 'Navigation bar') {
                              setSettingsSubPage('navigation-bar');
                          }
                      }}
                  />
              );
          }
          if (settingsSubPage === 'navigation-bar') {
              return (
                  <NavigationBarConfig 
                      isDark={isDark}
                      navConfig={navConfig}
                      setNavConfig={setNavConfig}
                      allNavItems={allNavItems}
                  />
              );
          }
          if (settingsSubPage === 'power-off') {
              return (
                  <ScheduledPowerOff 
                      isDark={isDark}
                      isEnabled={isScheduledPowerOffEnabled}
                      setIsEnabled={setIsScheduledPowerOffEnabled}
                      powerOffTime={scheduledPowerOffTime}
                      setPowerOffTime={setScheduledPowerOffTime}
                  />
              );
          }
          if (['divisible-room', 'device-select', 'edit-device', 'add-device', 'connection-instruction', 'control-binding', 'setup-complete'].includes(settingsSubPage)) {
              return (
                  <DivisibleRoom 
                      isDark={isDark}
                      subPage={settingsSubPage}
                      setSubPage={setSettingsSubPage}
                      isDivisibleRoomModeEnabled={isDivisibleRoomModeEnabled}
                      setIsDivisibleRoomModeEnabled={setIsDivisibleRoomModeEnabled}
                      primaryRoomNmpName={primaryRoomNmpName}
                      setPrimaryRoomNmpName={setPrimaryRoomNmpName}
                      secondaryDevices={secondaryDevices}
                      setSecondaryDevices={setSecondaryDevices}
                      editingDeviceId={editingDeviceId}
                      setEditingDeviceId={setEditingDeviceId}
                      activeConnectionPage={activeConnectionPage}
                      setActiveConnectionPage={setActiveConnectionPage}
                      onShowToast={(msg) => {
                          setToastMessage(msg);
                          setTimeout(() => setToastMessage(null), 3000);
                      }}
                      testResult={testResult}
                      setIsFaqOpen={setIsFaqOpen}
                  />
              );
          }
          return (
              <Settings 
                  isDark={isDark} 
                  onDisconnectionClick={() => setIsDisconnected(true)} 
                  onPanelIpClick={() => setIsAndroidEthernetOpen(true)}
                  panelIpAddress={panelIpAddress}
                  setPanelIpAddress={setPanelIpAddress}
                  onCustomizeClick={() => setSettingsSubPage('customize')}
                  onDivisibleRoomClick={() => setSettingsSubPage('divisible-room')}
              />
          );
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

                    {/* Test Simulation Toggle (Only visible during connection testing step 3/4) */}
                    {settingsSubPage === 'control-binding' && (
                        <div className={`flex items-center gap-3 p-4 rounded-xl shadow-md ${isDark ? 'bg-gray-800/80 border border-gray-700' : 'bg-white border-2 border-black'}`}>
                            <span className={`text-sm font-bold ${isDark ? 'text-gray-300' : 'text-black'}`}>Test Simulation:</span>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => handleSelectBranch('success')}
                                    className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                                        simulatedBranch === 'success' 
                                            ? 'bg-blue-600 text-white shadow-sm animate-pulse' 
                                            : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    Success Branch
                                </button>
                                <button 
                                    onClick={() => handleSelectBranch('failed')}
                                    className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                                        simulatedBranch === 'failed' 
                                            ? 'bg-rose-600 text-white shadow-sm animate-pulse' 
                                            : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    Failure Branch
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* External Theme Toggle */}
                <button onClick={() => setTheme(isDark ? 'wireframe' : 'dark')} className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold ${isDark ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700' : 'bg-white border-2 border-black text-black hover:bg-gray-100'} transition-colors shadow-md`} title="Toggle Theme">
                    {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    <span>{isDark ? 'Light Theme' : 'Dark Theme'}</span>
                </button>
            </div>

            <div className={`w-full shadow-2xl rounded-2xl overflow-hidden aspect-video-container flex flex-col font-sans ${containerClass} relative`}>
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
                ) : isAndroidEthernetOpen ? (
                    <AndroidEthernet 
                        isDark={isDark} 
                        initialIp={panelIpAddress}
                        onSave={(newIp) => setPanelIpAddress(newIp)}
                        onBack={() => setIsAndroidEthernetOpen(false)}
                    />
                ) : (
                    <>
                        <TopBar 
                            isDark={isDark} 
                            activeTab={activeTab} 
                            onSettingsClick={() => {
                                setSettingsSubPage(null);
                                setActiveTab('settings');
                            }} 
                            onHomeClick={() => {
                                setSettingsSubPage(null);
                                setActiveTab('home');
                            }}
                            onLockClick={handleLockClick}
                            title={
                                activeTab === 'settings'
                                    ? (() => {
                                          if (settingsSubPage === 'customize') return 'Customize';
                                          if (settingsSubPage === 'navigation-bar') return 'Navigation bar';
                                          if (settingsSubPage === 'power-off') return 'Scheduled Power-Off';
                                          if (settingsSubPage === 'divisible-room') return 'Divisible Room Mode';
                                          if (settingsSubPage === 'device-select') {
                                              return (
                                                  <div className="flex flex-col items-center">
                                                      <span className="text-xl font-bold">NMP of Secondary Room (1/4)</span>
                                                  </div>
                                              );
                                          }
                                          if (settingsSubPage === 'edit-device') return 'Edit Device';
                                          if (settingsSubPage === 'add-device') return 'Add Devices';
                                          if (settingsSubPage === 'connection-instruction') {
                                              const subtitle = activeConnectionPage === 2 ? 'Multiple secondary rooms' : 'Single secondary room';
                                              return (
                                                  <div className="flex flex-col items-center">
                                                      <span className="text-xl font-bold">Connection Instruction (2/4)</span>
                                                      <span className="text-xs text-gray-500 font-semibold mt-0.5">{subtitle}</span>
                                                  </div>
                                              );
                                          }
                                          if (settingsSubPage === 'control-binding') {
                                              return (
                                                  <div className="flex flex-col items-center">
                                                      <span className="text-xl font-bold">Testing (3/4)</span>
                                                  </div>
                                              );
                                          }
                                          if (settingsSubPage === 'setup-complete') {
                                              return (
                                                  <div className="flex flex-col items-center">
                                                      <span className="text-xl font-bold">Testing (4/4)</span>
                                                  </div>
                                              );
                                          }
                                          return 'Setting';
                                      })()
                                    : activeTab === 'audioSwitch'
                                        ? 'Audio Switch'
                                        : ''
                            }
                            showBackButton={activeTab === 'settings' && settingsSubPage !== null}
                            onBack={() => {
                                if (settingsSubPage === 'power-off' || settingsSubPage === 'navigation-bar') {
                                    setSettingsSubPage('customize');
                                } else if (settingsSubPage === 'customize') {
                                    setSettingsSubPage(null);
                                } else if (settingsSubPage === 'divisible-room') {
                                    setSettingsSubPage(null);
                                } else if (settingsSubPage === 'device-select') {
                                    setSettingsSubPage('divisible-room');
                                } else if (settingsSubPage === 'edit-device') {
                                    setSettingsSubPage('device-select');
                                } else if (settingsSubPage === 'add-device') {
                                    setSettingsSubPage('device-select');
                                } else if (settingsSubPage === 'connection-instruction') {
                                    setSettingsSubPage('device-select');
                                } else if (settingsSubPage === 'control-binding') {
                                    setSettingsSubPage('connection-instruction');
                                } else if (settingsSubPage === 'setup-complete') {
                                    setSettingsSubPage('control-binding');
                                }
                            }}
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
                            {toastMessage && (
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-gray-200/90 text-gray-800 shadow-xl border border-gray-300/40 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 animate-pulse text-center whitespace-nowrap">
                                    {toastMessage}
                                </div>
                            )}
                        </div>

                        <BottomNav 
                            isDark={isDark} 
                            activeTab={activeTab} 
                            setActiveTab={(tab) => {
                                setSettingsSubPage(null);
                                setActiveTab(tab);
                            }} 
                            navConfig={navConfig} 
                            allNavItems={allNavItems} 
                        />
                        <FaqModal isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)} isDark={isDark} />
                    </>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
