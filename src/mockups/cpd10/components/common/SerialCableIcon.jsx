/**
 * Realistic DB9 Serial Connector SVG Component
 * Represents the "Serial Port" card on the CPD10 Home screen
 */
export function SerialCableIcon() {
  return (
    <svg
      width="68"
      height="48"
      viewBox="0 0 68 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cpd10-serial-icon"
    >
      <defs>
        {/* Connector Plastic Body Gradient */}
        <linearGradient id="db9BodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="50%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>

        {/* Metal Trapezoid Shield */}
        <linearGradient id="db9MetalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>

        {/* Metal Screws */}
        <linearGradient id="screwGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
      </defs>

      {/* Cable Wire angling upwards/backwards */}
      <path
        d="M48 10 Q 56 6, 66 0"
        stroke="#1e293b"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M48 10 Q 56 6, 66 0"
        stroke="#475569"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Rubber Strain Relief Boot */}
      <path
        d="M42 16 L50 9 L46 6 L38 13 Z"
        fill="#1e293b"
      />

      {/* Molded Outer Connector Shell */}
      <path
        d="M10 20 L38 9 L48 24 L20 35 Z"
        fill="url(#db9BodyGrad)"
        stroke="#1e293b"
        strokeWidth="1"
      />

      {/* Side Thumbscrews */}
      <circle cx="16" cy="18" r="3.5" fill="url(#screwGrad)" stroke="#334155" strokeWidth="0.8" />
      <circle cx="25" cy="34" r="3.5" fill="url(#screwGrad)" stroke="#334155" strokeWidth="0.8" />

      {/* DB9 Metal Trapezoid Face */}
      <path
        d="M12 25 L24 20 L27 28 L15 33 Z"
        fill="url(#db9MetalGrad)"
        stroke="#475569"
        strokeWidth="0.8"
      />

      {/* Female Pin Holes (2 rows of dots) */}
      <circle cx="15" cy="26" r="0.8" fill="#0f172a" />
      <circle cx="17.5" cy="25" r="0.8" fill="#0f172a" />
      <circle cx="20" cy="24" r="0.8" fill="#0f172a" />
      <circle cx="22.5" cy="23" r="0.8" fill="#0f172a" />
      <circle cx="25" cy="22" r="0.8" fill="#0f172a" />

      <circle cx="16" cy="29" r="0.8" fill="#0f172a" />
      <circle cx="18.5" cy="28" r="0.8" fill="#0f172a" />
      <circle cx="21" cy="27" r="0.8" fill="#0f172a" />
      <circle cx="23.5" cy="26" r="0.8" fill="#0f172a" />
    </svg>
  );
}
