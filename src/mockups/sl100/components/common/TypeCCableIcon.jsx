/**
 * Realistic Type-C Cable Connector SVG Component
 * Matches the Type-C card on the SL100 screen (Image 1)
 */
export function TypeCCableIcon({ active = false, size = 'large' }) {
  const isSmall = size === 'small';
  const width = isSmall ? 28 : 56;
  const height = isSmall ? 36 : 68;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 56 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`sl100-typec-icon ${active ? 'is-active' : ''}`}
    >
      <defs>
        {/* Metal Body Gradient */}
        <linearGradient id="typecMetalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={active ? "#bae6fd" : "#cbd5e1"} />
          <stop offset="30%" stopColor={active ? "#ffffff" : "#f1f5f9"} />
          <stop offset="70%" stopColor={active ? "#7dd3fc" : "#94a3b8"} />
          <stop offset="100%" stopColor={active ? "#0284c7" : "#475569"} />
        </linearGradient>

        {/* Plug Tip Pill */}
        <linearGradient id="typecTipGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="50%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>

        {/* Rubber Boot */}
        <linearGradient id="typecBootGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="50%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>

      {/* Symmetrical Type-C Metal Pill Plug Tip */}
      <rect x="20" y="4" width="16" height="12" rx="4" fill="url(#typecTipGrad)" stroke="#334155" strokeWidth="0.8" />
      <rect x="23" y="8" width="10" height="2" rx="1" fill="#1e293b" />

      {/* Main Connector Aluminum Body */}
      <rect x="15" y="16" width="26" height="30" rx="3.5" fill="url(#typecMetalGrad)" />
      <rect x="16" y="17" width="24" height="28" rx="2.5" stroke={active ? "#38bdf8" : "rgba(255,255,255,0.4)"} strokeWidth="0.8" fill="none" />

      {/* Center Grip Indent */}
      <line x1="22" y1="31" x2="34" y2="31" stroke={active ? "#0369a1" : "#64748b"} strokeWidth="1.2" strokeLinecap="round" />

      {/* Rubber Neck Strain Relief */}
      <path
        d="M19 46 L37 46 L34 56 L22 56 Z"
        fill="url(#typecBootGrad)"
      />
      {/* Strain Relief Segments */}
      <rect x="22" y="56" width="12" height="3" rx="1" fill="#334155" />

      {/* Thick Cable Wire */}
      <rect x="23" y="59" width="10" height="9" fill="#1e293b" />
    </svg>
  );
}
