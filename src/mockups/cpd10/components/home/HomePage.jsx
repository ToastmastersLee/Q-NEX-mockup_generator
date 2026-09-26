import { useCpd10 } from '../../context/Cpd10Context';
import { VideoSwitchDuplicate } from './VideoSwitchDuplicate';
import { VideoSwitchMatrix } from './VideoSwitchMatrix';
import { AudioControls } from './AudioControls';
import { PowerRelayRow } from './PowerRelayRow';

export function HomePage() {
  const { duplicateMode } = useCpd10();

  return (
    <div className="cpd10-page-content cpd10-home-page">
      {/* Top Section */}
      <div className="cpd10-home-top-row">
        {duplicateMode ? (
          <VideoSwitchDuplicate key="dup" />
        ) : (
          <VideoSwitchMatrix key="matrix" />
        )}
        <AudioControls />
      </div>

      {/* Bottom Section */}
      <PowerRelayRow />
    </div>
  );
}
