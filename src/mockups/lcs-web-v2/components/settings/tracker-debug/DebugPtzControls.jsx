import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { useTranslation } from '../../../i18n';

export function DebugPtzControls({ onAction }) {
  const { t } = useTranslation('trackerDebug');
  return (
    <div className="lcs-web-debug-ptz-dpad-wrap">
      <div className="lcs-web-debug-dpad">
        <button type="button" className="lcs-web-debug-dpad-btn up" onClick={() => onAction(t('ptzUp', '云台向上'))}><ChevronUp size={14} /></button>
        <button type="button" className="lcs-web-debug-dpad-btn left" onClick={() => onAction(t('ptzLeft', '云台向左'))}><ChevronLeft size={14} /></button>
        <button type="button" className="lcs-web-debug-dpad-btn right" onClick={() => onAction(t('ptzRight', '云台向右'))}><ChevronRight size={14} /></button>
        <button type="button" className="lcs-web-debug-dpad-btn down" onClick={() => onAction(t('ptzDown', '云台向下'))}><ChevronDown size={14} /></button>
      </div>
      <div className="lcs-web-debug-zoom-row">
        <button type="button" className="lcs-web-debug-zoom-btn" onClick={() => onAction(t('zoomIn', '镜头放大'))}><ZoomIn size={14} /></button>
        <button type="button" className="lcs-web-debug-zoom-btn" onClick={() => onAction(t('zoomOut', '镜头缩小'))}><ZoomOut size={14} /></button>
      </div>
      <button type="button" className="lcs-web-debug-test-cam-btn" onClick={() => onAction(t('commChecking', '通讯检测中...'))}>
        {t('commCheck', '通讯检测')}
      </button>
    </div>
  );
}
