import { useState, useEffect, useRef } from 'react';
import { LockScreen } from '../../pages/LockScreen';
import { 
  Play, 
  Circle, 
  Pause, 
  Volume2, 
  VolumeX, 
  Monitor, 
  Film, 
  Settings, 
  Sun, 
  Moon, 
  Mic, 
  Sliders,
  Lock,
  User,
  RotateCw,
  Video,
  Phone,
  Plus
} from 'lucide-react';
import classroomFeed from '../../assets/classroom_feed.png';
import ch1Ppt from '../../assets/ch1_ppt.png';
import ch2DocCam from '../../assets/ch2_doc_cam.png';
import ch3TeacherClose from '../../assets/ch3_teacher_close.png';
import ch4StudentClose from '../../assets/ch4_student_close.png';
import ch6StudentPano from '../../assets/ch4_student_panoprama.png';
import ch7Remote from '../../assets/ch7_remote_classroom.png';
import './styles.css';

export default function App() {
  const isRemoteClassroomView = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('mode') === 'remote_classroom';
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light'
  const [isLocked, setIsLocked] = useState(false);

  
  
  
  // Interactive States
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  
  // Interactive UI overlay states
  const [interactiveSubPage, setInteractiveSubPage] = useState('home'); // 'home' | 'start' | 'join'
  const [showSipCallModal, setShowSipCallModal] = useState(false);
  const [sipUserName, setSipUserName] = useState('');
  const [joinClassId, setJoinClassId] = useState('');
  const [joinClassPassword, setJoinClassPassword] = useState('');
  const [isInteractiveSessionActive, setIsInteractiveSessionActive] = useState(false);
  const [addressBook, setAddressBook] = useState([
    { id: 'addr1', name: 'Shanghai Campus - Room 101', status: 'online', checked: true },
    { id: 'addr2', name: 'Beijing Campus - Room 201', status: 'online', checked: false },
    { id: 'addr3', name: 'Guangzhou Campus - Class A', status: 'online', checked: false },
    { id: 'addr4', name: 'Shenzhen Branch - Room 302', status: 'online', checked: false },
    { id: 'addr5', name: 'Singapore Campus - Remote Room', status: 'offline', checked: false },
    { id: 'addr6', name: 'London Branch - Int\'l Room', status: 'offline', checked: false },
  ]);
  const [interactiveCallState, setInteractiveCallState] = useState('idle'); // 'idle' | 'entering' | 'room_loading' | 'room_active'
  const [selectedRemoteHost, setSelectedRemoteHost] = useState('Shanghai Campus - Room 101');
  const [mainClassroomHost] = useState('Fuzhou HQ - Main Hall');
  const [showMicToast, setShowMicToast] = useState(true);
  const [isDirectorMinimized, setIsDirectorMinimized] = useState(false);

  // Interactive Room PGM Dropdown states
  const [isPgmDropdownOpen, setIsPgmDropdownOpen] = useState(false);
  const [selectedPgmSource, setSelectedPgmSource] = useState('PGM'); // 'PGM' | 'Lecture' | 'Lecture2' | 'Teacher_C' | 'Student_C' | 'Teacher_P' | 'Student_P'

  // 2-Level Layout Configuration Interaction States
  const [level1ModalOpen, setLevel1ModalOpen] = useState(false);
  const [level1TargetLayout, setLevel1TargetLayout] = useState('l2');
  const [level2TargetSlot, setLevel2TargetSlot] = useState(null);
  const levelInteractionRef = useRef(null);

  // Click-Outside Dismissal for Level 1 & Level 2 Popups
  useEffect(() => {
    if (!level1ModalOpen) return;

    const handleClickOutside = (event) => {
      if (levelInteractionRef.current && !levelInteractionRef.current.contains(event.target)) {
        const isDrawerClick = event.target.closest('.lcs-layout-thumb-card') || event.target.closest('.lcs-active-layout-badge');
        if (!isDrawerClick) {
          setLevel1ModalOpen(false);
          setLevel2TargetSlot(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [level1ModalOpen]);

  const handleOpenLevel1 = (layoutId) => {
    setCurrentLayout(layoutId);
    setLevel1TargetLayout(layoutId);
    setLevel1ModalOpen(true);
    setLevel2TargetSlot(null);
  };

  // Set English document title based on mode
  useEffect(() => {
    if (isRemoteClassroomView) {
      document.title = "Remote Classroom View - LCS Host";
    } else {
      document.title = "LCS Station - Main Classroom Host";
    }
  }, [isRemoteClassroomView]);

  // Handle interactive call state timer transitions
  useEffect(() => {
    let timer;
    if (interactiveCallState === 'entering') {
      timer = setTimeout(() => {
        setInteractiveCallState('room_loading');
        setShowMicToast(true);
      }, 1400);
    } else if (interactiveCallState === 'room_loading') {
      timer = setTimeout(() => {
        setInteractiveCallState('room_active');
      }, 1600);
    }
    return () => clearTimeout(timer);
  }, [interactiveCallState]);



  // Dropdown menus states
  const [lockScreenTime, setLockScreenTime] = useState('2minute');
  const [isLockScreenDropdownOpen, setIsLockScreenDropdownOpen] = useState(false);
  const [timeFormat, setTimeFormat] = useState('DD-MM-YYYY');
  const [isTimeFormatDropdownOpen, setIsTimeFormatDropdownOpen] = useState(false);
  const [hourFormat, setHourFormat] = useState('24 Hours Format');
  const [isHourFormatDropdownOpen, setIsHourFormatDropdownOpen] = useState(false);

  // Net Detect states
  const [pingAddress, setPingAddress] = useState('www.bing.com');
  const [pingConsoleLines, setPingConsoleLines] = useState([]);
  const [isPinging, setIsPinging] = useState(false);

  // Version Detect states
  const [versionDetectState, setVersionDetectState] = useState('idle'); // 'idle' | 'detecting' | 'latest'

  // Per-channel configurations for RTSP & PTZ
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
  
  const [isLive, setIsLive] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState('ch3'); // default active channel (Teacher_C)

  const [micLevel, setMicLevel] = useState(45); // fluctuated dynamically
  const [isMuted, setIsMuted] = useState(false);
  
  // Layout Select Overlays
  const [isLayoutBarOpen, setIsLayoutBarOpen] = useState(false);
  const [currentLayout, setCurrentLayout] = useState(isRemoteClassroomView ? 'l1' : 'l5'); // 'l1' to 'l8'
  const [directorMode, setDirectorMode] = useState('manual'); // 'manual' | 'auto'

  // Double-click Channel Re-selection States
  const [isChannelSelectOpen, setIsChannelSelectOpen] = useState(false);
  const [selectedLayoutToEdit, setSelectedLayoutToEdit] = useState('l3');
  const [activeEditSlot, setActiveEditSlot] = useState('');
  const [layoutChannels, setLayoutChannels] = useState({
    l1: { main: 'ch6' },
    l2: { main: 'ch7', pip: 'ch3' },
    l3: { left: 'ch4', right: 'ch3' },
    l4: { main: 'ch2', pip: 'ch1' },
    l5: { topLeft: 'ch5', bottomLeft: 'ch4', right: 'ch3' },
    l6: { row1: 'ch2', row2: 'ch1', row3: 'ch4', right: 'ch3' },
    l7: { tl: 'ch2', tr: 'ch3', bl: 'ch1', br: 'ch4' },
    l8: { main: 'ch3' }
  });

  // Handle right-side channel click to update Main Channel slot in active layout
  const handleSelectRightChannel = (channelId) => {
    setSelectedChannel(channelId);
    
    // Map each layout to its primary/main channel slot key (matching user diagram arrows)
    const mainSlotMap = {
      l1: 'main',
      l2: 'main',
      l3: 'right',
      l4: 'main',
      l5: 'right',
      l6: 'right',
      l7: 'tl',
      l8: 'main'
    };

    const mainSlotKey = mainSlotMap[currentLayout] || 'main';

    setLayoutChannels(prev => ({
      ...prev,
      [currentLayout]: {
        ...prev[currentLayout],
        [mainSlotKey]: channelId
      }
    }));
  };

  // Cross-tab Real-time BroadcastChannel Synchronization
  useEffect(() => {
    let bc;
    try {
      bc = new BroadcastChannel('lcs_main_remote_sync');
    } catch {
      return;
    }

    if (isRemoteClassroomView) {
      // Remote Classroom View Tab (Listener / Follower)
      bc.onmessage = (event) => {
        const { type, payload } = event.data || {};
        if (type === 'STATE_SYNC' && payload) {
          if (payload.currentLayout !== undefined) setCurrentLayout(payload.currentLayout);
          if (payload.selectedChannel !== undefined) setSelectedChannel(payload.selectedChannel);
          if (payload.layoutChannels !== undefined) setLayoutChannels(payload.layoutChannels);
          if (payload.interactiveCallState !== undefined) setInteractiveCallState(payload.interactiveCallState);
          if (payload.selectedRemoteHost !== undefined) setSelectedRemoteHost(payload.selectedRemoteHost);
          if (payload.isLive !== undefined) setIsLive(payload.isLive);
          if (payload.isRecording !== undefined) setIsRecording(payload.isRecording);
          if (payload.showMicToast !== undefined) setShowMicToast(payload.showMicToast);
          if (payload.selectedPgmSource !== undefined) setSelectedPgmSource(payload.selectedPgmSource);
        }
      };

      // Request initial state snapshot from Main Classroom tab
      bc.postMessage({ type: 'REQUEST_SYNC' });
    } else {
      // Main Classroom Tab (Broadcaster / Leader)
      bc.onmessage = (event) => {
        const { type } = event.data || {};
        if (type === 'REQUEST_SYNC') {
          bc.postMessage({
            type: 'STATE_SYNC',
            payload: {
              currentLayout,
              selectedChannel,
              layoutChannels,
              interactiveCallState,
              selectedRemoteHost,
              isLive,
              isRecording,
              showMicToast,
              selectedPgmSource
            }
          });
        }
      };
    }

    return () => {
      bc.close();
    };
  }, [
    isRemoteClassroomView,
    currentLayout,
    selectedChannel,
    layoutChannels,
    interactiveCallState,
    selectedRemoteHost,
    isLive,
    isRecording,
    showMicToast,
    selectedPgmSource
  ]);

  // Broadcast state changes whenever Main Classroom tab state updates
  useEffect(() => {
    if (isRemoteClassroomView) return;
    let bc;
    try {
      bc = new BroadcastChannel('lcs_main_remote_sync');
      bc.postMessage({
        type: 'STATE_SYNC',
        payload: {
          currentLayout,
          selectedChannel,
          layoutChannels,
          interactiveCallState,
          selectedRemoteHost,
          isLive,
          isRecording,
          showMicToast,
          selectedPgmSource
        }
      });
    } catch {
      // ignore
    }
    return () => {
      if (bc) bc.close();
    };
  }, [
    isRemoteClassroomView,
    currentLayout,
    selectedChannel,
    layoutChannels,
    interactiveCallState,
    selectedRemoteHost,
    isLive,
    isRecording,
    showMicToast,
    selectedPgmSource
  ]);

  const layoutSlotConfigs = {
    l1: [
      { key: 'main', label: 'Main' }
    ],
    l2: [
      { key: 'main', label: 'Main' },
      { key: 'pip', label: 'PiP' }
    ],
    l3: [
      { key: 'left', label: 'Left' },
      { key: 'right', label: 'Right' }
    ],
    l4: [
      { key: 'main', label: 'Main' },
      { key: 'pip', label: 'PiP' }
    ],
    l5: [
      { key: 'topLeft', label: 'Top Left' },
      { key: 'bottomLeft', label: 'Bottom Left' },
      { key: 'right', label: 'Right' }
    ],
    l6: [
      { key: 'row1', label: 'Row 1' },
      { key: 'row2', label: 'Row 2' },
      { key: 'row3', label: 'Row 3' },
      { key: 'right', label: 'Right' }
    ],
    l7: [
      { key: 'tl', label: 'Top Left' },
      { key: 'tr', label: 'Top Right' },
      { key: 'bl', label: 'Bottom Left' },
      { key: 'br', label: 'Bottom Right' }
    ]
  };

  // Time clock state
  const [timeString, setTimeString] = useState('10-07-2026 17:24:29');
  
  // Settings Panel state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [remainingHours, setRemainingHours] = useState(97);

  // Menu Popup & Section states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenuSection, setActiveMenuSection] = useState(null); // 'set' | 'file' | 'ptz' | 'power' | null

  // Detailed settings page states
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
  const [activeSettingsTab, setActiveSettingsTab] = useState('device'); // 'device' | 'storage' | 'network' | 'version' | 'advance'
  const [settingsRecordStrategy, setSettingsRecordStrategy] = useState('delete'); // 'delete' | 'stop'
  
  // Network settings states
  const [settingsNetworkSubTab, setSettingsNetworkSubTab] = useState('config'); // 'config' | 'detect'
  const [settingsNetworkDhcp, setSettingsNetworkDhcp] = useState(false);
  const [settingsNetworkIp, setSettingsNetworkIp] = useState(isRemoteClassroomView ? '192.168.3.37' : '192.168.3.50');
  const [settingsNetworkMask, setSettingsNetworkMask] = useState(isRemoteClassroomView ? '255.255.255.0' : '113.31.119.88');
  const [settingsNetworkGateway, setSettingsNetworkGateway] = useState('192.168.3.1');
  const [settingsNetworkDns, setSettingsNetworkDns] = useState('');

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

  // Channel sub-tab settings states
  const [settingsChannelActive, setSettingsChannelActive] = useState('Teacher_C'); // 'Teacher_C' | 'Student_C' | 'Teacher_P' | 'Student_P'

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

  // File overlay states
  const [fileStorageTab, setFileStorageTab] = useState('local'); // 'local' | 'mobile'
  const [filePlayerState, setFilePlayerState] = useState('loading'); // 'loading' | 'playing' | 'paused'
  const [filePlaybackTime, setFilePlaybackTime] = useState(6);
  const [fileActivePage, setFileActivePage] = useState(1);
  const [files, setFiles] = useState([
    { id: 1, name: 'Teacher_C.mp4', size: '422.54K', checked: false },
    { id: 2, name: 'PGM.mp4', size: '105.58K', checked: false },
    { id: 3, name: 'Student_C.mp4', size: '1.27M', checked: true },
    { id: 4, name: 'Lecture.mp4', size: '90.77K', checked: false },
    { id: 5, name: 'Teacher_C.mp4', size: '4.74G', checked: false, isActive: true, start: '2026-07-09 10:53:35', duration: '3:59:57', classTime: '4:00:02', lecturer: '', theme: '' },
    { id: 6, name: 'Lecture.mp4', size: '390.83M', checked: false },
    { id: 7, name: 'PGM.mp4', size: '957.47M', checked: false },
    { id: 8, name: 'Teacher_C.mp4', size: '4.74G', checked: false },
    { id: 9, name: 'Student_C.mp4', size: '7.35G', checked: false }
  ]);
  const [playingFileName, setPlayingFileName] = useState('Teacher_C.mp4');
  const [playingFileStart, setPlayingFileStart] = useState('2026-07-09 10:53:35');
  const [isFileFullscreen, setIsFileFullscreen] = useState(false);

  // PTZ states
  const [ptzActiveChannel, setPtzActiveChannel] = useState('ch3'); // 'ch3' | 'ch4' | 'ch5' | 'ch6'
  const [ptzSpeed, setPtzSpeed] = useState(4); // 1 to 8
  const [ptzPresetMode, setPtzPresetMode] = useState('call'); // 'set' | 'call'
  const [toastMessage, setToastMessage] = useState(null);

  // Power states
  const [powerActionConfirm, setPowerActionConfirm] = useState(null); // null | 'restart' | 'shutdown' | 'logout'
  const [isSystemShutdown, setIsSystemShutdown] = useState(false);
  const [isSystemRestarting, setIsSystemRestarting] = useState(false);
  const [isSystemLoggingOut, setIsSystemLoggingOut] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    // Auto dismiss after 2s
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2000);
    return () => clearTimeout(timer);
  };

  // Move auth states and helper constants here (after activeSettingsTab is initialized)
  const sublabelColor = theme === 'light' ? '#1f2937' : '#cbd5e0';
  const pipBorderColor = theme === 'light' ? '#94a3b8' : 'rgba(255,255,255,0.4)';
  const pipInnerBgColor = theme === 'light' ? '#64748b' : '#cbd5e0';
  const pipSplitBgColor = theme === 'light' ? '#94a3b8' : 'rgba(255,255,255,0.2)';
  const groupHeaderColor = theme === 'light' ? '#1f2937' : '#fff';
  const groupHeaderBorder = theme === 'light' ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.05)';
  
  // Advance settings verification states
  const [isAdvanceVerified, setIsAdvanceVerified] = useState(false);
  const [showAdvanceAuth, setShowAdvanceAuth] = useState(false);
  const [previousSettingsTab, setPreviousSettingsTab] = useState('device');
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
      showToast("Advance verification successful!");
    } else {
      setAuthError("Incorrect Account or Password!");
      setAuthPassword('');
      setTimeout(() => setAuthError(''), 3000);
    }
  };

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

  const handleVersionCheck = () => {
    if (versionDetectState === 'detecting') return;
    setVersionDetectState('detecting');
    setTimeout(() => {
      setVersionDetectState('latest');
    }, 1500);
  };

  const updateChannelConfig = (key, value) => {
    setSettingsChannelConfigs(prev => ({
      ...prev,
      [settingsChannelActive]: {
        ...prev[settingsChannelActive],
        [key]: value
      }
    }));
  };

  const displayTab = (activeSettingsTab === 'advance' && showAdvanceAuth) ? previousSettingsTab : activeSettingsTab;

  // Handle playback timer
  useEffect(() => {
    let interval = null;
    if (activeMenuSection === 'file' && filePlayerState === 'playing') {
      interval = setInterval(() => {
        setFilePlaybackTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeMenuSection, filePlayerState]);

  // Loading state simulation when opening File Overlay
  useEffect(() => {
    if (activeMenuSection === 'file') {
      const initTimer = setTimeout(() => {
        setFilePlayerState('loading');
        setFilePlaybackTime(6);
      }, 0);
      const timer = setTimeout(() => {
        setFilePlayerState('playing');
      }, 1500);
      return () => {
        clearTimeout(initTimer);
        clearTimeout(timer);
      };
    }
  }, [activeMenuSection]);

  const timerRef = useRef(null);

  // Update clock every second
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const dd = String(now.getDate()).padStart(2, '0');
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const yyyy = now.getFullYear();
      const datePart = timeFormat === 'DD-MM-YYYY' 
        ? `${dd}-${mm}-${yyyy}` 
        : `${yyyy}-${mm}-${dd}`;
      
      let hours = now.getHours();
      const min = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      
      let timePart;
      if (hourFormat === '24 Hours Format') {
        const hh = String(hours).padStart(2, '0');
        timePart = `${hh}:${min}:${ss}`;
      } else {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const hh = String(hours).padStart(2, '0');
        timePart = `${hh}:${min}:${ss} ${ampm}`;
      }
      setTimeString(`${datePart} ${timePart}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [timeFormat, hourFormat]);

  // Fluctuating Mic Level simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isMuted) {
        setMicLevel(prev => {
          const delta = Math.floor(Math.random() * 21) - 10; // -10 to 10
          const next = Math.max(10, Math.min(85, prev + delta));
          return next;
        });
      } else {
        setMicLevel(0);
      }
    }, 250);
    return () => clearInterval(interval);
  }, [isMuted]);

  // Recording Timer
  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setRecordSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording, isPaused]);

  const handleRecordToggle = () => {
    if (!isRecording) {
      setIsRecording(true);
      setIsPaused(false);
      setRecordSeconds(0);
    } else {
      setIsRecording(false);
      setIsPaused(false);
      setRecordSeconds(0);
    }
  };

  const handlePauseToggle = () => {
    if (isRecording) {
      setIsPaused(!isPaused);
    }
  };

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const formatPlaybackTime = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleLayoutDoubleClick = (layoutId) => {
    setSelectedLayoutToEdit(layoutId);
    handleOpenLevel1(layoutId);
  };

  // Channel images map
  const channelImages = {
    ch1: ch1Ppt,
    ch2: ch2DocCam,
    ch3: ch3TeacherClose,
    ch4: ch4StudentClose,
    ch5: classroomFeed,
    ch6: ch6StudentPano,
    ch7: ch7Remote
  };

  // Channel details data
  const channels = [
    { id: 'ch1', name: 'Lecture', label: 'CH1', type: 'live', pos: 'center' },
    { id: 'ch2', name: 'Lecture2', label: 'CH2', type: 'live', pos: 'center' },
    { id: 'ch3', name: 'Teacher_C', label: 'CH3', type: 'live', pos: 'center' },
    { id: 'ch4', name: 'Student_C', label: 'CH4', type: 'live', pos: 'center' },
    { id: 'ch5', name: 'Teacher_P', label: 'CH5', type: 'live', pos: 'right center' },
    { id: 'ch6', name: 'Student_P', label: 'CH6', type: 'live', pos: 'center' },
    { id: 'ch7', name: 'Interactive', label: 'CH7', type: 'live', pos: 'center' }
  ];

  const getInteractiveTimeParts = () => {
    const now = new Date();
    const timeVal = now.toTimeString().split(' ')[0]; // HH:MM:SS
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayVal = dayNames[now.getDay()];
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();
    const dateVal = `${dd}-${mm}-${yyyy}`;
    return { timeVal, dateVal, dayVal };
  };
  const { timeVal: interactiveTime, dateVal: interactiveDate, dayVal: interactiveDay } = getInteractiveTimeParts();

  if (isLocked) {
    return <LockScreen isDark={theme === 'dark'} onUnlock={() => setIsLocked(false)} />;
  }

  return (
    <div className={`lcs-stage-container ${theme === 'light' ? 'is-light' : 'is-dark'}`}>
      
      {/* Right Side floating simulation panel */}
      {!isRemoteClassroomView && (
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
      )}
      
      {/* Simulation Controls Panel (floating outside device) */}
      {!isRemoteClassroomView && (
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
      )}

      {/* Hardware Device Shell */}
      <div className="lcs-hardware-shell">
        <div className="lcs-screen-container">
          
          {/* SCREEN CONTENT */}
          <div className="lcs-screen">
            {toastMessage && (
              <div className="lcs-toast-notification">
                {toastMessage}
              </div>
            )}

            {isSystemShutdown && (
              <div className="lcs-system-shutdown-overlay">
                <div className="lcs-shutdown-content">
                  <div className="lcs-shutdown-logo">IQ</div>
                  <p>System Powered Off</p>
                  <button 
                    type="button" 
                    className="lcs-power-on-btn"
                    onClick={() => {
                      setIsSystemShutdown(false);
                      setIsSystemRestarting(true);
                      setTimeout(() => {
                        setIsSystemRestarting(false);
                      }, 2500);
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '20px', height: '20px' }}>
                      <path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10" />
                    </svg>
                    <span>Power On</span>
                  </button>
                </div>
              </div>
            )}

            {isSystemRestarting && (
              <div className="lcs-system-loader-overlay">
                <div className="lcs-loader-content">
                  <div className="lcs-spinner-ring large" />
                  <span style={{ fontSize: '13px', fontWeight: 'bold' }}>System Restarting...</span>
                </div>
              </div>
            )}

            {isSystemLoggingOut && (
              <div className="lcs-system-loader-overlay">
                <div className="lcs-loader-content">
                  <div className="lcs-spinner-ring large" />
                  <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Logging Off...</span>
                </div>
              </div>
            )}
            
            {/* Top Bar */}
            <div className="lcs-top-bar">
              <div className="lcs-top-left">
                <span className="lcs-brand">IQ</span>
              </div>
              <div className="lcs-top-center">
                <span className="lcs-recording-time">
                  Remaining recording time: {remainingHours} hours
                </span>
              </div>
              <div className="lcs-top-right">
                <span className="lcs-clock">{timeString}</span>
                <button 
                  type="button" 
                  className="lcs-top-icon" 
                  onClick={() => setIsMuted(!isMuted)}
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
                <button 
                  type="button" 
                  className="lcs-top-icon" 
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  title="Settings"
                >
                  <Settings size={15} className={isSettingsOpen ? 'rotate-45' : ''} />
                </button>
              </div>
            </div>

            {/* Main Area */}
            <div className="lcs-main-area">
              
              {/* Left Column: Video Display & Bottom Control Bar */}
              <div className="lcs-left-pane">
                
                {/* Director View / Video Feed Display Area */}
                <div className="lcs-video-feed-box">
                  {activeMenuSection === 'power' ? (
                    <div className="lcs-power-preview-layout">
                      <div className="lcs-power-preview-viewport">
                        <div className="lcs-power-preview-placeholder-overlay">
                          <svg className="lcs-ptz-film-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                            <line x1="7" y1="2" x2="7" y2="22" />
                            <line x1="17" y1="2" x2="17" y2="22" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <line x1="2" y1="7" x2="7" y2="7" />
                            <line x1="2" y1="17" x2="7" y2="17" />
                            <line x1="17" y1="17" x2="22" y2="17" />
                            <line x1="17" y1="7" x2="22" y2="7" />
                            <polygon points="9.5 9 15.5 12 9.5 15 9.5 9" fill="currentColor" />
                          </svg>
                        </div>
                      </div>

                      {/* Hint Confirmation Modal Overlay */}
                      {powerActionConfirm && (
                        <div className="lcs-power-hint-modal">
                          <div className="lcs-power-hint-header">Hint</div>
                          <div className="lcs-power-hint-body">
                            <div className="lcs-power-hint-message">
                              {powerActionConfirm === 'logout' && 'Log off or not?'}
                              {powerActionConfirm === 'restart' && 'Restart system or not?'}
                              {powerActionConfirm === 'shutdown' && 'Shut down system or not?'}
                            </div>
                            <div className="lcs-power-hint-actions">
                              <button 
                                type="button" 
                                className="lcs-power-hint-btn yes"
                                onClick={() => {
                                  const action = powerActionConfirm;
                                  setPowerActionConfirm(null);
                                  setActiveMenuSection(null);
                                  
                                  if (action === 'logout') {
                                    setIsSystemLoggingOut(true);
                                    setTimeout(() => {
                                      setIsSystemLoggingOut(false);
                                      setIsLocked(true);
                                      showToast("Logged out successfully");
                                    }, 2000);
                                  } else if (action === 'restart') {
                                    setIsSystemRestarting(true);
                                    setTimeout(() => {
                                      setIsSystemRestarting(false);
                                      showToast("System restarted successfully");
                                    }, 2500);
                                  } else if (action === 'shutdown') {
                                    setIsSystemShutdown(true);
                                  }
                                }}
                              >
                                Yes
                              </button>
                              <button 
                                type="button" 
                                className="lcs-power-hint-btn no"
                                onClick={() => setPowerActionConfirm(null)}
                              >
                                No
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Power bottom control drawer */}
                      <div className="lcs-power-drawer">
                        {/* Title & Close */}
                        <div className="lcs-ptz-drawer-top">
                          <span className="lcs-ptz-drawer-title">Power Ctrl</span>
                          <button 
                            type="button" 
                            className="lcs-ptz-drawer-close"
                            onClick={() => setActiveMenuSection(null)}
                          >
                            ✕
                          </button>
                        </div>

                        <div className="lcs-power-drawer-body">
                          {/* Restart Button */}
                          <div className="lcs-power-action-unit">
                            <button 
                              type="button" 
                              className="lcs-power-circle-btn restart"
                              onClick={() => setPowerActionConfirm('restart')}
                            >
                              <div className="lcs-power-icon-spinner">
                                {[...Array(8)].map((_, i) => (
                                  <span key={i} style={{ transform: `rotate(${i * 45}deg) translateY(-8px)` }} />
                                ))}
                              </div>
                            </button>
                            <span className="lcs-power-action-label">Restart</span>
                          </div>

                          {/* Shutdown Button */}
                          <div className="lcs-power-action-unit">
                            <button 
                              type="button" 
                              className="lcs-power-circle-btn shutdown"
                              onClick={() => setPowerActionConfirm('shutdown')}
                            >
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="lcs-power-svg-icon">
                                <path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10" />
                              </svg>
                            </button>
                            <span className="lcs-power-action-label">Shutdown</span>
                          </div>

                          {/* Logout Button */}
                          <div className="lcs-power-action-unit">
                            <button 
                              type="button" 
                              className="lcs-power-circle-btn logout"
                              onClick={() => setPowerActionConfirm('logout')}
                            >
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="lcs-power-svg-icon">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                              </svg>
                            </button>
                            <span className="lcs-power-action-label">Logout</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : activeMenuSection === 'ptz' ? (
                    <div className="lcs-ptz-preview-layout">
                      <div className="lcs-ptz-preview-viewport">
                        <img 
                          src={channelImages[ptzActiveChannel]} 
                          alt="ptz-preview" 
                          className="lcs-ptz-preview-img" 
                        />
                        <div className="lcs-ptz-preview-placeholder-overlay">
                          <svg className="lcs-ptz-film-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                            <line x1="7" y1="2" x2="7" y2="22" />
                            <line x1="17" y1="2" x2="17" y2="22" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <line x1="2" y1="7" x2="7" y2="7" />
                            <line x1="2" y1="17" x2="7" y2="17" />
                            <line x1="17" y1="17" x2="22" y2="17" />
                            <line x1="17" y1="7" x2="22" y2="7" />
                            <polygon points="9.5 9 15.5 12 9.5 15 9.5 9" fill="currentColor" />
                          </svg>
                        </div>
                        <span className="lcs-split-label active">
                          {ptzActiveChannel.toUpperCase()} ({
                            ptzActiveChannel === 'ch3' ? 'Teacher Close' : 
                            ptzActiveChannel === 'ch4' ? 'Student Close' : 
                            ptzActiveChannel === 'ch5' ? 'Teacher Pan' : 
                            'Student Pan'
                          })
                        </span>
                      </div>
                      
                      {/* PTZ bottom control drawer */}
                      <div className="lcs-ptz-drawer">
                        {/* Title & Close */}
                        <div className="lcs-ptz-drawer-top">
                          <span className="lcs-ptz-drawer-title">PTZ Ctrl</span>
                          <button 
                            type="button" 
                            className="lcs-ptz-drawer-close"
                            onClick={() => setActiveMenuSection(null)}
                          >
                            ✕
                          </button>
                        </div>

                        <div className="lcs-ptz-drawer-body">
                          {/* Left section: Channel grid */}
                          <div className="lcs-ptz-drawer-col channels-col">
                            {['ch3', 'ch4', 'ch5', 'ch6'].map((ch) => (
                              <button
                                key={ch}
                                type="button"
                                className={`lcs-ptz-channel-capsule ${ptzActiveChannel === ch ? 'is-active' : ''}`}
                                onClick={() => setPtzActiveChannel(ch)}
                              >
                                {ch.toUpperCase()}
                              </button>
                            ))}
                          </div>

                          <div className="lcs-ptz-drawer-divider" />

                          {/* Middle-left section: D-pad */}
                          <div className="lcs-ptz-drawer-col dpad-col">
                            <div className="lcs-ptz-dpad-circle">
                              <button 
                                type="button" 
                                className="ptz-circle-arrow-btn up"
                                onClick={() => showToast(`Pan Up: Tilt camera ${ptzActiveChannel.toUpperCase()} up`)}
                              >
                                ▲
                              </button>
                              <div className="ptz-circle-arrow-row">
                                <button 
                                  type="button" 
                                  className="ptz-circle-arrow-btn left"
                                  onClick={() => showToast(`Pan Left: Pan camera ${ptzActiveChannel.toUpperCase()} left`)}
                                >
                                  ◀
                                </button>
                                <div className="ptz-circle-arrow-center">
                                  <div className="ptz-circle-arrow-center-dot" />
                                </div>
                                <button 
                                  type="button" 
                                  className="ptz-circle-arrow-btn right"
                                  onClick={() => showToast(`Pan Right: Pan camera ${ptzActiveChannel.toUpperCase()} right`)}
                                >
                                  ▶
                                </button>
                              </div>
                              <button 
                                type="button" 
                                className="ptz-circle-arrow-btn down"
                                onClick={() => showToast(`Pan Down: Tilt camera ${ptzActiveChannel.toUpperCase()} down`)}
                              >
                                ▼
                              </button>
                            </div>
                          </div>

                          <div className="lcs-ptz-drawer-divider" />

                          {/* Middle section: Zoom & Speed */}
                          <div className="lcs-ptz-drawer-col zoom-speed-col">
                            <div className="lcs-ptz-zoom-group">
                              <span className="lcs-ptz-group-label">Zoom</span>
                              <div className="lcs-ptz-zoom-btns">
                                <button 
                                  type="button" 
                                  className="lcs-ptz-zoom-btn"
                                  onClick={() => showToast(`Zoom In (+) for ${ptzActiveChannel.toUpperCase()}`)}
                                >
                                  <span>+</span> zoom
                                </button>
                                <button 
                                  type="button" 
                                  className="lcs-ptz-zoom-btn"
                                  onClick={() => showToast(`Zoom Out (-) for ${ptzActiveChannel.toUpperCase()}`)}
                                >
                                  <span>-</span> zoom
                                </button>
                              </div>
                            </div>
                            <div className="lcs-ptz-speed-group">
                              <div className="lcs-ptz-speed-text">
                                <span>Speed</span> <strong>{ptzSpeed}</strong>
                              </div>
                              <div className="lcs-ptz-speed-slider-wrapper">
                                <input 
                                  type="range" 
                                  min="1" 
                                  max="8" 
                                  value={ptzSpeed} 
                                  className="lcs-ptz-speed-slider"
                                  onChange={(e) => setPtzSpeed(parseInt(e.target.value))}
                                />
                                <div className="lcs-ptz-speed-ticks">
                                  {[1,2,3,4,5,6,7,8].map(tick => (
                                    <span key={tick} className={`lcs-ptz-speed-tick ${ptzSpeed >= tick ? 'is-active' : ''}`} />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="lcs-ptz-drawer-divider" />

                          {/* Right section: Presets */}
                          <div className="lcs-ptz-drawer-col presets-col">
                            <div className="lcs-ptz-presets-modes">
                              <button 
                                type="button" 
                                className={`lcs-ptz-preset-mode-btn ${ptzPresetMode === 'set' ? 'is-active' : ''}`}
                                onClick={() => setPtzPresetMode('set')}
                              >
                                Set
                              </button>
                              <button 
                                type="button" 
                                className={`lcs-ptz-preset-mode-btn ${ptzPresetMode === 'call' ? 'is-active' : ''}`}
                                onClick={() => setPtzPresetMode('call')}
                              >
                                Call
                              </button>
                            </div>
                            <div className="lcs-ptz-preset-numbers">
                              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                <button
                                  key={num}
                                  type="button"
                                  className="lcs-ptz-preset-num"
                                  onClick={() => {
                                    if (ptzPresetMode === 'set') {
                                      showToast(`Preset ${num} Saved for ${ptzActiveChannel.toUpperCase()}`);
                                    } else {
                                      showToast(`Calling Preset ${num} for ${ptzActiveChannel.toUpperCase()}`);
                                    }
                                  }}
                                >
                                  {num}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {isRemoteClassroomView && selectedPgmSource !== 'PGM' ? (
                        <div className="lcs-full-video-box">
                          <img 
                            src={
                              selectedPgmSource === 'Lecture' ? ch1Ppt :
                              selectedPgmSource === 'Lecture2' ? ch2DocCam :
                              selectedPgmSource === 'Teacher_C' ? ch3TeacherClose :
                              selectedPgmSource === 'Student_C' ? ch4StudentClose :
                              selectedPgmSource === 'Student_P' ? ch6StudentPano :
                              ch7Remote
                            } 
                            alt={selectedPgmSource} 
                            className="lcs-feed-img" 
                          />
                          <span className="lcs-split-label active">{selectedPgmSource}</span>
                        </div>
                      ) : (
                        <>
                          {currentLayout === 'l1' && (
                    <div className="lcs-layout-l1">
                      {(() => {
                        const ch = channels.find(c => c.id === layoutChannels.l1.main) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        return ch.type === 'placeholder' ? (
                          <div className="lcs-placeholder-screen">
                            <Film size={64} className="opacity-40 animate-pulse" />
                            <span>No Active Video Input ({ch.label})</span>
                          </div>
                        ) : (
                          <div className="lcs-full-video-box">
                            <img src={channelImages[ch.id]} alt="l1" className="lcs-feed-img" style={{ objectPosition: ch.pos }} />
                            <span className="lcs-split-label active">{ch.name} ({ch.label})</span>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {currentLayout === 'l2' && (
                    <div className="lcs-layout-l2">
                      {(() => {
                        const mainCh = channels.find(c => c.id === layoutChannels.l2.main) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        const pipCh = channels.find(c => c.id === layoutChannels.l2.pip) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        return (
                          <>
                            {mainCh.type === 'placeholder' ? (
                              <div className="lcs-placeholder-screen">
                                <Film size={48} className="opacity-40" />
                                <span>{mainCh.name} ({mainCh.label})</span>
                              </div>
                            ) : (
                              <div className="lcs-full-video-box">
                                <img src={channelImages[mainCh.id]} alt="l2-main" className="lcs-feed-img" style={{ objectPosition: mainCh.pos }} />
                                <span className="lcs-split-label">{mainCh.name} ({mainCh.label})</span>
                              </div>
                            )}
                            
                            <div className="lcs-pip-box top-left">
                              {pipCh.type === 'placeholder' ? (
                                <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center">
                                  <Film size={20} className="opacity-40" />
                                </div>
                              ) : (
                                <img src={channelImages[pipCh.id]} alt="l2-pip" className="lcs-feed-img" style={{ objectPosition: pipCh.pos }} />
                              )}
                              <span className="lcs-pip-label">{pipCh.name} ({pipCh.label})</span>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  )}

                  {currentLayout === 'l3' && (
                    <div className="lcs-layout-l3">
                      {(() => {
                        const leftCh = channels.find(c => c.id === layoutChannels.l3.left) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        const rightCh = channels.find(c => c.id === layoutChannels.l3.right) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        return (
                          <>
                            <div className="lcs-split-half">
                              {leftCh.type === 'placeholder' ? (
                                <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center">
                                  <Film size={24} className="opacity-40" />
                                </div>
                              ) : (
                                <img src={channelImages[leftCh.id]} alt="l3-left" className="lcs-feed-img" style={{ objectPosition: leftCh.pos }} />
                              )}
                              <span className="lcs-split-label">{leftCh.name} ({leftCh.label})</span>
                            </div>
                            <div className="lcs-split-half">
                              {rightCh.type === 'placeholder' ? (
                                <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center">
                                  <Film size={24} className="opacity-40" />
                                </div>
                              ) : (
                                <img src={channelImages[rightCh.id]} alt="l3-right" className="lcs-feed-img" style={{ objectPosition: rightCh.pos }} />
                              )}
                              <span className="lcs-split-label active">{rightCh.name} ({rightCh.label})</span>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  )}

                  {currentLayout === 'l4' && (
                    <div className="lcs-layout-l4">
                      {(() => {
                        const mainCh = channels.find(c => c.id === layoutChannels.l4.main) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        const pipCh = channels.find(c => c.id === layoutChannels.l4.pip) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        return (
                          <>
                            {mainCh.type === 'placeholder' ? (
                              <div className="lcs-placeholder-screen">
                                <Film size={48} className="opacity-40" />
                                <span>{mainCh.name} ({mainCh.label})</span>
                              </div>
                            ) : (
                              <div className="lcs-full-video-box">
                                <img src={channelImages[mainCh.id]} alt="l4-main" className="lcs-feed-img" style={{ objectPosition: mainCh.pos }} />
                                <span className="lcs-split-label">{mainCh.name} ({mainCh.label})</span>
                              </div>
                            )}
                            
                            <div className="lcs-pip-box bottom-left">
                              {pipCh.type === 'placeholder' ? (
                                <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center">
                                  <Film size={20} className="opacity-40" />
                                </div>
                              ) : (
                                <img src={channelImages[pipCh.id]} alt="l4-pip" className="lcs-feed-img" style={{ objectPosition: pipCh.pos }} />
                              )}
                              <span className="lcs-pip-label">{pipCh.name} ({pipCh.label})</span>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  )}

                  {currentLayout === 'l5' && (
                    <div className="lcs-split-screen">
                      {(() => {
                        const tlCh = channels.find(c => c.id === layoutChannels.l5.topLeft) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        const blCh = channels.find(c => c.id === layoutChannels.l5.bottomLeft) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        const rightCh = channels.find(c => c.id === layoutChannels.l5.right) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        return (
                          <>
                            <div className="lcs-split-left-col-2rows">
                              <div className="lcs-split-small-box">
                                {tlCh.type === 'placeholder' ? (
                                  <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center"><Film size={14} className="opacity-30" /></div>
                                ) : (
                                  <img src={channelImages[tlCh.id]} alt="l5-tl" className="lcs-feed-img" style={{ objectPosition: tlCh.pos }} />
                                )}
                                <span className="lcs-split-label">{tlCh.name} ({tlCh.label})</span>
                              </div>
                              <div className="lcs-split-small-box">
                                {blCh.type === 'placeholder' ? (
                                  <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center"><Film size={14} className="opacity-30" /></div>
                                ) : (
                                  <img src={channelImages[blCh.id]} alt="l5-bl" className="lcs-feed-img" style={{ objectPosition: blCh.pos }} />
                                )}
                                <span className="lcs-split-label">{blCh.name} ({blCh.label})</span>
                              </div>
                            </div>
                            <div className="lcs-split-right-col">
                              <div className="lcs-split-large-box">
                                {rightCh.type === 'placeholder' ? (
                                  <div className="lcs-placeholder-screen"><Film size={48} className="opacity-30" /></div>
                                ) : (
                                  <img src={channelImages[rightCh.id]} alt="l5-right" className="lcs-feed-img" style={{ objectPosition: rightCh.pos }} />
                                )}
                                <span className="lcs-split-label active">{rightCh.name} ({rightCh.label}) - Main Out</span>
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  )}

                  {currentLayout === 'l6' && (
                    <div className="lcs-split-screen lcs-layout-l6">
                      {(() => {
                        const r1Ch = channels.find(c => c.id === layoutChannels.l6.row1) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        const r2Ch = channels.find(c => c.id === layoutChannels.l6.row2) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        const r3Ch = channels.find(c => c.id === layoutChannels.l6.row3) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        const rightCh = channels.find(c => c.id === layoutChannels.l6.right) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        return (
                          <>
                            <div className="lcs-split-left-col-3rows">
                              <div className="lcs-split-small-box">
                                {r1Ch.type === 'placeholder' ? (
                                  <div className="lcs-ch-thumb-placeholder bg-slate-950 w-full h-full flex items-center justify-center"><Film size={14} className="opacity-30" /></div>
                                ) : (
                                  <img src={channelImages[r1Ch.id]} alt="l6-r1" className="lcs-feed-img" style={{ objectPosition: r1Ch.pos }} />
                                )}
                                <span className="lcs-split-label">{r1Ch.name} ({r1Ch.label})</span>
                              </div>
                              <div className="lcs-split-small-box">
                                {r2Ch.type === 'placeholder' ? (
                                  <div className="lcs-ch-thumb-placeholder bg-slate-950 w-full h-full flex items-center justify-center"><Film size={14} className="opacity-30" /></div>
                                ) : (
                                  <img src={channelImages[r2Ch.id]} alt="l6-r2" className="lcs-feed-img" style={{ objectPosition: r2Ch.pos }} />
                                )}
                                <span className="lcs-split-label">{r2Ch.name} ({r2Ch.label})</span>
                              </div>
                              <div className="lcs-split-small-box">
                                {r3Ch.type === 'placeholder' ? (
                                  <div className="lcs-ch-thumb-placeholder bg-slate-950 w-full h-full flex items-center justify-center"><Film size={14} className="opacity-30" /></div>
                                ) : (
                                  <img src={channelImages[r3Ch.id]} alt="l6-r3" className="lcs-feed-img" style={{ objectPosition: r3Ch.pos }} />
                                )}
                                <span className="lcs-split-label">{r3Ch.name} ({r3Ch.label})</span>
                              </div>
                            </div>
                            <div className="lcs-split-right-col">
                              <div className="lcs-split-large-box">
                                {rightCh.type === 'placeholder' ? (
                                  <div className="lcs-placeholder-screen"><Film size={48} className="opacity-30" /></div>
                                ) : (
                                  <img src={channelImages[rightCh.id]} alt="l6-right" className="lcs-feed-img" style={{ objectPosition: rightCh.pos }} />
                                )}
                                <span className="lcs-split-label active">{rightCh.name} ({rightCh.label})</span>
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  )}

                  {currentLayout === 'l7' && (
                    <div className="lcs-layout-l7">
                      {(() => {
                        const tlCh = channels.find(c => c.id === layoutChannels.l7.tl) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        const trCh = channels.find(c => c.id === layoutChannels.l7.tr) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        const blCh = channels.find(c => c.id === layoutChannels.l7.bl) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        const brCh = channels.find(c => c.id === layoutChannels.l7.br) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        return (
                          <>
                            <div className="lcs-grid-cell">
                              {tlCh.type === 'placeholder' ? (
                                <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center"><Film size={24} className="opacity-30" /></div>
                              ) : (
                                <img src={channelImages[tlCh.id]} alt="l7-tl" className="lcs-feed-img" style={{ objectPosition: tlCh.pos }} />
                              )}
                              <span className="lcs-split-label">{tlCh.name} ({tlCh.label})</span>
                            </div>
                            <div className="lcs-grid-cell">
                              {trCh.type === 'placeholder' ? (
                                <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center"><Film size={24} className="opacity-30" /></div>
                              ) : (
                                <img src={channelImages[trCh.id]} alt="l7-tr" className="lcs-feed-img" style={{ objectPosition: trCh.pos }} />
                              )}
                              <span className="lcs-split-label active">{trCh.name} ({trCh.label})</span>
                            </div>
                            <div className="lcs-grid-cell">
                              {blCh.type === 'placeholder' ? (
                                <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center"><Film size={24} className="opacity-30" /></div>
                              ) : (
                                <img src={channelImages[blCh.id]} alt="l7-bl" className="lcs-feed-img" style={{ objectPosition: blCh.pos }} />
                              )}
                              <span className="lcs-split-label">{blCh.name} ({blCh.label})</span>
                            </div>
                            <div className="lcs-grid-cell">
                              {brCh.type === 'placeholder' ? (
                                <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center"><Film size={24} className="opacity-30" /></div>
                              ) : (
                                <img src={channelImages[brCh.id]} alt="l7-br" className="lcs-feed-img" style={{ objectPosition: brCh.pos }} />
                              )}
                              <span className="lcs-split-label">{brCh.name} ({brCh.label})</span>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  )}

                  {currentLayout === 'l8' && (
                    <div className="lcs-all-layout-featured">
                      {/* Left: Preview Grid of all channels */}
                      <div className="lcs-all-preview-grid">
                        {channels.map((ch) => {
                          const activeMainId = layoutChannels.l8?.main || selectedChannel;
                          const isMain = ch.id === activeMainId;
                          return (
                            <div 
                              key={ch.id} 
                              className={`lcs-all-grid-cell ${isMain ? 'is-main-selected' : ''}`}
                              onClick={() => handleSelectRightChannel(ch.id)}
                            >
                              {ch.type === 'placeholder' ? (
                                <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center">
                                  <Film size={14} className="opacity-35" />
                                </div>
                              ) : (
                                <img src={channelImages[ch.id]} alt={ch.name} className="lcs-feed-img" style={{ objectPosition: ch.pos }} />
                              )}
                              <span className="lcs-split-label">{ch.name}</span>
                              {isMain && <span className="lcs-all-main-badge">MAIN</span>}
                            </div>
                          );
                        })}
                      </div>

                      {/* Right Stage: Prominent Main Channel Screen */}
                      <div className="lcs-all-main-stage">
                        {(() => {
                          const mainChId = layoutChannels.l8?.main || selectedChannel;
                          const mainCh = channels.find(c => c.id === mainChId) || channels[0];
                          return (
                            <div className="lcs-all-stage-card">
                              {mainCh.type === 'placeholder' ? (
                                <div className="lcs-placeholder-screen"><Film size={54} className="opacity-30" /></div>
                              ) : (
                                <img src={channelImages[mainCh.id]} alt={mainCh.name} className="lcs-feed-img" style={{ objectPosition: mainCh.pos }} />
                              )}
                              <div className="lcs-all-stage-overlay">
                                <span className="lcs-stage-main-badge">MAIN CHANNEL OUT</span>
                                <span className="lcs-stage-channel-name">{mainCh.name} ({mainCh.label})</span>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  )}
                        </>
                      )}
                    </>
                  )}

              {/* Menu Sub-sections Overlay */}
              {activeMenuSection && activeMenuSection !== 'set' && activeMenuSection !== 'file' && activeMenuSection !== 'ptz' && activeMenuSection !== 'power' && (
                    <div className="lcs-menu-section-overlay">
                      <div className="lcs-overlay-header">
                        <div className="lcs-overlay-title-group">
                          <Settings size={16} />
                          <h3>
                            {activeMenuSection === 'ptz' && 'Camera PTZ Joystick'}
                            {activeMenuSection === 'power' && 'System Power Control'}
                          </h3>
                        </div>
                        <button 
                          type="button" 
                          className="lcs-overlay-close-btn"
                          onClick={() => setActiveMenuSection(null)}
                        >
                          ✕
                        </button>
                      </div>
                      
                      <div className="lcs-overlay-body">

                        {activeMenuSection === 'ptz' && (
                          <div className="lcs-overlay-content-ptz">
                            <div className="lcs-ptz-layout">
                              <div className="lcs-ptz-dpad">
                                <button className="ptz-up" title="Tilt Up" type="button">▲</button>
                                <div className="ptz-mid">
                                  <button className="ptz-left" title="Pan Left" type="button">◀</button>
                                  <span className="ptz-center-dot" />
                                  <button className="ptz-right" title="Pan Right" type="button">▶</button>
                                </div>
                                <button className="ptz-down" title="Tilt Down" type="button">▼</button>
                              </div>
                              <div className="lcs-ptz-controls">
                                <div className="ptz-control-group">
                                  <span>Zoom:</span>
                                  <div className="ptz-btn-pair">
                                    <button type="button">+</button>
                                    <button type="button">-</button>
                                  </div>
                                </div>
                                <div className="ptz-control-group">
                                  <span>Focus:</span>
                                  <div className="ptz-btn-pair">
                                    <button type="button">Auto</button>
                                    <button type="button">Manual</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Settings sub-modal */}
                  {isSettingsOpen && (
                    <div className="lcs-settings-popup">
                      <div className="lcs-settings-header">
                        <Sliders size={16} />
                        <h3>LCS Device Settings</h3>
                      </div>
                      <div className="lcs-settings-body">
                        <div className="lcs-settings-row">
                          <span>Max Recording Limit:</span>
                          <input 
                            type="range" 
                            min="20" 
                            max="200" 
                            value={remainingHours} 
                            onChange={(e) => setRemainingHours(Number(e.target.value))} 
                          />
                          <strong>{remainingHours} hrs</strong>
                        </div>
                        <div className="lcs-settings-row">
                          <span>Video Quality:</span>
                          <span className="lcs-badge">1080P Full HD</span>
                        </div>
                        <div className="lcs-settings-row">
                          <span>Camera Framerate:</span>
                          <span className="lcs-badge">60 FPS</span>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        className="lcs-settings-close-btn"
                        onClick={() => setIsSettingsOpen(false)}
                      >
                        Close
                      </button>
                    </div>
                  )}

                  {/* Flashing Recording Status indicator Overlay */}
                  {isRecording && (
                    <div className="lcs-recording-overlay">
                      <div className="lcs-rec-dot animate-pulse" />
                      <span>REC {formatTime(recordSeconds)}</span>
                      {isPaused && <span className="lcs-paused-badge">PAUSED</span>}
                    </div>
                  )}

                  {/* Flashing Live Streaming Overlay */}
                  {isLive && (
                    <div className="lcs-live-overlay">
                      <div className="lcs-live-dot" />
                      <span>LIVE</span>
                    </div>
                  )}

                  {/* Channel Selector Double-click Popup Modal */}
                  {isChannelSelectOpen && (
                    <div className="lcs-layout-edit-popup">
                      
                      {/* Close button X */}
                      <button
                        type="button"
                        className="lcs-edit-close-x"
                        onClick={() => setIsChannelSelectOpen(false)}
                        title="Close popup"
                      >
                        ✕
                      </button>

                      {/* Top Row: Channel selection bar CH1 to CH7 */}
                      {activeEditSlot && (
                        <div className="lcs-edit-channels-row">
                          {channels.map((ch) => {
                            const isChSelected = layoutChannels[selectedLayoutToEdit]?.[activeEditSlot] === ch.id;
                            return (
                              <button
                                key={ch.id}
                                type="button"
                                className={`lcs-edit-ch-btn ${isChSelected ? 'is-selected' : ''}`}
                                onClick={() => {
                                  setLayoutChannels(prev => ({
                                    ...prev,
                                    [selectedLayoutToEdit]: {
                                      ...prev[selectedLayoutToEdit],
                                      [activeEditSlot]: ch.id
                                    }
                                  }));
                                }}
                              >
                                {ch.label}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Divider line */}
                      <div className="lcs-edit-divider" />

                      {/* Bottom Row: Slots list and OK button */}
                      <div className="lcs-edit-bottom-row">
                        <div className="lcs-edit-slots-group">
                          {layoutSlotConfigs[selectedLayoutToEdit]?.map((slot) => {
                            const currentChId = layoutChannels[selectedLayoutToEdit]?.[slot.key];
                            const chDetail = channels.find(c => c.id === currentChId) || { label: 'CH' };
                            const isSlotEditing = activeEditSlot === slot.key;
                            return (
                              <div key={slot.key} className="lcs-edit-slot-block">
                                <button
                                  type="button"
                                  className={`lcs-edit-slot-btn ${isSlotEditing ? 'is-active' : ''}`}
                                  onClick={() => setActiveEditSlot(slot.key)}
                                >
                                  {chDetail.label}
                                </button>
                                <span className="lcs-edit-slot-label">{slot.label}</span>
                              </div>
                            );
                          })}
                        </div>

                        <button
                          type="button"
                          className="lcs-edit-ok-btn"
                          onClick={() => setIsChannelSelectOpen(false)}
                        >
                          OK
                        </button>
                      </div>
                    </div>
                  )}

                {/* 2-Level Layout Configuration Modal Overlays */}
                {level1ModalOpen && (
                  <div ref={levelInteractionRef} className="lcs-level-interaction-container">
                    
                    {/* Level 2 Channel Picker Overlay (Pops up directly above Level 1) */}
                    {level2TargetSlot && (
                      <div className="lcs-level2-popup animate-fadeIn">
                        <div className="lcs-level2-ch-row">
                          {channels.map((ch) => {
                            const currentSlotCh = layoutChannels[level1TargetLayout]?.[level2TargetSlot];
                            const isSelected = currentSlotCh === ch.id;
                            return (
                              <button
                                key={ch.id}
                                type="button"
                                className={`lcs-level2-ch-btn ${isSelected ? 'is-active' : ''}`}
                                onClick={() => {
                                  setLayoutChannels((prev) => ({
                                    ...prev,
                                    [level1TargetLayout]: {
                                      ...prev[level1TargetLayout],
                                      [level2TargetSlot]: ch.id
                                    }
                                  }));
                                  if (level2TargetSlot === 'main') {
                                    setSelectedChannel(ch.id);
                                  }
                                }}
                              >
                                {ch.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Level 1 Popup Card */}
                    <div className="lcs-level1-popup">
                      {/* Close button */}
                      <button 
                        type="button" 
                        className="lcs-level1-close-btn"
                        onClick={() => {
                          setLevel1ModalOpen(false);
                          setLevel2TargetSlot(null);
                        }}
                      >
                        ✕
                      </button>

                      <div className="lcs-level1-body">
                        <div className="lcs-level1-slots-row">
                          {((level1TargetLayout === 'l1' && [{ id: 'main', label: 'Main' }]) ||
                            (level1TargetLayout === 'l2' && [
                              { id: 'main', label: 'Main' },
                              { id: 'pip', label: 'Sub' },
                              { id: 'position', label: 'Position', isControl: true, icon: 'pip-pos' },
                              { id: 'size', label: 'Size', isControl: true, icon: 'pip-size' }
                            ]) ||
                            (level1TargetLayout === 'l3' && [{ id: 'left', label: 'Left' }, { id: 'right', label: 'Right' }]) ||
                            (level1TargetLayout === 'l4' && [{ id: 'main', label: 'Left' }, { id: 'pip', label: 'Right' }]) ||
                            (level1TargetLayout === 'l5' && [{ id: 'topLeft', label: 'Top-Left' }, { id: 'bottomLeft', label: 'Low-Left' }, { id: 'right', label: 'Right' }]) ||
                            (level1TargetLayout === 'l6' && [{ id: 'row1', label: 'Top-Left' }, { id: 'row2', label: 'Middle-Left' }, { id: 'row3', label: 'Low-Left' }, { id: 'right', label: 'Right' }]) ||
                            (level1TargetLayout === 'l7' && [{ id: 'tl', label: 'Top-Left' }, { id: 'tr', label: 'Top-Right' }, { id: 'bl', label: 'Low-Left' }, { id: 'br', label: 'Low-Right' }]) ||
                            [{ id: 'main', label: 'Main' }]).map((slot) => {

                            if (slot.isControl) {
                              return (
                                <div key={slot.id} className="lcs-level1-slot-unit">
                                  <button 
                                    type="button" 
                                    className="lcs-level1-control-btn"
                                    onClick={() => showToast(`${slot.label} mode updated`)}
                                  >
                                    {slot.icon === 'pip-pos' ? (
                                      <div className="lcs-icon-pip-pos">
                                        <div className="lcs-pip-mini-box top-right" />
                                      </div>
                                    ) : (
                                      <div className="lcs-icon-pip-size">
                                        <div className="lcs-pip-mini-box size-med" />
                                      </div>
                                    )}
                                  </button>
                                  <span className="lcs-level1-slot-label">{slot.label}</span>
                                </div>
                              );
                            }

                            const assignedChId = layoutChannels[level1TargetLayout]?.[slot.id];
                            const assignedCh = channels.find(c => c.id === assignedChId) || { label: 'CH1' };
                            const isSlotActive = level2TargetSlot === slot.id;

                            return (
                              <div key={slot.id} className="lcs-level1-slot-unit">
                                <button
                                  type="button"
                                  className={`lcs-level1-slot-btn ${isSlotActive ? 'is-active' : ''}`}
                                  onClick={() => {
                                    if (level2TargetSlot === slot.id) {
                                      setLevel2TargetSlot(null);
                                    } else {
                                      setLevel2TargetSlot(slot.id);
                                    }
                                  }}
                                >
                                  {assignedCh.label}
                                </button>
                                <span className="lcs-level1-slot-label">{slot.label}</span>
                              </div>
                            );
                          })}

                          {/* OK Button */}
                          <div className="lcs-level1-slot-unit ok-unit">
                            <button
                              type="button"
                              className="lcs-level1-ok-btn"
                              onClick={() => {
                                setLevel1ModalOpen(false);
                                setLevel2TargetSlot(null);
                              }}
                            >
                              OK
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                )}
              </div>

                {/* Bottom Control Bar or Layout Selection Bar */}
                {isLayoutBarOpen ? (
                  <div className="lcs-layout-select-bar">
                    {/* Left: Manual / Auto toggle */}
                    <div className="lcs-layout-mode-group">
                      <button 
                        type="button" 
                        className={`lcs-mode-btn ${directorMode === 'manual' ? 'is-active' : ''}`}
                        onClick={() => setDirectorMode('manual')}
                      >
                        Manual
                      </button>
                      <button 
                        type="button" 
                        className={`lcs-mode-btn ${directorMode === 'auto' ? 'is-active' : ''}`}
                        onClick={() => setDirectorMode('auto')}
                      >
                        Auto
                      </button>
                    </div>

                    {/* Middle: Layout Selection options list */}
                    <div className="lcs-layout-options-list">
                      
                      {/* Layout 1: Single full screen */}
                      <div className="lcs-layout-option-wrapper">
                        <button 
                          type="button" 
                          className={`lcs-layout-thumb-card ${currentLayout === 'l1' ? 'is-active' : ''}`}
                          onClick={() => setCurrentLayout('l1')}
                          onDoubleClick={() => handleLayoutDoubleClick('l1')}
                        >
                          <div className="lcs-thumb-single font-mono">
                            <span>CH6</span>
                          </div>
                        </button>
                        {currentLayout === 'l1' && <span className="lcs-active-layout-badge" style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); handleLayoutDoubleClick('l1'); }}>Layout</span>}
                      </div>

                      {/* Layout 2: PiP Style 1 */}
                      <div className="lcs-layout-option-wrapper">
                        <button 
                          type="button" 
                          className={`lcs-layout-thumb-card ${currentLayout === 'l2' ? 'is-active' : ''}`}
                          onClick={() => setCurrentLayout('l2')}
                          onDoubleClick={() => handleLayoutDoubleClick('l2')}
                        >
                          <div className="lcs-thumb-pip-1">
                            <div className="lcs-thumb-pip-sub font-mono">CH3</div>
                            <span className="font-mono">CH7</span>
                          </div>
                        </button>
                        {currentLayout === 'l2' && <span className="lcs-active-layout-badge" style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); handleLayoutDoubleClick('l2'); }}>Layout</span>}
                      </div>

                      {/* Layout 3: Vertical Split */}
                      <div className="lcs-layout-option-wrapper">
                        <button 
                          type="button" 
                          className={`lcs-layout-thumb-card ${currentLayout === 'l3' ? 'is-active' : ''}`}
                          onClick={() => setCurrentLayout('l3')}
                          onDoubleClick={() => handleOpenLevel1('l3')}
                        >
                          <div className="lcs-thumb-split-v">
                            <div className="lcs-thumb-split-cell font-mono">CH4</div>
                            <div className="lcs-thumb-split-cell font-mono">CH3</div>
                          </div>
                        </button>
                        {currentLayout === 'l3' && <span className="lcs-active-layout-badge" style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); handleOpenLevel1('l3'); }}>Layout</span>}
                      </div>

                      {/* Layout 4: PiP Style 2 */}
                      <div className="lcs-layout-option-wrapper">
                        <button 
                          type="button" 
                          className={`lcs-layout-thumb-card ${currentLayout === 'l4' ? 'is-active' : ''}`}
                          onClick={() => setCurrentLayout('l4')}
                          onDoubleClick={() => handleOpenLevel1('l4')}
                        >
                          <div className="lcs-thumb-pip-2">
                            <div className="lcs-thumb-pip-sub font-mono">CH1</div>
                            <span className="font-mono">CH2</span>
                          </div>
                        </button>
                        {currentLayout === 'l4' && <span className="lcs-active-layout-badge" style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); handleOpenLevel1('l4'); }}>Layout</span>}
                      </div>

                      {/* Layout 5: Director 3-Split (Default) */}
                      <div className="lcs-layout-option-wrapper">
                        <button 
                          type="button" 
                          className={`lcs-layout-thumb-card ${currentLayout === 'l5' ? 'is-active' : ''}`}
                          onClick={() => setCurrentLayout('l5')}
                          onDoubleClick={() => handleOpenLevel1('l5')}
                        >
                          <div className="lcs-thumb-director">
                            <div className="lcs-thumb-dir-left">
                              <div className="font-mono">CH5</div>
                              <div className="font-mono">CH4</div>
                            </div>
                            <div className="lcs-thumb-dir-right font-mono">CH3</div>
                          </div>
                        </button>
                        {currentLayout === 'l5' && <span className="lcs-active-layout-badge" style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); handleOpenLevel1('l5'); }}>Layout</span>}
                      </div>

                      {/* Layout 6: 4-Split */}
                      <div className="lcs-layout-option-wrapper">
                        <button 
                          type="button" 
                          className={`lcs-layout-thumb-card ${currentLayout === 'l6' ? 'is-active' : ''}`}
                          onClick={() => setCurrentLayout('l6')}
                          onDoubleClick={() => handleOpenLevel1('l6')}
                        >
                          <div className="lcs-thumb-director-4">
                            <div className="lcs-thumb-dir4-left">
                              <div className="font-mono">CH2</div>
                              <div className="font-mono">CH1</div>
                              <div className="font-mono">CH4</div>
                            </div>
                            <div className="lcs-thumb-dir4-right font-mono">CH3</div>
                          </div>
                        </button>
                        {currentLayout === 'l6' && <span className="lcs-active-layout-badge" style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); handleOpenLevel1('l6'); }}>Layout</span>}
                      </div>

                      {/* Layout 7: Quad Grid */}
                      <div className="lcs-layout-option-wrapper">
                        <button 
                          type="button" 
                          className={`lcs-layout-thumb-card ${currentLayout === 'l7' ? 'is-active' : ''}`}
                          onClick={() => setCurrentLayout('l7')}
                          onDoubleClick={() => handleOpenLevel1('l7')}
                        >
                          <div className="lcs-thumb-quad">
                            <div className="font-mono">CH2</div>
                            <div className="font-mono">CH3</div>
                            <div className="font-mono">CH1</div>
                            <div className="font-mono">CH4</div>
                          </div>
                        </button>
                        {currentLayout === 'l7' && <span className="lcs-active-layout-badge" style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); handleOpenLevel1('l7'); }}>Layout</span>}
                      </div>

                      {/* Layout 8: All */}
                      <div className="lcs-layout-option-wrapper">
                        <button 
                          type="button" 
                          className={`lcs-layout-thumb-card ${currentLayout === 'l8' ? 'is-active' : ''}`}
                          onClick={() => setCurrentLayout('l8')}
                          onDoubleClick={() => handleOpenLevel1('l8')}
                        >
                          <div className="lcs-thumb-all">
                            <span>All</span>
                          </div>
                        </button>
                        {currentLayout === 'l8' && <span className="lcs-active-layout-badge" style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); handleOpenLevel1('l8'); }}>Layout</span>}
                      </div>

                    </div>

                    {/* Right: Close "x" button */}
                    <button 
                      type="button" 
                      className="lcs-layout-close-btn"
                      onClick={() => setIsLayoutBarOpen(false)}
                      title="Close Layouts"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="lcs-bottom-bar">
                    
                    {/* Column 1: Director button */}
                    <button 
                      type="button" 
                      className={`lcs-pill-btn lcs-director-btn ${isLayoutBarOpen ? 'is-active' : ''}`}
                      onClick={() => setIsLayoutBarOpen(true)}
                    >
                      <span>Director</span>
                    </button>

                    {/* Column 2: Record Control pill */}
                    <div className="lcs-control-pill-group lcs-record-group">
                      <span className="lcs-group-label">Record</span>
                      <button 
                        type="button" 
                        className={`lcs-large-rec-btn ${isRecording ? 'is-recording' : ''}`}
                        onClick={handleRecordToggle}
                        title={isRecording ? "Stop Record" : "Start Record"}
                      >
                        <div className="lcs-rec-inner-circle" />
                      </button>
                      <button 
                        type="button" 
                        className={`lcs-large-action-btn ${isPaused ? 'is-active' : ''}`}
                        onClick={handlePauseToggle}
                        disabled={!isRecording}
                        title="Pause Record"
                      >
                        <Pause size={18} fill="currentColor" />
                      </button>
                    </div>

                    {/* Column 3: Live Stream pill */}
                    <div className="lcs-control-pill-group lcs-live-group">
                      <button 
                        type="button" 
                        className={`lcs-large-action-btn lcs-live-btn ${isLive ? 'is-live-active' : ''}`}
                        onClick={() => setIsLive(!isLive)}
                        title="Toggle Live Stream"
                      >
                        <Play size={18} fill="currentColor" style={{ marginLeft: '2px' }} />
                      </button>
                      <span className="lcs-group-label">Live</span>
                    </div>

                    {/* Column 4: Menu & Interactive Stack */}
                    <div className="lcs-right-stack-col">
                      {isMenuOpen && (
                        <div className="lcs-menu-popup">
                          <button 
                            type="button" 
                            className="lcs-menu-popup-btn"
                            onClick={() => {
                              setActiveMenuSection('set');
                              setIsMenuOpen(false);
                            }}
                          >
                            Set
                          </button>
                          <button 
                            type="button" 
                            className="lcs-menu-popup-btn"
                            onClick={() => {
                              setActiveMenuSection('file');
                              setIsMenuOpen(false);
                            }}
                          >
                            File
                          </button>
                          <button 
                            type="button" 
                            className="lcs-menu-popup-btn"
                            onClick={() => {
                              setActiveMenuSection('ptz');
                              setIsMenuOpen(false);
                            }}
                          >
                            PTZ
                          </button>
                          <button 
                            type="button" 
                            className="lcs-menu-popup-btn"
                            onClick={() => {
                              setActiveMenuSection('power');
                              setIsMenuOpen(false);
                            }}
                          >
                            Power
                          </button>
                        </div>
                      )}

                      <button 
                        type="button" 
                        className={`lcs-pill-btn-sm ${isMenuOpen ? 'is-active' : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                      >
                        <span>Menu</span>
                      </button>

                      {interactiveCallState !== 'idle' ? (
                        <button 
                          type="button" 
                          className="lcs-pill-btn-sm lcs-back-interaction-btn"
                          onClick={() => {
                            setActiveMenuSection('interactive');
                            setIsDirectorMinimized(false);
                            setIsMenuOpen(false);
                          }}
                        >
                          <span>Back Interaction</span>
                        </button>
                      ) : (
                        <button 
                          type="button" 
                          className={`lcs-pill-btn-sm ${activeMenuSection === 'interactive' ? 'is-active' : ''}`}
                          onClick={() => {
                            if (activeMenuSection === 'interactive') {
                              setActiveMenuSection(null);
                            } else {
                              setActiveMenuSection('interactive');
                              setInteractiveSubPage('home');
                              setIsMenuOpen(false);
                            }
                          }}
                        >
                          <span>Interactive</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

              </div>

              {/* Right Column: Dynamic mic level & CH1-CH7 side channel list */}
              <div className="lcs-right-pane">
                
                {/* Volume / Level Slider indicator */}
                <div className="lcs-level-bar-container">
                  <div className="lcs-level-bar-indicator">
                    {/* Render level lights based on micLevel state */}
                    {Array.from({ length: 28 }).map((_, index) => {
                      const percentageThreshold = ((28 - index) / 28) * 100;
                      const isActive = micLevel >= percentageThreshold;
                      
                      let colorClass = 'is-green';
                      if (index < 6) {
                        colorClass = 'is-red'; // top bars red
                      } else if (index < 12) {
                        colorClass = 'is-yellow'; // middle bars yellow
                      }
                      
                      return (
                        <div 
                          key={index} 
                          className={`lcs-level-segment ${isActive ? 'is-active' : ''} ${colorClass}`} 
                        />
                      );
                    })}
                  </div>
                  
                  {/* Microphone Icon button to toggle mute */}
                  <button 
                    type="button" 
                    className={`lcs-mic-icon-btn ${isMuted ? 'is-muted' : ''}`}
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    <Mic size={14} className={isMuted ? 'text-red-500' : 'text-gray-200'} />
                  </button>
                </div>

                {/* Vertical Channel feeds selection list */}
                <div className="lcs-channels-list">
                  {channels.map((ch) => {
                    const isActive = selectedChannel === ch.id;
                    return (
                      <div 
                        key={ch.id} 
                        className={`lcs-channel-card ${isActive ? 'is-active' : ''}`}
                        onClick={() => handleSelectRightChannel(ch.id)}
                      >
                        <div className="lcs-channel-card-header">
                          <span className="lcs-ch-name">{ch.name}</span>
                          <span className="lcs-ch-num">{ch.label}</span>
                        </div>
                        <div className="lcs-channel-card-thumbnail">
                          {ch.type === 'placeholder' ? (
                            <div className="lcs-ch-thumb-placeholder">
                              <Film size={20} className="opacity-40" />
                            </div>
                          ) : (
                            <img 
                              src={channelImages[ch.id]} 
                              alt={ch.name} 
                              className="lcs-ch-thumb-img"
                              style={{ objectPosition: ch.pos }} 
                            />
                          )}
                          {isActive && <div className="lcs-active-border-indicator" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

            </div>

            {activeMenuSection === 'set' && (
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
                    <div className="lcs-settings-device-tab">
                      {/* Row 1: Language */}
                      <div className="lcs-settings-row">
                        <span className="lcs-settings-label">Language</span>
                        <div className="lcs-settings-options-group">
                          {['简体中文', '繁體中文', 'ENGLISH', 'Русский язык', 'Français'].map((lang) => {
                            const langKey = lang === '简体中文' ? 'zh-cn' : lang === '繁體中文' ? 'zh-tw' : lang === 'ENGLISH' ? 'english' : lang === 'Русский язык' ? 'russian' : lang.toLowerCase();
                            const isSelected = settingsLanguage === langKey;
                            return (
                              <div 
                                key={lang} 
                                className="lcs-radio-item"
                                onClick={() => setSettingsLanguage(langKey)}
                              >
                                <div className={`lcs-radio-circle ${isSelected ? 'is-checked' : ''}`}>
                                  {isSelected && <div className="lcs-radio-dot" />}
                                </div>
                                <span>{lang}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Row 2: Power Boot */}
                      <div className="lcs-settings-row">
                        <span className="lcs-settings-label">Power Boot</span>
                        <div className="lcs-settings-options-group">
                          {[
                            { label: 'Normal Boot', value: 'normal' },
                            { label: 'Power on Boot', value: 'poweron' }
                          ].map((opt) => {
                            const isSelected = settingsPowerBoot === opt.value;
                            return (
                              <div 
                                key={opt.value} 
                                className="lcs-radio-item"
                                onClick={() => setSettingsPowerBoot(opt.value)}
                              >
                                <div className={`lcs-radio-circle ${isSelected ? 'is-checked' : ''}`}>
                                  {isSelected && <div className="lcs-radio-dot" />}
                                </div>
                                <span>{opt.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Row 3: Alarm Power Boot */}
                      <div className="lcs-settings-row" style={{ alignItems: 'flex-start' }}>
                        <span className="lcs-settings-label" style={{ marginTop: '2px' }}>Alarm Power Boot:</span>
                        <div className="lcs-alarm-grid">
                          {/* Alarm 1: PowerOn1 */}
                          <div className="lcs-alarm-column">
                            <div className="lcs-alarm-header">
                              <span>PowerOn1</span>
                              <div 
                                className={`lcs-toggle-switch ${settingsAlarms.on1.enabled ? 'is-on' : ''}`}
                                onClick={() => setSettingsAlarms(prev => ({ ...prev, on1: { ...prev.on1, enabled: !prev.on1.enabled } }))}
                              >
                                <div className="lcs-toggle-knob" />
                              </div>
                              <span>Enable</span>
                            </div>
                            <div className="lcs-alarm-time-box">
                              <span>Time</span>
                              <strong>{settingsAlarms.on1.time}</strong>
                            </div>
                          </div>

                          {/* Alarm 2: PowerOff1 */}
                          <div className="lcs-alarm-column">
                            <div className="lcs-alarm-header">
                              <span>PowerOff1</span>
                              <div 
                                className={`lcs-toggle-switch ${settingsAlarms.off1.enabled ? 'is-on' : ''}`}
                                onClick={() => setSettingsAlarms(prev => ({ ...prev, off1: { ...prev.off1, enabled: !prev.off1.enabled } }))}
                              >
                                <div className="lcs-toggle-knob" />
                              </div>
                              <span>Enable</span>
                            </div>
                            <div className="lcs-alarm-time-box">
                              <span>Time</span>
                              <strong>{settingsAlarms.off1.time}</strong>
                            </div>
                          </div>

                          {/* Alarm 3: PowerOn2 */}
                          <div className="lcs-alarm-column">
                            <div className="lcs-alarm-header">
                              <span>PowerOn2</span>
                              <div 
                                className={`lcs-toggle-switch ${settingsAlarms.on2.enabled ? 'is-on' : ''}`}
                                onClick={() => setSettingsAlarms(prev => ({ ...prev, on2: { ...prev.on2, enabled: !prev.on2.enabled } }))}
                              >
                                <div className="lcs-toggle-knob" />
                              </div>
                              <span>Enable</span>
                            </div>
                            <div className="lcs-alarm-time-box">
                              <span>Time</span>
                              <strong>{settingsAlarms.on2.time}</strong>
                            </div>
                          </div>

                          {/* Alarm 4: PowerOff2 */}
                          <div className="lcs-alarm-column">
                            <div className="lcs-alarm-header">
                              <span>PowerOff2</span>
                              <div 
                                className={`lcs-toggle-switch ${settingsAlarms.off2.enabled ? 'is-on' : ''}`}
                                onClick={() => setSettingsAlarms(prev => ({ ...prev, off2: { ...prev.off2, enabled: !prev.off2.enabled } }))}
                              >
                                <div className="lcs-toggle-knob" />
                              </div>
                              <span>Enable</span>
                            </div>
                            <div className="lcs-alarm-time-box">
                              <span>Time</span>
                              <strong>{settingsAlarms.off2.time}</strong>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Row 4: Lock Screen */}
                      <div className="lcs-settings-row" style={{ position: 'relative', zIndex: 120 }}>
                        <span className="lcs-settings-label">Lock Screen:</span>
                        <div 
                          className="lcs-select-pill" 
                          style={{ width: '160px', cursor: 'pointer', position: 'relative' }}
                          onClick={() => {
                            setIsLockScreenDropdownOpen(!isLockScreenDropdownOpen);
                            setIsTimeFormatDropdownOpen(false);
                            setIsHourFormatDropdownOpen(false);
                          }}
                        >
                          <span>{lockScreenTime}</span>
                          <span>▼</span>
                        </div>
                        {isLockScreenDropdownOpen && (
                          <div className="lcs-settings-dropdown-menu">
                            {['2minute', '5minute', '10minute', '15minute', 'Never'].map(opt => (
                              <div 
                                key={opt}
                                className={`lcs-settings-dropdown-item ${lockScreenTime === opt ? 'is-selected' : ''}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setLockScreenTime(opt);
                                  setIsLockScreenDropdownOpen(false);
                                  showToast(`Lock Screen set to ${opt}`);
                                }}
                              >
                                {opt}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Row 5: Other Set */}
                      <div className="lcs-settings-row" style={{ borderBottom: 'none', alignItems: 'flex-start' }}>
                        <span className="lcs-settings-label" style={{ marginTop: '2px' }}>Other Set:</span>
                        <div className="lcs-others-grid">
                          <div className="lcs-others-col-left">
                            <div className="lcs-others-toggle-row">
                              <span>Save Film Layout</span>
                              <div 
                                className={`lcs-toggle-switch ${settingsOthers.saveFilmLayout ? 'is-on' : ''}`}
                                onClick={() => setSettingsOthers(prev => ({ ...prev, saveFilmLayout: !prev.saveFilmLayout }))}
                              >
                                <div className="lcs-toggle-knob" />
                              </div>
                            </div>
                            <div className="lcs-others-toggle-row">
                              <span>Power on Live Streaming</span>
                              <div 
                                className={`lcs-toggle-switch ${settingsOthers.powerOnLive ? 'is-on' : ''}`}
                                onClick={() => setSettingsOthers(prev => ({ ...prev, powerOnLive: !prev.powerOnLive }))}
                              >
                                <div className="lcs-toggle-knob" />
                              </div>
                            </div>
                            <div className="lcs-others-toggle-row">
                              <span>Power on Recording</span>
                              <div 
                                className={`lcs-toggle-switch ${settingsOthers.powerOnRecord ? 'is-on' : ''}`}
                                onClick={() => setSettingsOthers(prev => ({ ...prev, powerOnRecord: !prev.powerOnRecord }))}
                              >
                                <div className="lcs-toggle-knob" />
                              </div>
                            </div>
                            <div className="lcs-others-toggle-row">
                              <span>Start Recording\Start Living Countdown</span>
                              <div 
                                className={`lcs-toggle-switch ${settingsOthers.startCountdown ? 'is-on' : ''}`}
                                onClick={() => setSettingsOthers(prev => ({ ...prev, startCountdown: !prev.startCountdown }))}
                              >
                                <div className="lcs-toggle-knob" />
                              </div>
                            </div>
                          </div>

                          <div className="lcs-others-col-right" style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative', zIndex: 110 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', position: 'relative' }}>
                              <span style={{ fontSize: '11px' }}>Time Format:</span>
                              <div 
                                className="lcs-select-pill" 
                                style={{ width: '160px', cursor: 'pointer' }}
                                onClick={() => {
                                  setIsTimeFormatDropdownOpen(!isTimeFormatDropdownOpen);
                                  setIsLockScreenDropdownOpen(false);
                                  setIsHourFormatDropdownOpen(false);
                                }}
                              >
                                <span>{timeFormat}</span>
                                <span>▼</span>
                              </div>
                              {isTimeFormatDropdownOpen && (
                                <div className="lcs-settings-dropdown-menu format-dropdown" style={{ top: '30px' }}>
                                  {['DD-MM-YYYY', 'YYYY-MM-DD'].map(opt => (
                                    <div 
                                      key={opt}
                                      className={`lcs-settings-dropdown-item ${timeFormat === opt ? 'is-selected' : ''}`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setTimeFormat(opt);
                                        setIsTimeFormatDropdownOpen(false);
                                        showToast(`Time Format set to ${opt}`);
                                      }}
                                    >
                                      {opt}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px', position: 'relative' }}>
                              <div 
                                className="lcs-select-pill" 
                                style={{ width: '160px', cursor: 'pointer' }}
                                onClick={() => {
                                  setIsHourFormatDropdownOpen(!isHourFormatDropdownOpen);
                                  setIsLockScreenDropdownOpen(false);
                                  setIsTimeFormatDropdownOpen(false);
                                }}
                              >
                                <span>{hourFormat}</span>
                                <span>▼</span>
                              </div>
                              {isHourFormatDropdownOpen && (
                                <div className="lcs-settings-dropdown-menu hour-dropdown" style={{ top: '34px' }}>
                                  {['12 Hours Format', '24 Hours Format'].map(opt => (
                                    <div 
                                      key={opt}
                                      className={`lcs-settings-dropdown-item ${hourFormat === opt ? 'is-selected' : ''}`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setHourFormat(opt);
                                        setIsHourFormatDropdownOpen(false);
                                        showToast(`Hour Format set to ${opt}`);
                                      }}
                                    >
                                      {opt}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : displayTab === 'storage' ? (
                    <div className="lcs-settings-storage-tab">
                      {/* Row 1: Record Strategy */}
                      <div className="lcs-settings-row" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span className="lcs-settings-label">Record Strategy:</span>
                          <div className="lcs-settings-options-group">
                            {[
                              { label: 'Delete Priority', value: 'delete' },
                              { label: 'Stop Priority', value: 'stop' }
                            ].map((opt) => {
                              const isSelected = settingsRecordStrategy === opt.value;
                              return (
                                <div 
                                  key={opt.value} 
                                  className="lcs-radio-item"
                                  onClick={() => setSettingsRecordStrategy(opt.value)}
                                >
                                  <div className={`lcs-radio-circle ${isSelected ? 'is-checked' : ''}`}>
                                    {isSelected && <div className="lcs-radio-dot" />}
                                  </div>
                                  <span>{opt.label}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div style={{ marginLeft: '120px', fontSize: '11px', color: '#a0aec0', lineHeight: '1.6' }}>
                          <div>When "Delete Priority" is selected, oldest files will be deleted first when lack space.</div>
                          <div>When "Stop Priority" is selected, it will stop recording when lack space.</div>
                        </div>
                      </div>

                      {/* Row 2: Disk Manage */}
                      <div className="lcs-settings-row" style={{ alignItems: 'center' }}>
                        <span className="lcs-settings-label">Disk Manage:</span>
                        <div className="lcs-disk-grid">
                          <div className="lcs-disk-col">
                            <span className="lcs-disk-value" style={{ color: '#00e676' }}>Good</span>
                            <span className="lcs-disk-label">Disk State</span>
                          </div>
                          <div className="lcs-disk-col">
                            <span className="lcs-disk-value">930.39G</span>
                            <span className="lcs-disk-label">Capacity</span>
                          </div>
                          <div className="lcs-disk-col">
                            <span className="lcs-disk-value" style={{ color: '#f59e0b' }}>246.65G</span>
                            <span className="lcs-disk-label">Used</span>
                          </div>
                          <div className="lcs-disk-col">
                            <span className="lcs-disk-value" style={{ color: '#00e676' }}>683.74G</span>
                            <span className="lcs-disk-label">Free</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : displayTab === 'network' ? (
                    <div className="lcs-settings-network-tab">
                      {/* Sub Navigation Bar */}
                      <div className="lcs-settings-subnav-row">
                        <button
                          type="button"
                          className={`lcs-subnav-btn ${settingsNetworkSubTab === 'config' ? 'is-active' : ''}`}
                          onClick={() => setSettingsNetworkSubTab('config')}
                        >
                          Config
                        </button>
                        <button
                          type="button"
                          className={`lcs-subnav-btn ${settingsNetworkSubTab === 'detect' ? 'is-active' : ''}`}
                          onClick={() => setSettingsNetworkSubTab('detect')}
                        >
                          Net Detect
                        </button>
                      </div>

                      {settingsNetworkSubTab === 'config' ? (
                        <div className="lcs-settings-network-config">
                          {/* Row 1: Select (LAN) */}
                          <div className="lcs-settings-row">
                            <span className="lcs-settings-label">Select:</span>
                            <div className="lcs-radio-item" style={{ cursor: 'default' }}>
                              <div className="lcs-radio-circle is-checked">
                                <div className="lcs-radio-dot" />
                              </div>
                              <span>LAN</span>
                            </div>
                          </div>

                          {/* Row 2: DHCP */}
                          <div className="lcs-settings-row">
                            <span className="lcs-settings-label">DHCP:</span>
                            <div 
                              className={`lcs-toggle-switch ${settingsNetworkDhcp ? 'is-on' : ''}`}
                              onClick={() => {
                                const nextDhcp = !settingsNetworkDhcp;
                                setSettingsNetworkDhcp(nextDhcp);
                                if (nextDhcp) {
                                  setSettingsNetworkIp('192.168.3.155');
                                  setSettingsNetworkMask('255.255.255.0');
                                  setSettingsNetworkGateway('192.168.3.1');
                                  setSettingsNetworkDns('8.8.8.8');
                                } else {
                                  setSettingsNetworkIp(isRemoteClassroomView ? '192.168.3.37' : '192.168.3.50');
                                  setSettingsNetworkMask(isRemoteClassroomView ? '255.255.255.0' : '113.31.119.88');
                                  setSettingsNetworkGateway('192.168.3.1');
                                  setSettingsNetworkDns('');
                                }
                              }}
                            >
                              <div className="lcs-toggle-knob" />
                            </div>
                          </div>

                          {/* Row 3: IP Address */}
                          <div className="lcs-settings-row">
                            <span className="lcs-settings-label">IP Address:</span>
                            <input 
                              type="text" 
                              className="lcs-settings-input" 
                              value={settingsNetworkIp}
                              disabled={settingsNetworkDhcp}
                              onChange={(e) => setSettingsNetworkIp(e.target.value)}
                            />
                          </div>

                          {/* Row 4: Subnet Mask */}
                          <div className="lcs-settings-row">
                            <span className="lcs-settings-label">Subnet Mask:</span>
                            <input 
                              type="text" 
                              className="lcs-settings-input" 
                              value={settingsNetworkMask}
                              disabled={settingsNetworkDhcp}
                              onChange={(e) => setSettingsNetworkMask(e.target.value)}
                            />
                          </div>

                          {/* Row 5: Default Gateway */}
                          <div className="lcs-settings-row">
                            <span className="lcs-settings-label">Default Gateway:</span>
                            <input 
                              type="text" 
                              className="lcs-settings-input" 
                              value={settingsNetworkGateway}
                              disabled={settingsNetworkDhcp}
                              onChange={(e) => setSettingsNetworkGateway(e.target.value)}
                            />
                          </div>

                          {/* Row 6: DNS Server */}
                          <div className="lcs-settings-row">
                            <span className="lcs-settings-label">DNS Server:</span>
                            <input 
                              type="text" 
                              className="lcs-settings-input" 
                              value={settingsNetworkDns}
                              disabled={settingsNetworkDhcp}
                              placeholder=""
                              onChange={(e) => setSettingsNetworkDns(e.target.value)}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="lcs-settings-net-detect-panel" style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, padding: '8px 0', boxSizing: 'border-box' }}>
                          {/* Controls bar */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '12px', color: sublabelColor }}>Address:</span>
                            <input 
                              type="text" 
                              className="lcs-net-detect-input"
                              value={pingAddress}
                              onChange={(e) => setPingAddress(e.target.value)}
                              placeholder="www.bing.com"
                              disabled={isPinging}
                              style={{ 
                                background: 'rgba(0,0,0,0.2)', 
                                border: '1px solid rgba(255,255,255,0.1)', 
                                color: '#fff', 
                                padding: '4px 12px', 
                                borderRadius: '999px',
                                outline: 'none',
                                fontSize: '12px',
                                width: '200px'
                              }}
                            />
                            
                            <button 
                              type="button" 
                              className="lcs-net-detect-btn"
                              onClick={handleStartPing}
                              disabled={isPinging}
                              style={{
                                background: theme === 'light' ? '#e5e7eb' : 'rgba(255,255,255,0.06)',
                                border: theme === 'light' ? '1px solid #d1d5db' : '1px solid rgba(255,255,255,0.1)',
                                color: theme === 'light' ? '#1f2937' : '#fff',
                                padding: '4px 16px',
                                borderRadius: '999px',
                                fontSize: '11px',
                                fontWeight: '600',
                                cursor: 'pointer'
                              }}
                            >
                              {isPinging ? 'Detecting...' : 'Start Detect'}
                            </button>
                            
                            <button 
                              type="button" 
                              className="lcs-net-detect-btn"
                              onClick={handleClearPing}
                              style={{
                                background: theme === 'light' ? '#e5e7eb' : 'rgba(255,255,255,0.06)',
                                border: theme === 'light' ? '1px solid #d1d5db' : '1px solid rgba(255,255,255,0.1)',
                                color: theme === 'light' ? '#1f2937' : '#fff',
                                padding: '4px 16px',
                                borderRadius: '999px',
                                fontSize: '11px',
                                fontWeight: '600',
                                cursor: 'pointer'
                              }}
                            >
                              Clear
                            </button>
                          </div>

                          {/* Monospaced Output terminal console */}
                          <div className="lcs-net-detect-console" style={{ 
                            flex: 1, 
                            background: '#090a0f', 
                            border: '1px solid rgba(255,255,255,0.05)', 
                            borderRadius: '6px', 
                            padding: '12px', 
                            fontFamily: 'monospace', 
                            fontSize: '11px', 
                            color: '#e2e8f0', 
                            overflowY: 'auto',
                            minHeight: '140px',
                            lineHeight: '1.5',
                            whiteSpace: 'pre-wrap'
                          }}>
                            {pingConsoleLines.length > 0 ? (
                              pingConsoleLines.map((line, index) => (
                                <div key={index}>{line}</div>
                              ))
                            ) : (
                              <div style={{ color: '#64748b', fontStyle: 'italic' }}>Console idle. Enter address and click 'Start Detect'.</div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : displayTab === 'version' ? (
                    <div className="lcs-settings-version-tab" style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {/* Subnav row with 'Check' button */}
                      <div className="lcs-settings-subnav-row">
                        <button 
                          type="button" 
                          className="lcs-subnav-btn is-active"
                          onClick={handleVersionCheck}
                          disabled={versionDetectState === 'detecting'}
                        >
                          Check
                        </button>
                      </div>

                      {/* Version details card */}
                      <div className="lcs-settings-version-card">
                        <div className="lcs-version-row">
                          <span className="lcs-version-label">Model</span>
                          <span className="lcs-version-value">LCS810(i)</span>
                        </div>
                        <div className="lcs-version-row">
                          <span className="lcs-version-label">Main IP:</span>
                          <span className="lcs-version-value">192.168.3.50</span>
                        </div>
                        <div className="lcs-version-row">
                          <span className="lcs-version-label">AEC Version:</span>
                          <span className="lcs-version-value">5.0.1</span>
                        </div>
                        <div className="lcs-version-row">
                          <span className="lcs-version-label">System Version:</span>
                          <span className="lcs-version-value">7.0.5S</span>
                        </div>
                        <div className="lcs-version-row">
                          <span className="lcs-version-label">Sevice Version:</span>
                          <span className="lcs-version-value">v8.1.702-release-ss528v100</span>
                        </div>
                        <div className="lcs-version-row">
                          <span className="lcs-version-label">MAC Address:</span>
                          <span className="lcs-version-value">38-3a-21-00-8e-0c</span>
                        </div>
                      </div>

                      {/* Detecting Loading Modal */}
                      {versionDetectState === 'detecting' && (
                        <div className="lcs-version-modal-overlay">
                          <div className="lcs-version-modal-spinner-box">
                            <div className="lcs-version-spinner" />
                            <span style={{ fontSize: '13px', color: '#ffffff', marginTop: '16px', fontWeight: '500' }}>Detecting</span>
                          </div>
                        </div>
                      )}

                      {/* Latest Version Alert Pill Bar */}
                      {versionDetectState === 'latest' && (
                        <div className="lcs-version-modal-overlay">
                          <div className="lcs-version-alert-bar">
                            <div className="lcs-version-alert-check-icon">✓</div>
                            <span style={{ fontSize: '12px', color: '#ffffff', fontWeight: '500', flex: 1 }}>It's the latest version</span>
                            <button 
                              type="button" 
                              className="lcs-version-alert-close-btn"
                              onClick={() => setVersionDetectState('idle')}
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : displayTab === 'advance' ? (
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
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                          {/* Card 1: Record Config */}
                          <div className="lcs-settings-advance-card">
                            {/* Row 1: Select checkboxes */}
                            <div className="lcs-settings-row" style={{ alignItems: 'flex-start' }}>
                              <span className="lcs-settings-label" style={{ marginTop: '4px' }}>Select:</span>
                              <div className="lcs-checkbox-grid">
                                {[
                                  { label: 'PGM', key: 'pgm' },
                                  { label: 'Lecture', key: 'lecture' },
                                  { label: 'Lecture2', key: 'lecture2' },
                                  { label: 'Teacher_C', key: 'teacherC' },
                                  { label: 'Student_C', key: 'studentC' },
                                  { label: 'Teacher_P', key: 'teacherP' },
                                  { label: 'Student_P', key: 'studentP' },
                                  { label: 'Interactive', key: 'interactive' }
                                ].map((chk) => {
                                  const isChecked = settingsAdvanceSelect[chk.key];
                                  return (
                                    <div 
                                      key={chk.key} 
                                      className="lcs-checkbox-item"
                                      onClick={() => setSettingsAdvanceSelect(prev => ({ ...prev, [chk.key]: !prev[chk.key] }))}
                                    >
                                      <div className={`lcs-checkbox-box ${isChecked ? 'is-checked' : ''}`}>
                                        {isChecked && <span className="lcs-checkmark">✓</span>}
                                      </div>
                                      <span className={`lcs-checkbox-label-pill ${isChecked ? 'is-checked' : ''}`}>{chk.label}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Row 2: Name */}
                            <div className="lcs-settings-row">
                              <span className="lcs-settings-label">Name:</span>
                              <input 
                                type="text" 
                                className="lcs-settings-input" 
                                value={settingsAdvanceName}
                                onChange={(e) => setSettingsAdvanceName(e.target.value)}
                              />
                            </div>

                            {/* Row 3: Bitrate */}
                            <div className="lcs-settings-row">
                              <span className="lcs-settings-label">Bitrate:</span>
                              <div className="lcs-select-pill" style={{ width: '160px' }}>
                                <span>{settingsAdvanceBitrate}</span>
                                <span>▼</span>
                              </div>
                            </div>

                            {/* Row 4: Format */}
                            <div className="lcs-settings-row">
                              <span className="lcs-settings-label">Format:</span>
                              <div className="lcs-select-pill" style={{ width: '160px' }}>
                                <span>{settingsAdvanceFormat}</span>
                                <span>▼</span>
                              </div>
                            </div>

                            {/* Row 5: Frame Rate */}
                            <div className="lcs-settings-row">
                              <span className="lcs-settings-label">Frame Rate:</span>
                              <div className="lcs-select-pill" style={{ width: '160px' }}>
                                <span>{settingsAdvanceFrameRate}</span>
                                <span>▼</span>
                              </div>
                            </div>

                            {/* Row 6: Codec */}
                            <div className="lcs-settings-row">
                              <span className="lcs-settings-label">Codec:</span>
                              <div className="lcs-select-pill" style={{ width: '160px' }}>
                                <span>{settingsAdvanceCodec}</span>
                                <span>▼</span>
                              </div>
                            </div>

                            {/* Row 7: Resolution */}
                            <div className="lcs-settings-row">
                              <span className="lcs-settings-label">Resolution:</span>
                              <div className="lcs-select-pill" style={{ width: '160px' }}>
                                <span>{settingsAdvanceResolution}</span>
                                <span>▼</span>
                              </div>
                            </div>
                          </div>

                          {/* Card 2: Other Rec Config */}
                          <div className="lcs-settings-advance-card">
                            {/* Row 1: Other Title */}
                            <div className="lcs-settings-row" style={{ padding: '6px 20px', borderBottom: 'none' }}>
                              <span className="lcs-settings-label" style={{ fontWeight: 'bold' }}>Other:</span>
                            </div>

                            {/* Row 2: Segment Rec. */}
                            <div className="lcs-settings-row" style={{ borderBottom: 'none', alignItems: 'center' }}>
                              <span className="lcs-settings-label">Segment Rec.:</span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div className="lcs-select-pill" style={{ width: '160px' }}>
                                  <span>{settingsAdvanceSegment}</span>
                                  <span>▼</span>
                                </div>
                                <span style={{ fontSize: '11px', color: '#a0aec0' }}>(0 means no automatic segmentation)</span>
                              </div>
                            </div>

                            {/* Row 3: Maximum REC. time */}
                            <div className="lcs-settings-row" style={{ borderBottom: 'none', alignItems: 'center' }}>
                              <span className="lcs-settings-label">Maximum REC. time:</span>
                              <div className="lcs-select-pill" style={{ width: '160px' }}>
                                <span>{settingsAdvanceMaxTime}</span>
                                <span>▼</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : settingsAdvanceSubTab === 'live' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                          <div className="lcs-settings-advance-card">
                            {/* Row 1: Select checkboxes */}
                            <div className="lcs-settings-row" style={{ alignItems: 'flex-start' }}>
                              <span className="lcs-settings-label" style={{ marginTop: '4px' }}>Select:</span>
                              <div className="lcs-checkbox-grid">
                                {[
                                  { label: 'PGM', key: 'pgm' },
                                  { label: 'Lecture', key: 'lecture' },
                                  { label: 'Lecture2', key: 'lecture2' },
                                  { label: 'Teacher_C', key: 'teacherC' },
                                  { label: 'Student_C', key: 'studentC' },
                                  { label: 'Teacher_P', key: 'teacherP' },
                                  { label: 'Student_P', key: 'studentP' },
                                  { label: 'Interactive', key: 'interactive' }
                                ].map((chk) => {
                                  const isChecked = settingsLiveSelect[chk.key];
                                  return (
                                    <div 
                                      key={chk.key} 
                                      className="lcs-checkbox-item"
                                      onClick={() => setSettingsLiveSelect(prev => ({ ...prev, [chk.key]: !prev[chk.key] }))}
                                    >
                                      <div className={`lcs-checkbox-box ${isChecked ? 'is-checked' : ''}`}>
                                        {isChecked && <span className="lcs-checkmark">✓</span>}
                                      </div>
                                      <span className={`lcs-checkbox-label-pill ${isChecked ? 'is-checked' : ''}`}>{chk.label}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Row 2: Format */}
                            <div className="lcs-settings-row">
                              <span className="lcs-settings-label">Format:</span>
                              <div className="lcs-select-pill" style={{ width: '160px' }}>
                                <span>{settingsLiveFormat}</span>
                                <span>▼</span>
                              </div>
                            </div>

                            {/* Row 3: Bitrate */}
                            <div className="lcs-settings-row">
                              <span className="lcs-settings-label">Bitrate:</span>
                              <div className="lcs-select-pill" style={{ width: '160px' }}>
                                <span>{settingsLiveBitrate}</span>
                                <span>▼</span>
                              </div>
                            </div>

                            {/* Row 4: Frame Rate */}
                            <div className="lcs-settings-row">
                              <span className="lcs-settings-label">Frame Rate:</span>
                              <div className="lcs-select-pill" style={{ width: '160px' }}>
                                <span>{settingsLiveFrameRate}</span>
                                <span>▼</span>
                              </div>
                            </div>

                            {/* Row 5: Resolution */}
                            <div className="lcs-settings-row" style={{ borderBottom: 'none' }}>
                              <span className="lcs-settings-label">Resolution:</span>
                              <div className="lcs-select-pill" style={{ width: '160px' }}>
                                <span>{settingsLiveResolution}</span>
                                <span>▼</span>
                              </div>
                            </div>
                          </div>

                          {/* Card 2: Live Server Input */}
                          <div className="lcs-settings-advance-card">
                            <div className="lcs-settings-row" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '6px', borderBottom: 'none' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <span className="lcs-settings-label">Live Server:</span>
                                <input 
                                  type="text" 
                                  className="lcs-settings-input" 
                                  style={{ width: '360px' }}
                                  value={settingsLiveServer}
                                  onChange={(e) => setSettingsLiveServer(e.target.value)}
                                />
                              </div>
                              <span style={{ marginLeft: '140px', fontSize: '10px', color: '#a0aec0', lineHeight: '1.4' }}>
                                (Address format: rtmp://hostip:port/appname/streamname; For example: rtmp://127.0.0.1:1935/live/livestream)
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : settingsAdvanceSubTab === 'channel' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                          {/* Card 1: Channel Select and Raw */}
                          <div className="lcs-settings-advance-card">
                            {/* Row 1: Select Channel */}
                            <div className="lcs-settings-row">
                              <span className="lcs-settings-label" style={{ width: '140px' }}>Select Channel:</span>
                              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                {['Teacher_C', 'Student_C', 'Teacher_P', 'Student_P'].map((chn) => {
                                  const isActive = settingsChannelActive === chn;
                                  return (
                                    <button
                                      key={chn}
                                      type="button"
                                      className={`lcs-subnav-btn ${isActive ? 'is-active' : ''}`}
                                      onClick={() => setSettingsChannelActive(chn)}
                                    >
                                      {chn}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Row 2: Select Raw */}
                            <div className="lcs-settings-row" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '6px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <span className="lcs-settings-label" style={{ width: '140px' }}>Select Raw:</span>
                                <div className="lcs-settings-options-group">
                                  {['Close', 'RTSP', 'USB Camera'].map((opt) => {
                                    const isSelected = settingsChannelConfigs[settingsChannelActive].raw === opt;
                                    return (
                                      <div 
                                        key={opt} 
                                        className="lcs-radio-item"
                                        onClick={() => updateChannelConfig('raw', opt)}
                                      >
                                        <div className={`lcs-radio-circle ${isSelected ? 'is-checked' : ''}`}>
                                          {isSelected && <div className="lcs-radio-dot" />}
                                        </div>
                                        <span>{opt}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                              {settingsChannelConfigs[settingsChannelActive].raw === 'RTSP' && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                  <span style={{ width: '140px' }} />
                                  <input 
                                    type="text" 
                                    className="lcs-settings-input" 
                                    style={{ width: '360px' }}
                                    value={settingsChannelConfigs[settingsChannelActive].url}
                                    onChange={(e) => updateChannelConfig('url', e.target.value)}
                                  />
                                </div>
                              )}
                            </div>

                            {/* Row 3: PTZ Control Toggle */}
                            <div className="lcs-settings-row" style={{ borderBottom: 'none' }}>
                              <span className="lcs-settings-label" style={{ width: '140px' }}>PTZ Control:</span>
                              <div 
                                className={`lcs-toggle-switch ${settingsChannelConfigs[settingsChannelActive].ptzEnabled ? 'is-on' : ''}`}
                                onClick={() => updateChannelConfig('ptzEnabled', !settingsChannelConfigs[settingsChannelActive].ptzEnabled)}
                              >
                                <div className="lcs-toggle-knob" />
                              </div>
                            </div>
                          </div>

                          {/* Card 2: PTZ details grid */}
                          <div className="lcs-settings-advance-card">
                            {/* Row 1: IP Address and Port */}
                            <div className="lcs-settings-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <span className="lcs-settings-label" style={{ width: '120px' }}>IP Address:</span>
                                <input 
                                  type="text" 
                                  className="lcs-settings-input"
                                  disabled={!settingsChannelConfigs[settingsChannelActive].ptzEnabled}
                                  value={settingsChannelConfigs[settingsChannelActive].ptzIp}
                                  onChange={(e) => updateChannelConfig('ptzIp', e.target.value)}
                                />
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <span className="lcs-settings-label" style={{ width: '80px' }}>Port:</span>
                                <input 
                                  type="text" 
                                  className="lcs-settings-input"
                                  disabled={!settingsChannelConfigs[settingsChannelActive].ptzEnabled}
                                  value={settingsChannelConfigs[settingsChannelActive].ptzPort}
                                  onChange={(e) => updateChannelConfig('ptzPort', e.target.value)}
                                />
                              </div>
                            </div>

                            {/* Row 2: Protocol and Connection Type */}
                            <div className="lcs-settings-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', borderBottom: 'none' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <span className="lcs-settings-label" style={{ width: '120px' }}>Protocol:</span>
                                <div 
                                  className="lcs-select-pill" 
                                  style={{ width: '160px', opacity: settingsChannelConfigs[settingsChannelActive].ptzEnabled ? 1 : 0.4, cursor: settingsChannelConfigs[settingsChannelActive].ptzEnabled ? 'pointer' : 'default' }}
                                  onClick={() => {
                                    if (settingsChannelConfigs[settingsChannelActive].ptzEnabled) {
                                      updateChannelConfig('ptzProtocol', settingsChannelConfigs[settingsChannelActive].ptzProtocol === 'Visca' ? 'Pelco-D' : 'Visca');
                                    }
                                  }}
                                >
                                  <span>{settingsChannelConfigs[settingsChannelActive].ptzProtocol}</span>
                                  <span>▼</span>
                                </div>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <span className="lcs-settings-label" style={{ width: '80px' }}>Type:</span>
                                <div 
                                  className="lcs-select-pill" 
                                  style={{ width: '160px', opacity: settingsChannelConfigs[settingsChannelActive].ptzEnabled ? 1 : 0.4, cursor: settingsChannelConfigs[settingsChannelActive].ptzEnabled ? 'pointer' : 'default' }}
                                  onClick={() => {
                                    if (settingsChannelConfigs[settingsChannelActive].ptzEnabled) {
                                      updateChannelConfig('ptzType', settingsChannelConfigs[settingsChannelActive].ptzType === 'UDP' ? 'TCP' : 'UDP');
                                    }
                                  }}
                                >
                                  <span>{settingsChannelConfigs[settingsChannelActive].ptzType}</span>
                                  <span>▼</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : settingsAdvanceSubTab === 'server' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                          {/* Card 1: Server IP */}
                          <div className="lcs-settings-advance-card">
                            <div className="lcs-settings-row" style={{ borderBottom: 'none', alignItems: 'center' }}>
                              <span className="lcs-settings-label" style={{ width: '140px' }}>Server:</span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <input 
                                  type="text" 
                                  className="lcs-settings-input" 
                                  style={{ width: '180px' }}
                                  value={settingsServerIp}
                                  onChange={(e) => setSettingsServerIp(e.target.value)}
                                />
                                <button type="button" className="lcs-subnav-btn" style={{ height: '24px', padding: '0 12px' }}>
                                  Set
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Card 2: Management Platform settings */}
                          <div className="lcs-settings-advance-card">
                            {/* Row 1: management platform */}
                            <div className="lcs-settings-row">
                              <span className="lcs-settings-label" style={{ width: '140px' }}>management platform:</span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <input 
                                  type="text" 
                                  className="lcs-settings-input" 
                                  style={{ width: '180px' }}
                                  value={settingsServerPlatform}
                                  onChange={(e) => setSettingsServerPlatform(e.target.value)}
                                />
                                <button type="button" className="lcs-subnav-btn" style={{ height: '24px', padding: '0 12px' }}>
                                  Set
                                </button>
                              </div>
                            </div>

                            {/* Row 2: Device Name */}
                            <div className="lcs-settings-row">
                              <span className="lcs-settings-label" style={{ width: '140px' }}>Device Name:</span>
                              <input 
                                type="text" 
                                className="lcs-settings-input" 
                                style={{ width: '180px' }}
                                value={settingsServerDeviceName}
                                onChange={(e) => setSettingsServerDeviceName(e.target.value)}
                              />
                            </div>

                            {/* Row 3: Auth Code */}
                            <div className="lcs-settings-row">
                              <span className="lcs-settings-label" style={{ width: '140px' }}>Auth Code:</span>
                              <input 
                                type="text" 
                                className="lcs-settings-input" 
                                style={{ width: '180px' }}
                                value={settingsServerAuthCode}
                                onChange={(e) => setSettingsServerAuthCode(e.target.value)}
                              />
                            </div>

                            {/* Row 4: Organization ID */}
                            <div className="lcs-settings-row">
                              <span className="lcs-settings-label" style={{ width: '140px' }}>Organization ID:</span>
                              <input 
                                type="text" 
                                className="lcs-settings-input" 
                                style={{ width: '180px' }}
                                value={settingsServerOrgId}
                                onChange={(e) => setSettingsServerOrgId(e.target.value)}
                              />
                            </div>

                            {/* Row 5: Create location checkbox */}
                            <div className="lcs-settings-row" style={{ borderBottom: 'none' }}>
                              <span className="lcs-settings-label" style={{ width: '140px' }}>Create location:</span>
                              <div 
                                className={`lcs-checkbox-box ${settingsServerCreateLoc ? 'is-checked' : ''}`}
                                style={{ cursor: 'pointer' }}
                                onClick={() => setSettingsServerCreateLoc(!settingsServerCreateLoc)}
                              >
                                {settingsServerCreateLoc && <span className="lcs-checkmark">✓</span>}
                              </div>
                            </div>

                            {/* Row 6: Join button */}
                            <div className="lcs-settings-row" style={{ borderBottom: 'none', paddingTop: '0' }}>
                              <span style={{ width: '140px' }} />
                              <button 
                                type="button" 
                                className="lcs-subnav-btn is-active" 
                                style={{ height: '24px', padding: '0 20px', fontSize: '11px', borderRadius: '12px' }}
                              >
                                Join
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : settingsAdvanceSubTab === 'interactive' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                          {/* Card 1: Creator settings */}
                          <div className="lcs-settings-advance-card" style={{ display: 'grid', gridTemplateColumns: '120px 1fr', padding: '12px 20px', gap: '16px' }}>
                            <span className="lcs-settings-label" style={{ fontWeight: 'bold', width: '120px', marginTop: '6px' }}>Creator:</span>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              {/* Sub Row 1: Send to Joiner */}
                              <div style={{ fontSize: '11px', fontWeight: 'bold', color: groupHeaderColor, borderBottom: groupHeaderBorder, paddingBottom: '6px' }}>
                                Send to Joiner:
                              </div>

                              {/* Sub Row 2: Default Output 1 */}
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <span style={{ fontSize: '11px', color: sublabelColor, width: '100px' }}>Default Output1:</span>
                                  <div className="lcs-select-pill" style={{ width: '140px' }}>
                                    <span>{settingsInteractiveOutput1}</span>
                                    <span>▼</span>
                                  </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <span style={{ fontSize: '11px', color: sublabelColor, width: '60px' }}>Quality:</span>
                                  <div className="lcs-select-pill" style={{ width: '120px' }}>
                                    <span>{settingsInteractiveQuality1}</span>
                                    <span>▼</span>
                                  </div>
                                </div>
                              </div>

                              {/* Sub Row 3: Default Output 2 */}
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <span style={{ fontSize: '11px', color: sublabelColor, width: '100px' }}>Default Output2:</span>
                                  <div className="lcs-select-pill" style={{ width: '140px' }}>
                                    <span>{settingsInteractiveOutput2}</span>
                                    <span>▼</span>
                                  </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <span style={{ fontSize: '11px', color: sublabelColor, width: '60px' }}>Quality:</span>
                                  <div className="lcs-select-pill" style={{ width: '120px' }}>
                                    <span>{settingsInteractiveQuality2}</span>
                                    <span>▼</span>
                                  </div>
                                </div>
                              </div>

                              {/* Sub Row 4: Interactive with Joiners */}
                              <div style={{ fontSize: '11px', fontWeight: 'bold', color: groupHeaderColor, borderBottom: groupHeaderBorder, paddingBottom: '6px', marginTop: '6px' }}>
                                Interactive with Joiners:
                              </div>

                              {/* Sub Row 5: Max Screens & AUTO PG Scroll */}
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '16px', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <span style={{ fontSize: '11px', color: sublabelColor, width: '80px' }}>Max Screens:</span>
                                  {[
                                    { label: '4 views', value: '4' },
                                    { label: '9 views', value: '9' }
                                  ].map((opt) => {
                                    const isSelected = settingsInteractiveMaxScreens === opt.value;
                                    return (
                                      <div 
                                        key={opt.value} 
                                        className="lcs-radio-item"
                                        onClick={() => setSettingsInteractiveMaxScreens(opt.value)}
                                      >
                                        <div className={`lcs-radio-circle ${isSelected ? 'is-checked' : ''}`}>
                                          {isSelected && <div className="lcs-radio-dot" />}
                                        </div>
                                        <span>{opt.label}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <span style={{ fontSize: '11px', color: sublabelColor, width: '90px' }}>AUTO PG Scroll:</span>
                                  <div className="lcs-select-pill" style={{ width: '80px' }}>
                                    <span>{settingsInteractivePgScroll}</span>
                                    <span>▼</span>
                                  </div>
                                  <span style={{ fontSize: '11px', color: '#a0aec0' }}>sec</span>
                                  <div 
                                    className={`lcs-toggle-switch ${settingsInteractivePgScrollEnable ? 'is-on' : ''}`}
                                    onClick={() => setSettingsInteractivePgScrollEnable(!settingsInteractivePgScrollEnable)}
                                    style={{ transform: 'scale(0.85)', marginLeft: '4px' }}
                                  >
                                    <div className="lcs-toggle-knob" />
                                  </div>
                                  <span style={{ fontSize: '11px', color: sublabelColor }}>Enable</span>
                                </div>
                              </div>

                              {/* Sub Row 6: Joiners Mic Num & Speaker Fullscreen */}
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <span style={{ fontSize: '11px', color: sublabelColor, width: '100px' }}>Joiners Mic Num:</span>
                                  <div className="lcs-select-pill" style={{ width: '80px' }}>
                                    <span>{settingsInteractiveMicNum}</span>
                                    <span>▼</span>
                                  </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <span style={{ fontSize: '11px', color: sublabelColor, width: '110px' }}>Speaker Fullscreen:</span>
                                  <div 
                                    className={`lcs-toggle-switch ${settingsInteractiveSpeakerFull ? 'is-on' : ''}`}
                                    onClick={() => setSettingsInteractiveSpeakerFull(!settingsInteractiveSpeakerFull)}
                                    style={{ transform: 'scale(0.85)' }}
                                  >
                                    <div className="lcs-toggle-knob" />
                                  </div>
                                  <span style={{ fontSize: '11px', color: sublabelColor }}>Enable</span>
                                </div>
                              </div>

                              {/* Sub Row 7: Show Local */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ fontSize: '11px', color: sublabelColor, width: '80px' }}>Show Local:</span>
                                <div 
                                  className={`lcs-toggle-switch ${settingsInteractiveShowLocalCreator ? 'is-on' : ''}`}
                                  onClick={() => setSettingsInteractiveShowLocalCreator(!settingsInteractiveShowLocalCreator)}
                                  style={{ transform: 'scale(0.85)' }}
                                >
                                  <div className="lcs-toggle-knob" />
                                </div>
                                <span style={{ fontSize: '11px', color: sublabelColor }}>Enable</span>
                              </div>
                            </div>
                          </div>

                          {/* Card 2: Joiner settings */}
                          <div className="lcs-settings-advance-card" style={{ display: 'grid', gridTemplateColumns: '120px 1fr', padding: '12px 20px', gap: '16px' }}>
                            <span className="lcs-settings-label" style={{ fontWeight: 'bold', width: '120px', marginTop: '6px' }}>Joiner:</span>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              {/* Sub Row 1: Local Displays */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '11px', color: sublabelColor, width: '100px' }}>Local Displays:</span>
                                {[
                                  { label: '2 Screens', value: '2' },
                                  { label: '1 Screen', value: '1' }
                                ].map((opt) => {
                                  const isSelected = settingsInteractiveLocalDisplays === opt.value;
                                  return (
                                    <div 
                                      key={opt.value} 
                                      className="lcs-radio-item"
                                      onClick={() => setSettingsInteractiveLocalDisplays(opt.value)}
                                    >
                                      <div className={`lcs-radio-circle ${isSelected ? 'is-checked' : ''}`}>
                                        {isSelected && <div className="lcs-radio-dot" />}
                                      </div>
                                      <span>{opt.label}</span>
                                    </div>
                                  );
                                })}

                                <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                                  {['V1', 'V2', 'V2 [V1]'].map((layout) => {
                                    const layoutVal = layout === 'V2 [V1]' ? 'V2_V1' : layout;
                                    const isActive = settingsInteractiveDisplayLayout === layoutVal;
                                    return (
                                      <button
                                        key={layout}
                                        type="button"
                                        className={`lcs-subnav-btn ${isActive ? 'is-active' : ''}`}
                                        style={{ height: '22px', padding: '0 8px', borderRadius: '4px', fontSize: '10px' }}
                                        onClick={() => setSettingsInteractiveDisplayLayout(layoutVal)}
                                      >
                                        {layout}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Sub Row 2: Send to Creator & Quality */}
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <span style={{ fontSize: '11px', color: sublabelColor, width: '100px' }}>Send to Creator:</span>
                                  <div className="lcs-select-pill" style={{ width: '140px' }}>
                                    <span>{settingsInteractiveSendCreator}</span>
                                    <span>▼</span>
                                  </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <span style={{ fontSize: '11px', color: sublabelColor, width: '60px' }}>Quality:</span>
                                  <div className="lcs-select-pill" style={{ width: '120px' }}>
                                    <span>{settingsInteractiveQualityJoiner}</span>
                                    <span>▼</span>
                                  </div>
                                </div>
                              </div>

                              {/* Sub Row 3: Show Local & Auto Join */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <span style={{ fontSize: '11px', color: sublabelColor, width: '80px' }}>Show Local:</span>
                                  <div 
                                    className={`lcs-toggle-switch ${settingsInteractiveShowLocalJoiner ? 'is-on' : ''}`}
                                    onClick={() => setSettingsInteractiveShowLocalJoiner(!settingsInteractiveShowLocalJoiner)}
                                    style={{ transform: 'scale(0.85)' }}
                                  >
                                    <div className="lcs-toggle-knob" />
                                  </div>
                                  <span style={{ fontSize: '11px', color: sublabelColor }}>Enable</span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <span style={{ fontSize: '11px', color: sublabelColor, width: '80px' }}>Auto Join:</span>
                                  <div 
                                    className={`lcs-toggle-switch ${settingsInteractiveAutoJoin ? 'is-on' : ''}`}
                                    onClick={() => setSettingsInteractiveAutoJoin(!settingsInteractiveAutoJoin)}
                                    style={{ transform: 'scale(0.85)' }}
                                  >
                                    <div className="lcs-toggle-knob" />
                                  </div>
                                  <span style={{ fontSize: '11px', color: sublabelColor }}>Enable</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : settingsAdvanceSubTab === 'sip' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                          {/* Card 1: SIP Registration */}
                          <div className="lcs-settings-advance-card" style={{ display: 'grid', gridTemplateColumns: '120px 1fr', padding: '12px 20px', gap: '16px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '120px' }}>
                              <span className="lcs-settings-label" style={{ fontWeight: 'bold', width: '120px', marginTop: '4px' }}>SIP registration:</span>
                              <span style={{ 
                                fontSize: '10px', 
                                fontWeight: 'bold', 
                                color: settingsSipRegister ? '#00e676' : '#a0aec0',
                                marginTop: '16px'
                              }}>
                                {settingsSipRegister ? 'Registered' : 'Unregistered'}
                              </span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              {/* Row 1: SIP Calls toggle & Register toggle */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <span style={{ fontSize: '11px', color: sublabelColor, width: '70px' }}>SIP Calls:</span>
                                  <div 
                                    className={`lcs-toggle-switch ${settingsSipCalls ? 'is-on' : ''}`}
                                    onClick={() => setSettingsSipCalls(!settingsSipCalls)}
                                    style={{ transform: 'scale(0.85)' }}
                                  >
                                    <div className="lcs-toggle-knob" />
                                  </div>
                                  <span style={{ fontSize: '11px', color: sublabelColor }}>Enable</span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <span style={{ fontSize: '11px', color: sublabelColor, width: '70px' }}>Register:</span>
                                  <div 
                                    className={`lcs-toggle-switch ${settingsSipRegister ? 'is-on' : ''}`}
                                    onClick={() => setSettingsSipRegister(!settingsSipRegister)}
                                    style={{ transform: 'scale(0.85)' }}
                                  >
                                    <div className="lcs-toggle-knob" />
                                  </div>
                                  <span style={{ fontSize: '11px', color: sublabelColor }}>Enable</span>
                                </div>
                              </div>

                              {/* Row 2: SIP Domain, SIP Server, SIP Port */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <span style={{ fontSize: '11px', color: sublabelColor, width: '80px' }}>SIP Domain:</span>
                                  <input 
                                    type="text" 
                                    className="lcs-settings-input" 
                                    style={{ width: '120px' }}
                                    value={settingsSipDomain}
                                    onChange={(e) => setSettingsSipDomain(e.target.value)}
                                  />
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <span style={{ fontSize: '11px', color: sublabelColor, width: '70px' }}>SIP Server:</span>
                                  <input 
                                    type="text" 
                                    className="lcs-settings-input" 
                                    style={{ width: '120px' }}
                                    value={settingsSipServer}
                                    onChange={(e) => setSettingsSipServer(e.target.value)}
                                  />
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <span style={{ fontSize: '11px', color: sublabelColor, width: '60px' }}>SIP Port:</span>
                                  <input 
                                    type="text" 
                                    className="lcs-settings-input" 
                                    style={{ width: '80px' }}
                                    value={settingsSipPort}
                                    onChange={(e) => setSettingsSipPort(e.target.value)}
                                  />
                                </div>
                              </div>

                              {/* Row 3: UserName, Password */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <span style={{ fontSize: '11px', color: sublabelColor, width: '80px' }}>UserName:</span>
                                  <input 
                                    type="text" 
                                    className="lcs-settings-input" 
                                    style={{ width: '120px' }}
                                    value={settingsSipUsername}
                                    onChange={(e) => setSettingsSipUsername(e.target.value)}
                                  />
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <span style={{ fontSize: '11px', color: sublabelColor, width: '70px' }}>Password:</span>
                                  <input 
                                    type="password" 
                                    className="lcs-settings-input" 
                                    style={{ width: '120px' }}
                                    value={settingsSipPassword}
                                    onChange={(e) => setSettingsSipPassword(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Card 2: NAT Route */}
                          <div className="lcs-settings-advance-card">
                            <div className="lcs-settings-row" style={{ borderBottom: 'none' }}>
                              <span className="lcs-settings-label" style={{ width: '120px' }}>NAT Route:</span>
                              <div 
                                className={`lcs-toggle-switch ${settingsSipNatRoute ? 'is-on' : ''}`}
                                onClick={() => setSettingsSipNatRoute(!settingsSipNatRoute)}
                                style={{ transform: 'scale(0.85)' }}
                              >
                                <div className="lcs-toggle-knob" />
                              </div>
                              <span style={{ fontSize: '11px', color: sublabelColor }}>Enable</span>
                            </div>
                          </div>

                          {/* Card 3: Transmission */}
                          <div className="lcs-settings-advance-card">
                            <div className="lcs-settings-row" style={{ borderBottom: 'none' }}>
                              <span className="lcs-settings-label" style={{ width: '120px' }}>Transmission:</span>
                              <div className="lcs-settings-options-group">
                                {['TCP', 'UDP'].map((opt) => {
                                  const isSelected = settingsSipTransmission === opt;
                                  return (
                                    <div 
                                      key={opt} 
                                      className="lcs-radio-item"
                                      onClick={() => setSettingsSipTransmission(opt)}
                                    >
                                      <div className={`lcs-radio-circle ${isSelected ? 'is-checked' : ''}`}>
                                        {isSelected && <div className="lcs-radio-dot" />}
                                      </div>
                                      <span>{opt}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          {/* Card 4: Video Output */}
                          <div className="lcs-settings-advance-card" style={{ overflow: 'visible' }}>
                            <div className="lcs-settings-row" style={{ borderBottom: 'none', display: 'flex', gap: '32px', overflow: 'visible' }}>
                              <span className="lcs-settings-label" style={{ width: '120px' }}>Video Output:</span>
                              
                              {/* Default Video Output Dropdown */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
                                <span style={{ fontSize: '11px', color: sublabelColor, width: '50px' }}>Default:</span>
                                <div 
                                  className="lcs-select-pill" 
                                  style={{ width: '140px', cursor: 'pointer' }}
                                  onClick={() => {
                                    setIsSipVideoOutputDropdownOpen(!isSipVideoOutputDropdownOpen);
                                    setIsSipVideoQualityDropdownOpen(false);
                                  }}
                                >
                                  <span>{settingsSipVideoOutput}</span>
                                  <span>▼</span>
                                </div>
                                {isSipVideoOutputDropdownOpen && (
                                  <div className="lcs-settings-dropdown-menu" style={{ top: '30px', left: '62px', width: '140px' }}>
                                    {['PGM', 'Lecture', 'Lecture2', 'Teacher_C', 'Student_C', 'Teacher_P', 'Student_P'].map(opt => (
                                      <div 
                                        key={opt}
                                        className={`lcs-settings-dropdown-item ${settingsSipVideoOutput === opt ? 'is-selected' : ''}`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSettingsSipVideoOutput(opt);
                                          setIsSipVideoOutputDropdownOpen(false);
                                          showToast(`Video Output Default set to ${opt}`);
                                        }}
                                      >
                                        {opt}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>

                              {/* Quality Output Dropdown */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
                                <span style={{ fontSize: '11px', color: sublabelColor, width: '50px' }}>Quality:</span>
                                <div 
                                  className="lcs-select-pill" 
                                  style={{ width: '120px', cursor: 'pointer' }}
                                  onClick={() => {
                                    setIsSipVideoQualityDropdownOpen(!isSipVideoQualityDropdownOpen);
                                    setIsSipVideoOutputDropdownOpen(false);
                                  }}
                                >
                                  <span>{settingsSipVideoQuality}</span>
                                  <span>▼</span>
                                </div>
                                {isSipVideoQualityDropdownOpen && (
                                  <div className="lcs-settings-dropdown-menu" style={{ top: '30px', left: '62px', width: '120px' }}>
                                    {['FHD', 'HD', 'SD'].map(opt => (
                                      <div 
                                        key={opt}
                                        className={`lcs-settings-dropdown-item ${settingsSipVideoQuality === opt ? 'is-selected' : ''}`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSettingsSipVideoQuality(opt);
                                          setIsSipVideoQualityDropdownOpen(false);
                                          showToast(`Video Quality set to ${opt}`);
                                        }}
                                      >
                                        {opt}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Card 5: Dual Stream */}
                          <div className="lcs-settings-advance-card">
                            <div className="lcs-settings-row" style={{ borderBottom: 'none' }}>
                              <span className="lcs-settings-label" style={{ width: '120px' }}>Dual Stream:</span>
                              <div 
                                className={`lcs-toggle-switch ${settingsSipDualStream ? 'is-on' : ''}`}
                                onClick={() => setSettingsSipDualStream(!settingsSipDualStream)}
                                style={{ transform: 'scale(0.85)' }}
                              >
                                <div className="lcs-toggle-knob" />
                              </div>
                              <span style={{ fontSize: '11px', color: sublabelColor }}>Enable</span>
                            </div>
                          </div>

                          {/* Card 6: PIP Layouts */}
                          <div className="lcs-settings-advance-card">
                            <div className="lcs-settings-row" style={{ borderBottom: 'none', display: 'flex', alignItems: 'center', gap: '16px' }}>
                              <span className="lcs-settings-label" style={{ width: '120px' }}>PIP:</span>
                              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                {/* Icon 1: Top-Right mini box */}
                                <div 
                                  onClick={() => setSettingsSipPipLayout(1)}
                                  style={{ 
                                    width: '32px', 
                                    height: '20px', 
                                    border: `1px solid ${settingsSipPipLayout === 1 ? '#00e676' : pipBorderColor}`, 
                                    borderRadius: '2px', 
                                    position: 'relative', 
                                    cursor: 'pointer',
                                    backgroundColor: settingsSipPipLayout === 1 ? 'rgba(0, 230, 118, 0.1)' : 'transparent'
                                  }}
                                >
                                  <div style={{ width: '10px', height: '6px', backgroundColor: settingsSipPipLayout === 1 ? '#00e676' : pipInnerBgColor, position: 'absolute', top: '2px', right: '2px' }} />
                                </div>

                                {/* Icon 2: Bottom-Right mini box */}
                                <div 
                                  onClick={() => setSettingsSipPipLayout(2)}
                                  style={{ 
                                    width: '32px', 
                                    height: '20px', 
                                    border: `1px solid ${settingsSipPipLayout === 2 ? '#00e676' : pipBorderColor}`, 
                                    borderRadius: '2px', 
                                    position: 'relative', 
                                    cursor: 'pointer',
                                    backgroundColor: settingsSipPipLayout === 2 ? 'rgba(0, 230, 118, 0.1)' : 'transparent'
                                  }}
                                >
                                  <div style={{ width: '10px', height: '6px', backgroundColor: settingsSipPipLayout === 2 ? '#00e676' : pipInnerBgColor, position: 'absolute', bottom: '2px', right: '2px' }} />
                                </div>

                                {/* Icon 3: Top-Left mini box */}
                                <div 
                                  onClick={() => setSettingsSipPipLayout(3)}
                                  style={{ 
                                    width: '32px', 
                                    height: '20px', 
                                    border: `1px solid ${settingsSipPipLayout === 3 ? '#00e676' : pipBorderColor}`, 
                                    borderRadius: '2px', 
                                    position: 'relative', 
                                    cursor: 'pointer',
                                    backgroundColor: settingsSipPipLayout === 3 ? 'rgba(0, 230, 118, 0.1)' : 'transparent'
                                  }}
                                >
                                  <div style={{ width: '10px', height: '6px', backgroundColor: settingsSipPipLayout === 3 ? '#00e676' : pipInnerBgColor, position: 'absolute', top: '2px', left: '2px' }} />
                                </div>

                                {/* Icon 4: Side by Side (Split with right colored green) */}
                                <div 
                                  onClick={() => setSettingsSipPipLayout(4)}
                                  style={{ 
                                    width: '32px', 
                                    height: '20px', 
                                    border: `1px solid ${settingsSipPipLayout === 4 ? '#00e676' : pipBorderColor}`, 
                                    borderRadius: '2px', 
                                    position: 'relative', 
                                    cursor: 'pointer',
                                    backgroundColor: 'transparent',
                                    overflow: 'hidden'
                                  }}
                                >
                                  <div style={{ width: '50%', height: '100%', backgroundColor: settingsSipPipLayout === 4 ? '#00e676' : pipSplitBgColor, position: 'absolute', right: 0, borderLeft: `1px solid ${pipSplitBgColor}` }} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="lcs-settings-row" style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', opacity: 0.7 }}>
                          <span style={{ fontSize: '12px' }}>{settingsAdvanceSubTab.toUpperCase()} Settings Panel (Coming Soon)</span>
                        </div>
                      )}
                    </div>
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
                {showAdvanceAuth && (
                    <>
                      <div 
                        className="lcs-auth-backdrop" 
                        onClick={() => {
                          setShowAdvanceAuth(false);
                          setActiveSettingsTab(previousSettingsTab);
                        }} 
                      />
                      
                      <div className="lcs-auth-dialog">
                        <button 
                          type="button" 
                          className="lcs-auth-close-btn"
                          onClick={() => {
                            setShowAdvanceAuth(false);
                            setActiveSettingsTab(previousSettingsTab);
                          }}
                        >
                          ✕
                        </button>
                        
                        <div className="lcs-auth-form">
                          <div 
                            className={`lcs-auth-input-wrapper ${authFocusedInput === 'account' ? 'is-focused' : ''}`}
                            onClick={() => setAuthFocusedInput('account')}
                          >
                            <input 
                              type="text" 
                              placeholder="Account" 
                              value={authAccount}
                              readOnly
                              className="lcs-auth-input"
                            />
                          </div>
                          
                          <div 
                            className={`lcs-auth-input-wrapper ${authFocusedInput === 'password' ? 'is-focused' : ''}`}
                            onClick={() => setAuthFocusedInput('password')}
                          >
                            <input 
                              type="password" 
                              placeholder="Password" 
                              value={authPassword ? '•'.repeat(authPassword.length) : ''}
                              readOnly
                              className="lcs-auth-input"
                            />
                          </div>
                          
                          {authError && (
                            <div className="lcs-auth-error-msg">
                              {authError}
                            </div>
                          )}
                          
                          <button 
                            type="button" 
                            className="lcs-auth-verify-btn"
                            onClick={handleAuthVerify}
                          >
                            Verify
                          </button>
                          

                        </div>
                      </div>
                      
                      <div className="lcs-virtual-keyboard">
                        <div className="lcs-kb-nav">
                          <button type="button" className="lcs-kb-nav-btn is-green">&lt;</button>
                          <div className="lcs-kb-display">
                            {authFocusedInput === 'account' ? (authAccount || 'Account') : (authPassword ? '•'.repeat(authPassword.length) : 'Password')}
                            <span className="lcs-kb-cursor" />
                          </div>
                          <button type="button" className="lcs-kb-nav-btn is-green">&gt;</button>
                        </div>
                        
                        <div className="lcs-kb-body">
                          <div className="lcs-kb-alphabet-section">
                            <div className="lcs-kb-row">
                              {['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'].map(k => (
                                <button 
                                  key={k} 
                                  type="button" 
                                  className="lcs-kb-key"
                                  onClick={() => handleKeyPress(isCaps ? k.toUpperCase() : k)}
                                >
                                  {isCaps ? k.toUpperCase() : k}
                                </button>
                              ))}
                            </div>
                            <div className="lcs-kb-row">
                              <div style={{ flex: 0.5 }} />
                              {['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'].map(k => (
                                <button 
                                  key={k} 
                                  type="button" 
                                  className="lcs-kb-key"
                                  onClick={() => handleKeyPress(isCaps ? k.toUpperCase() : k)}
                                >
                                  {isCaps ? k.toUpperCase() : k}
                                </button>
                              ))}
                              <div style={{ flex: 0.5 }} />
                            </div>
                            <div className="lcs-kb-row">
                              <button 
                                type="button" 
                                className={`lcs-kb-key is-wide is-caps ${isCaps ? 'is-active' : ''}`}
                                onClick={() => setIsCaps(!isCaps)}
                              >
                                CapsLock
                              </button>
                              {['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(k => (
                                <button 
                                  key={k} 
                                  type="button" 
                                  className="lcs-kb-key"
                                  onClick={() => handleKeyPress(isCaps ? k.toUpperCase() : k)}
                                >
                                  {isCaps ? k.toUpperCase() : k}
                                </button>
                              ))}
                              <button 
                                type="button" 
                                className="lcs-kb-key is-wide is-enter"
                                onClick={handleAuthVerify}
                              >
                                Enter
                              </button>
                            </div>
                            <div className="lcs-kb-row">
                              {['.', '@', ','].map(k => (
                                <button 
                                  key={k} 
                                  type="button" 
                                  className="lcs-kb-key"
                                  onClick={() => handleKeyPress(k)}
                                >
                                  {k}
                                </button>
                              ))}
                              <button 
                                type="button" 
                                className="lcs-kb-key is-space"
                                onClick={() => handleKeyPress(' ')}
                              >
                                Space
                              </button>
                              <button 
                                type="button" 
                                className="lcs-kb-key"
                                onClick={() => handleKeyPress('-')}
                              >
                                -
                              </button>
                              <button type="button" className="lcs-kb-key">EN/中</button>
                              <button 
                                type="button" 
                                className="lcs-kb-key is-backspace"
                                onClick={handleBackspace}
                              >
                                ⌫
                              </button>
                            </div>
                          </div>
                          
                          <div className="lcs-kb-divider" />
                          
                          <div className="lcs-kb-keypad-section">
                            <div className="lcs-kb-row">
                              {['1', '2', '3'].map(k => (
                                <button 
                                  key={k} 
                                  type="button" 
                                  className="lcs-kb-key"
                                  onClick={() => handleKeyPress(k)}
                                >
                                  {k}
                                </button>
                              ))}
                            </div>
                            <div className="lcs-kb-row">
                              {['4', '5', '6'].map(k => (
                                <button 
                                  key={k} 
                                  type="button" 
                                  className="lcs-kb-key"
                                  onClick={() => handleKeyPress(k)}
                                >
                                  {k}
                                </button>
                              ))}
                            </div>
                            <div className="lcs-kb-row">
                              {['7', '8', '9'].map(k => (
                                <button 
                                  key={k} 
                                  type="button" 
                                  className="lcs-kb-key"
                                  onClick={() => handleKeyPress(k)}
                                >
                                  {k}
                                </button>
                              ))}
                            </div>
                            <div className="lcs-kb-row">
                              <button 
                                type="button" 
                                className="lcs-kb-key is-zero"
                                onClick={() => handleKeyPress('0')}
                              >
                                0
                              </button>
                              <button 
                                type="button" 
                                className="lcs-kb-key"
                                onClick={() => handleKeyPress('.')}
                              >
                                .
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
              </div>
            )}

            {activeMenuSection === 'file' && (
              <div className={`lcs-full-file-overlay ${isFileFullscreen ? 'is-fullscreen' : ''}`}>
                {/* Left side: Video Player Column */}
                <div className="lcs-file-player-col">
                  <div className="lcs-file-player-header">
                    {playingFileName} Recording start:{playingFileStart}
                  </div>
                  
                  <div className="lcs-file-player-viewport">
                    {(filePlayerState === 'playing' || filePlayerState === 'paused') ? (
                      <img src={ch3TeacherClose} alt="Playback view" className="lcs-file-player-img" />
                    ) : null}
                    
                    {filePlayerState === 'loading' && (
                      <div className="lcs-file-player-loading">
                        <div className="lcs-spinner-ring" />
                        <span>Loading</span>
                      </div>
                    )}
                    
                    <button 
                      type="button" 
                      className="lcs-file-player-expand-btn"
                      onClick={() => setIsFileFullscreen(!isFileFullscreen)}
                    >
                      ↖↗ ↙↘
                    </button>
                  </div>

                  {/* Scrubber progress bar */}
                  <div className="lcs-file-player-scrubber-bar">
                    <div 
                      className="lcs-file-player-scrubber-line-container"
                      onMouseDown={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const updateTime = (clientX) => {
                          const clickX = Math.max(0, Math.min(clientX - rect.left, rect.width));
                          const clickPercent = clickX / rect.width;
                          const targetTime = Math.max(0, Math.min(14397, Math.floor(clickPercent * 14397)));
                          setFilePlaybackTime(targetTime);
                        };
                        updateTime(e.clientX);

                        const handleMouseMove = (moveEvent) => {
                          updateTime(moveEvent.clientX);
                        };

                        const handleMouseUp = () => {
                          document.removeEventListener('mousemove', handleMouseMove);
                          document.removeEventListener('mouseup', handleMouseUp);
                        };

                        document.addEventListener('mousemove', handleMouseMove);
                        document.addEventListener('mouseup', handleMouseUp);
                      }}
                    >
                      <div 
                        className="lcs-file-player-scrubber-line-fill" 
                        style={{ width: `${Math.min(100, (filePlaybackTime / 14397) * 100)}%` }} 
                      />
                      <div 
                        className="lcs-file-player-scrubber-handle" 
                        style={{ left: `${Math.min(100, (filePlaybackTime / 14397) * 100)}%` }} 
                      />
                    </div>
                    <div className="lcs-file-player-time-display">
                      {formatPlaybackTime(filePlaybackTime)}/3:59:57
                    </div>
                  </div>

                  {/* Control buttons footer */}
                  <div className="lcs-file-player-footer">
                    <button 
                      type="button" 
                      className="lcs-file-exit-btn"
                      onClick={() => {
                        setActiveMenuSection(null);
                        setIsFileFullscreen(false);
                      }}
                    >
                      Exit
                    </button>

                    <div className="lcs-file-controls-capsule">
                      {filePlayerState === 'playing' ? (
                        <button 
                          type="button" 
                          className="lcs-file-playpause-btn"
                          onClick={() => setFilePlayerState('paused')}
                        >
                          ⏸
                        </button>
                      ) : (
                        <button 
                          type="button" 
                          className="lcs-file-playpause-btn"
                          onClick={() => setFilePlayerState('playing')}
                        >
                          ▶
                        </button>
                      )}
                      
                      <button 
                        type="button" 
                        className="lcs-file-stop-btn"
                        onClick={() => {
                          setFilePlayerState('paused');
                          setFilePlaybackTime(0);
                        }}
                      >
                        ⏹
                      </button>
                    </div>
                    
                    <div style={{ width: '50px' }} />
                  </div>
                </div>

                {/* Right side: File List Column */}
                <div className="lcs-file-list-col">
                  {/* Top Storage Tabs */}
                  <div className="lcs-file-list-tabs">
                    <button 
                      type="button" 
                      className={`lcs-subnav-btn ${fileStorageTab === 'local' ? 'is-active' : ''}`}
                      onClick={() => setFileStorageTab('local')}
                    >
                      Local Storage
                    </button>
                    <button 
                      type="button" 
                      className={`lcs-subnav-btn ${fileStorageTab === 'mobile' ? 'is-active' : ''}`}
                      onClick={() => setFileStorageTab('mobile')}
                    >
                      Mobile Storage
                    </button>
                  </div>

                  {/* Operations bar */}
                  <div className="lcs-file-actions-bar">
                    <div className="lcs-file-action-btn-group">
                      <button type="button" className="lcs-subnav-btn" style={{ height: '24px', padding: '0 12px', fontSize: '10px' }}>
                        ↓ Download
                      </button>
                    </div>
                    <button type="button" className="lcs-subnav-btn" style={{ height: '24px', padding: '0 12px', fontSize: '10px' }}>
                      🗑 Delete
                    </button>
                  </div>

                  {/* Scrollable File List Container */}
                  <div className="lcs-file-list-container">
                    {fileStorageTab === 'local' ? (
                      files.map((item) => {
                        if (item.isActive) {
                          return (
                            <div key={item.id} className="lcs-file-detail-row">
                              <div className="lcs-file-detail-icon">🎞</div>
                              <div className="lcs-file-detail-content">
                                <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '11px', display: 'flex', justifyContent: 'space-between' }}>
                                  <span>{item.name}</span>
                                  <span style={{ color: '#00e676' }}>{item.size}</span>
                                </div>
                                <div>Recording start:{item.start}</div>
                                <div>Class time:{item.classTime}</div>
                                <div>Lectuer:{item.lecturer}</div>
                                <div>Theme:{item.theme}</div>
                              </div>
                            </div>
                          );
                        }

                        return (
                          <div key={item.id} className="lcs-file-table-row">
                            <div 
                              className={`lcs-checkbox-box ${item.checked ? 'is-checked' : ''}`}
                              style={{ cursor: 'pointer', transform: 'scale(0.85)' }}
                              onClick={() => {
                                setFiles(prev => prev.map(f => f.id === item.id ? { ...f, checked: !f.checked } : f));
                              }}
                            >
                              {item.checked && <span className="lcs-checkmark">✓</span>}
                            </div>
                            <span style={{ fontWeight: 'bold' }}>{item.name}</span>
                            <span style={{ color: '#a0aec0' }}>{item.size}</span>
                            <button 
                              type="button" 
                              className="lcs-file-play-icon-btn"
                              onClick={() => {
                                setPlayingFileName(item.name);
                                setPlayingFileStart(item.isActive ? item.start : '2026-07-11 10:00:00');
                                setFilePlayerState('loading');
                                setFilePlaybackTime(0);
                                setFiles(prev => prev.map(f => {
                                  if (f.id === item.id) {
                                    return { 
                                      ...f, 
                                      isActive: true, 
                                      start: '2026-07-11 10:00:00', 
                                      duration: '3:59:57', 
                                      classTime: '4:00:00', 
                                      lecturer: '', 
                                      theme: '' 
                                    };
                                  }
                                  return { ...f, isActive: false };
                                }));
                                setTimeout(() => {
                                  setFilePlayerState('playing');
                                }, 1500);
                              }}
                            >
                              ▶
                            </button>
                          </div>
                        );
                      })
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: sublabelColor, fontSize: '11px', opacity: 0.6 }}>
                        No mobile storage device connected.
                      </div>
                    )}
                  </div>

                  {/* Pagination Footer */}
                  <div className="lcs-file-pagination">
                    <button 
                      type="button" 
                      className="lcs-pagination-btn"
                      onClick={() => setFileActivePage(Math.max(1, fileActivePage - 1))}
                    >
                      &lt;&lt;
                    </button>
                    {[1, 2, 3, 4, 5].map((page) => (
                      <button 
                        key={page}
                        type="button" 
                        className={`lcs-pagination-btn ${fileActivePage === page ? 'is-active' : ''}`}
                        onClick={() => setFileActivePage(page)}
                      >
                        {page}
                      </button>
                    ))}
                    <button 
                      type="button" 
                      className="lcs-pagination-btn"
                      onClick={() => setFileActivePage(Math.min(5, fileActivePage + 1))}
                    >
                      &gt;&gt;
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeMenuSection === 'interactive' && (
              <div className="lcs-full-interactive-overlay">
                
                {/* Header bar */}
                <div className="lcs-interactive-header">
                  <div className="lcs-interactive-header-left">
                    <div className="lcs-user-avatar">
                      <User size={14} />
                    </div>
                    <span className="lcs-user-id">900011001</span>
                  </div>
                  
                  <div className="lcs-interactive-header-right">
                    <button 
                      type="button" 
                      className="lcs-interactive-header-icon" 
                      onClick={() => showToast("Syncing data...")}
                      title="Sync"
                    >
                      <RotateCw size={15} />
                    </button>
                    <button 
                      type="button" 
                      className="lcs-interactive-header-icon"
                      onClick={() => showToast("Camera settings")}
                      title="Camera"
                    >
                      <Video size={15} />
                    </button>
                    <button 
                      type="button" 
                      className="lcs-interactive-header-icon"
                      onClick={() => showToast("Transmission settings")}
                      title="Transmission"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '15px', height: '15px' }}>
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                        <polygon points="10 8 15 10 10 12 10 8" fill="currentColor" />
                      </svg>
                    </button>
                    <button 
                      type="button" 
                      className="lcs-interactive-header-icon close-btn"
                      onClick={() => {
                        setActiveMenuSection(null);
                        setShowSipCallModal(false);
                      }}
                      title="Close"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Sub-view Area */}
                {interactiveSubPage === 'home' && (
                  <div className="lcs-interactive-home">
                    {/* Top Action Buttons row */}
                    <div className="lcs-interactive-action-row">
                      <button 
                        type="button" 
                        className="lcs-interactive-action-btn"
                        onClick={() => setInteractiveSubPage('start')}
                      >
                        <div className="lcs-interactive-icon-box">
                          <Play size={16} fill="currentColor" />
                        </div>
                        <span className="lcs-interactive-btn-text">Start</span>
                      </button>

                      <button 
                        type="button" 
                        className="lcs-interactive-action-btn"
                        onClick={() => setInteractiveSubPage('join')}
                      >
                        <div className="lcs-interactive-icon-box">
                          <Plus size={16} />
                        </div>
                        <span className="lcs-interactive-btn-text">Join Class</span>
                      </button>

                      <button 
                        type="button" 
                        className="lcs-interactive-action-btn"
                        onClick={() => setShowSipCallModal(true)}
                      >
                        <div className="lcs-interactive-icon-box">
                          <Phone size={14} fill="currentColor" />
                        </div>
                        <span className="lcs-interactive-btn-text">Call</span>
                      </button>

                      <button 
                        type="button" 
                        className="lcs-interactive-action-btn"
                        onClick={() => showToast("Transmission mode activated")}
                      >
                        <div className="lcs-interactive-icon-box">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '16px', height: '16px' }}>
                            <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
                          </svg>
                        </div>
                        <span className="lcs-interactive-btn-text">Transmission mode</span>
                      </button>
                    </div>

                    {/* Left and Right Split Panels */}
                    <div className="lcs-interactive-panels">
                      {/* Left: Clock Card */}
                      <div className="lcs-interactive-card left-card">
                        <div className="lcs-interactive-clock">{interactiveTime}</div>
                        <div className="lcs-interactive-date">{interactiveDate}</div>
                        <div className="lcs-interactive-day">{interactiveDay}</div>
                      </div>

                      {/* Right: Illustration Card */}
                      <div className="lcs-interactive-card right-card">
                        <div className="lcs-interactive-classroom-container">
                          {/* SVG cartoon classroom illustration */}
                          <svg viewBox="0 0 320 180" className="w-full h-full">
                            {/* Wall background */}
                            <rect width="320" height="180" fill="#2d3748" opacity="0.3" />
                            
                            {/* Blackboard */}
                            <rect x="60" y="20" width="200" height="100" fill="#1b4d3e" rx="4" stroke="#4a5568" strokeWidth="3" />
                            
                            {/* Clock on left wall */}
                            <circle cx="35" cy="40" r="12" fill="#edf2f7" stroke="#4a5568" strokeWidth="1.5" />
                            <circle cx="35" cy="40" r="10" fill="none" stroke="#2d3748" strokeWidth="0.5" />
                            <line x1="35" y1="40" x2="35" y2="33" stroke="#2d3748" strokeWidth="1.2" strokeLinecap="round" />
                            <line x1="35" y1="40" x2="41" y2="40" stroke="#2d3748" strokeWidth="1" strokeLinecap="round" />
                            
                            {/* Teacher character drawing */}
                            <g transform="translate(160, 110)">
                              {/* Teacher Body / Dress (turquoise blue) */}
                              <path d="M-12,30 C-12,5 -6,2 0,2 C6,2 12,5 12,30 Z" fill="#319795" />
                              
                              {/* Neck */}
                              <rect x="-3" y="-5" width="6" height="8" fill="#fbd38d" />
                              
                              {/* Head / Face */}
                              <circle cx="0" cy="-12" r="10" fill="#fbd38d" />
                              
                              {/* Orange hair */}
                              <path d="M-11,-15 C-11,-25 11,-25 11,-15 C11,-8 8,-8 8,-12 C8,-15 -8,-15 -8,-12 C-8,-8 -11,-8 -11,-15 Z" fill="#dd6b20" />
                              {/* Hair back bob */}
                              <path d="M-10,-5 C-13,-5 -12,-15 -9,-15 C-9,-15 9,-15 9,-15 C12,-15 13,-5 10,-5 Z" fill="#dd6b20" />
                              
                              {/* Glasses */}
                              <rect x="-6" y="-14" width="5" height="4" fill="none" stroke="#e53e3e" strokeWidth="1" rx="1" />
                              <rect x="1" y="-14" width="5" height="4" fill="none" stroke="#e53e3e" strokeWidth="1" rx="1" />
                              <line x1="-1" y1="-12" x2="1" y2="-12" stroke="#e53e3e" strokeWidth="1" />
                              
                              {/* Smile */}
                              <path d="M-3,-7 Q0,-5 3,-7" fill="none" stroke="#2d3748" strokeWidth="1" strokeLinecap="round" />
                              
                              {/* Eyes */}
                              <circle cx="-3.5" cy="-12" r="1" fill="#2d3748" />
                              <circle cx="3.5" cy="-12" r="1" fill="#2d3748" />
                            </g>

                            {/* Podium (light grey) */}
                            <path d="M135,120 L185,120 L180,165 L140,165 Z" fill="#cbd5e0" stroke="#718096" strokeWidth="1.5" />
                            <rect x="133" y="115" width="54" height="6" fill="#e2e8f0" rx="1" stroke="#718096" strokeWidth="1" />

                            {/* Floor line */}
                            <line x1="10" y1="165" x2="310" y2="165" stroke="#cbd5e0" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Start sub-page */}
                {interactiveSubPage === 'start' && interactiveCallState === 'idle' && (
                  <div className="lcs-interactive-subpage-layout">
                    {/* Left: Start control panel */}
                    <div className="lcs-interactive-subpage-left">
                      <div className="lcs-interactive-subpage-title">Start</div>
                      
                      <div className="lcs-interactive-circle-container">
                        <button 
                          type="button" 
                          className={`lcs-interactive-big-circle-btn ${isInteractiveSessionActive ? 'is-active' : ''}`}
                          onClick={() => {
                            const selected = addressBook.find(addr => addr.checked);
                            const hostName = selected ? selected.name : 'Shanghai Campus - Room 101';
                            setSelectedRemoteHost(hostName);
                            setInteractiveCallState('entering');
                            setIsInteractiveSessionActive(true);
                            setIsDirectorMinimized(false);
                          }}
                        >
                          <span className="lcs-circle-btn-text">Start</span>
                        </button>
                      </div>

                      <button 
                        type="button" 
                        className="lcs-interactive-back-btn"
                        onClick={() => setInteractiveSubPage('home')}
                      >
                        Back
                      </button>
                    </div>

                    {/* Right: Address Book list */}
                    <div className="lcs-interactive-subpage-right">
                      <div className="lcs-interactive-subpage-right-title">Address Book</div>
                      
                      <div className="lcs-interactive-address-list">
                        {addressBook.map((item, idx) => (
                          <div 
                            key={item.id || idx} 
                            className="lcs-interactive-address-row"
                            onClick={() => {
                              setAddressBook(prev => prev.map(addr => addr.id === item.id ? { ...addr, checked: !addr.checked } : addr));
                            }}
                          >
                            <div className={`lcs-interactive-checkbox ${item.checked ? 'is-checked' : ''}`}>
                              {item.checked && <span className="lcs-checkmark">✓</span>}
                            </div>
                            <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                              <span className={`lcs-status-dot ${item.status === 'online' ? 'is-online' : 'is-offline'}`} />
                              <span className={`lcs-address-name ${item.status === 'online' ? 'is-online-text' : 'is-offline-text'}`}>
                                {item.name}
                              </span>
                            </div>
                            <span className={`lcs-address-status ${item.status === 'online' ? 'is-online' : 'is-offline'}`}>
                              {item.status === 'online' ? 'Online' : 'Offline'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Entering modal over start subpage */}
                {interactiveSubPage === 'start' && interactiveCallState === 'entering' && (
                  <div className="lcs-interactive-subpage-layout relative" style={{ position: 'relative' }}>
                    {/* Background layout visible under modal */}
                    <div className="lcs-interactive-subpage-left" style={{ opacity: 0.4 }}>
                      <div className="lcs-interactive-subpage-title">Start</div>
                      <div className="lcs-interactive-circle-container">
                        <button type="button" className="lcs-interactive-big-circle-btn">
                          <span className="lcs-circle-btn-text">Start</span>
                        </button>
                      </div>
                      <button type="button" className="lcs-interactive-back-btn">Back</button>
                    </div>
                    <div className="lcs-interactive-subpage-right" style={{ opacity: 0.4 }}>
                      <div className="lcs-interactive-subpage-right-title">Address Book</div>
                      <div className="lcs-interactive-address-list">
                        {addressBook.map((item, idx) => (
                          <div key={item.id || idx} className="lcs-interactive-address-row">
                            <div className={`lcs-interactive-checkbox ${item.checked ? 'is-checked' : ''}`}>
                              {item.checked && <span className="lcs-checkmark">✓</span>}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                              <span className={`lcs-status-dot ${item.status === 'online' ? 'is-online' : 'is-offline'}`} />
                              <span className="lcs-address-name">{item.name}</span>
                            </div>
                            <span className="lcs-address-status">Online</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Entering Modal Overlay */}
                    <div className="lcs-entering-modal-backdrop">
                      <div className="lcs-entering-modal-card">
                        <div className="lcs-entering-spinner-box">
                          <div className="lcs-entering-spinner" />
                        </div>
                        <div className="lcs-entering-text">Entering</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Active Interactive Room View (Loading & Connected Classroom) */}
                {(interactiveCallState === 'room_loading' || interactiveCallState === 'room_active') && !isDirectorMinimized && (
                  <div className="lcs-interactive-room-fullscreen">
                    {/* Top Toast notification */}
                    {showMicToast && (
                      <div className="lcs-room-mic-toast">
                        <div className="lcs-mic-toast-icon">✓</div>
                        <span className="lcs-mic-toast-text">Microphone turned on</span>
                        <button type="button" className="lcs-mic-toast-close" onClick={() => setShowMicToast(false)}>✕</button>
                      </div>
                    )}

                    {/* Top Left Host Tag */}
                    <div className="lcs-room-top-tag">
                      <Mic size={13} style={{ color: '#fff' }} />
                      <span>900011001 {isRemoteClassroomView ? mainClassroomHost : selectedRemoteHost}</span>
                    </div>

                    {/* Center Area: Loading wave vs Classroom Video Feed */}
                    {interactiveCallState === 'room_loading' ? (
                      <div className="lcs-room-loading-center">
                        <div className="lcs-room-loading-circle-icon">
                          <div className="lcs-room-loading-inner-wave" />
                        </div>
                        <div className="lcs-room-loading-label">Loading</div>
                      </div>
                    ) : (
                      <div className="lcs-room-video-container">
                        <img 
                          src={
                            isRemoteClassroomView ? (
                              selectedPgmSource === 'Lecture' ? ch1Ppt :
                              selectedPgmSource === 'Lecture2' ? ch2DocCam :
                              selectedPgmSource === 'Teacher_C' ? ch3TeacherClose :
                              selectedPgmSource === 'Student_C' ? ch4StudentClose :
                              selectedPgmSource === 'Student_P' ? ch6StudentPano :
                              ch7Remote
                            ) : ch7Remote
                          } 
                          alt="Classroom feed" 
                          className="lcs-room-video-img" 
                        />
                        
                        {/* Bottom Text Overlay */}
                        <div className="lcs-room-speaker-caption">
                          <span>let's wait for the speaker</span>
                        </div>
                      </div>
                    )}

                    {/* Bottom Control Bar */}
                    <div className="lcs-room-bottom-bar">
                      <div className="lcs-room-bar-left">
                        <button 
                          type="button" 
                          className="lcs-room-director-badge"
                          onClick={() => {
                            setIsDirectorMinimized(true);
                            setActiveMenuSection(null);
                            showToast("Returned to Director View");
                          }}
                          style={{ cursor: 'pointer', border: 'none', outline: 'none' }}
                          title="Switch back to Director View"
                        >
                          Director
                        </button>
                        <span className="lcs-room-bar-text">ID:9000111698</span>
                        <span className="lcs-room-bar-text">Password:605364</span>
                        <span className="lcs-room-bar-text">Teacher:900011004</span>
                      </div>

                      <div className="lcs-room-bar-center">
                        <button type="button" className="lcs-room-page-arrow">&lt;</button>
                        <span className="lcs-room-page-num">1/1</span>
                        <button type="button" className="lcs-room-page-arrow">&gt;</button>
                      </div>

                      <div className="lcs-room-bar-right">
                        <div className="lcs-room-pgm-wrapper" style={{ position: 'relative' }}>
                          {isPgmDropdownOpen && (
                            <div className="lcs-room-pgm-menu">
                              {[
                                { id: 'PGM', label: 'PGM' },
                                { id: 'Lecture', label: 'Lecture' },
                                { id: 'Lecture2', label: 'Lecture2' },
                                { id: 'Teacher_C', label: 'Teacher_C' },
                                { id: 'Student_C', label: 'Student_C' },
                                { id: 'Teacher_P', label: 'Teacher_P' },
                                { id: 'Student_P', label: 'Student_P' },
                              ].map(opt => (
                                <div 
                                  key={opt.id}
                                  className={`lcs-room-pgm-item ${selectedPgmSource === opt.id ? 'is-selected' : ''}`}
                                  onClick={() => {
                                    setSelectedPgmSource(opt.id);
                                    setIsPgmDropdownOpen(false);
                                  }}
                                >
                                  {opt.label}
                                </div>
                              ))}
                            </div>
                          )}

                          <button 
                            type="button"
                            className="lcs-room-pgm-dropdown"
                            onClick={() => setIsPgmDropdownOpen(!isPgmDropdownOpen)}
                            style={{ cursor: 'pointer', background: 'transparent', border: 'none', color: 'inherit' }}
                          >
                            <span style={{ color: selectedPgmSource !== 'PGM' ? '#22c55e' : '#ffffff', fontWeight: 'bold' }}>
                              {selectedPgmSource}
                            </span>
                            <span style={{ fontSize: '10px', marginLeft: '4px' }}>▲</span>
                          </button>
                        </div>

                        <button 
                          type="button" 
                          className={`lcs-room-mic-btn ${showMicToast ? 'is-on' : ''}`}
                          onClick={() => {
                            setShowMicToast(!showMicToast);
                            showToast(showMicToast ? "Microphone turned off" : "Microphone turned on");
                          }}
                        >
                          <Mic size={15} />
                        </button>

                        <button 
                          type="button" 
                          className="lcs-room-invite-btn"
                          onClick={() => showToast("Invite sent")}
                        >
                          Invite
                        </button>

                        <button 
                          type="button" 
                          className="lcs-room-exit-btn"
                          onClick={() => {
                            setInteractiveCallState('idle');
                            setIsInteractiveSessionActive(false);
                            showToast("Exited interactive room");
                          }}
                        >
                          Exit
                        </button>
                      </div>
                    </div>
                  </div>
                )}


                {/* Join Class sub-page */}
                {interactiveSubPage === 'join' && (
                  <div className="lcs-interactive-subpage-layout">
                    {/* Left: Join Class Form */}
                    <div className="lcs-interactive-subpage-left">
                      <div className="lcs-interactive-subpage-title">Join Class</div>
                      
                      <div className="lcs-interactive-form">
                        <div className="lcs-interactive-form-field">
                          <label>ID:</label>
                          <input 
                            type="text" 
                            className="lcs-interactive-input"
                            value={joinClassId}
                            onChange={(e) => setJoinClassId(e.target.value)}
                            placeholder="Enter Class ID"
                          />
                        </div>

                        <div className="lcs-interactive-form-field">
                          <label>Password:</label>
                          <input 
                            type="password" 
                            className="lcs-interactive-input"
                            value={joinClassPassword}
                            onChange={(e) => setJoinClassPassword(e.target.value)}
                            placeholder="Enter Password"
                          />
                        </div>

                        <button 
                          type="button" 
                          className="lcs-interactive-submit-btn"
                          onClick={() => {
                            if (!joinClassId) {
                              showToast("Please enter a Class ID");
                            } else {
                              showToast(`Joining Class ${joinClassId}...`);
                            }
                          }}
                        >
                          Join Class
                        </button>
                      </div>

                      <button 
                        type="button" 
                        className="lcs-interactive-back-btn"
                        onClick={() => setInteractiveSubPage('home')}
                      >
                        Back
                      </button>
                    </div>

                    {/* Right: Schedule page */}
                    <div className="lcs-interactive-subpage-right">
                      <div className="lcs-interactive-subpage-right-title">Schedule</div>
                      
                      <div className="lcs-interactive-schedule-panel">
                        {/* Empty/Black panel with pagination dots */}
                        <div className="flex-1" />
                        
                        <div className="lcs-interactive-schedule-dots">
                          {Array.from({ length: 10 }).map((_, i) => (
                            <span key={i} className={`lcs-schedule-dot ${i === 0 ? 'is-active' : ''}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SIP Call modal overlay */}
                {showSipCallModal && (
                  <div className="lcs-interactive-modal-backdrop">
                    <div className="lcs-interactive-modal-box">
                      <div className="lcs-interactive-modal-header">
                        <span className="lcs-modal-title">SIP Call</span>
                        <button 
                          type="button" 
                          className="lcs-modal-close-x"
                          onClick={() => setShowSipCallModal(false)}
                        >
                          ✕
                        </button>
                      </div>

                      <div className="lcs-interactive-modal-body">
                        <div className="lcs-interactive-modal-field">
                          <label>UserName:</label>
                          <input 
                            type="text" 
                            className="lcs-interactive-input"
                            value={sipUserName}
                            onChange={(e) => setSipUserName(e.target.value)}
                            placeholder="Enter Username"
                            autoFocus
                          />
                        </div>

                        <button 
                          type="button" 
                          className="lcs-interactive-submit-btn"
                          onClick={() => {
                            if (!sipUserName) {
                              showToast("Please enter a username");
                            } else {
                              showToast(`Calling ${sipUserName}...`);
                              setShowSipCallModal(false);
                            }
                          }}
                        >
                          Call
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>

        </div>

        {/* Bezel Bottom Brushed Metal Bar with LEDs */}
        <div className="lcs-hardware-bottom-bezel">
          <div className="lcs-bezel-leds">
            <div className={`lcs-bezel-led red ${isRecording ? 'is-flashing' : 'is-solid'}`} />
            <div className={`lcs-bezel-led blue ${isLive ? 'is-flashing' : 'is-solid'}`} />
          </div>
        </div>

      </div>

    </div>
  );
}
