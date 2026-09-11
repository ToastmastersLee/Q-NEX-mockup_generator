import { useLcs } from '../../../context/LcsContext';
import { VirtualKeyboard } from './VirtualKeyboard';

export function AdvanceAuthModal() {
  const {
    showAdvanceAuth,
    setShowAdvanceAuth,
    previousSettingsTab,
    setActiveSettingsTab,
    authAccount,
    authPassword,
    authFocusedInput,
    setAuthFocusedInput,
    authError,
    handleAuthVerify
  } = useLcs();

  if (!showAdvanceAuth) return null;

  return (
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
      
      <VirtualKeyboard />
    </>
  );
}
