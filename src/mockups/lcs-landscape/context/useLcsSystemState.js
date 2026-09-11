import { useState, useEffect } from 'react';

export function useLcsSystemState({ initialSection }) {
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light'
  const [isLocked, setIsLocked] = useState(false);

  // Top Bar Dropdowns & Clock formats
  const [lockScreenTime, setLockScreenTime] = useState('2minute');
  const [isLockScreenDropdownOpen, setIsLockScreenDropdownOpen] = useState(false);
  const [timeFormat, setTimeFormat] = useState('DD-MM-YYYY');
  const [isTimeFormatDropdownOpen, setIsTimeFormatDropdownOpen] = useState(false);
  const [hourFormat, setHourFormat] = useState('24 Hours Format');
  const [isHourFormatDropdownOpen, setIsHourFormatDropdownOpen] = useState(false);

  // Time clock string
  const [timeString, setTimeString] = useState('10-07-2026 17:24:29');

  // Menu & Section
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenuSection, setActiveMenuSection] = useState(initialSection); // 'set' | 'file' | 'ptz' | 'power' | 'interactive' | null

  // Global Toast
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2000);
    return () => clearTimeout(timer);
  };

  // Power actions
  const [powerActionConfirm, setPowerActionConfirm] = useState(null); // null | 'restart' | 'shutdown' | 'logout'
  const [isSystemShutdown, setIsSystemShutdown] = useState(false);
  const [isSystemRestarting, setIsSystemRestarting] = useState(false);
  const [isSystemLoggingOut, setIsSystemLoggingOut] = useState(false);

  // PTZ camera controls
  const [ptzActiveChannel, setPtzActiveChannel] = useState('ch3'); // 'ch3' | 'ch4' | 'ch5' | 'ch6'
  const [ptzSpeed, setPtzSpeed] = useState(4); // 1 to 8
  const [ptzPresetMode, setPtzPresetMode] = useState('call'); // 'set' | 'call'

  // File Manager & Player
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

  const formatPlaybackTime = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Clock tick timer
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

  // File playback timer
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

  // Loading simulation when opening File Overlay
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

  // Theme-derived style values
  const sublabelColor = theme === 'light' ? '#1f2937' : '#cbd5e0';
  const pipBorderColor = theme === 'light' ? '#94a3b8' : 'rgba(255,255,255,0.4)';
  const pipInnerBgColor = theme === 'light' ? '#64748b' : '#cbd5e0';
  const pipSplitBgColor = theme === 'light' ? '#94a3b8' : 'rgba(255,255,255,0.2)';
  const groupHeaderColor = theme === 'light' ? '#1f2937' : '#fff';
  const groupHeaderBorder = theme === 'light' ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.05)';

  return {
    theme, setTheme,
    isLocked, setIsLocked,
    lockScreenTime, setLockScreenTime,
    isLockScreenDropdownOpen, setIsLockScreenDropdownOpen,
    timeFormat, setTimeFormat,
    isTimeFormatDropdownOpen, setIsTimeFormatDropdownOpen,
    hourFormat, setHourFormat,
    isHourFormatDropdownOpen, setIsHourFormatDropdownOpen,
    timeString, setTimeString,
    isMenuOpen, setIsMenuOpen,
    activeMenuSection, setActiveMenuSection,
    toastMessage, setToastMessage,
    showToast,
    powerActionConfirm, setPowerActionConfirm,
    isSystemShutdown, setIsSystemShutdown,
    isSystemRestarting, setIsSystemRestarting,
    isSystemLoggingOut, setIsSystemLoggingOut,
    ptzActiveChannel, setPtzActiveChannel,
    ptzSpeed, setPtzSpeed,
    ptzPresetMode, setPtzPresetMode,
    fileStorageTab, setFileStorageTab,
    filePlayerState, setFilePlayerState,
    filePlaybackTime, setFilePlaybackTime,
    fileActivePage, setFileActivePage,
    files, setFiles,
    playingFileName, setPlayingFileName,
    playingFileStart, setPlayingFileStart,
    isFileFullscreen, setIsFileFullscreen,
    formatPlaybackTime,
    sublabelColor,
    pipBorderColor,
    pipInnerBgColor,
    pipSplitBgColor,
    groupHeaderColor,
    groupHeaderBorder
  };
}
