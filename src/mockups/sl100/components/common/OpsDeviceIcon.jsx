/**
 * Realistic OPS Slot-in Mini PC SVG Component
 * Matches the OPS hardware appearance in Image 1 on the SL100 screen
 */
export function OpsDeviceIcon({ active = false }) {
  return (
    <svg
      width="64"
      height="48"
      viewBox="0 0 64 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`sl100-ops-icon ${active ? 'is-active' : ''}`}
    >
      <defs>
        {/* Metal Casing Gradient */}
        <linearGradient id="opsBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={active ? "#38bdf8" : "#475569"} />
          <stop offset="50%" stopColor={active ? "#0284c7" : "#334155"} />
          <stop offset="100%" stopColor={active ? "#0369a1" : "#1e293b"} />
        </linearGradient>

        {/* Top Surface Highlight */}
        <linearGradient id="opsTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>

        {/* Port Cutouts */}
        <linearGradient id="opsPortGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
      </defs>

      {/* Perspective Isometric/Flat Chassis Box */}
      {/* Top panel */}
      <polygon
        points="14,14 50,14 58,20 22,20"
        fill="url(#opsTopGrad)"
        stroke="#334155"
        strokeWidth="0.8"
      />

      {/* Front Face */}
      <polygon
        points="14,14 22,20 22,36 14,30"
        fill="#1e293b"
        stroke="#0f172a"
        strokeWidth="0.8"
      />

      {/* Main Front-Right Facade */}
      <polygon
        points="22,20 58,20 58,36 22,36"
        fill="url(#opsBodyGrad)"
        stroke="#0f172a"
        strokeWidth="0.8"
      />

      {/* Antenna at back left */}
      <line x1="16" y1="14" x2="16" y2="6" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="5" r="1.5" fill="#38bdf8" />

      {/* Antenna at back right */}
      <line x1="56" y1="14" x2="56" y2="6" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="56" cy="5" r="1.5" fill="#38bdf8" />

      {/* Ventilation Grille Slots on Front Panel */}
      <line x1="25" y1="23" x2="33" y2="23" stroke="#0f172a" strokeWidth="1" strokeLinecap="round" />
      <line x1="25" y1="25" x2="33" y2="25" stroke="#0f172a" strokeWidth="1" strokeLinecap="round" />
      <line x1="25" y1="27" x2="33" y2="27" stroke="#0f172a" strokeWidth="1" strokeLinecap="round" />

      {/* USB Ports */}
      <rect x="36" y="23" width="5" height="3" rx="0.5" fill="url(#opsPortGrad)" stroke="#64748b" strokeWidth="0.5" />
      <rect x="36" y="27" width="5" height="3" rx="0.5" fill="url(#opsPortGrad)" stroke="#64748b" strokeWidth="0.5" />

      {/* HDMI / Type-C Port */}
      <rect x="44" y="24" width="7" height="3.5" rx="0.5" fill="url(#opsPortGrad)" stroke="#64748b" strokeWidth="0.5" />

      {/* Power Button & LED */}
      <circle cx="54" cy="25" r="1.8" fill={active ? "#38bdf8" : "#22c55e"} />
      <circle cx="54" cy="30" r="1.2" fill="#38bdf8" />

      {/* Bottom mount screw ear */}
      <rect x="20" y="35.5" width="4" height="2" fill="#64748b" />
      <rect x="56" y="35.5" width="4" height="2" fill="#64748b" />
    </svg>
  );
}
