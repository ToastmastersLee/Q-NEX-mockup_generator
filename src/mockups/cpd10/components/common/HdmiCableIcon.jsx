/**
 * Realistic HDMI Cable Connector SVG Component
 * Matches the physical appearance on CPD10 screenshots
 */
export function HdmiCableIcon({ number = 1, active = false, size = 'large' }) {
  const isSmall = size === 'small';
  const width = isSmall ? 28 : 64;
  const height = isSmall ? 36 : 84;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cpd10-hdmi-icon ${active ? 'is-active' : ''}`}
    >
      <defs>
        {/* Metal Body Gradient */}
        <linearGradient id={`metalGrad-${number}-${size}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={active ? "#bae6fd" : "#cbd5e1"} />
          <stop offset="25%" stopColor={active ? "#ffffff" : "#f1f5f9"} />
          <stop offset="50%" stopColor={active ? "#7dd3fc" : "#94a3b8"} />
          <stop offset="85%" stopColor={active ? "#38bdf8" : "#64748b"} />
          <stop offset="100%" stopColor={active ? "#0284c7" : "#475569"} />
        </linearGradient>

        {/* Plug Tip Gold/Silver Gradient */}
        <linearGradient id={`plugGrad-${number}-${size}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="40%" stopColor="#f8fafc" />
          <stop offset="80%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>

        {/* Rubber Boot Gradient */}
        <linearGradient id={`bootGrad-${number}-${size}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="45%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>

      {/* HDMI Male Plug (Top) */}
      <rect x="22" y="2" width="20" height="12" rx="1.5" fill={`url(#plugGrad-${number}-${size})`} stroke="#334155" strokeWidth="0.8" />
      {/* Plug Inner Cutouts */}
      <rect x="25" y="5" width="4" height="4" rx="0.5" fill="#1e293b" />
      <rect x="35" y="5" width="4" height="4" rx="0.5" fill="#1e293b" />

      {/* Main Connector Shell */}
      <rect x="14" y="14" width="36" height="38" rx="4" fill={`url(#metalGrad-${number}-${size})`} />
      {/* Embossed Border */}
      <rect x="15" y="15" width="34" height="36" rx="3" stroke={active ? "#38bdf8" : "rgba(255,255,255,0.4)"} strokeWidth="0.8" fill="none" />

      {/* Cable Number */}
      {number && (
        <text
          x="32"
          y="39"
          textAnchor="middle"
          fontSize="18"
          fontWeight="bold"
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fill={active ? "#0369a1" : "#475569"}
          style={{ letterSpacing: "-0.5px" }}
        >
          {number}
        </text>
      )}

      {/* Rubber Neck Boot */}
      <path
        d="M20 52 L44 52 L40 66 L24 66 Z"
        fill={`url(#bootGrad-${number}-${size})`}
      />
      {/* Strain Relief Segments */}
      <rect x="23" y="66" width="18" height="3" rx="1" fill="#334155" />
      <rect x="24" y="70" width="16" height="3" rx="1" fill="#334155" />

      {/* Thick Cable Wire */}
      <rect x="26" y="73" width="12" height="11" fill="#1e293b" />
    </svg>
  );
}
