import { useLcs } from '../../../context/LcsContext';

export function VirtualKeyboard() {
  const {
    authAccount,
    authPassword,
    authFocusedInput,
    isCaps,
    setIsCaps,
    handleKeyPress,
    handleBackspace,
    handleAuthVerify
  } = useLcs();

  return (
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
  );
}
