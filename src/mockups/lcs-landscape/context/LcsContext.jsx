/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import classroomFeed from '../../../assets/classroom_feed.png';
import ch1Ppt from '../../../assets/ch1_ppt.png';
import ch2DocCam from '../../../assets/ch2_doc_cam.png';
import ch3TeacherClose from '../../../assets/ch3_teacher_close.png';
import ch4StudentClose from '../../../assets/ch4_student_close.png';
import ch6StudentPano from '../../../assets/ch4_student_panoprama.png';
import ch7Remote from '../../../assets/ch7_remote_classroom.png';

const LcsContext = createContext(null);

export function useLcs() {
  const context = useContext(LcsContext);
  if (!context) {
    throw new Error('useLcs must be used within an LcsProvider');
  }
  return context;
}

export function LcsProvider({ children }) {
  const isRemoteClassroomView = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('mode') === 'remote_classroom';
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light'
  const [isLocked, setIsLocked] = useState(false);

  // Interactive States
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  
  const urlSearch = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const initialSection = urlSearch?.get('section') || (urlSearch?.get('mode') === 'discussion' ? 'interactive' : null);
  const initialSessionType = urlSearch?.get('mode') === 'discussion' ? 'discussion' : 'standard';
  const initialSubPage = urlSearch?.get('page') || ((urlSearch?.get('mode') === 'discussion' || urlSearch?.get('page') === 'start') ? 'start' : 'home');

  // Interactive UI overlay states
  const [interactiveSessionType, setInteractiveSessionType] = useState(initialSessionType); // 'standard' | 'discussion'
  const [interactiveSubPage, setInteractiveSubPage] = useState(initialSubPage); // 'home' | 'start' | 'join'
  const [showSipCallModal, setShowSipCallModal] = useState(false);
  const [sipUserName, setSipUserName] = useState('');
  const [joinClassId, setJoinClassId] = useState('');
  const [joinClassPassword, setJoinClassPassword] = useState('');
  const [isInteractiveSessionActive, setIsInteractiveSessionActive] = useState(false);
  const [addressBook, setAddressBook] = useState([
    { id: 'addr1', name: 'Shanghai Campus - Room 101', status: 'online', checked: true, micOn: true, cameraOn: true },
    { id: 'addr2', name: 'Beijing Campus - Room 201', status: 'online', checked: false, micOn: true, cameraOn: false },
    { id: 'addr3', name: 'Guangzhou Campus - Class A', status: 'online', checked: true, micOn: true, cameraOn: true },
    { id: 'addr4', name: 'Shenzhen Branch - Room 302', status: 'online', checked: false, micOn: true, cameraOn: true },
    { id: 'addr5', name: 'Singapore Campus - Remote Room', status: 'offline', checked: false, micOn: false, cameraOn: false },
    { id: 'addr6', name: 'London Branch - Int\'l Room', status: 'offline', checked: false, micOn: false, cameraOn: false },
  ]);

  // Discussion Mode states (Photos 1, 3, 4, 5)
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteSelectedIds, setInviteSelectedIds] = useState([]);
  const [isSharingActive, setIsSharingActive] = useState(false);
  const [discussionPgmSource, setDiscussionPgmSource] = useState('PGM');
  const [isDiscussionPgmDropdownOpen, setIsDiscussionPgmDropdownOpen] = useState(false);
  const [isDiscussionMicOn, setIsDiscussionMicOn] = useState(true);

  const [interactiveCallState, setInteractiveCallState] = useState('idle'); // 'idle' | 'entering' | 'room_loading' | 'room_active' | 'discussion_active'
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
  const [pipPosition, setPipPosition] = useState('top-right'); // 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  const [pipSize, setPipSize] = useState('xlarge'); // 'xlarge' (超大) | 'large' (大) | 'medium' (中) | 'small' (小)
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

  const handleOpenLevel1 = (layoutId) => {
    setCurrentLayout(layoutId);
    setLevel1TargetLayout(layoutId);
    setLevel1ModalOpen(true);
    setLevel2TargetSlot(null);
  };

  // Handle right-side channel click to update Main Channel slot in active layout
  const handleSelectRightChannel = (channelId) => {
    setSelectedChannel(channelId);
    
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
        if (interactiveSessionType === 'discussion') {
          setInteractiveCallState('discussion_active');
        } else {
          setInteractiveCallState('room_loading');
        }
        setShowMicToast(true);
      }, 1400);
    } else if (interactiveCallState === 'room_loading') {
      timer = setTimeout(() => {
        setInteractiveCallState('room_active');
      }, 1600);
    }
    return () => clearTimeout(timer);
  }, [interactiveCallState, interactiveSessionType]);

  // Cross-tab Real-time BroadcastChannel Synchronization
  useEffect(() => {
    let bc;
    try {
      bc = new BroadcastChannel('lcs_main_remote_sync');
    } catch {
      return;
    }

    if (isRemoteClassroomView) {
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
          if (payload.discussionPgmSource !== undefined) setDiscussionPgmSource(payload.discussionPgmSource);
          if (payload.pipPosition !== undefined) setPipPosition(payload.pipPosition);
          if (payload.pipSize !== undefined) setPipSize(payload.pipSize);
        }
      };

      bc.postMessage({ type: 'REQUEST_SYNC' });
    } else {
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
              selectedPgmSource,
              discussionPgmSource,
              pipPosition,
              pipSize
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
    selectedPgmSource,
    discussionPgmSource,
    pipPosition,
    pipSize
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
          selectedPgmSource,
          discussionPgmSource,
          pipPosition,
          pipSize
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
    selectedPgmSource,
    discussionPgmSource,
    pipPosition,
    pipSize
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
  const [activeMenuSection, setActiveMenuSection] = useState(initialSection); // 'set' | 'file' | 'ptz' | 'power' | 'interactive' | null

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
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2000);
    return () => clearTimeout(timer);
  };

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
          const delta = Math.floor(Math.random() * 21) - 10;
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
    const timeVal = now.toTimeString().split(' ')[0];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayVal = dayNames[now.getDay()];
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();
    const dateVal = `${dd}-${mm}-${yyyy}`;
    return { timeVal, dateVal, dayVal };
  };
  const { timeVal: interactiveTime, dateVal: interactiveDate, dayVal: interactiveDay } = getInteractiveTimeParts();

  const value = {
    isRemoteClassroomView,
    theme, setTheme,
    isLocked, setIsLocked,
    isRecording, setIsRecording,
    isPaused, setIsPaused,
    recordSeconds, setRecordSeconds,
    interactiveSessionType, setInteractiveSessionType,
    interactiveSubPage, setInteractiveSubPage,
    showSipCallModal, setShowSipCallModal,
    sipUserName, setSipUserName,
    joinClassId, setJoinClassId,
    joinClassPassword, setJoinClassPassword,
    isInteractiveSessionActive, setIsInteractiveSessionActive,
    addressBook, setAddressBook,
    showMembersModal, setShowMembersModal,
    showInviteModal, setShowInviteModal,
    inviteSelectedIds, setInviteSelectedIds,
    isSharingActive, setIsSharingActive,
    discussionPgmSource, setDiscussionPgmSource,
    isDiscussionPgmDropdownOpen, setIsDiscussionPgmDropdownOpen,
    isDiscussionMicOn, setIsDiscussionMicOn,
    interactiveCallState, setInteractiveCallState,
    selectedRemoteHost, setSelectedRemoteHost,
    mainClassroomHost,
    showMicToast, setShowMicToast,
    isDirectorMinimized, setIsDirectorMinimized,
    isPgmDropdownOpen, setIsPgmDropdownOpen,
    selectedPgmSource, setSelectedPgmSource,
    level1ModalOpen, setLevel1ModalOpen,
    level1TargetLayout, setLevel1TargetLayout,
    level2TargetSlot, setLevel2TargetSlot,
    pipPosition, setPipPosition,
    pipSize, setPipSize,
    levelInteractionRef,
    handleOpenLevel1,
    handleLayoutDoubleClick,
    lockScreenTime, setLockScreenTime,
    isLockScreenDropdownOpen, setIsLockScreenDropdownOpen,
    timeFormat, setTimeFormat,
    isTimeFormatDropdownOpen, setIsTimeFormatDropdownOpen,
    hourFormat, setHourFormat,
    isHourFormatDropdownOpen, setIsHourFormatDropdownOpen,
    pingAddress, setPingAddress,
    pingConsoleLines, setPingConsoleLines,
    isPinging, setIsPinging,
    versionDetectState, setVersionDetectState,
    settingsChannelConfigs, setSettingsChannelConfigs,
    updateChannelConfig,
    isLive, setIsLive,
    selectedChannel, setSelectedChannel,
    micLevel, setMicLevel,
    isMuted, setIsMuted,
    isLayoutBarOpen, setIsLayoutBarOpen,
    currentLayout, setCurrentLayout,
    directorMode, setDirectorMode,
    isChannelSelectOpen, setIsChannelSelectOpen,
    selectedLayoutToEdit, setSelectedLayoutToEdit,
    activeEditSlot, setActiveEditSlot,
    layoutChannels, setLayoutChannels,
    handleSelectRightChannel,
    layoutSlotConfigs,
    timeString, setTimeString,
    isSettingsOpen, setIsSettingsOpen,
    remainingHours, setRemainingHours,
    isMenuOpen, setIsMenuOpen,
    activeMenuSection, setActiveMenuSection,
    settingsLanguage, setSettingsLanguage,
    settingsPowerBoot, setSettingsPowerBoot,
    settingsAlarms, setSettingsAlarms,
    settingsOthers, setSettingsOthers,
    activeSettingsTab, setActiveSettingsTab,
    settingsRecordStrategy, setSettingsRecordStrategy,
    settingsNetworkSubTab, setSettingsNetworkSubTab,
    settingsNetworkDhcp, setSettingsNetworkDhcp,
    settingsNetworkIp, setSettingsNetworkIp,
    settingsNetworkMask, setSettingsNetworkMask,
    settingsNetworkGateway, setSettingsNetworkGateway,
    settingsNetworkDns, setSettingsNetworkDns,
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
    settingsChannelActive, setSettingsChannelActive,
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
    settingsSipPipLayout, setSettingsSipPipLayout,
    fileStorageTab, setFileStorageTab,
    filePlayerState, setFilePlayerState,
    filePlaybackTime, setFilePlaybackTime,
    fileActivePage, setFileActivePage,
    files, setFiles,
    playingFileName, setPlayingFileName,
    playingFileStart, setPlayingFileStart,
    isFileFullscreen, setIsFileFullscreen,
    ptzActiveChannel, setPtzActiveChannel,
    ptzSpeed, setPtzSpeed,
    ptzPresetMode, setPtzPresetMode,
    toastMessage, setToastMessage,
    showToast,
    powerActionConfirm, setPowerActionConfirm,
    isSystemShutdown, setIsSystemShutdown,
    isSystemRestarting, setIsSystemRestarting,
    isSystemLoggingOut, setIsSystemLoggingOut,
    sublabelColor,
    pipBorderColor,
    pipInnerBgColor,
    pipSplitBgColor,
    groupHeaderColor,
    groupHeaderBorder,
    isAdvanceVerified, setIsAdvanceVerified,
    showAdvanceAuth, setShowAdvanceAuth,
    previousSettingsTab, setPreviousSettingsTab,
    authAccount, setAuthAccount,
    authPassword, setAuthPassword,
    authFocusedInput, setAuthFocusedInput,
    authError, setAuthError,
    isCaps, setIsCaps,
    handleSettingsTabChange,
    handleKeyPress,
    handleBackspace,
    handleAuthVerify,
    handleStartPing,
    handleClearPing,
    handleVersionCheck,
    displayTab,
    handleRecordToggle,
    handlePauseToggle,
    formatTime,
    formatPlaybackTime,
    channelImages,
    channels,
    interactiveTime,
    interactiveDate,
    interactiveDay
  };

  return (
    <LcsContext.Provider value={value}>
      {children}
    </LcsContext.Provider>
  );
}
