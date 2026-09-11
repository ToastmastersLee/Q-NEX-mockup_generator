import { useState } from 'react';

export function useLcsSettingsState({ isRemoteClassroomView, showToast }) {
  // Settings Panel state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [remainingHours, setRemainingHours] = useState(97);
  const [activeSettingsTab, setActiveSettingsTab] = useState('device'); // 'device' | 'storage' | 'network' | 'version' | 'advance'
  const [previousSettingsTab, setPreviousSettingsTab] = useState('device');

  // General & Device settings
  const [settingsLanguage, setSettingsLanguage] = useState('english');
  const [settingsPowerBoot, setSettingsPowerBoot] = useState('normal');
  const [settingsAlarms, setSettingsAlarms] = useState({
    on1: { enabled: false, time: '07:00' },
    off1: { enabled: false, time: '12:30' },
    on2: { enabled: false, time: '13:50' },
    off2: { enabled: false, time: '20:00' }
  });
  const [settingsOthers, setSettingsOthers] = useState({
    saveFilmLayout: false,
    powerOnLive: false,
    powerOnRecord: false,
    startCountdown: false,
    timeFormat: 'DD-MM-YYYY',
    hourFormat: '24 Hours Format'
  });
  const [settingsRecordStrategy, setSettingsRecordStrategy] = useState('delete'); // 'delete' | 'stop'

  // Advance settings verification states
  const [isAdvanceVerified, setIsAdvanceVerified] = useState(false);
  const [showAdvanceAuth, setShowAdvanceAuth] = useState(false);
  const [authAccount, setAuthAccount] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authFocusedInput, setAuthFocusedInput] = useState('account'); // 'account' | 'password'
  const [authError, setAuthError] = useState('');
  const [isCaps, setIsCaps] = useState(false);

  const handleSettingsTabChange = (tab) => {
    if (tab === 'advance') {
      if (!isAdvanceVerified) {
        setShowAdvanceAuth(true);
        setAuthFocusedInput('account');
        setAuthAccount('');
        setAuthPassword('');
        setAuthError('');
        setActiveSettingsTab('advance');
      } else {
        setActiveSettingsTab('advance');
      }
    } else {
      setShowAdvanceAuth(false);
      setPreviousSettingsTab(tab);
      setActiveSettingsTab(tab);
    }
  };

  const handleKeyPress = (char) => {
    if (authFocusedInput === 'account') {
      setAuthAccount(prev => prev + char);
    } else {
      setAuthPassword(prev => prev + char);
    }
  };
  
  const handleBackspace = () => {
    if (authFocusedInput === 'account') {
      setAuthAccount(prev => prev.slice(0, -1));
    } else {
      setAuthPassword(prev => prev.slice(0, -1));
    }
  };
  
  const handleAuthVerify = () => {
    if (authAccount.toLowerCase() === 'admin' && authPassword === 'admin') {
      setIsAdvanceVerified(true);
      setShowAdvanceAuth(false);
      if (showToast) showToast("Advance verification successful!");
    } else {
      setAuthError("Incorrect Account or Password!");
      setAuthPassword('');
      setTimeout(() => setAuthError(''), 3000);
    }
  };

  const displayTab = (activeSettingsTab === 'advance' && showAdvanceAuth) ? previousSettingsTab : activeSettingsTab;

  // Channel configs for RTSP & PTZ
  const [settingsChannelConfigs, setSettingsChannelConfigs] = useState({
    Teacher_C: {
      raw: 'RTSP',
      url: 'rtsp://admin:20210421@192.167.32.65/sub',
      ptzEnabled: false,
      ptzIp: '127.0.0.2',
      ptzPort: '8642',
      ptzProtocol: 'Visca',
      ptzType: 'UDP'
    },
    Student_C: {
      raw: 'RTSP',
      url: 'rtsp://admin:20210421@192.167.32.66/sub',
      ptzEnabled: false,
      ptzIp: '127.0.0.2',
      ptzPort: '8643',
      ptzProtocol: 'Visca',
      ptzType: 'UDP'
    },
    Teacher_P: {
      raw: 'RTSP',
      url: 'rtsp://admin:20210421@192.167.32.65/main',
      ptzEnabled: false,
      ptzIp: '127.0.0.2',
      ptzPort: '5858',
      ptzProtocol: 'Visca',
      ptzType: 'UDP'
    },
    Student_P: {
      raw: 'RTSP',
      url: 'rtsp://admin:20210421@192.167.32.68/sub',
      ptzEnabled: false,
      ptzIp: '127.0.0.2',
      ptzPort: '8644',
      ptzProtocol: 'Visca',
      ptzType: 'UDP'
    }
  });
  const [settingsChannelActive, setSettingsChannelActive] = useState('Teacher_C'); // 'Teacher_C' | 'Student_C' | 'Teacher_P' | 'Student_P'

  const updateChannelConfig = (key, value) => {
    setSettingsChannelConfigs(prev => ({
      ...prev,
      [settingsChannelActive]: {
        ...prev[settingsChannelActive],
        [key]: value
      }
    }));
  };

  // Network settings states
  const [settingsNetworkSubTab, setSettingsNetworkSubTab] = useState('config'); // 'config' | 'detect'
  const [settingsNetworkDhcp, setSettingsNetworkDhcp] = useState(false);
  const [settingsNetworkIp, setSettingsNetworkIp] = useState(isRemoteClassroomView ? '192.168.3.37' : '192.168.3.50');
  const [settingsNetworkMask, setSettingsNetworkMask] = useState(isRemoteClassroomView ? '255.255.255.0' : '113.31.119.88');
  const [settingsNetworkGateway, setSettingsNetworkGateway] = useState('192.168.3.1');
  const [settingsNetworkDns, setSettingsNetworkDns] = useState('');

  // Ping states & actions
  const [pingAddress, setPingAddress] = useState('www.bing.com');
  const [pingConsoleLines, setPingConsoleLines] = useState([]);
  const [isPinging, setIsPinging] = useState(false);

  const handleStartPing = () => {
    if (isPinging) return;
    setIsPinging(true);
    setPingConsoleLines([]);
    
    const address = pingAddress || 'www.bing.com';
    const lines = [
      `PING ${address} (202.89.233.100): 56 data bytes`
    ];
    setPingConsoleLines([...lines]);
    
    let count = 0;
    const interval = setInterval(() => {
      if (count < 3) {
        const time = (41 + Math.random() * 2).toFixed(3);
        const newLine = `64 bytes from 202.89.233.100: seq=${count} ttl=115 time=${time} ms`;
        setPingConsoleLines(prev => [...prev, newLine]);
        count++;
      } else {
        clearInterval(interval);
        
        const finalLines = [
          '',
          `--- ${address} ping statistics ---`,
          '3 packets transmitted, 3 packets received, 0% packet loss',
          'round-trip min/avg/max = 41.906/42.086/42.328 ms'
        ];
        setPingConsoleLines(prev => [...prev, ...finalLines]);
        setIsPinging(false);
      }
    }, 800);
  };

  const handleClearPing = () => {
    setPingConsoleLines([]);
    setIsPinging(false);
  };

  // Version Detect states
  const [versionDetectState, setVersionDetectState] = useState('idle'); // 'idle' | 'detecting' | 'latest'
  const handleVersionCheck = () => {
    if (versionDetectState === 'detecting') return;
    setVersionDetectState('detecting');
    setTimeout(() => {
      setVersionDetectState('latest');
    }, 1500);
  };

  // Advance settings states
  const [settingsAdvanceSubTab, setSettingsAdvanceSubTab] = useState('record'); // 'record' | 'live' | 'channel' | 'server' | 'interactive' | 'sip'
  const [settingsAdvanceSelect, setSettingsAdvanceSelect] = useState({
    pgm: true,
    lecture: true,
    lecture2: false,
    teacherC: true,
    studentC: true,
    teacherP: false,
    studentP: false,
    interactive: false
  });
  const [settingsAdvanceName, setSettingsAdvanceName] = useState('PGM');
  const [settingsAdvanceBitrate] = useState('4096Kbps');
  const [settingsAdvanceFormat] = useState('MP4');
  const [settingsAdvanceFrameRate] = useState('30fps');
  const [settingsAdvanceCodec] = useState('H264');
  const [settingsAdvanceResolution] = useState('3840*2160');
  const [settingsAdvanceSegment] = useState('0');
  const [settingsAdvanceMaxTime] = useState('4hour');

  // Live sub-tab settings states
  const [settingsLiveSelect, setSettingsLiveSelect] = useState({
    pgm: true,
    lecture: false,
    lecture2: false,
    teacherC: false,
    studentC: false,
    teacherP: false,
    studentP: false,
    interactive: false
  });
  const [settingsLiveFormat] = useState('RTMP');
  const [settingsLiveBitrate] = useState('2048Kbps');
  const [settingsLiveFrameRate] = useState('25fps');
  const [settingsLiveResolution] = useState('1920*1080');
  const [settingsLiveServer, setSettingsLiveServer] = useState('rtmp://192.168.3.50:1935/live/xxx');

  // Server sub-tab settings states
  const [settingsServerIp, setSettingsServerIp] = useState('192.168.3.50');
  const [settingsServerPlatform, setSettingsServerPlatform] = useState('192.168.3.50:8081');
  const [settingsServerDeviceName, setSettingsServerDeviceName] = useState('Fuzhou HQ - Main Hall');
  const [settingsServerAuthCode, setSettingsServerAuthCode] = useState('123456');
  const [settingsServerOrgId, setSettingsServerOrgId] = useState('10000000');
  const [settingsServerCreateLoc, setSettingsServerCreateLoc] = useState(true);

  // Interactive sub-tab settings states
  const [settingsInteractiveOutput1] = useState('PGM');
  const [settingsInteractiveQuality1] = useState('FHD');
  const [settingsInteractiveOutput2] = useState('Teacher_C');
  const [settingsInteractiveQuality2] = useState('FHD');
  const [settingsInteractiveMaxScreens, setSettingsInteractiveMaxScreens] = useState('9'); // '4' | '9'
  const [settingsInteractivePgScroll] = useState('10');
  const [settingsInteractivePgScrollEnable, setSettingsInteractivePgScrollEnable] = useState(false);
  const [settingsInteractiveMicNum] = useState('0');
  const [settingsInteractiveSpeakerFull, setSettingsInteractiveSpeakerFull] = useState(true);
  const [settingsInteractiveShowLocalCreator, setSettingsInteractiveShowLocalCreator] = useState(false);
  const [settingsInteractiveLocalDisplays, setSettingsInteractiveLocalDisplays] = useState('1'); // '2' | '1'
  const [settingsInteractiveDisplayLayout, setSettingsInteractiveDisplayLayout] = useState('V1'); // 'V1' | 'V2' | 'V2_V1'
  const [settingsInteractiveSendCreator] = useState('Student_C');
  const [settingsInteractiveQualityJoiner] = useState('FHD');
  const [settingsInteractiveShowLocalJoiner, setSettingsInteractiveShowLocalJoiner] = useState(false);
  const [settingsInteractiveAutoJoin, setSettingsInteractiveAutoJoin] = useState(false);

  // SIP sub-tab settings states
  const [settingsSipCalls, setSettingsSipCalls] = useState(true);
  const [settingsSipRegister, setSettingsSipRegister] = useState(false);
  const [settingsSipDomain, setSettingsSipDomain] = useState('192.168.110.3');
  const [settingsSipServer, setSettingsSipServer] = useState('192.168.110.3');
  const [settingsSipPort, setSettingsSipPort] = useState('5060');
  const [settingsSipUsername, setSettingsSipUsername] = useState('user1');
  const [settingsSipPassword, setSettingsSipPassword] = useState('123456');
  const [settingsSipNatRoute, setSettingsSipNatRoute] = useState(false);
  const [settingsSipTransmission, setSettingsSipTransmission] = useState('TCP'); // 'TCP' | 'UDP'
  const [settingsSipVideoOutput, setSettingsSipVideoOutput] = useState('PGM');
  const [isSipVideoOutputDropdownOpen, setIsSipVideoOutputDropdownOpen] = useState(false);
  const [settingsSipVideoQuality, setSettingsSipVideoQuality] = useState('FHD');
  const [isSipVideoQualityDropdownOpen, setIsSipVideoQualityDropdownOpen] = useState(false);
  const [settingsSipDualStream, setSettingsSipDualStream] = useState(false);
  const [settingsSipPipLayout, setSettingsSipPipLayout] = useState(4); // 1 | 2 | 3 | 4

  return {
    isSettingsOpen, setIsSettingsOpen,
    remainingHours, setRemainingHours,
    activeSettingsTab, setActiveSettingsTab,
    previousSettingsTab, setPreviousSettingsTab,
    displayTab,
    handleSettingsTabChange,
    settingsLanguage, setSettingsLanguage,
    settingsPowerBoot, setSettingsPowerBoot,
    settingsAlarms, setSettingsAlarms,
    settingsOthers, setSettingsOthers,
    settingsRecordStrategy, setSettingsRecordStrategy,
    isAdvanceVerified, setIsAdvanceVerified,
    showAdvanceAuth, setShowAdvanceAuth,
    authAccount, setAuthAccount,
    authPassword, setAuthPassword,
    authFocusedInput, setAuthFocusedInput,
    authError, setAuthError,
    isCaps, setIsCaps,
    handleKeyPress,
    handleBackspace,
    handleAuthVerify,
    settingsChannelConfigs, setSettingsChannelConfigs,
    settingsChannelActive, setSettingsChannelActive,
    updateChannelConfig,
    settingsNetworkSubTab, setSettingsNetworkSubTab,
    settingsNetworkDhcp, setSettingsNetworkDhcp,
    settingsNetworkIp, setSettingsNetworkIp,
    settingsNetworkMask, setSettingsNetworkMask,
    settingsNetworkGateway, setSettingsNetworkGateway,
    settingsNetworkDns, setSettingsNetworkDns,
    pingAddress, setPingAddress,
    pingConsoleLines, setPingConsoleLines,
    isPinging, setIsPinging,
    handleStartPing,
    handleClearPing,
    versionDetectState, setVersionDetectState,
    handleVersionCheck,
    settingsAdvanceSubTab, setSettingsAdvanceSubTab,
    settingsAdvanceSelect, setSettingsAdvanceSelect,
    settingsAdvanceName, setSettingsAdvanceName,
    settingsAdvanceBitrate,
    settingsAdvanceFormat,
    settingsAdvanceFrameRate,
    settingsAdvanceCodec,
    settingsAdvanceResolution,
    settingsAdvanceSegment,
    settingsAdvanceMaxTime,
    settingsLiveSelect, setSettingsLiveSelect,
    settingsLiveFormat,
    settingsLiveBitrate,
    settingsLiveFrameRate,
    settingsLiveResolution,
    settingsLiveServer, setSettingsLiveServer,
    settingsServerIp, setSettingsServerIp,
    settingsServerPlatform, setSettingsServerPlatform,
    settingsServerDeviceName, setSettingsServerDeviceName,
    settingsServerAuthCode, setSettingsServerAuthCode,
    settingsServerOrgId, setSettingsServerOrgId,
    settingsServerCreateLoc, setSettingsServerCreateLoc,
    settingsInteractiveOutput1,
    settingsInteractiveQuality1,
    settingsInteractiveOutput2,
    settingsInteractiveQuality2,
    settingsInteractiveMaxScreens, setSettingsInteractiveMaxScreens,
    settingsInteractivePgScroll,
    settingsInteractivePgScrollEnable, setSettingsInteractivePgScrollEnable,
    settingsInteractiveMicNum,
    settingsInteractiveSpeakerFull, setSettingsInteractiveSpeakerFull,
    settingsInteractiveShowLocalCreator, setSettingsInteractiveShowLocalCreator,
    settingsInteractiveLocalDisplays, setSettingsInteractiveLocalDisplays,
    settingsInteractiveDisplayLayout, setSettingsInteractiveDisplayLayout,
    settingsInteractiveSendCreator,
    settingsInteractiveQualityJoiner,
    settingsInteractiveShowLocalJoiner, setSettingsInteractiveShowLocalJoiner,
    settingsInteractiveAutoJoin, setSettingsInteractiveAutoJoin,
    settingsSipCalls, setSettingsSipCalls,
    settingsSipRegister, setSettingsSipRegister,
    settingsSipDomain, setSettingsSipDomain,
    settingsSipServer, setSettingsSipServer,
    settingsSipPort, setSettingsSipPort,
    settingsSipUsername, setSettingsSipUsername,
    settingsSipPassword, setSettingsSipPassword,
    settingsSipNatRoute, setSettingsSipNatRoute,
    settingsSipTransmission, setSettingsSipTransmission,
    settingsSipVideoOutput, setSettingsSipVideoOutput,
    isSipVideoOutputDropdownOpen, setIsSipVideoOutputDropdownOpen,
    settingsSipVideoQuality, setSettingsSipVideoQuality,
    isSipVideoQualityDropdownOpen, setIsSipVideoQualityDropdownOpen,
    settingsSipDualStream, setSettingsSipDualStream,
    settingsSipPipLayout, setSettingsSipPipLayout
  };
}
