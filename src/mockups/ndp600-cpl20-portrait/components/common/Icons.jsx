export const WindowsIcon = ({ size = 22, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M 3,4.5 L 9.5,3.5 L 9.5,11.5 L 3,11.5 Z" />
    <path d="M 3,12.5 L 9.5,12.5 L 9.5,20.5 L 3,19.5 Z" />
    <path d="M 11,3.3 L 21,1.8 L 21,11.5 L 11,11.5 Z" />
    <path d="M 11,12.5 L 21,12.5 L 21,22.2 L 11,20.7 Z" />
  </svg>
);

export const AndroidIcon = ({ size = 22, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M 6,10 A 6,6 0 0,1 18,10 Z" />
    <line x1="9" y1="4.5" x2="7.5" y2="2.5" />
    <line x1="15" y1="4.5" x2="16.5" y2="2.5" />
    <circle cx="9.5" cy="7" r="0.75" fill="currentColor" stroke="none" />
    <circle cx="14.5" cy="7" r="0.75" fill="currentColor" stroke="none" />
    <path d="M 6,11.5 L 18,11.5 L 18,16.5 A 2,2 0 0,1 16,18.5 L 8,18.5 A 2,2 0 0,1 6,16.5 Z" />
    <rect x="3" y="11.5" width="2" height="4.5" rx="1" />
    <rect x="19" y="11.5" width="2" height="4.5" rx="1" />
    <rect x="8.5" y="18.5" width="2" height="3" rx="1" />
    <rect x="13.5" y="18.5" width="2" height="3" rx="1" />
  </svg>
);
