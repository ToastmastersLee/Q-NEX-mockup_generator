import { Film } from 'lucide-react';
import { useLcs } from '../../context/LcsContext';

/**
 * PgmDirectorLayout - Renders the live Program (PGM) multi-layout output
 * Reused in both DirectorView and DiscussionRoom presentation feed.
 */
export function PgmDirectorLayout({ isDiscussionFeed = false }) {
  const {
    currentLayout,
    layoutChannels,
    channels,
    channelImages,
    pipPosition,
    pipSize,
    selectedChannel,
    handleSelectRightChannel
  } = useLcs();

  const containerClassName = isDiscussionFeed ? 'lcs-pgm-feed-container is-discussion' : 'lcs-pgm-feed-container';

  return (
    <div className={containerClassName}>
      {currentLayout === 'l1' && (
        <div className="lcs-layout-l1">
          {(() => {
            const ch = channels.find(c => c.id === layoutChannels.l1.main) || { name: 'Empty', label: 'CH', type: 'placeholder' };
            return ch.type === 'placeholder' ? (
              <div className="lcs-placeholder-screen">
                <Film size={isDiscussionFeed ? 36 : 64} className="opacity-40 animate-pulse" />
                <span>No Active Video Input ({ch.label})</span>
              </div>
            ) : (
              <div className="lcs-full-video-box">
                <img src={channelImages[ch.id]} alt="l1" className="lcs-feed-img" style={{ objectPosition: ch.pos }} />
                <span className="lcs-split-label active">{ch.name} ({ch.label})</span>
              </div>
            );
          })()}
        </div>
      )}

      {currentLayout === 'l2' && (
        <div className="lcs-layout-l2">
          {(() => {
            const mainCh = channels.find(c => c.id === layoutChannels.l2.main) || { name: 'Empty', label: 'CH', type: 'placeholder' };
            const pipCh = channels.find(c => c.id === layoutChannels.l2.pip) || { name: 'Empty', label: 'CH', type: 'placeholder' };
            return (
              <>
                {mainCh.type === 'placeholder' ? (
                  <div className="lcs-placeholder-screen">
                    <Film size={isDiscussionFeed ? 32 : 48} className="opacity-40" />
                    <span>{mainCh.name} ({mainCh.label})</span>
                  </div>
                ) : (
                  <div className="lcs-full-video-box">
                    <img src={channelImages[mainCh.id]} alt="l2-main" className="lcs-feed-img" style={{ objectPosition: mainCh.pos }} />
                    <span className="lcs-split-label">{mainCh.name} ({mainCh.label})</span>
                  </div>
                )}
                
                <div className={`lcs-pip-box ${pipPosition} size-${pipSize}`}>
                  {pipCh.type === 'placeholder' ? (
                    <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center">
                      <Film size={16} className="opacity-40" />
                    </div>
                  ) : (
                    <img src={channelImages[pipCh.id]} alt="l2-pip" className="lcs-feed-img" style={{ objectPosition: pipCh.pos }} />
                  )}
                  <span className="lcs-pip-label">{pipCh.name} ({pipCh.label})</span>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {currentLayout === 'l3' && (
        <div className="lcs-layout-l3">
          {(() => {
            const leftCh = channels.find(c => c.id === layoutChannels.l3.left) || { name: 'Empty', label: 'CH', type: 'placeholder' };
            const rightCh = channels.find(c => c.id === layoutChannels.l3.right) || { name: 'Empty', label: 'CH', type: 'placeholder' };
            return (
              <>
                <div className="lcs-split-half">
                  {leftCh.type === 'placeholder' ? (
                    <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center">
                      <Film size={isDiscussionFeed ? 18 : 24} className="opacity-40" />
                    </div>
                  ) : (
                    <img src={channelImages[leftCh.id]} alt="l3-left" className="lcs-feed-img" style={{ objectPosition: leftCh.pos }} />
                  )}
                  <span className="lcs-split-label">{leftCh.name} ({leftCh.label})</span>
                </div>
                <div className="lcs-split-half">
                  {rightCh.type === 'placeholder' ? (
                    <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center">
                      <Film size={isDiscussionFeed ? 18 : 24} className="opacity-40" />
                    </div>
                  ) : (
                    <img src={channelImages[rightCh.id]} alt="l3-right" className="lcs-feed-img" style={{ objectPosition: rightCh.pos }} />
                  )}
                  <span className="lcs-split-label active">{rightCh.name} ({rightCh.label})</span>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {currentLayout === 'l4' && (
        <div className="lcs-layout-l4">
          {(() => {
            const mainCh = channels.find(c => c.id === layoutChannels.l4.main) || { name: 'Empty', label: 'CH', type: 'placeholder' };
            const pipCh = channels.find(c => c.id === layoutChannels.l4.pip) || { name: 'Empty', label: 'CH', type: 'placeholder' };
            return (
              <>
                {mainCh.type === 'placeholder' ? (
                  <div className="lcs-placeholder-screen">
                    <Film size={isDiscussionFeed ? 32 : 48} className="opacity-40" />
                    <span>{mainCh.name} ({mainCh.label})</span>
                  </div>
                ) : (
                  <div className="lcs-full-video-box">
                    <img src={channelImages[mainCh.id]} alt="l4-main" className="lcs-feed-img" style={{ objectPosition: mainCh.pos }} />
                    <span className="lcs-split-label">{mainCh.name} ({mainCh.label})</span>
                  </div>
                )}
                
                <div className="lcs-pip-box bottom-left">
                  {pipCh.type === 'placeholder' ? (
                    <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center">
                      <Film size={16} className="opacity-40" />
                    </div>
                  ) : (
                    <img src={channelImages[pipCh.id]} alt="l4-pip" className="lcs-feed-img" style={{ objectPosition: pipCh.pos }} />
                  )}
                  <span className="lcs-pip-label">{pipCh.name} ({pipCh.label})</span>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {currentLayout === 'l5' && (
        <div className="lcs-split-screen">
          {(() => {
            const tlCh = channels.find(c => c.id === layoutChannels.l5.topLeft) || { name: 'Empty', label: 'CH', type: 'placeholder' };
            const blCh = channels.find(c => c.id === layoutChannels.l5.bottomLeft) || { name: 'Empty', label: 'CH', type: 'placeholder' };
            const rightCh = channels.find(c => c.id === layoutChannels.l5.right) || { name: 'Empty', label: 'CH', type: 'placeholder' };
            return (
              <>
                <div className="lcs-split-left-col-2rows">
                  <div className="lcs-split-small-box">
                    {tlCh.type === 'placeholder' ? (
                      <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center"><Film size={14} className="opacity-30" /></div>
                    ) : (
                      <img src={channelImages[tlCh.id]} alt="l5-tl" className="lcs-feed-img" style={{ objectPosition: tlCh.pos }} />
                    )}
                    <span className="lcs-split-label">{tlCh.name} ({tlCh.label})</span>
                  </div>
                  <div className="lcs-split-small-box">
                    {blCh.type === 'placeholder' ? (
                      <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center"><Film size={14} className="opacity-30" /></div>
                    ) : (
                      <img src={channelImages[blCh.id]} alt="l5-bl" className="lcs-feed-img" style={{ objectPosition: blCh.pos }} />
                    )}
                    <span className="lcs-split-label">{blCh.name} ({blCh.label})</span>
                  </div>
                </div>
                <div className="lcs-split-right-col">
                  <div className="lcs-split-large-box">
                    {rightCh.type === 'placeholder' ? (
                      <div className="lcs-placeholder-screen"><Film size={isDiscussionFeed ? 32 : 48} className="opacity-30" /></div>
                    ) : (
                      <img src={channelImages[rightCh.id]} alt="l5-right" className="lcs-feed-img" style={{ objectPosition: rightCh.pos }} />
                    )}
                    <span className="lcs-split-label active">{rightCh.name} ({rightCh.label}) - Main Out</span>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {currentLayout === 'l6' && (
        <div className="lcs-split-screen lcs-layout-l6">
          {(() => {
            const r1Ch = channels.find(c => c.id === layoutChannels.l6.row1) || { name: 'Empty', label: 'CH', type: 'placeholder' };
            const r2Ch = channels.find(c => c.id === layoutChannels.l6.row2) || { name: 'Empty', label: 'CH', type: 'placeholder' };
            const r3Ch = channels.find(c => c.id === layoutChannels.l6.row3) || { name: 'Empty', label: 'CH', type: 'placeholder' };
            const rightCh = channels.find(c => c.id === layoutChannels.l6.right) || { name: 'Empty', label: 'CH', type: 'placeholder' };
            return (
              <>
                <div className="lcs-split-left-col-3rows">
                  <div className="lcs-split-small-box">
                    {r1Ch.type === 'placeholder' ? (
                      <div className="lcs-ch-thumb-placeholder bg-slate-950 w-full h-full flex items-center justify-center"><Film size={12} className="opacity-30" /></div>
                    ) : (
                      <img src={channelImages[r1Ch.id]} alt="l6-r1" className="lcs-feed-img" style={{ objectPosition: r1Ch.pos }} />
                    )}
                    <span className="lcs-split-label">{r1Ch.name} ({r1Ch.label})</span>
                  </div>
                  <div className="lcs-split-small-box">
                    {r2Ch.type === 'placeholder' ? (
                      <div className="lcs-ch-thumb-placeholder bg-slate-950 w-full h-full flex items-center justify-center"><Film size={12} className="opacity-30" /></div>
                    ) : (
                      <img src={channelImages[r2Ch.id]} alt="l6-r2" className="lcs-feed-img" style={{ objectPosition: r2Ch.pos }} />
                    )}
                    <span className="lcs-split-label">{r2Ch.name} ({r2Ch.label})</span>
                  </div>
                  <div className="lcs-split-small-box">
                    {r3Ch.type === 'placeholder' ? (
                      <div className="lcs-ch-thumb-placeholder bg-slate-950 w-full h-full flex items-center justify-center"><Film size={12} className="opacity-30" /></div>
                    ) : (
                      <img src={channelImages[r3Ch.id]} alt="l6-r3" className="lcs-feed-img" style={{ objectPosition: r3Ch.pos }} />
                    )}
                    <span className="lcs-split-label">{r3Ch.name} ({r3Ch.label})</span>
                  </div>
                </div>
                <div className="lcs-split-right-col">
                  <div className="lcs-split-large-box">
                    {rightCh.type === 'placeholder' ? (
                      <div className="lcs-placeholder-screen"><Film size={isDiscussionFeed ? 32 : 48} className="opacity-30" /></div>
                    ) : (
                      <img src={channelImages[rightCh.id]} alt="l6-right" className="lcs-feed-img" style={{ objectPosition: rightCh.pos }} />
                    )}
                    <span className="lcs-split-label active">{rightCh.name} ({rightCh.label})</span>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {currentLayout === 'l7' && (
        <div className="lcs-layout-l7">
          {(() => {
            const tlCh = channels.find(c => c.id === layoutChannels.l7.tl) || { name: 'Empty', label: 'CH', type: 'placeholder' };
            const trCh = channels.find(c => c.id === layoutChannels.l7.tr) || { name: 'Empty', label: 'CH', type: 'placeholder' };
            const blCh = channels.find(c => c.id === layoutChannels.l7.bl) || { name: 'Empty', label: 'CH', type: 'placeholder' };
            const brCh = channels.find(c => c.id === layoutChannels.l7.br) || { name: 'Empty', label: 'CH', type: 'placeholder' };
            return (
              <>
                <div className="lcs-grid-cell">
                  {tlCh.type === 'placeholder' ? (
                    <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center"><Film size={isDiscussionFeed ? 18 : 24} className="opacity-30" /></div>
                  ) : (
                    <img src={channelImages[tlCh.id]} alt="l7-tl" className="lcs-feed-img" style={{ objectPosition: tlCh.pos }} />
                  )}
                  <span className="lcs-split-label">{tlCh.name} ({tlCh.label})</span>
                </div>
                <div className="lcs-grid-cell">
                  {trCh.type === 'placeholder' ? (
                    <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center"><Film size={isDiscussionFeed ? 18 : 24} className="opacity-30" /></div>
                  ) : (
                    <img src={channelImages[trCh.id]} alt="l7-tr" className="lcs-feed-img" style={{ objectPosition: trCh.pos }} />
                  )}
                  <span className="lcs-split-label active">{trCh.name} ({trCh.label})</span>
                </div>
                <div className="lcs-grid-cell">
                  {blCh.type === 'placeholder' ? (
                    <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center"><Film size={isDiscussionFeed ? 18 : 24} className="opacity-30" /></div>
                  ) : (
                    <img src={channelImages[blCh.id]} alt="l7-bl" className="lcs-feed-img" style={{ objectPosition: blCh.pos }} />
                  )}
                  <span className="lcs-split-label">{blCh.name} ({blCh.label})</span>
                </div>
                <div className="lcs-grid-cell">
                  {brCh.type === 'placeholder' ? (
                    <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center"><Film size={isDiscussionFeed ? 18 : 24} className="opacity-30" /></div>
                  ) : (
                    <img src={channelImages[brCh.id]} alt="l7-br" className="lcs-feed-img" style={{ objectPosition: brCh.pos }} />
                  )}
                  <span className="lcs-split-label">{brCh.name} ({brCh.label})</span>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {currentLayout === 'l8' && (
        <div className="lcs-all-layout-featured">
          {/* Left: Preview Grid of all channels */}
          <div className="lcs-all-preview-grid">
            {channels.map((ch) => {
              const activeMainId = layoutChannels.l8?.main || selectedChannel;
              const isMain = ch.id === activeMainId;
              return (
                <div 
                  key={ch.id} 
                  className={`lcs-all-grid-cell ${isMain ? 'is-main-selected' : ''}`}
                  onClick={() => handleSelectRightChannel && handleSelectRightChannel(ch.id)}
                >
                  {ch.type === 'placeholder' ? (
                    <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center">
                      <Film size={14} className="opacity-35" />
                    </div>
                  ) : (
                    <img src={channelImages[ch.id]} alt={ch.name} className="lcs-feed-img" style={{ objectPosition: ch.pos }} />
                  )}
                  <span className="lcs-split-label">{ch.name}</span>
                  {isMain && <span className="lcs-all-main-badge">MAIN</span>}
                </div>
              );
            })}
          </div>

          {/* Right Stage: Prominent Main Channel Screen */}
          <div className="lcs-all-stage-card">
            {(() => {
              const mainChId = layoutChannels.l8?.main || selectedChannel;
              const mainCh = channels.find(c => c.id === mainChId) || channels[0];
              return (
                <div className="lcs-all-stage-card">
                  {mainCh.type === 'placeholder' ? (
                    <div className="lcs-placeholder-screen"><Film size={isDiscussionFeed ? 36 : 54} className="opacity-30" /></div>
                  ) : (
                    <img src={channelImages[mainCh.id]} alt={mainCh.name} className="lcs-feed-img" style={{ objectPosition: mainCh.pos }} />
                  )}
                  <div className="lcs-all-stage-overlay">
                    <span className="lcs-stage-main-badge">MAIN CHANNEL OUT</span>
                    <span className="lcs-stage-channel-name">{mainCh.name} ({mainCh.label})</span>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
