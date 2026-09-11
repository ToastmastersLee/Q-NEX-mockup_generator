export function IqLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="8" fill="#1890ff" />
      <path d="M12 14h6v20h-6V14z" fill="#ffffff" />
      <circle cx="15" cy="9" r="3" fill="#ffffff" />
      <path
        d="M26 24c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c-2.4 0-4.6-.85-6.3-2.27L26 35v-2.5l2.2-1.8C26.8 28.9 26 26.5 26 24z"
        fill="#ffffff"
      />
      <circle cx="36" cy="24" r="5" fill="#1890ff" />
    </svg>
  );
}
