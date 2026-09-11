import { useState } from 'react';
import { FileVideo } from 'lucide-react';
import { NativeSelect } from '../common';
import { useTranslation } from '../../i18n';

export function TrackerSettingPage() {
  const { t } = useTranslation('tracker');
  const [sens1, setSens1] = useState(100);
  const [sens2, setSens2] = useState(100);
  const [activeZone1, setActiveZone1] = useState([1]);
  const [activeZone2, setActiveZone2] = useState([1]);

  const [teacherTrack, setTeacherTrack] = useState(true);
  const [tchProtocol, setTchProtocol] = useState('defaultProtocol');
  const [tchNet, setTchNet] = useState('UDP');
  const [tchRecvPort, setTchRecvPort] = useState('8645');
  const [tchSendAddr, setTchSendAddr] = useState('192.167.32.65');
  const [tchAddrCode, setTchAddrCode] = useState('1');
  const [tchSendPort, setTchSendPort] = useState('8642');

  const [studentTrack, setStudentTrack] = useState(true);
  const [stuProtocol, setStuProtocol] = useState('protocol3');
  const [stuNet, setStuNet] = useState('UDP');
  const [stuRecvPort, setStuRecvPort] = useState('8645');
  const [stuSendAddr, setStuSendAddr] = useState('192.167.32.66');
  const [stuAddrCode, setStuAddrCode] = useState('1');
  const [stuSendPort, setStuSendPort] = useState('8642');

  const [toastMessage, setToastMessage] = useState('');

  const protocolOptions = [
    { value: 'defaultProtocol', label: t('defaultProtocol', '默认协议') },
    { value: 'protocol1', label: t('protocol1', '协议一') },
    { value: 'protocol2', label: t('protocol2', '协议二') },
    { value: 'protocol3', label: t('protocol3', '协议三') },
  ];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const zoneColors = ['#22c55e', '#3b82f6', '#ef4444', '#eab308', '#a855f7', '#06b6d4', '#64748b', '#64748b', '#64748b'];

  return (
    <section className="lcs-web-page lcs-web-tracker-page">
      <div className="lcs-web-card mb-4">
        <h3 className="lcs-web-card-inner-title">{t('pageTitle', '跟踪设置')}</h3>

        {/* Section 1: 电脑画面检测 */}
        <div className="flex items-center gap-8 py-4 border-b border-slate-100 flex-wrap">
          <span className="w-28 text-xs text-slate-700 font-semibold">{t('pcScreenDetect', '电脑画面检测')}</span>
          <div className="w-44 h-24 bg-slate-700 border-2 border-emerald-500 rounded flex items-center justify-center">
            <FileVideo size={28} className="text-slate-300" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600">{t('detectZone', '检测区')}</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((z, i) => (
                  <button
                    key={z}
                    type="button"
                    style={{ color: zoneColors[i] }}
                    className={`w-6 h-6 border text-xs font-bold rounded ${activeZone1.includes(z) ? 'border-current bg-slate-50' : 'border-slate-200'}`}
                    onClick={() => setActiveZone1(curr => curr.includes(z) ? curr.filter(x => x !== z) : [...curr, z])}
                  >
                    {z}
                  </button>
                ))}
              </div>
              <button type="button" className="lcs-web-btn-red-outline-sm ml-2" onClick={() => setActiveZone1([])}>
                {t('clear', '清除')}
              </button>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs text-slate-600">{t('shieldSensitivity', '屏蔽灵敏度 (值越小越灵敏)')}</span>
              <input type="range" min="0" max="100" className="w-36" value={sens1} onChange={e => setSens1(Number(e.target.value))} />
              <input type="text" className="lcs-web-compact-input w-12 text-center text-xs" value={sens1} onChange={e => setSens1(Number(e.target.value) || 0)} />
            </div>
          </div>
        </div>

        {/* Section 2: 电脑2画面检测 */}
        <div className="flex items-center gap-8 py-4 border-b border-slate-100 flex-wrap">
          <span className="w-28 text-xs text-slate-700 font-semibold">{t('pc2ScreenDetect', '电脑2画面检测')}</span>
          <div className="w-44 h-24 bg-slate-700 border-2 border-emerald-500 rounded flex items-center justify-center">
            <FileVideo size={28} className="text-slate-300" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600">{t('detectZone', '检测区')}</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((z, i) => (
                  <button
                    key={z}
                    type="button"
                    style={{ color: zoneColors[i] }}
                    className={`w-6 h-6 border text-xs font-bold rounded ${activeZone2.includes(z) ? 'border-current bg-slate-50' : 'border-slate-200'}`}
                    onClick={() => setActiveZone2(curr => curr.includes(z) ? curr.filter(x => x !== z) : [...curr, z])}
                  >
                    {z}
                  </button>
                ))}
              </div>
              <button type="button" className="lcs-web-btn-red-outline-sm ml-2" onClick={() => setActiveZone2([])}>
                {t('clear', '清除')}
              </button>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs text-slate-600">{t('shieldSensitivity', '屏蔽灵敏度 (值越小越灵敏)')}</span>
              <input type="range" min="0" max="100" className="w-36" value={sens2} onChange={e => setSens2(Number(e.target.value))} />
              <input type="text" className="lcs-web-compact-input w-12 text-center text-xs" value={sens2} onChange={e => setSens2(Number(e.target.value) || 0)} />
            </div>
          </div>
        </div>

        {/* Section 3: 教师跟踪 */}
        <div className="py-3 border-b border-slate-100">
          <div className="flex items-center gap-4 mb-3">
            <span className="w-24 text-xs text-slate-700 font-semibold">{t('teacherTrack', '教师跟踪')}</span>
            <label className="lcs-web-switch">
              <input type="checkbox" checked={teacherTrack} onChange={e => setTeacherTrack(e.target.checked)} />
              <span className="slider" />
            </label>
          </div>

          <div className="grid grid-cols-3 gap-x-6 gap-y-2 max-w-4xl pl-28">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 w-16">{t('protocolType', '协议类型')}</span>
              <div className="flex-1"><NativeSelect value={tchProtocol} options={protocolOptions} onChange={setTchProtocol} /></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 w-16">{t('netMode', '网络方式')}</span>
              <div className="flex-1"><NativeSelect value={tchNet} options={['UDP', 'TCP']} onChange={setTchNet} /></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 w-16">{t('recvPort', '接收端口')}</span>
              <input type="text" className="lcs-web-compact-input flex-1 font-mono text-xs" value={tchRecvPort} onChange={e => setTchRecvPort(e.target.value)} />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 w-16">{t('sendAddr', '发送地址')}</span>
              <input type="text" className="lcs-web-compact-input flex-1 font-mono text-xs" value={tchSendAddr} onChange={e => setTchSendAddr(e.target.value)} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 w-16">{t('addrCode', '地址码')}</span>
              <div className="flex-1"><NativeSelect value={tchAddrCode} options={['1', '2', '3']} onChange={setTchAddrCode} /></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 w-16">{t('sendPort', '发送端口')}</span>
              <input type="text" className="lcs-web-compact-input flex-1 font-mono text-xs" value={tchSendPort} onChange={e => setTchSendPort(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Section 4: 学生跟踪 */}
        <div className="py-3">
          <div className="flex items-center gap-4 mb-3">
            <span className="w-24 text-xs text-slate-700 font-semibold">{t('studentTrack', '学生跟踪')}</span>
            <label className="lcs-web-switch">
              <input type="checkbox" checked={studentTrack} onChange={e => setStudentTrack(e.target.checked)} />
              <span className="slider" />
            </label>
          </div>

          <div className="grid grid-cols-3 gap-x-6 gap-y-2 max-w-4xl pl-28">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 w-16">{t('protocolType', '协议类型')}</span>
              <div className="flex-1"><NativeSelect value={stuProtocol} options={protocolOptions} onChange={setStuProtocol} /></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 w-16">{t('netMode', '网络方式')}</span>
              <div className="flex-1"><NativeSelect value={stuNet} options={['UDP', 'TCP']} onChange={setStuNet} /></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 w-16">{t('recvPort', '接收端口')}</span>
              <input type="text" className="lcs-web-compact-input flex-1 font-mono text-xs" value={stuRecvPort} onChange={e => setStuRecvPort(e.target.value)} />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 w-16">{t('sendAddr', '发送地址')}</span>
              <input type="text" className="lcs-web-compact-input flex-1 font-mono text-xs" value={stuSendAddr} onChange={e => setStuSendAddr(e.target.value)} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 w-16">{t('addrCode', '地址码')}</span>
              <div className="flex-1"><NativeSelect value={stuAddrCode} options={['1', '2', '3']} onChange={setStuAddrCode} /></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 w-16">{t('sendPort', '发送端口')}</span>
              <input type="text" className="lcs-web-compact-input flex-1 font-mono text-xs" value={stuSendPort} onChange={e => setStuSendPort(e.target.value)} />
            </div>
          </div>
        </div>

        <button className="lcs-web-ok mt-4" type="button" onClick={() => showToast('跟踪设置已保存')}>
          {t('ok', '确定')}
        </button>
      </div>

      {toastMessage && <div className="lcs-web-toast">{toastMessage}</div>}
    </section>
  );
}