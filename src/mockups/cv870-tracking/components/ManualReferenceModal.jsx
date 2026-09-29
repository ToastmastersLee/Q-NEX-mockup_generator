import { X } from 'lucide-react';

export function ManualReferenceModal({ isOpen, onClose, step, lang }) {
  if (!isOpen || !step) return null;

  return (
    <div className="cv870-modal-backdrop" onClick={onClose}>
      <div 
        className="cv870-modal-box" 
        style={{ maxWidth: '820px', width: '92%' }} 
        onClick={e => e.stopPropagation()}
      >
        <div className="cv870-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>{lang === 'zh' ? `原厂手册图文对照 - 步骤 ${step.id}` : `Manual Reference - Step ${step.id}`}</span>
            <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'normal' }}>
              ({lang === 'zh' ? step.titleZh : step.titleEn})
            </span>
          </div>
          <button
            type="button"
            className="cv870-action-btn"
            style={{ padding: '4px', border: 'none' }}
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>

        <div className="cv870-modal-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Main manual screenshot */}
            {step.asset && (
              <div style={{
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)',
                background: '#090d16',
                textAlign: 'center'
              }}>
                <img
                  src={step.asset}
                  alt={step.titleEn}
                  style={{ width: '100%', maxHeight: '420px', objectFit: 'contain', display: 'block' }}
                />
              </div>
            )}

            {/* Additional sub asset if present (e.g. Target lost / secondary shots) */}
            {step.assetSub && (
              <div style={{
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)',
                background: '#090d16',
                textAlign: 'center'
              }}>
                <img
                  src={step.assetSub}
                  alt="Sub Reference"
                  style={{ width: '100%', maxHeight: '360px', objectFit: 'contain', display: 'block' }}
                />
              </div>
            )}

            {/* Manual Text Excerpt */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '8px',
              padding: '14px',
              fontSize: '13px',
              lineHeight: '1.6',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '6px', color: '#60a5fa' }}>
                {lang === 'zh' ? '原厂规范与配置要点：' : 'Standard Specifications & Instructions:'}
              </div>
              <p>{lang === 'zh' ? step.summaryZh : step.summaryEn}</p>
              {step.alert && (
                <div style={{ marginTop: '8px', color: '#f59e0b' }}>
                  <strong>{lang === 'zh' ? '⚠️ 提醒：' : '⚠️ Note: '}</strong>
                  {lang === 'zh' ? step.alert.contentZh : step.alert.contentEn}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="cv870-modal-footer">
          <button
            type="button"
            className="cv870-action-btn"
            onClick={onClose}
          >
            {lang === 'zh' ? '关闭' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
