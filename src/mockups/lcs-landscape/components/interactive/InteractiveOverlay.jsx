import React from 'react';
import { useLcs } from '../../context/LcsContext';
import { DiscussionRoom } from './DiscussionRoom';
import { InteractiveRoom } from './InteractiveRoom';
import { InteractiveHeader } from './InteractiveHeader';
import { InteractiveHomeCards } from './InteractiveHomeCards';
import { InteractiveStartPanel } from './InteractiveStartPanel';
import { InteractiveJoinPanel } from './InteractiveJoinPanel';
import { InteractiveSipModal } from './InteractiveSipModal';

export function InteractiveOverlay() {
  const { activeMenuSection, interactiveSubPage } = useLcs();

  if (activeMenuSection !== 'interactive') {
    return null;
  }

  return (
    <div className="lcs-full-interactive-overlay">
      {/* Header bar */}
      <InteractiveHeader />

      {/* Home sub-view */}
      {interactiveSubPage === 'home' && <InteractiveHomeCards />}

      {/* Start sub-page */}
      <InteractiveStartPanel />

      {/* Join Class sub-page */}
      <InteractiveJoinPanel />

      {/* Active Discussion Room View */}
      <DiscussionRoom />

      {/* Active Interactive Room View */}
      <InteractiveRoom />

      {/* SIP Call modal overlay */}
      <InteractiveSipModal />
    </div>
  );
}
