import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  CheckSquare, 
  Square,
  FileCheck
} from 'lucide-react';

export function InstructionSidebar({
  step,
  stepIndex,
  totalSteps,
  lang,
  checklistState,
  onToggleChecklist,
  onNext,
  onPrev,
  onAutoDemo,
  isLastStep,
  onFinish
}) {
  const alert = step.alert;

  const getAlertIcon = (type) => {
    switch (type) {
      case 'IMPORTANT': return <AlertCircle size={16} />;
      case 'WARNING': return <AlertTriangle size={16} />;
      case 'TIP': return <Sparkles size={16} />;
      default: return <Info size={16} />;
    }
  };

  const getAlertClass = (type) => {
    switch (type) {
      case 'IMPORTANT': return 'cv870-alert-important';
      case 'WARNING': return 'cv870-alert-warning';
      case 'TIP': return 'cv870-alert-tip';
      default: return 'cv870-alert-note';
    }
  };

  return (
    <aside className="cv870-sidebar">
      <div className="cv870-sidebar-content">
        <div>
          <div className="cv870-step-badge">
            {lang === 'zh' ? `步骤 ${step.id} / ${totalSteps}` : `STEP ${step.id} / ${totalSteps}`}
          </div>
          <h2 className="cv870-step-title">
            {lang === 'zh' ? step.titleZh : step.titleEn}
          </h2>
        </div>

        <p className="cv870-step-summary">
          {lang === 'zh' ? step.summaryZh : step.summaryEn}
        </p>

        {/* Alert box if present */}
        {alert && (
          <div className={`cv870-alert-box ${getAlertClass(alert.type)}`}>
            <div className="cv870-alert-title">
              {getAlertIcon(alert.type)}
              <span>{lang === 'zh' ? alert.titleZh : alert.titleEn}</span>
            </div>
            <div>{lang === 'zh' ? alert.contentZh : alert.contentEn}</div>
          </div>
        )}

        {/* Interactive Checklist */}
        <div className="cv870-checklist-section">
          <div className="cv870-checklist-header">
            <span>{lang === 'zh' ? '操作确认清单' : 'ACTION CHECKLIST'}</span>
            <span>
              {step.checklist.filter(c => checklistState[c.id]).length}/{step.checklist.length}
            </span>
          </div>

          <div className="cv870-checklist-items">
            {step.checklist.map(item => {
              const isChecked = !!checklistState[item.id];
              return (
                <div
                  key={item.id}
                  className={`cv870-check-item ${isChecked ? 'is-done' : ''}`}
                  onClick={() => onToggleChecklist(item.id)}
                >
                  <div className="cv870-checkbox">
                    {isChecked ? <CheckSquare size={14} /> : <Square size={14} />}
                  </div>
                  <span>{lang === 'zh' ? item.textZh : item.textEn}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sidebar Footer Controls */}
      <div className="cv870-sidebar-footer">
        {/* Quick Auto-Demo button */}
        <button
          type="button"
          className="cv870-btn-demo"
          onClick={onAutoDemo}
          title={lang === 'zh' ? '一键自动执行本步标准操作演示' : 'Automatically perform demo actions for this step'}
        >
          <Sparkles size={14} />
          <span>{lang === 'zh' ? '自动演示 / 填充标准配置' : 'Auto-Fill / Standard Demo'}</span>
        </button>

        <div className="cv870-nav-btn-group">
          <button
            type="button"
            className="cv870-btn-prev"
            onClick={onPrev}
            disabled={stepIndex === 0}
          >
            <ChevronLeft size={16} />
            <span>{lang === 'zh' ? '上一步' : 'Previous'}</span>
          </button>

          {isLastStep ? (
            <button
              type="button"
              className="cv870-btn-next"
              onClick={onFinish}
            >
              <FileCheck size={16} />
              <span>{lang === 'zh' ? '完成与配置报告' : 'Finish & Summary'}</span>
            </button>
          ) : (
            <button
              type="button"
              className="cv870-btn-next"
              onClick={onNext}
            >
              <span>{lang === 'zh' ? '下一步' : 'Next'}</span>
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
