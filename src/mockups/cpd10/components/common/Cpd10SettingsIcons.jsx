import React from 'react';

/**
 * SerialPortSettingsIcon
 * Faithful vector recreation of the DB9 RS232 Serial Port icon on CPD10 hardware Settings Hub.
 * Features a solid rounded trapezoid with 4 top cutouts and 5 bottom cutouts (9-pin D-sub).
 */
export function SerialPortSettingsIcon({ size = 26, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
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

/**
 * HdmiPortSettingsIcon
 * Faithful vector recreation of the HDMI OUT Resolution receptacle port icon on CPD10 hardware Settings Hub.
 * Features a solid HDMI silhouette with rounded top, chamfered lower edges, and a central slot cutout.
 */
export function HdmiPortSettingsIcon({ size = 26, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
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
