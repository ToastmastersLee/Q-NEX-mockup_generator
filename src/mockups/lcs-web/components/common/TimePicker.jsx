import { useState, useRef, useEffect } from 'react';
import { Clock } from 'lucide-react';

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
const SECONDS = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

export function TimePicker({ value = '00:00:00', onChange, disabled = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const parseTime = (val) => {
    if (!val || typeof val !== 'string') return { h: '00', m: '00', s: '00' };
    const parts = val.split(':');
    return {
      h: (parts[0] || '00').padStart(2, '0'),
      m: (parts[1] || '00').padStart(2, '0'),
      s: (parts[2] || '00').padStart(2, '0'),
    };
  };

  const initial = parseTime(value);
  const [tempH, setTempH] = useState(initial.h);
  const [tempM, setTempM] = useState(initial.m);
  const [tempS, setTempS] = useState(initial.s);

  const hourColRef = useRef(null);
  const minColRef = useRef(null);
  const secColRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const cur = parseTime(value);
      setTempH(cur.h);
      setTempM(cur.m);
      setTempS(cur.s);

      setTimeout(() => {
        const itemHeight = 28;
        if (hourColRef.current) {
          const hIdx = HOURS.indexOf(cur.h);
          if (hIdx >= 0) hourColRef.current.scrollTop = Math.max(0, hIdx * itemHeight - itemHeight * 2);
        }
        if (minColRef.current) {
          const mIdx = MINUTES.indexOf(cur.m);
          if (mIdx >= 0) minColRef.current.scrollTop = Math.max(0, mIdx * itemHeight - itemHeight * 2);
        }
        if (secColRef.current) {
          const sIdx = SECONDS.indexOf(cur.s);
          if (sIdx >= 0) secColRef.current.scrollTop = Math.max(0, sIdx * itemHeight - itemHeight * 2);
        }
      }, 20);
    }
  }, [isOpen, value]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    const formatted = `${tempH}:${tempM}:${tempS}`;
    if (onChange) {
      onChange(formatted);
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(prev => !prev);
    }
  };

  return (
    <div className="lcs-web-time-picker-wrapper" ref={containerRef}>
      <button
        type="button"
        disabled={disabled}
        className={`lcs-web-time-input-box ${isOpen ? 'is-focused' : ''} ${disabled ? 'is-disabled' : ''}`}
        onClick={toggleDropdown}
      >
        <Clock size={13} className="text-slate-400 flex-shrink-0" />
        <span className="lcs-web-time-display-text">{value || '00:00:00'}</span>
      </button>

      {isOpen && (
        <div className="lcs-web-time-dropdown">
          <div className="lcs-web-time-columns">
            <div className="lcs-web-time-col" ref={hourColRef}>
              {HOURS.map(h => (
                <div
                  key={h}
                  className={`lcs-web-time-item ${tempH === h ? 'is-selected' : ''}`}
                  onClick={() => setTempH(h)}
                >
                  {h}
                </div>
              ))}
            </div>

            <div className="lcs-web-time-col" ref={minColRef}>
              {MINUTES.map(m => (
                <div
                  key={m}
                  className={`lcs-web-time-item ${tempM === m ? 'is-selected' : ''}`}
                  onClick={() => setTempM(m)}
                >
                  {m}
                </div>
              ))}
            </div>

            <div className="lcs-web-time-col" ref={secColRef}>
              {SECONDS.map(s => (
                <div
                  key={s}
                  className={`lcs-web-time-item ${tempS === s ? 'is-selected' : ''}`}
                  onClick={() => setTempS(s)}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div className="lcs-web-time-footer">
            <button
              type="button"
              className="lcs-web-time-btn-cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="lcs-web-time-btn-ok"
              onClick={handleConfirm}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
