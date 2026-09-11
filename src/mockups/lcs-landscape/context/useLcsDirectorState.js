import { useState, useEffect, useRef } from 'react';
import classroomFeed from '../../../assets/classroom_feed.png';
import ch1Ppt from '../../../assets/ch1_ppt.png';
import ch2DocCam from '../../../assets/ch2_doc_cam.png';
import ch3TeacherClose from '../../../assets/ch3_teacher_close.png';
import ch4StudentClose from '../../../assets/ch4_student_close.png';
import ch6StudentPano from '../../../assets/ch4_student_panoprama.png';
import ch7Remote from '../../../assets/ch7_remote_classroom.png';

export function useLcsDirectorState({
  isRemoteClassroomView,
  interactiveCallState,
  setInteractiveCallState,
  selectedRemoteHost,
  setSelectedRemoteHost,
  showMicToast,
  setShowMicToast,
  selectedPgmSource,
  setSelectedPgmSource,
  discussionPgmSource,
  setDiscussionPgmSource
}) {
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

  // Recording & Live states
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [isLive, setIsLive] = useState(false);
  const recordingTimerRef = useRef(null);

  // Recording Timer effect
  useEffect(() => {
    if (isRecording && !isPaused) {
      recordingTimerRef.current = setInterval(() => {
        setRecordSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    }
    return () => {
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
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

  // Audio mic simulation
  const [micLevel, setMicLevel] = useState(45);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isMuted) {
        setMicLevel(prev => {
          const delta = Math.floor(Math.random() * 21) - 10;
          return Math.max(10, Math.min(85, prev + delta));
        });
      } else {
        setMicLevel(0);
      }
    }, 250);
    return () => clearInterval(interval);
  }, [isMuted]);

  // Layout selection & controls
  const [isLayoutBarOpen, setIsLayoutBarOpen] = useState(false);
  const [currentLayout, setCurrentLayout] = useState(isRemoteClassroomView ? 'l1' : 'l5'); // 'l1' to 'l8'
  const [directorMode, setDirectorMode] = useState('manual'); // 'manual' | 'auto'
  const [selectedChannel, setSelectedChannel] = useState('ch3'); // default active channel (Teacher_C)

  // Layout slots configurations
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

  const layoutSlotConfigs = {
    l1: [{ key: 'main', label: 'Main' }],
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

  // 2-Level Layout Configuration Modals
  const [level1ModalOpen, setLevel1ModalOpen] = useState(false);
  const [level1TargetLayout, setLevel1TargetLayout] = useState('l2');
  const [level2TargetSlot, setLevel2TargetSlot] = useState(null);
  const [pipPosition, setPipPosition] = useState('top-right'); // 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  const [pipSize, setPipSize] = useState('xlarge'); // 'xlarge' | 'large' | 'medium' | 'small'
  const levelInteractionRef = useRef(null);

  const handleOpenLevel1 = (layoutId) => {
    setCurrentLayout(layoutId);
    setLevel1TargetLayout(layoutId);
    setLevel1ModalOpen(true);
    setLevel2TargetSlot(null);
  };

  const handleLayoutDoubleClick = (layoutId) => {
    setSelectedLayoutToEdit(layoutId);
    handleOpenLevel1(layoutId);
  };

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
    pipSize,
    setInteractiveCallState,
    setSelectedRemoteHost,
    setShowMicToast,
    setSelectedPgmSource,
    setDiscussionPgmSource
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

  return {
    channelImages,
    channels,
    isRecording, setIsRecording,
    isPaused, setIsPaused,
    recordSeconds, setRecordSeconds,
    handleRecordToggle,
    handlePauseToggle,
    formatTime,
    isLive, setIsLive,
    micLevel, setMicLevel,
    isMuted, setIsMuted,
    isLayoutBarOpen, setIsLayoutBarOpen,
    currentLayout, setCurrentLayout,
    directorMode, setDirectorMode,
    selectedChannel, setSelectedChannel,
    isChannelSelectOpen, setIsChannelSelectOpen,
    selectedLayoutToEdit, setSelectedLayoutToEdit,
    activeEditSlot, setActiveEditSlot,
    layoutChannels, setLayoutChannels,
    layoutSlotConfigs,
    level1ModalOpen, setLevel1ModalOpen,
    level1TargetLayout, setLevel1TargetLayout,
    level2TargetSlot, setLevel2TargetSlot,
    pipPosition, setPipPosition,
    pipSize, setPipSize,
    levelInteractionRef,
    handleOpenLevel1,
    handleLayoutDoubleClick,
    handleSelectRightChannel
  };
}
