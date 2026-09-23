export function IqLogo({ size = 32, className = '' }) {
  return (
    <img
      src="/iq_logo.png"
      alt="IQ Logo"
      style={{ height: `${size}px`, width: 'auto', objectFit: 'contain' }}
      className={`lcs-web-logo-img select-none ${className}`}
    />
  );
}

