import { Check } from 'lucide-react';
import { STEPS_DATA } from '../data/stepsData';

export function StepProgress({ currentStepIndex, onSelectStep, completedSteps, lang }) {
  return (
    <nav className="cv870-stepper-bar" aria-label="Tracking Guide Stepper">
      {STEPS_DATA.map((step, idx) => {
        const isActive = idx === currentStepIndex;
        const isCompleted = completedSteps.includes(step.id);
        const title = lang === 'zh' ? step.titleZh : step.titleEn;

        return (
          <button
            key={step.id}
            type="button"
            className={`cv870-step-node ${isActive ? 'is-active' : ''} ${isCompleted ? 'is-completed' : ''}`}
            onClick={() => onSelectStep(idx)}
            title={`Step ${step.id}: ${title}`}
          >
            <div className="cv870-node-num">
              {isCompleted ? <Check size={12} strokeWidth={3} /> : step.id}
            </div>
            <span>
              {idx + 1}. {title.length > 16 ? title.substring(0, 16) + '...' : title}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
