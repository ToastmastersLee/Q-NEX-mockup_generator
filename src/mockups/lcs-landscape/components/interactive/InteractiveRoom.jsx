import { Mic, MicOff } from 'lucide-react';
import { useLcs } from '../../context/LcsContext';
import ch1Ppt from '../../../../assets/ch1_ppt.png';
import ch2DocCam from '../../../../assets/ch2_doc_cam.png';
import ch3TeacherClose from '../../../../assets/ch3_teacher_close.png';
import ch4StudentClose from '../../../../assets/ch4_student_close.png';
import ch6StudentPano from '../../../../assets/ch4_student_panoprama.png';
import ch7Remote from '../../../../assets/ch7_remote_classroom.png';

export function InteractiveRoom() {
  const {
    interactiveCallState,
    setInteractiveCallState,
    isDirectorMinimized,
    setIsDirectorMinimized,
    showMicToast,
    setShowMicToast,
    isRemoteClassroomView,
    mainClassroomHost,
    selectedRemoteHost,
    selectedPgmSource,
    setSelectedPgmSource,
    isPgmDropdownOpen,
    setIsPgmDropdownOpen,
    setIsInteractiveSessionActive,
    setInteractiveSubPage,
    setActiveMenuSection,
    showToast
  } = useLcs();

  if ((interactiveCallState !== 'room_loading' && interactiveCallState !== 'room_active') || isDirectorMinimized) {
    return null;
  }

  return (
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
            {showMicToast ? <Mic size={15} /> : <MicOff size={15} />}
          </button>

          <button 
            type="button" 
            className="lcs-room-exit-btn"
            onClick={() => {
              setInteractiveCallState('idle');
              setIsInteractiveSessionActive(false);
              setInteractiveSubPage('start');
              showToast("Exited Interactive Room");
            }}
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
