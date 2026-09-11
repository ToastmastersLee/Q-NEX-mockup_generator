import { useLcs } from '../../context/LcsContext';

export function InviteModal() {
  const {
    showInviteModal,
    setShowInviteModal,
    addressBook,
    setAddressBook,
    inviteSelectedIds,
    setInviteSelectedIds,
    showToast
  } = useLcs();

  if (!showInviteModal) return null;

  return (
    <div 
      className="lcs-invite-modal-backdrop"
      onClick={() => setShowInviteModal(false)}
    >
      <div 
        className="lcs-invite-modal"
        onClick={e => e.stopPropagation()}
      >
        <div className="lcs-invite-header">
          <span className="lcs-invite-title">Invite</span>
          <button 
            type="button" 
            className="lcs-invite-close-btn"
            onClick={() => setShowInviteModal(false)}
            title="Close"
          >
            ✕
          </button>
        </div>

        <div className="lcs-invite-list">
          {addressBook.map((item, idx) => {
            const isChecked = inviteSelectedIds.includes(item.id);
            return (
              <div 
                key={item.id || idx} 
                className={`lcs-invite-row ${isChecked ? 'is-checked' : ''} ${idx % 2 === 1 ? 'is-alt' : ''}`}
                onClick={() => {
                  setInviteSelectedIds(prev => 
                    prev.includes(item.id) 
                      ? prev.filter(id => id !== item.id) 
                      : [...prev, item.id]
                  );
                }}
              >
                <div className={`lcs-invite-checkbox ${isChecked ? 'is-checked' : ''}`}>
                  {isChecked && <span className="lcs-checkmark">✓</span>}
                </div>
                <div className="lcs-invite-row-content">
                  <span className={`lcs-status-dot ${item.status === 'online' ? 'is-online' : 'is-offline'}`} />
                  <span className={`lcs-invite-name ${isChecked ? 'is-checked' : ''}`}>
                    {item.name}
                  </span>
                </div>
                <span className={`lcs-invite-status ${item.status === 'online' ? 'is-online' : 'is-offline'}`}>
                  {item.status === 'online' ? 'Online' : 'Offline'}
                </span>
              </div>
            );
          })}
        </div>

        <div className="lcs-invite-footer">
          <button 
            type="button" 
            className="lcs-invite-ok-btn"
            onClick={() => {
              setAddressBook(prev => prev.map(item => ({
                ...item,
                checked: inviteSelectedIds.includes(item.id)
              })));
              setShowInviteModal(false);
              showToast("Members updated");
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
