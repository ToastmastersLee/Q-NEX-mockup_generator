import { Home, Volume2, Laptop } from 'lucide-react';
import {
  AirConditionerIcon,
  DocCamIcon,
  HdmiIcon,
  PowerControlIcon,
  ProjectorScreenIcon,
  RemoteControlIcon,
  SerialIcon,
  VideoSwitchIcon,
} from '../../../assets/Icons';

export const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'power', label: 'Power Control', icon: PowerControlIcon },
  { id: 'video', label: 'Video Switch', icon: VideoSwitchIcon },
  { id: 'serial', label: 'Serial Control', icon: SerialIcon },
  { id: 'volume', label: 'Vol.', icon: Volume2 },
  { id: 'air', label: 'Air Conditioner', icon: AirConditionerIcon },
  { id: 'projector', label: 'Projection Screen', icon: ProjectorScreenIcon },
  { id: 'remote', label: 'Remote Control', icon: RemoteControlIcon },
];

export const defaultNavConfig = {
  power: true,
  video: true,
  volume: true,
  serial: true,
  air: true,
  projector: true,
  remote: true,
};

export const menuConfigItems = [
  { id: 'power', label: 'Power Control' },
  { id: 'video', label: 'Video Switch' },
  { id: 'volume', label: 'Vol.' },
  { id: 'serial', label: 'Serial Control' },
  { id: 'air', label: 'Air Conditioner' },
  { id: 'projector', label: 'Projection Screen' },
  { id: 'remote', label: 'Remote Control' },
];

export const inputOptions = [
  { id: 'hdmi1', label: 'HDMI in 1', icon: Laptop },
  { id: 'hdmi2', label: 'HDMI in 2', icon: HdmiIcon },
  { id: 'ops', label: 'OPS', icon: DocCamIcon },
];

export const readQuery = (name) => new URLSearchParams(window.location.search).get(name);

export function getInitialTab() {
  const tab = readQuery('tab');
  return navItems.some((item) => item.id === tab) ? tab : 'power';
}
