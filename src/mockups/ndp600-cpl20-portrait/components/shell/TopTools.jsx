import { RefreshCcw, Link, Settings } from 'lucide-react';
import { IconButton } from '../common';

export function TopTools({ onSettingsClick }) {
  return (
    <div className="ndp-top-tools">
      <IconButton label="Refresh"><RefreshCcw size={24} /></IconButton>
      <IconButton label="Bind"><Link size={23} /></IconButton>
      <IconButton label="Settings" onClick={onSettingsClick}><Settings size={24} /></IconButton>
    </div>
  );
}
