/**
 * Realistic HDMI Cable Connector SVG Component for SL100
 */
export function HdmiCableIcon({ active = false, size = 'large' }) {
  const isSmall = size === 'small';
  const width = isSmall ? 28 : 58;
  const height = isSmall ? 36 : 72;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`sl100-hdmi-icon ${active ? 'is-active' : ''}`}
    >
      <defs>
        <linearGradient id="slHdmiMetalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={active ? "#bae6fd" : "#cbd5e1"} />
          <stop offset="30%" stopColor={active ? "#ffffff" : "#f1f5f9"} />
          <stop offset="70%" stopColor={active ? "#7dd3fc" : "#94a3b8"} />
          <stop offset="100%" stopColor={active ? "#0284c7" : "#475569"} />
        </linearGradient>

        <linearGradient id="slHdmiPlugGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="40%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>

        <linearGradient id="slHdmiBootGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="50%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>

      {/* HDMI Male Plug Tip */}
      <rect x="22" y="2" width="20" height="12" rx="1.5" fill="url(#slHdmiPlugGrad)" stroke="#334155" strokeWidth="0.8" />
      <rect x="25" y="5" width="4" height="4" rx="0.5" fill="#1e293b" />
      <rect x="35" y="5" width="4" height="4" rx="0.5" fill="#1e293b" />

      {/* Main Connector Shell */}
      <rect x="14" y="14" width="36" height="36" rx="4" fill="url(#slHdmiMetalGrad)" />
      <rect x="15" y="15" width="34" height="34" rx="3" stroke={active ? "#38bdf8" : "rgba(255,255,255,0.4)"} strokeWidth="0.8" fill="none" />

      {/* Embossed HDMI Label */}
      <text
        x="32"
        y="36"
        textAnchor="middle"
        fontSize="10"
        fontWeight="bold"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fill={active ? "#0369a1" : "#475569"}
        style={{ letterSpacing: "0.5px" }}
      >
        HDMI
      </text>

      {/* Rubber Neck Boot */}
      <path
        d="M20 50 L44 50 L40 64 L24 64 Z"
        fill="url(#slHdmiBootGrad)"
      />
      <rect x="23" y="64" width="18" height="3" rx="1" fill="#334155" />
      <rect x="25" y="67" width="14" height="10" fill="#1e293b" />
    </svg>
  );
}
