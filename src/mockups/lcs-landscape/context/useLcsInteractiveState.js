import { useState, useEffect } from 'react';

export function useLcsInteractiveState({ initialSessionType, initialSubPage }) {
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

  // Discussion Mode states
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteSelectedIds, setInviteSelectedIds] = useState([]);
  const [isSharingActive, setIsSharingActive] = useState(false);
  const [discussionPgmSource, setDiscussionPgmSource] = useState('PGM');
  const [isDiscussionPgmDropdownOpen, setIsDiscussionPgmDropdownOpen] = useState(false);
  const [isDiscussionMicOn, setIsDiscussionMicOn] = useState(true);

  // Call & Room states
  const [interactiveCallState, setInteractiveCallState] = useState('idle'); // 'idle' | 'entering' | 'room_loading' | 'room_active' | 'discussion_active'
  const [selectedRemoteHost, setSelectedRemoteHost] = useState('Shanghai Campus - Room 101');
  const [mainClassroomHost] = useState('Fuzhou HQ - Main Hall');
  const [showMicToast, setShowMicToast] = useState(true);
  const [isDirectorMinimized, setIsDirectorMinimized] = useState(false);

  // Interactive Room PGM Dropdown states
  const [isPgmDropdownOpen, setIsPgmDropdownOpen] = useState(false);
  const [selectedPgmSource, setSelectedPgmSource] = useState('PGM'); // 'PGM' | 'Lecture' | 'Lecture2' | 'Teacher_C' | 'Student_C' | 'Teacher_P' | 'Student_P'

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

  // Interactive date/time format helper
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

  return {
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
    interactiveTime,
    interactiveDate,
    interactiveDay
  };
}
