import { useState } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  X,
  ExternalLink,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { STEPS_DATA } from '../data/stepsData';

export function GuideAssistantDrawer({
  onSelectTab,
  onAutoPopulate,
  onShowToast
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStepId, setActiveStepId] = useState(2);
  const [completedSteps, setCompletedSteps] = useState([1]);

  const toggleStep = (id) => {
    setCompletedSteps(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <>
      {/* Floating Trigger Pill */}
      {!isOpen && (
        <button
          type="button"
          className="cms-guide-floating-badge"
          onClick={() => setIsOpen(true)}
          title="Open CV870 Tracking Setup Manual Guide"
        >
          <BookOpen size={14} />
          <span>CV870 Setup Guide (12 Steps)</span>
        </button>
      )}

      {/* Slide-out Drawer */}
      {isOpen && (
        <aside className="cms-guide-drawer">
          <div className="cms-guide-drawer-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={16} className="text-blue-400" />
              <span className="cms-guide-drawer-title">CV870 Tracking Guide</span>
            </div>
            <button
              type="button"
              className="cms-ctrl-btn"
              onClick={() => setIsOpen(false)}
            >
              <X size={14} />
            </button>
          </div>

          <div className="cms-guide-drawer-content">
            <div className="cms-guide-intro">
              Interactive clone of CameraCMS v1.0.27. Follow the official 12 steps below to configure teacher and student auto-tracking.
            </div>

            {/* Quick Actions */}
            <div className="cms-guide-quick-actions">
              <button
                type="button"
                className="cms-guide-action-btn"
                onClick={() => {
                  onSelectTab('device');
                  onShowToast?.('Switched to Device Management');
                }}
              >
                1. Device Search
              </button>
              <button
                type="button"
                className="cms-guide-action-btn"
                onClick={() => {
                  onSelectTab('mainView');
                  onShowToast?.('Switched to Main View Tracking');
                }}
              >
                2. Tracking Setup
              </button>
              <button
                type="button"
                className="cms-guide-action-btn is-highlight"
                onClick={() => {
                  onAutoPopulate?.();
                  setCompletedSteps([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
                  onShowToast?.('All 12 steps auto-completed with verified settings!');
                }}
              >
                <Sparkles size={12} />
                <span>Auto Fill Standard</span>
              </button>
            </div>

            {/* Steps List */}
            <div className="cms-guide-steps-list">
              {STEPS_DATA.map((step) => {
                const isDone = completedSteps.includes(step.id);
                const isCurrent = activeStepId === step.id;
                return (
                  <div
                    key={step.id}
                    className={`cms-guide-step-card ${isCurrent ? 'is-current' : ''} ${isDone ? 'is-done' : ''}`}
                    onClick={() => setActiveStepId(step.id)}
                  >
                    <div className="cms-guide-step-row">
                      <button
                        type="button"
                        className="cms-check-circle-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStep(step.id);
                        }}
                      >
                        {isDone ? (
                          <CheckCircle2 size={15} color="#10b981" />
                        ) : (
                          <Circle size={15} color="#64748b" />
                        )}
                      </button>

                      <div className="cms-guide-step-text">
                        <span className="cms-guide-step-num">Step {step.id}</span>
                        <div className="cms-guide-step-title">{step.titleZh}</div>
                        <div className="cms-guide-step-desc">{step.summaryZh}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
