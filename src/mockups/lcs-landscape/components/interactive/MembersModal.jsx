import { Plus } from 'lucide-react';
import { useLcs } from '../../context/LcsContext';
import { MemberCameraIcon, MemberMicIcon } from './MemberIcons';

export function MembersModal() {
  const {
    showMembersModal,
    setShowMembersModal,
    addressBook,
    setAddressBook,
    setInviteSelectedIds,
    setShowInviteModal,
    isSharingActive,
    setIsSharingActive,
    showToast
  } = useLcs();

  if (!showMembersModal) return null;

  return (
    <div className="lcs-discussion-members-modal">
      <div className="lcs-members-header">
        <span className="lcs-members-title">Members</span>
        <div className="lcs-members-header-actions">
          <button 
            type="button" 
            className="lcs-members-add-btn"
            onClick={() => {
              setInviteSelectedIds(addressBook.filter(m => m.checked).map(m => m.id));
              setShowInviteModal(true);
            }}
            title="Add Member"
          >
            <Plus size={14} />
          </button>
          <button 
            type="button" 
            className="lcs-members-close-btn"
            onClick={() => setShowMembersModal(false)}
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Members list */}
      <div className="lcs-members-list">
        {addressBook.filter(m => m.checked).length === 0 ? (
          <div style={{ padding: '16px', textAlign: 'center', color: '#94a3b8', fontSize: '12px' }}>
            No members selected
          </div>
        ) : (
          addressBook.filter(m => m.checked).map((member, idx) => (
            <div key={member.id} className={`lcs-member-row ${idx % 2 === 1 ? 'is-striped' : ''}`}>
              <span className="lcs-member-name">{member.name}</span>
              <div className="lcs-member-row-actions">
                <button 
                  type="button" 
                  className="lcs-member-icon-btn"
                  onClick={() => {
                    setAddressBook(prev => prev.map(m => m.id === member.id ? { ...m, cameraOn: !m.cameraOn } : m));
                    showToast(`${member.name} camera ${!member.cameraOn ? 'turned on' : 'turned off'}`);
                  }}
                  title={member.cameraOn ? "Turn off camera" : "Turn on camera"}
                >
                  <MemberCameraIcon isOn={member.cameraOn} id={member.id} />
                </button>
                <button 
                  type="button" 
                  className="lcs-member-icon-btn"
                  onClick={() => {
                    setAddressBook(prev => prev.map(m => m.id === member.id ? { ...m, micOn: !m.micOn } : m));
                    showToast(`${member.name} ${!member.micOn ? 'unmuted' : 'muted'}`);
                  }}
                  title={member.micOn ? "Mute microphone" : "Unmute microphone"}
                >
                  <MemberMicIcon isOn={member.micOn} id={member.id} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer actions */}
      <div className="lcs-members-footer">
        <button 
          type="button" 
          className="lcs-members-footer-btn"
          onClick={() => {
            setAddressBook(prev => prev.map(m => ({ ...m, micOn: false })));
            showToast("All microphones muted");
          }}
        >
          Mute all
        </button>
        <button 
          type="button" 
          className="lcs-members-footer-btn"
          onClick={() => {
            setAddressBook(prev => prev.map(m => ({ ...m, micOn: true })));
            showToast("All microphones unmuted");
          }}
        >
          Unmute all
        </button>
        <button 
          type="button" 
          className="lcs-members-footer-btn"
          onClick={() => {
            setIsSharingActive(!isSharingActive);
            showToast(!isSharingActive ? "Sharing started" : "Stop sharing");
          }}
        >
          {isSharingActive ? 'Stop sharing' : 'Start sharing'}
        </button>
      </div>
    </div>
  );
}
