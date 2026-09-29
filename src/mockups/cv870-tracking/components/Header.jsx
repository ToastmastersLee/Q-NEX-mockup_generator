import { Globe, Moon, Sun, BookOpen, RotateCcw } from 'lucide-react';
import { STAGES } from '../data/stepsData';

export function Header({
  lang,
  setLang,
  theme,
  setTheme,
  currentStep,
  onReset,
  onOpenManual
}) {
  const currentStage = STAGES.find(s => s.id === currentStep.stage);

  return (
    <header className="cv870-guide-header">
      <div className="cv870-header-brand">
        <span className="cv870-brand-badge">CV870PRO</span>
        <span className="cv870-header-title">
          {lang === 'zh' ? '摄像机跟踪配置向导' : 'Camera Tracking Setup Guide'}
        </span>
        {currentStage && (
          <span className="cv870-header-stage">
            {lang === 'zh' ? currentStage.titleZh : currentStage.titleEn}
          </span>
        )}
      </div>

      <div className="cv870-header-actions">
        {/* View Manual Reference */}
        <button
          type="button"
          className="cv870-action-btn"
          onClick={onOpenManual}
          title={lang === 'zh' ? '查看原厂手册对应截图与说明' : 'View Original Manual Reference'}
        >
          <BookOpen size={14} />
          <span>{lang === 'zh' ? '手册原图对照' : 'Manual Reference'}</span>
        </button>

        {/* Reset Progress */}
        <button
          type="button"
          className="cv870-action-btn"
          onClick={onReset}
          title={lang === 'zh' ? '重置配置向导' : 'Reset Guide'}
        >
          <RotateCcw size={14} />
          <span>{lang === 'zh' ? '重新开始' : 'Reset'}</span>
        </button>

        {/* Language Switch */}
        <button
          type="button"
          className="cv870-action-btn"
          onClick={() => setLang(l => l === 'zh' ? 'en' : 'zh')}
          title="Toggle Language"
        >
          <Globe size={14} />
          <span>{lang === 'zh' ? 'EN' : '中文'}</span>
        </button>

        {/* Theme Switch */}
        <button
          type="button"
          className="cv870-action-btn"
          onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>
    </header>
  );
}
