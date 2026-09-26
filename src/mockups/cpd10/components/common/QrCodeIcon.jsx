/**
 * Clean SVG QR Code representation matching the device screen
 */
export function QrCodeIcon({ size = 52 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cpd10-qr-code"
    >
      <rect width="48" height="48" rx="4" fill="#ffffff" />
      {/* Top-Left Position Square */}
      <rect x="4" y="4" width="14" height="14" fill="#0f172a" />
      <rect x="7" y="7" width="8" height="8" fill="#ffffff" />
      <rect x="9" y="9" width="4" height="4" fill="#0f172a" />

      {/* Top-Right Position Square */}
      <rect x="30" y="4" width="14" height="14" fill="#0f172a" />
      <rect x="33" y="7" width="8" height="8" fill="#ffffff" />
      <rect x="35" y="9" width="4" height="4" fill="#0f172a" />

      {/* Bottom-Left Position Square */}
      <rect x="4" y="30" width="14" height="14" fill="#0f172a" />
      <rect x="7" y="33" width="8" height="8" fill="#ffffff" />
      <rect x="9" y="35" width="4" height="4" fill="#0f172a" />

      {/* Random-like QR pattern modules */}
      <rect x="21" y="5" width="3" height="3" fill="#0f172a" />
      <rect x="25" y="8" width="3" height="3" fill="#0f172a" />
      <rect x="21" y="12" width="4" height="3" fill="#0f172a" />
      <rect x="5" y="21" width="3" height="4" fill="#0f172a" />
      <rect x="11" y="23" width="4" height="3" fill="#0f172a" />
      <rect x="18" y="18" width="4" height="4" fill="#0f172a" />
      <rect x="24" y="21" width="5" height="3" fill="#0f172a" />
      <rect x="32" y="21" width="4" height="4" fill="#0f172a" />
      <rect x="39" y="22" width="5" height="3" fill="#0f172a" />
      <rect x="21" y="27" width="3" height="5" fill="#0f172a" />
      <rect x="27" y="29" width="4" height="3" fill="#0f172a" />
      <rect x="34" y="28" width="3" height="4" fill="#0f172a" />
      <rect x="21" y="36" width="4" height="3" fill="#0f172a" />
      <rect x="28" y="38" width="5" height="4" fill="#0f172a" />
      <rect x="36" y="35" width="3" height="5" fill="#0f172a" />
      <rect x="41" y="38" width="3" height="4" fill="#0f172a" />
    </svg>
  );
}
