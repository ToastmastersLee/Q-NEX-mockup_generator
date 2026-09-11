import { useLcs } from '../../context/LcsContext';

export function LayoutConfigModal() {
  const {
    isChannelSelectOpen,
    setIsChannelSelectOpen,
    activeEditSlot,
    setActiveEditSlot,
    selectedLayoutToEdit,
    layoutChannels,
    setLayoutChannels,
    channels,
    layoutSlotConfigs,
    level1ModalOpen,
    setLevel1ModalOpen,
    level1TargetLayout,
    level2TargetSlot,
    setLevel2TargetSlot,
    pipPosition,
    setPipPosition,
    pipSize,
    setPipSize,
    setSelectedChannel,
    levelInteractionRef
  } = useLcs();

  return (
    <>
      {/* Channel Selector Double-click Popup Modal */}
      {isChannelSelectOpen && (
        <div className="lcs-layout-edit-popup">
          {/* Close button X */}
          <button
            type="button"
            className="lcs-edit-close-x"
            onClick={() => setIsChannelSelectOpen(false)}
            title="Close popup"
          >
            ✕
          </button>

          {/* Top Row: Channel selection bar CH1 to CH7 */}
          {activeEditSlot && (
            <div className="lcs-edit-channels-row">
              {channels.map((ch) => {
                const isChSelected = layoutChannels[selectedLayoutToEdit]?.[activeEditSlot] === ch.id;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    className={`lcs-edit-ch-btn ${isChSelected ? 'is-selected' : ''}`}
                    onClick={() => {
                      setLayoutChannels(prev => ({
                        ...prev,
                        [selectedLayoutToEdit]: {
                          ...prev[selectedLayoutToEdit],
                          [activeEditSlot]: ch.id
                        }
                      }));
                    }}
                  >
                    {ch.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Divider line */}
          <div className="lcs-edit-divider" />

          {/* Bottom Row: Slots list and OK button */}
          <div className="lcs-edit-bottom-row">
            <div className="lcs-edit-slots-group">
              {layoutSlotConfigs[selectedLayoutToEdit]?.map((slot) => {
                const currentChId = layoutChannels[selectedLayoutToEdit]?.[slot.key];
                const chDetail = channels.find(c => c.id === currentChId) || { label: 'CH' };
                const isSlotEditing = activeEditSlot === slot.key;
                return (
                  <div key={slot.key} className="lcs-edit-slot-block">
                    <button
                      type="button"
                      className={`lcs-edit-slot-btn ${isSlotEditing ? 'is-active' : ''}`}
                      onClick={() => setActiveEditSlot(slot.key)}
                    >
                      {chDetail.label}
                    </button>
                    <span className="lcs-edit-slot-label">{slot.label}</span>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              className="lcs-edit-ok-btn"
              onClick={() => setIsChannelSelectOpen(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* 2-Level Layout Configuration Modal Overlays */}
      {level1ModalOpen && (
        <div ref={levelInteractionRef} className="lcs-level-interaction-container">
          {/* Level 2 Channel / Option Picker Overlay (Pops up directly above Level 1) */}
          {level2TargetSlot && (
            <div className="lcs-level2-popup animate-fadeIn">
              <div className="lcs-level2-ch-row">
                {level2TargetSlot === 'position' ? (
                  [
                    { id: 'top-left', label: 'Top-Left' },
                    { id: 'top-right', label: 'Top-Right' },
                    { id: 'bottom-left', label: 'Bottom-Left' },
                    { id: 'bottom-right', label: 'Bottom-Right' }
                  ].map((pos) => {
                    const isSelected = pipPosition === pos.id;
                    return (
                      <button
                        key={pos.id}
                        type="button"
                        className={`lcs-level2-pos-btn ${isSelected ? 'is-active' : ''}`}
                        onClick={() => setPipPosition(pos.id)}
                        title={pos.label}
                      >
                        <div className="lcs-pos-box-preview">
                          <div className={`lcs-pos-mini-square ${pos.id}`} />
                        </div>
                      </button>
                    );
                  })
                ) : level2TargetSlot === 'size' ? (
                  [
                    { id: 'xlarge', label: 'Extra Large' },
                    { id: 'large', label: 'Large' },
                    { id: 'medium', label: 'Medium' },
                    { id: 'small', label: 'Small' }
                  ].map((sz) => {
                    const isSelected = pipSize === sz.id;
                    return (
                      <button
                        key={sz.id}
                        type="button"
                        className={`lcs-level2-pos-btn ${isSelected ? 'is-active' : ''}`}
                        onClick={() => setPipSize(sz.id)}
                        title={sz.label}
                      >
                        <div className="lcs-pos-box-preview">
                          <div className={`lcs-size-mini-square ${sz.id}`} />
                        </div>
                      </button>
                    );
                  })
                ) : (
                  channels.map((ch) => {
                    const currentSlotCh = layoutChannels[level1TargetLayout]?.[level2TargetSlot];
                    const isSelected = currentSlotCh === ch.id;
                    return (
                      <button
                        key={ch.id}
                        type="button"
                        className={`lcs-level2-ch-btn ${isSelected ? 'is-active' : ''}`}
                        onClick={() => {
                          setLayoutChannels((prev) => ({
                            ...prev,
                            [level1TargetLayout]: {
                              ...prev[level1TargetLayout],
                              [level2TargetSlot]: ch.id
                            }
                          }));
                          if (level2TargetSlot === 'main') {
                            setSelectedChannel(ch.id);
                          }
                        }}
                      >
                        {ch.label}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* Level 1 Popup Card */}
          <div className="lcs-level1-popup">
            {/* Close button */}
            <button 
              type="button" 
              className="lcs-level1-close-btn"
              onClick={() => {
                setLevel1ModalOpen(false);
                setLevel2TargetSlot(null);
              }}
            >
              ✕
            </button>

            <div className="lcs-level1-body">
              <div className="lcs-level1-slots-row">
                {((level1TargetLayout === 'l1' && [{ id: 'main', label: 'Main' }]) ||
                  (level1TargetLayout === 'l2' && [
                    { id: 'main', label: 'Main' },
                    { id: 'pip', label: 'Sub' },
                    { id: 'position', label: 'Position', isControl: true, icon: 'pip-pos' },
                    { id: 'size', label: 'Size', isControl: true, icon: 'pip-size' }
                  ]) ||
                  (level1TargetLayout === 'l3' && [{ id: 'left', label: 'Left' }, { id: 'right', label: 'Right' }]) ||
                  (level1TargetLayout === 'l4' && [{ id: 'main', label: 'Left' }, { id: 'pip', label: 'Right' }]) ||
                  (level1TargetLayout === 'l5' && [{ id: 'topLeft', label: 'Top-Left' }, { id: 'bottomLeft', label: 'Low-Left' }, { id: 'right', label: 'Right' }]) ||
                  (level1TargetLayout === 'l6' && [{ id: 'row1', label: 'Top-Left' }, { id: 'row2', label: 'Middle-Left' }, { id: 'row3', label: 'Low-Left' }, { id: 'right', label: 'Right' }]) ||
                  (level1TargetLayout === 'l7' && [{ id: 'tl', label: 'Top-Left' }, { id: 'tr', label: 'Top-Right' }, { id: 'bl', label: 'Low-Left' }, { id: 'br', label: 'Low-Right' }]) ||
                  [{ id: 'main', label: 'Main' }]).map((slot) => {

                  if (slot.isControl) {
                    const isSlotActive = level2TargetSlot === slot.id;
                    return (
                      <div key={slot.id} className="lcs-level1-slot-unit">
                        <button 
                          type="button" 
                          className={`lcs-level1-control-btn ${isSlotActive ? 'is-active' : ''}`}
                          onClick={() => {
                            if (level2TargetSlot === slot.id) {
                              setLevel2TargetSlot(null);
                            } else {
                              setLevel2TargetSlot(slot.id);
                            }
                          }}
                        >
                          {slot.icon === 'pip-pos' ? (
                            <div className="lcs-icon-pip-pos">
                              <div className={`lcs-pip-mini-box ${pipPosition}`} />
                            </div>
                          ) : (
                            <div className="lcs-icon-pip-size">
                              <div className={`lcs-pip-mini-box size-${pipSize}`} />
                            </div>
                          )}
                        </button>
                        <span className="lcs-level1-slot-label">{slot.label}</span>
                      </div>
                    );
                  }

                  const assignedChId = layoutChannels[level1TargetLayout]?.[slot.id];
                  const assignedCh = channels.find(c => c.id === assignedChId) || { label: 'CH1' };
                  const isSlotActive = level2TargetSlot === slot.id;

                  return (
                    <div key={slot.id} className="lcs-level1-slot-unit">
                      <button
                        type="button"
                        className={`lcs-level1-slot-btn ${isSlotActive ? 'is-active' : ''}`}
                        onClick={() => {
                          if (level2TargetSlot === slot.id) {
                            setLevel2TargetSlot(null);
                          } else {
                            setLevel2TargetSlot(slot.id);
                          }
                        }}
                      >
                        {assignedCh.label}
                      </button>
                      <span className="lcs-level1-slot-label">{slot.label}</span>
                    </div>
                  );
                })}

                {/* OK Button */}
                <div className="lcs-level1-slot-unit ok-unit">
                  <button
                    type="button"
                    className="lcs-level1-ok-btn"
                    onClick={() => {
                      setLevel1ModalOpen(false);
                      setLevel2TargetSlot(null);
                    }}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
