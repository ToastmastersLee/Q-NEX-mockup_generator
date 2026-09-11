import { Database } from 'lucide-react';
import { useTranslation } from '../../i18n';
import { IqLogo } from '../common';
import { sidebarItems, projectItems } from './navigationConfig';

export function Sidebar({ activePage, onSelectPage, isProjectOpen, setIsProjectOpen }) {
  const { t } = useTranslation('common');

  const getSidebarLabel = (label) => {
    const map = {
      'Subtitle': t('sidebar.subtitle', 'Subtitle'),
      'Logo': t('sidebar.logo', 'Logo'),
      'TitleTrailer': t('sidebar.titleTrailer', 'TitleTrailer'),
      'OSD': t('sidebar.osd', 'OSD'),
      'Record': t('sidebar.record', 'Record'),
      'Live': t('sidebar.live', 'Live'),
      'Video Matting': t('sidebar.videoMatting', 'Video Matting'),
      'Interaction': t('sidebar.interaction', 'Interaction'),
      'Broadcast': t('sidebar.broadcast', 'Broadcast'),
      'IP': t('sidebar.ip', 'IP'),
      'System': t('sidebar.system', 'System'),
      'Version': t('sidebar.version', 'Version'),
      'Project': t('sidebar.project', 'Project'),
      'Input': t('sidebar.input', 'Input'),
      'Output': t('sidebar.output', 'Output'),
      'Audio': t('sidebar.audio', 'Audio'),
      'PTZ': t('sidebar.ptz', 'PTZ'),
      'Upload': t('sidebar.upload', 'Upload'),
      'Storage': t('sidebar.storage', 'Storage'),
      'Platform': t('sidebar.platform', 'Platform'),
      'Peripheral': t('sidebar.peripheral', 'Peripheral'),
      'PowerSupply': t('sidebar.powerSupply', 'PowerSupply'),
      'Factory': t('sidebar.factory', 'Factory'),
      'User Management': t('sidebar.userManagement', 'User Management'),
      'Tracker': t('sidebar.tracker', 'Tracker'),
      'TrackerDebug': t('sidebar.trackerDebug', 'TrackerDebug'),
      'Guiding Strategy': t('sidebar.guidingStrategy', 'Guiding Strategy'),
    };
    return map[label] || label;
  };

  return (
    <aside className="lcs-web-sidebar">
      <div className="lcs-web-brand">
        <IqLogo size={32} />
      </div>
      <nav className="lcs-web-side-list">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              type="button"
              className={activePage === item.label ? 'is-active' : ''}
              onClick={() => ['Subtitle', 'Logo', 'TitleTrailer', 'OSD', 'Video Matting', 'Interaction', 'Broadcast', 'Record', 'Live', 'IP', 'System', 'Version'].includes(item.label) && onSelectPage(item.label)}
            >
              <Icon size={16} />
              <span>{getSidebarLabel(item.label)}</span>
            </button>
          );
        })}
        <div className="lcs-web-side-project">
          <button
            type="button"
            className={`lcs-web-project-header ${isProjectOpen ? 'is-open' : ''}`}
            onClick={() => setIsProjectOpen(prev => !prev)}
          >
            <Database size={16} />
            <span>{getSidebarLabel('Project')}</span>
            <small>{isProjectOpen ? '▲' : '▼'}</small>
          </button>
          {isProjectOpen && (
            <div className="lcs-web-project-subitems">
              {projectItems.map(item => (
                <button
                  key={item}
                  type="button"
                  className={`lcs-web-project-subitem ${activePage === item ? 'is-active' : ''}`}
                  onClick={() => ['Input', 'Output', 'Audio', 'PTZ', 'Upload', 'Storage', 'Platform', 'Peripheral', 'PowerSupply', 'Factory', 'User Management', 'Tracker', 'TrackerDebug', 'Guiding Strategy'].includes(item) && onSelectPage(item)}
                >
                  <span>{getSidebarLabel(item)}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}
