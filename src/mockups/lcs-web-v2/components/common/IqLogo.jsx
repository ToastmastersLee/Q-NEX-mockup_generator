import logoUrl from '../../assets/iq_logo.png';
export function IqLogo({ size = 32, className = '' }) {
  return (
    <img
      src={logoUrl}
      alt="IQ Logo"
      style={{ height: `${size}px`, width: 'auto', objectFit: 'contain' }}
      className={`lcs-web-logo-img select-none ${className}`}
    />
  );
}

