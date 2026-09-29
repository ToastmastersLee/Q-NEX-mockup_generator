import { CheckCircle2, RotateCcw, X } from 'lucide-react';

export function SummaryReportModal({ isOpen, onClose, onRestart, lang }) {
  if (!isOpen) return null;

  return (
    <div className="cv870-modal-backdrop" onClick={onClose}>
      <div 
        className="cv870-modal-box" 
        style={{ maxWidth: '680px', width: '92%' }} 
        onClick={e => e.stopPropagation()}
      >
        <div className="cv870-modal-header" style={{ borderBottomColor: '#10b981' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle2 size={22} color="#10b981" />
            <span style={{ color: '#10b981' }}>
              {lang === 'zh' ? 'CV870 跟踪摄像机配置完成报告' : 'CV870 Camera Tracking Setup Summary'}
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.5' }}>
              {lang === 'zh'
                ? '恭喜！您已成功完成 CV870 教师机与学生机的全部跟踪区域、屏蔽区、预置位、双目中心校准与开机自启配置。'
                : 'Congratulations! You have completed all tracking zones, blocking rules, presets, dual CMOS calibration, and auto-track setup.'}
            </p>

            {/* Config Summary Table */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
              fontSize: '12.5px'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '180px 1fr',
                padding: '10px 14px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
                fontWeight: 600,
                color: '#60a5fa'
              }}>
                <span>{lang === 'zh' ? '配置模块' : 'Configuration Module'}</span>
                <span>{lang === 'zh' ? '生效状态与参数' : 'Status & Values'}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', padding: '8px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ color: '#94a3b8' }}>{lang === 'zh' ? '网络环境' : 'Network Settings'}</span>
                <span>PC: 192.167.32.100 / Station: 192.167.32.1 (POE3)</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', padding: '8px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ color: '#94a3b8' }}>{lang === 'zh' ? '摄像机客户端' : 'Camera Devices'}</span>
                <span>Teacher: 192.167.32.65 / Student: 192.167.32.66 (Port 5000)</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', padding: '8px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ color: '#94a3b8' }}>{lang === 'zh' ? '教师机预置位' : 'Teacher Presets'}</span>
                <span>Preset 1 (Close-up) / Preset 0 (Target Lost)</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', padding: '8px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ color: '#94a3b8' }}>{lang === 'zh' ? '目标丢失动作' : 'Target Lost Action'}</span>
                <span style={{ color: '#10b981', fontWeight: 600 }}>No. 0 Preset (Fallback View)</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', padding: '8px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ color: '#94a3b8' }}>{lang === 'zh' ? '讲师活动区 (绿框)' : 'Lecturer Zone (Green)'}</span>
                <span style={{ color: '#22c55e' }}>✓ {lang === 'zh' ? '已保存全景有效走动范围' : 'Saved and Active'}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', padding: '8px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ color: '#94a3b8' }}>{lang === 'zh' ? '屏蔽区域 (红框)' : 'Blocking Zones (Red)'}</span>
                <span style={{ color: '#ef4444' }}>✓ {lang === 'zh' ? '已屏蔽前排学生与大屏面部干扰' : 'Front row & screen masked'}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', padding: '8px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ color: '#94a3b8' }}>{lang === 'zh' ? '讲桌静止区 (蓝框)' : 'Preset Zone (Blue)'}</span>
                <span style={{ color: '#3b82f6' }}>✓ {lang === 'zh' ? '讲桌微动过滤已启用，特写已校准' : 'Table jitter filtered & PTZ set'}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', padding: '8px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ color: '#94a3b8' }}>{lang === 'zh' ? '板书跟踪 (黄框)' : 'BLS Blackboard Zones'}</span>
                <span style={{ color: '#eab308' }}>✓ {lang === 'zh' ? '左右黑板动作识别与特写联动已就绪' : 'Left & Right board triggers calibrated'}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', padding: '8px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ color: '#94a3b8' }}>{lang === 'zh' ? '学生机跟踪' : 'Student Tracking'}</span>
                <span>Preset 1 + {lang === 'zh' ? '门窗走廊屏蔽区已生效' : 'Window/Door masked'}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', padding: '8px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ color: '#94a3b8' }}>{lang === 'zh' ? '双目 CMOS 中心' : 'Dual CMOS Alignment'}</span>
                <span style={{ color: '#10b981' }}>✓ Pos Correct OK</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', padding: '8px 14px' }}>
                <span style={{ color: '#94a3b8' }}>{lang === 'zh' ? '开机自启跟踪' : 'Power On State'}</span>
                <span style={{ color: '#10b981', fontWeight: 600 }}>Track (Auto)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="cv870-modal-footer">
          <button
            type="button"
            className="cv870-action-btn"
            onClick={onRestart}
          >
            <RotateCcw size={14} />
            <span>{lang === 'zh' ? '重新配置' : 'Restart Setup'}</span>
          </button>

          <button
            type="button"
            className="cv870-btn-next"
            style={{ flex: 'none', padding: '8px 20px' }}
            onClick={onClose}
          >
            <span>{lang === 'zh' ? '完成并退出向导' : 'Finish & Close'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
