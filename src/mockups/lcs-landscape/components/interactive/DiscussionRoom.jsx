import { Mic, MicOff } from 'lucide-react';
import { useLcs } from '../../context/LcsContext';
import { MembersModal } from './MembersModal';
import { InviteModal } from './InviteModal';
import discussionFeedLeft from '../../../../assets/discussion_feed_left.png';
import discussionFeedRight from '../../../../assets/discussion_feed_right.png';
import ch3TeacherClose from '../../../../assets/ch3_teacher_close.png';

export function DiscussionRoom() {
  const {
    interactiveCallState,
    setInteractiveCallState,
    isDirectorMinimized,
    setIsDirectorMinimized,
    showMicToast,
    setShowMicToast,
    addressBook,
    isSharingActive,
    setIsSharingActive,
    discussionPgmSource,
    setDiscussionPgmSource,
    isDiscussionPgmDropdownOpen,
    setIsDiscussionPgmDropdownOpen,
    isDiscussionMicOn,
    setIsDiscussionMicOn,
    showMembersModal,
    setShowMembersModal,
    setShowInviteModal,
    setIsInteractiveSessionActive,
    setInteractiveSubPage,
    setActiveMenuSection,
    showToast
  } = useLcs();

  if (interactiveCallState !== 'discussion_active' || isDirectorMinimized) {
    return null;
  }

  const activeMembers = addressBook.filter(m => m.checked);
  const leftFeedName = activeMembers[0]?.name || "Shanghai Campus - Room 101";
  const rightFeedName = activeMembers[1]?.name || "Guangzhou Campus - Class A";

  return (
    <div className="lcs-discussion-room-fullscreen">
      {/* Top Toast notification */}
      {showMicToast && (
        <div className="lcs-room-mic-toast">
          <div className="lcs-mic-toast-icon">✓</div>
          <span className="lcs-mic-toast-text">Microphone turned on</span>
          <button type="button" className="lcs-mic-toast-close" onClick={() => setShowMicToast(false)}>✕</button>
        </div>
      )}

      {/* Main Video Presentation & Split Screen */}
      <div className="lcs-discussion-main-content">
        {/* Top Row: Shared Presentation Screen */}
        <div className="lcs-discussion-top-video-wrapper">
          <div className="lcs-discussion-top-video">
            <img 
              src={ch3TeacherClose} 
              alt="Teacher Close-up" 
              className="w-full h-full object-cover" 
              style={{ objectPosition: 'center 20%' }}
            />
          </div>
        </div>

        {/* Bottom Row: 2 Split Screen Feeds */}
        <div className="lcs-discussion-bottom-grid">
          {/* Bottom Left Feed */}
          <div className="lcs-discussion-video-cell">
            <img 
              src={discussionFeedLeft} 
              alt={leftFeedName} 
              className="w-full h-full object-cover" 
            />
            <div className="lcs-discussion-cell-badge">
              <Mic size={14} style={{ color: activeMembers[0]?.micOn !== false ? '#22c55e' : '#ef4444' }} />
              <span>{leftFeedName}</span>
            </div>
          </div>

          {/* Bottom Right Feed */}
          <div className="lcs-discussion-video-cell">
            <img 
              src={discussionFeedRight} 
              alt={rightFeedName} 
              className="w-full h-full object-cover" 
            />
            <div className="lcs-discussion-cell-badge">
              <Mic size={14} style={{ color: activeMembers[1]?.micOn !== false ? '#22c55e' : '#ef4444' }} />
              <span>{rightFeedName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Control Bar */}
      <div className="lcs-room-bottom-bar">
        <div className="lcs-room-bar-left">
          <button 
            type="button" 
            className="lcs-discussion-green-btn"
            onClick={() => {
              setIsDirectorMinimized(true);
              setActiveMenuSection(null);
              showToast("Returned to Director View");
            }}
            title="Switch back to Director View"
          >
            Director
          </button>
          <span className="lcs-room-bar-text">ID:900011001</span>
          <span className="lcs-room-bar-text">Password:572274</span>
          <span className="lcs-room-bar-text">Teacher:900011001</span>
        </div>

        <div className="lcs-room-bar-center">
          <button type="button" className="lcs-room-page-arrow">&lt;</button>
          <span className="lcs-room-page-num">1/1</span>
          <button type="button" className="lcs-room-page-arrow">&gt;</button>
        </div>

        <div className="lcs-room-bar-right" style={{ position: 'relative' }}>
          {/* Share button */}
          <button 
            type="button" 
            className={`lcs-discussion-green-btn ${isSharingActive ? 'is-active' : ''}`}
            onClick={() => {
              setIsSharingActive(!isSharingActive);
              showToast(!isSharingActive ? "Screen sharing started" : "Screen sharing stopped");
            }}
          >
            {isSharingActive ? 'Sharing' : 'Share'}
          </button>

          {/* Dropdown source selection */}
          <div className="lcs-room-pgm-wrapper" style={{ position: 'relative' }}>
            {isDiscussionPgmDropdownOpen && (
              <div className="lcs-room-pgm-menu">
                {[
                  { id: 'Student_C', label: 'Student_C' },
                  { id: 'Teacher_P', label: 'Teacher_P' },
                  { id: 'Teacher_C', label: 'Teacher_C' },
                  { id: 'Student_P', label: 'Student_P' },
                  { id: 'Lecture', label: 'Lecture' },
                  { id: 'Lecture2', label: 'Lecture2' },
                  { id: 'PGM', label: 'PGM' },
                ].map(opt => (
                  <div 
                    key={opt.id}
                    className={`lcs-room-pgm-item ${discussionPgmSource === opt.id ? 'is-selected' : ''}`}
                    onClick={() => {
                      setDiscussionPgmSource(opt.id);
                      setIsDiscussionPgmDropdownOpen(false);
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
              onClick={() => setIsDiscussionPgmDropdownOpen(!isDiscussionPgmDropdownOpen)}
              style={{ cursor: 'pointer', background: 'transparent', border: 'none', color: 'inherit' }}
            >
              <span style={{ color: '#ffffff', fontWeight: 'bold' }}>
                {discussionPgmSource}
              </span>
              <span style={{ fontSize: '10px', marginLeft: '4px' }}>▾</span>
            </button>
          </div>

          {/* Mic toggle */}
          <button 
            type="button" 
            className={`lcs-room-mic-btn ${isDiscussionMicOn ? 'is-on' : ''}`}
            onClick={() => {
              setIsDiscussionMicOn(!isDiscussionMicOn);
              showToast(isDiscussionMicOn ? "Microphone turned off" : "Microphone turned on");
            }}
          >
            {isDiscussionMicOn ? <Mic size={15} /> : <MicOff size={15} />}
          </button>

          {/* Members button */}
          <button 
            type="button" 
            className={`lcs-discussion-green-btn ${showMembersModal ? 'is-active' : ''}`}
            onClick={() => setShowMembersModal(!showMembersModal)}
          >
            Members
          </button>

          {/* Exit button */}
          <button 
            type="button" 
            className="lcs-room-exit-btn"
            onClick={() => {
              setInteractiveCallState('idle');
              setIsInteractiveSessionActive(false);
              setShowMembersModal(false);
              setShowInviteModal(false);
              setInteractiveSubPage('start');
              showToast("Exited Discussion Mode");
            }}
          >
            Exit
          </button>

          {/* Members Popup Dialog */}
          <MembersModal />
        </div>
      </div>

      {/* Invite Modal Dialog */}
      <InviteModal />
    </div>
  );
}
