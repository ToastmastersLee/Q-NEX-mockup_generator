import { useState } from 'react';
import { Lock } from 'lucide-react';
import './LockScreen.css';


export function LockScreen({ setLocked, passwordUnlockEnabled, password = '8888' }) {
  const [enteringPin, setEnteringPin] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleKeyPress = (num) => {
    if (pin.length >= 4) return;
    setError(false);
    const nextPin = pin + num;
    setPin(nextPin);
    
    if (nextPin === password) {
      setTimeout(() => {
        setLocked(false);
        setPin('');
        setEnteringPin(false);
      }, 300);
    } else if (nextPin.length === 4) {
      setTimeout(() => {
        setError(true);
        setPin('');
      }, 300);
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setError(false);
  };

  if (enteringPin) {
    return (
      <div className="ndp-lock-screen ndp-pin-screen">
        <div className="ndp-pin-header">
          <h2>Enter Password</h2>
          {error && <span className="ndp-pin-error">Incorrect password</span>}
        </div>
        
        <div className="ndp-pin-dots">
          {[0, 1, 2, 3].map((idx) => (
            <div 
              key={idx} 
              className={`ndp-pin-dot ${idx < pin.length ? 'is-filled' : ''} ${error ? 'is-error' : ''}`} 
            />
          ))}
        </div>

        <div className="ndp-pin-keypad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button 
              key={num} 
              type="button" 
              className="ndp-key-btn" 
              onClick={() => handleKeyPress(num.toString())}
            >
              {num}
            </button>
          ))}
          <button 
            type="button" 
            className="ndp-key-btn text-sm" 
            onClick={() => { setEnteringPin(false); setPin(''); setError(false); }}
          >
            Cancel
          </button>
          <button 
            type="button" 
            className="ndp-key-btn" 
            onClick={() => handleKeyPress('0')}
          >
            0
          </button>
          <button 
            type="button" 
            className="ndp-key-btn" 
            onClick={handleBackspace}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0 -2-2z" />
              <line x1="18" y1="9" x2="12" y2="15" />
              <line x1="12" y1="9" x2="18" y2="15" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ndp-lock-screen">
      <div className="ndp-lock-brand">
        <span className="ndp-logo-mark" />
        <span>nex</span>
      </div>
      <div className="ndp-lock-time">
        <Lock size={17} />
        <strong>10:28</strong>
        <span>TUESDAY, 16 JUNE, 2026</span>
      </div>
      <button 
        className="ndp-unlock-orb" 
        type="button" 
        onClick={() => {
          if (passwordUnlockEnabled) {
            setEnteringPin(true);
          } else {
            setLocked(false);
          }
        }}
      >
        <Lock size={46} />
      </button>
    </div>
  );
}
