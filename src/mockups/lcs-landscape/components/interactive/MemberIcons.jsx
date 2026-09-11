export function MemberCameraIcon({ isOn, id = 'cam' }) {
  const maskId = `camSlashMask_${id}`;
  if (isOn) {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <rect x="2" y="6" width="13" height="12" rx="2.5" fill="#22c55e" />
        <path d="M15 10l5-3.5a0.8 0.8 0 0 1 1.2.7v9.6a0.8 0.8 0 0 1-1.2.7L15 14v-4z" fill="#22c55e" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <mask id={maskId}>
        <rect width="24" height="24" fill="white" />
        <line x1="2" y1="21" x2="21" y2="2" stroke="black" strokeWidth="3" />
      </mask>
      <g mask={`url(#${maskId})`}>
        <rect x="2" y="6" width="13" height="12" rx="2.5" fill="#ffffff" opacity="0.95" />
        <path d="M15 10l5-3.5a0.8 0.8 0 0 1 1.2.7v9.6a0.8 0.8 0 0 1-1.2.7L15 14v-4z" fill="#ffffff" opacity="0.95" />
      </g>
      <line x1="2" y1="21" x2="21" y2="2" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function MemberMicIcon({ isOn, id = 'mic' }) {
  const maskId = `micSlashMask_${id}`;
  if (isOn) {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <rect x="8.5" y="2" width="7" height="12" rx="3.5" fill="#22c55e" />
        <path d="M5.5 10v1a6.5 6.5 0 0 0 13 0v-1" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="17.5" x2="12" y2="21" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="21" x2="16" y2="21" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <mask id={maskId}>
        <rect width="24" height="24" fill="white" />
        <line x1="2" y1="21" x2="21" y2="2" stroke="black" strokeWidth="3" />
      </mask>
      <g mask={`url(#${maskId})`}>
        <rect x="8.5" y="2" width="7" height="12" rx="3.5" fill="#ffffff" opacity="0.95" />
        <path d="M5.5 10v1a6.5 6.5 0 0 0 13 0v-1" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.95" />
        <line x1="12" y1="17.5" x2="12" y2="21" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.95" />
        <line x1="8" y1="21" x2="16" y2="21" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.95" />
      </g>
      <line x1="2" y1="21" x2="21" y2="2" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
