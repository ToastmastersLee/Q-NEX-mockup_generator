import { useState, useRef, useEffect } from 'react';

export function PasswordSettingSubpage({ setPassword, setSettingsSubpage, setPasswordUnlockEnabled }) {
  const [phase, setPhase] = useState('enter'); // 'enter' or 'confirm'
  const [firstPin, setFirstPin] = useState('');
  const [currentPin, setCurrentPin] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const toastTimeoutRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage('');
    }, 5000); // 5 seconds
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const handleKeyPress = (num) => {
    if (currentPin.length >= 4) return;
    const nextPin = currentPin + num;
    setCurrentPin(nextPin);

    if (nextPin.length === 4) {
      if (phase === 'enter') {
        // Go to confirm phase
        setTimeout(() => {
          setFirstPin(nextPin);
          setCurrentPin('');
          setPhase('confirm');
        }, 300);
      } else {
        // We are in confirm phase: check if they match!
        if (nextPin === firstPin) {
          setTimeout(() => {
            setPassword(nextPin);
            setPasswordUnlockEnabled(true);
            setSettingsSubpage('password-unlock');
          }, 300);
        } else {
          setTimeout(() => {
            showToast('The two passwords you entered did not match!');
            setCurrentPin('');
          }, 300);
        }
      }
    }
  };

  const handleBackspace = () => {
    setCurrentPin(prev => prev.slice(0, -1));
  };

  return (
    <div className="ndp-page ndp-pin-screen" style={{ justifyContent: 'flex-start', paddingTop: '40px' }}>
      <div className="ndp-pin-header" style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600' }}>
          {phase === 'enter' ? 'Enter password' : 'Enter password again'}
        </h2>
      </div>

      <div className="ndp-pin-dots" style={{ marginBottom: '48px', gap: '20px', display: 'flex' }}>
        {[0, 1, 2, 3].map((idx) => (
          <div 
            key={idx} 
            className={`ndp-pin-dot-circle ${idx < currentPin.length ? 'is-filled' : ''}`} 
          />
        ))}
      </div>

      <div className="ndp-pin-keypad" style={{ width: '100%', maxWidth: '320px' }}>
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
        {/* Empty placeholder to keep layout */}
        <div style={{ width: '72px', height: '72px' }} />
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

      {/* Android-style Toast */}
      {toastMessage && (
        <div className="ndp-toast">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
