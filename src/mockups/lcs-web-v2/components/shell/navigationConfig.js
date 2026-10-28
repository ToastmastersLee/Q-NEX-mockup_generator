import {
  Captions,
  FileVideo,
  HardDrive,
  Layers,
  Megaphone,
  MonitorCog,
  Network,
  Podcast,
  Settings,
  ShieldCheck,
  Users,
  Video,
} from 'lucide-react';

export const sidebarItems = [
  { label: 'Subtitle', key: 'subtitle', icon: Captions },
  { label: 'Logo', key: 'logo', icon: ShieldCheck },
  { label: 'TitleTrailer', key: 'titleTrailer', icon: FileVideo },
  { label: 'OSD', key: 'osd', icon: MonitorCog },
  { label: 'Record', key: 'record', icon: Video },
  { label: 'Live', key: 'live', icon: Podcast },
  { label: 'Video Matting', key: 'videoMatting', icon: Layers },
  { label: 'Interaction', key: 'interaction', icon: Users },
  { label: 'Broadcast', key: 'broadcast', icon: Megaphone },
  { label: 'IP', key: 'ip', icon: Network },
  { label: 'System', key: 'system', icon: Settings },
  { label: 'Version', key: 'version', icon: HardDrive },
];

export const projectItems = [
  'Input',
  'Output',
  'Audio',
  'PTZ',
  'Upload',
  'Storage',
  'Platform',
  'Peripheral',
  'PowerSupply',
  'Factory',
  'User Management',
  'Tracker',
  'Guiding Strategy',
  'TrackerDebug',
];

export function getInitialActivePage() {
  if (typeof window === 'undefined') return 'Subtitle';
  const rawPage = (new URLSearchParams(window.location.search).get('page') || '').toLowerCase().replace(/[-_]/g, '');
  const pageMap = {
    main: 'Main',
    recordings: 'Recordings',
    input: 'Input',
    subtitle: 'Subtitle',
    logo: 'Logo',
    titletrailer: 'TitleTrailer',
    osd: 'OSD',
    interaction: 'Interaction',
    broadcast: 'Broadcast',
    ptz: 'PTZ',
    upload: 'Upload',
    storage: 'Storage',
    platform: 'Platform',
    peripheral: 'Peripheral',
    powersupply: 'PowerSupply',
    power: 'PowerSupply',
    factory: 'Factory',
    usermanagement: 'User Management',
    tracker: 'Tracker',
    trackerdebug: 'TrackerDebug',
    record: 'Record',
    version: 'Version',
    system: 'System',
    ip: 'IP',
    live: 'Live',
    videomatting: 'Video Matting',
    matting: 'Video Matting',
    audio: 'Audio',
    output: 'Output',
    automaticswitching: 'Guiding Strategy',
    guidingstrategy: 'Guiding Strategy',
  };
  if (pageMap[rawPage]) return pageMap[rawPage];
  const page = new URLSearchParams(window.location.search).get('page');
  return page === 'main' ? 'Main' : page === 'recordings' ? 'Recordings' : page === 'input' ? 'Input' : 'Subtitle';
}
