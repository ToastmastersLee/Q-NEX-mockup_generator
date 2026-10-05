/**
 * SL100 Serial Port Settings Configuration Constants & Options
 */

export const SERIAL_PORT_TABS = ['RS232-01', 'RS232-02', 'RS485-01', 'RS485-02'];

export const SL100_SERIAL_TABS = [
  { id: 'ptz', label: 'PTZ Camera' },
  { id: 'lcd1', label: 'Interactive LCD Display' },
  { id: 'lcd2', label: 'Interactive LCD Display' },
  { id: 'lcd3', label: 'Interactive LCD Display' },
];

export const SERIAL_DEVICE_TYPE_OPTIONS = [
  'Not selected',
  'Interactive LCD Display',
  'Lecture Capture',
  'PTZ Camera',
  'Projector',
  'Other equipment',
];

export const SERIAL_CODE_LIST_OPTIONS = [
  'Customize',
  'TR1310C Pro',
  'QA1300 Pro',
  'QA1400 Pro',
  'TE1410D Pro',
];

export const SERIAL_BAUD_RATE_OPTIONS = [
  '1200',
  '2400',
  '4800',
  '9600',
  '19200',
  '38400',
  '57600',
  '115200',
];

export const SERIAL_PARITY_CHECK_OPTIONS = [
  'None',
  'Odd Parity',
  'Even Parity',
];

const DEFAULT_LCD_CODES = [
  { id: 1, name: 'Power On', code: 'AA BB CC 01 00 00 01 DD EE FF', enabled: true },
  { id: 2, name: 'Power Off', code: 'AA BB CC 01 01 00 02 DD EE FF', enabled: true },
  { id: 3, name: 'Lock On', code: '', enabled: false },
  { id: 4, name: 'Lock Off', code: '', enabled: true },
  { id: 5, name: 'Child lock ON', code: '', enabled: true },
  { id: 6, name: 'Child lock OFF', code: '', enabled: true },
  { id: 7, name: 'Energy saving ON', code: '', enabled: false },
  { id: 8, name: 'Energy saving OFF', code: '', enabled: false },
  { id: 9, name: 'Volume +', code: 'AA BB CC 02 01 00 00 DD EE FF', enabled: true },
  { id: 10, name: 'Volume -', code: 'AA BB CC 02 02 00 00 DD EE FF', enabled: true },
  { id: 11, name: 'Mute ON', code: 'AA BB CC 02 03 00 00 DD EE FF', enabled: true },
  { id: 12, name: 'Mute OFF', code: 'AA BB CC 02 04 00 00 DD EE FF', enabled: true },
  { id: 13, name: 'Brightness +', code: 'AA BB CC 03 01 00 00 DD EE FF', enabled: true },
  { id: 14, name: 'Brightness -', code: 'AA BB CC 03 02 00 00 DD EE FF', enabled: true },
  { id: 15, name: 'Input OPS', code: 'AA BB CC 04 01 00 00 DD EE FF', enabled: true },
  { id: 16, name: 'Input HDMI', code: 'AA BB CC 04 02 00 00 DD EE FF', enabled: true },
  { id: 17, name: 'Input Android', code: 'AA BB CC 04 03 00 00 DD EE FF', enabled: true },
];

export const DEFAULT_SERIAL_PORT_CONFIGS = {
  'RS232-01': {
    port: 'RS232-01',
    deviceType: 'PTZ Camera',
    name: 'PTZ Camera',
    protocol: 'VISCA',
    codeList: 'VISCA Protocol',
    baudRate: '9600',
    parityCheck: 'None',
    codes: [
      { id: 1, name: 'Power On', code: '81 01 04 00 02 FF', enabled: true },
      { id: 2, name: 'Power Off', code: '81 01 04 00 03 FF', enabled: true },
      { id: 3, name: 'Pan Up', code: '81 01 06 01 08 08 03 01 FF', enabled: true },
      { id: 4, name: 'Pan Down', code: '81 01 06 01 08 08 03 02 FF', enabled: true },
      { id: 5, name: 'Pan Left', code: '81 01 06 01 08 08 01 03 FF', enabled: true },
      { id: 6, name: 'Pan Right', code: '81 01 06 01 08 08 02 03 FF', enabled: true },
      { id: 7, name: 'Pan Stop', code: '81 01 06 01 08 08 03 03 FF', enabled: true },
      { id: 8, name: 'Zoom In', code: '81 01 04 07 24 FF', enabled: true },
      { id: 9, name: 'Zoom Out', code: '81 01 04 07 34 FF', enabled: true },
      { id: 10, name: 'Zoom Stop', code: '81 01 04 07 00 FF', enabled: true },
      { id: 11, name: 'Auto Focus (AF)', code: '81 01 04 38 02 FF', enabled: true },
      { id: 12, name: 'Preset Home', code: '81 01 06 04 FF', enabled: true },
    ],
  },
  'RS232-02': {
    port: 'RS232-02',
    deviceType: 'Interactive LCD Display',
    name: 'Interactive LCD Display',
    protocol: 'TR1310C Pro',
    codeList: 'TR1310C Pro',
    baudRate: '9600',
    parityCheck: 'None',
    codes: DEFAULT_LCD_CODES,
  },
  'RS485-01': {
    port: 'RS485-01',
    deviceType: 'Interactive LCD Display',
    name: 'Interactive LCD Display',
    protocol: 'TR1310C Pro',
    codeList: 'TR1310C Pro',
    baudRate: '9600',
    parityCheck: 'None',
    codes: DEFAULT_LCD_CODES,
  },
  'RS485-02': {
    port: 'RS485-02',
    deviceType: 'Interactive LCD Display',
    name: 'Interactive LCD Display',
    protocol: 'TR1310C Pro',
    codeList: 'TR1310C Pro',
    baudRate: '9600',
    parityCheck: 'None',
    codes: DEFAULT_LCD_CODES,
  },
};
