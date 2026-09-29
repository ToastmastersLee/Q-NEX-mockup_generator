import React from 'react';
import { useLcs } from '../../context/LcsContext';

export function DirectorLayoutBar() {
  const {
    directorMode,
    setDirectorMode,
    currentLayout,
    setCurrentLayout,
    handleLayoutDoubleClick,
    handleOpenLevel1,
    setIsLayoutBarOpen
  } = useLcs();

  return (
    <div className="lcs-layout-select-bar">
      {/* Left: Manual / Auto toggle */}
      <div className="lcs-layout-mode-group">
        <button 
          type="button" 
          className={`lcs-mode-btn ${directorMode === 'manual' ? 'is-active' : ''}`}
          onClick={() => setDirectorMode('manual')}
        >
          Manual
        </button>
        <button 
          type="button" 
          className={`lcs-mode-btn ${directorMode === 'auto' ? 'is-active' : ''}`}
          onClick={() => setDirectorMode('auto')}
        >
          Auto
        </button>
      </div>

      {/* Middle: Layout Selection options list */}
      <div className="lcs-layout-options-list">
        {/* Layout 1: Single full screen */}
        <div className="lcs-layout-option-wrapper">
          <button 
            type="button" 
            className={`lcs-layout-thumb-card ${currentLayout === 'l1' ? 'is-active' : ''}`}
            onClick={() => setCurrentLayout('l1')}
            onDoubleClick={() => handleLayoutDoubleClick('l1')}
          >
            <div className="lcs-thumb-single font-mono">
              <span>CH6</span>
            </div>
          </button>
          {currentLayout === 'l1' && (
            <span 
              className="lcs-active-layout-badge" 
              style={{ cursor: 'pointer' }} 
              onClick={(e) => { e.stopPropagation(); handleLayoutDoubleClick('l1'); }}
            >
              Layout
            </span>
          )}
        </div>

        {/* Layout 2: PiP Style 1 */}
        <div className="lcs-layout-option-wrapper">
          <button 
            type="button" 
            className={`lcs-layout-thumb-card ${currentLayout === 'l2' ? 'is-active' : ''}`}
            onClick={() => setCurrentLayout('l2')}
            onDoubleClick={() => handleLayoutDoubleClick('l2')}
          >
            <div className="lcs-thumb-pip-1">
              <div className="lcs-thumb-pip-sub font-mono">CH3</div>
              <span className="font-mono">CH7</span>
            </div>
          </button>
          {currentLayout === 'l2' && (
            <span 
              className="lcs-active-layout-badge" 
              style={{ cursor: 'pointer' }} 
              onClick={(e) => { e.stopPropagation(); handleLayoutDoubleClick('l2'); }}
            >
              Layout
            </span>
          )}
        </div>

        {/* Layout 3: Vertical Split */}
        <div className="lcs-layout-option-wrapper">
          <button 
            type="button" 
            className={`lcs-layout-thumb-card ${currentLayout === 'l3' ? 'is-active' : ''}`}
            onClick={() => setCurrentLayout('l3')}
            onDoubleClick={() => handleOpenLevel1('l3')}
          >
            <div className="lcs-thumb-split-v">
              <div className="lcs-thumb-split-cell font-mono">CH4</div>
              <div className="lcs-thumb-split-cell font-mono">CH3</div>
            </div>
          </button>
          {currentLayout === 'l3' && (
            <span 
              className="lcs-active-layout-badge" 
              style={{ cursor: 'pointer' }} 
              onClick={(e) => { e.stopPropagation(); handleOpenLevel1('l3'); }}
            >
              Layout
            </span>
          )}
        </div>

        {/* Layout 4: PiP Style 2 */}
        <div className="lcs-layout-option-wrapper">
          <button 
            type="button" 
            className={`lcs-layout-thumb-card ${currentLayout === 'l4' ? 'is-active' : ''}`}
            onClick={() => setCurrentLayout('l4')}
            onDoubleClick={() => handleOpenLevel1('l4')}
          >
            <div className="lcs-thumb-pip-2">
              <div className="lcs-thumb-pip-sub font-mono">CH1</div>
              <span className="font-mono">CH2</span>
            </div>
          </button>
          {currentLayout === 'l4' && (
            <span 
              className="lcs-active-layout-badge" 
              style={{ cursor: 'pointer' }} 
              onClick={(e) => { e.stopPropagation(); handleOpenLevel1('l4'); }}
            >
              Layout
            </span>
          )}
        </div>

        {/* Layout 5: Director 3-Split (Default) */}
        <div className="lcs-layout-option-wrapper">
          <button 
            type="button" 
            className={`lcs-layout-thumb-card ${currentLayout === 'l5' ? 'is-active' : ''}`}
            onClick={() => setCurrentLayout('l5')}
            onDoubleClick={() => handleOpenLevel1('l5')}
          >
            <div className="lcs-thumb-director">
              <div className="lcs-thumb-dir-left">
                <div className="font-mono">CH5</div>
                <div className="font-mono">CH4</div>
              </div>
              <div className="lcs-thumb-dir-right font-mono">CH3</div>
            </div>
          </button>
          {currentLayout === 'l5' && (
            <span 
              className="lcs-active-layout-badge" 
              style={{ cursor: 'pointer' }} 
              onClick={(e) => { e.stopPropagation(); handleOpenLevel1('l5'); }}
            >
              Layout
            </span>
          )}
        </div>

        {/* Layout 6: 4-Split */}
        <div className="lcs-layout-option-wrapper">
          <button 
            type="button" 
            className={`lcs-layout-thumb-card ${currentLayout === 'l6' ? 'is-active' : ''}`}
            onClick={() => setCurrentLayout('l6')}
            onDoubleClick={() => handleOpenLevel1('l6')}
          >
            <div className="lcs-thumb-director-4">
              <div className="lcs-thumb-dir4-left">
                <div className="font-mono">CH2</div>
                <div className="font-mono">CH1</div>
                <div className="font-mono">CH4</div>
              </div>
              <div className="lcs-thumb-dir4-right font-mono">CH3</div>
            </div>
          </button>
          {currentLayout === 'l6' && (
            <span 
              className="lcs-active-layout-badge" 
              style={{ cursor: 'pointer' }} 
              onClick={(e) => { e.stopPropagation(); handleOpenLevel1('l6'); }}
            >
              Layout
            </span>
          )}
        </div>

        {/* Layout 7: Quad Grid */}
        <div className="lcs-layout-option-wrapper">
          <button 
            type="button" 
            className={`lcs-layout-thumb-card ${currentLayout === 'l7' ? 'is-active' : ''}`}
            onClick={() => setCurrentLayout('l7')}
            onDoubleClick={() => handleOpenLevel1('l7')}
          >
            <div className="lcs-thumb-quad">
              <div className="font-mono">CH2</div>
              <div className="font-mono">CH3</div>
              <div className="font-mono">CH1</div>
              <div className="font-mono">CH4</div>
            </div>
          </button>
          {currentLayout === 'l7' && (
            <span 
              className="lcs-active-layout-badge" 
              style={{ cursor: 'pointer' }} 
              onClick={(e) => { e.stopPropagation(); handleOpenLevel1('l7'); }}
            >
              Layout
            </span>
          )}
        </div>

        {/* Layout 8: All */}
        <div className="lcs-layout-option-wrapper">
          <button 
            type="button" 
            className={`lcs-layout-thumb-card ${currentLayout === 'l8' ? 'is-active' : ''}`}
            onClick={() => setCurrentLayout('l8')}
            onDoubleClick={() => handleOpenLevel1('l8')}
          >
            <div className="lcs-thumb-all">
              <span>All</span>
            </div>
          </button>
          {currentLayout === 'l8' && (
            <span 
              className="lcs-active-layout-badge" 
              style={{ cursor: 'pointer' }} 
              onClick={(e) => { e.stopPropagation(); handleOpenLevel1('l8'); }}
            >
              Layout
            </span>
          )}
        </div>
      </div>

      {/* Right: Close "x" button */}
      <button 
        type="button" 
        className="lcs-layout-close-btn"
        onClick={() => setIsLayoutBarOpen(false)}
        title="Close Layouts"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
}
