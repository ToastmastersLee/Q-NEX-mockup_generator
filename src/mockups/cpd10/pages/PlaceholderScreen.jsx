import { useCpd10 } from '../context/Cpd10Context';
import { Cpu, HardDrive, Usb, Cable, ShieldAlert, Layers } from 'lucide-react';

export function PlaceholderScreen() {
  const { 
    powerState, 
    setPowerState, 
    usbInserted, 
    setUsbInserted, 
    orientationFlipped, 
    setOrientationFlipped 
  } = useCpd10();

  return (
    <div className="cpd10-placeholder-page">
      <div className="cpd10-placeholder-header">
        <div className="cpd10-brand-badge">Q-NEX CPD10</div>
        <div className="cpd10-title-text">串口控制面板 · 运行就绪</div>
        <div className="cpd10-status-indicator">
          <span className="cpd10-pulse-dot" />
          <span>等待第一批截图 (Batch 1: 5张)</span>
        </div>
      </div>

      <div className="cpd10-spec-grid">
        <div className="cpd10-card">
          <div className="cpd10-card-header">
            <Cpu size={18} className="cpd10-card-icon" />
            <span>硬件架构与规格</span>
          </div>
          <ul className="cpd10-spec-list">
            <li><strong>芯片/内存：</strong>400M SOC / 64MB RAM + 128MB ROM</li>
            <li><strong>操作系统：</strong>Q-NEX Console OS (LUA 纯串口轻量系统，无 Android)</li>
            <li><strong>触控规格：</strong>单点触控（不支持多点手势）</li>
            <li><strong>物理尺寸：</strong>183 × 116 × 9.0 mm，约 0.7kg</li>
          </ul>
        </div>

        <div className="cpd10-card">
          <div className="cpd10-card-header">
            <Cable size={18} className="cpd10-card-icon" />
            <span>通信与接口边界</span>
          </div>
          <ul className="cpd10-spec-list">
            <li><strong>网络：</strong>无网口，本身不联网，纯 RS232 串口直连主机（如 NMP311）</li>
            <li><strong>接口清单：</strong>1× RS232（供电+控制） + 1× USB 2.0（U盘升级/配置导入）</li>
            <li><strong>功能边界：</strong>不支持 NFC / OTA / 界面自定义 / 独立红外控制</li>
            <li><strong>音量与音效：</strong>仅支持基础音量调节，不支持高低音调控</li>
          </ul>
        </div>
      </div>

      <div className="cpd10-sim-toolbar">
        <div className="cpd10-sim-title">
          <Layers size={16} />
          <span>硬件交互测试开关</span>
        </div>
        <div className="cpd10-sim-actions">
          <button
            type="button"
            className={`cpd10-btn ${powerState === 'on' ? 'active' : ''}`}
            onClick={() => setPowerState(powerState === 'on' ? 'off' : 'on')}
          >
            电源状态: {powerState.toUpperCase()}
          </button>
          <button
            type="button"
            className={`cpd10-btn ${usbInserted ? 'active' : ''}`}
            onClick={() => setUsbInserted(!usbInserted)}
          >
            <Usb size={14} style={{ marginRight: 6 }} />
            U 盘: {usbInserted ? '已插入' : '未插入'}
          </button>
          <button
            type="button"
            className={`cpd10-btn ${orientationFlipped ? 'active' : ''}`}
            onClick={() => setOrientationFlipped(!orientationFlipped)}
          >
            画面翻转 (壁挂): {orientationFlipped ? '180°' : '标准'}
          </button>
        </div>
      </div>
    </div>
  );
}
