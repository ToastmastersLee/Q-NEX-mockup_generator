/**
 * Vector Icons precisely matching SL100 Settings Hub (Image 2)
 */

export function ServerRackIcon({ size = 26, className = '', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <rect x="3" y="4" width="18" height="6" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <circle cx="6.5" cy="7" r="1" fill="currentColor" />
      <circle cx="9.5" cy="7" r="1" fill="currentColor" />
      <line x1="14" y1="7" x2="18" y2="7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />

      <rect x="3" y="14" width="18" height="6" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <circle cx="6.5" cy="17" r="1" fill="currentColor" />
      <circle cx="9.5" cy="17" r="1" fill="currentColor" />
      <line x1="14" y1="17" x2="18" y2="17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ScreenSettingsIcon({ size = 26, className = '', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <rect x="2" y="3" width="20" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
      {/* Center gear */}
      <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 6.5v1.2M12 12.3v1.2M8.5 10H9.7M14.3 10h1.2M9.5 7.5l.9.9M13.6 11.6l.9.9M9.5 12.5l.9-.9M13.6 8.4l.9-.9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function LanguageSpeechIcon({ size = 26, className = '', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path
        d="M4 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4V6a2 2 0 0 1 2-2z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="none"
      />
      <text
        x="11"
        y="14"
        textAnchor="middle"
        fontSize="9"
        fontWeight="bold"
        fill="currentColor"
        fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
      >
        A
      </text>
    </svg>
  );
}

export function SerialPortSettingsIcon({ size = 26, className = '', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M 6.4 6.2 C 6.8 5.4 7.6 5.0 8.5 5.0 H 15.5 C 16.4 5.0 17.2 5.4 17.6 6.2 L 20.3 15.2 C 20.8 16.6 19.8 18.0 18.2 18.0 H 5.8 C 4.2 18.0 3.2 16.6 3.7 15.2 Z
           M 8.2 8.7 A 1.05 1.05 0 1 0 8.2 10.8 A 1.05 1.05 0 1 0 8.2 8.7 Z
           M 10.7 8.7 A 1.05 1.05 0 1 0 10.7 10.8 A 1.05 1.05 0 1 0 10.7 8.7 Z
           M 13.3 8.7 A 1.05 1.05 0 1 0 13.3 10.8 A 1.05 1.05 0 1 0 13.3 8.7 Z
           M 15.8 8.7 A 1.05 1.05 0 1 0 15.8 10.8 A 1.05 1.05 0 1 0 15.8 8.7 Z
           M 6.9 13.5 A 1.05 1.05 0 1 0 6.9 15.6 A 1.05 1.05 0 1 0 6.9 13.5 Z
           M 9.5 13.5 A 1.05 1.05 0 1 0 9.5 15.6 A 1.05 1.05 0 1 0 9.5 13.5 Z
           M 12.0 13.5 A 1.05 1.05 0 1 0 12.0 15.6 A 1.05 1.05 0 1 0 12.0 13.5 Z
           M 14.5 13.5 A 1.05 1.05 0 1 0 14.5 15.6 A 1.05 1.05 0 1 0 14.5 13.5 Z
           M 17.1 13.5 A 1.05 1.05 0 1 0 17.1 15.6 A 1.05 1.05 0 1 0 17.1 13.5 Z"
      />
    </svg>
  );
}

export function HdmiPortSettingsIcon({ size = 26, className = '', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M 5.0 7.8 C 5.0 6.8 5.8 6.0 6.8 6.0 H 17.2 C 18.2 6.0 19.0 6.8 19.0 7.8 V 12.2 C 19.0 12.8 18.7 13.4 18.2 13.9 L 16.6 15.8 C 16.1 16.4 15.4 16.8 14.7 16.8 H 9.3 C 8.6 16.8 7.9 16.4 7.4 15.8 L 5.8 13.9 C 5.3 13.4 5.0 12.8 5.0 12.2 Z
           M 7.8 11.2 H 16.2 C 16.6 11.2 16.9 11.5 16.9 11.9 C 16.9 12.3 16.6 12.6 16.2 12.6 H 7.8 C 7.4 12.6 7.1 12.3 7.1 11.9 C 7.1 11.5 7.4 11.2 7.8 11.2 Z"
      />
    </svg>
  );
}

export function OtherSlidersIcon({ size = 26, className = '', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="8" cy="6" r="2.5" fill="currentColor" />

      <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="16" cy="12" r="2.5" fill="currentColor" />

      <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="11" cy="18" r="2.5" fill="currentColor" />
    </svg>
  );
}
