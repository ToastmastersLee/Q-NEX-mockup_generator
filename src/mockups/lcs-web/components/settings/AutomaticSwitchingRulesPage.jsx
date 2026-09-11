import { useState } from 'react';
import { NativeSelect } from '../common';
import { useTranslation } from '../../i18n';

export function AutomaticSwitchingRulesPage() {
  const { t } = useTranslation('guidingStrategy');
  const [defaultScreen, setDefaultScreen] = useState('tch');
  const [autoDirectorMode, setAutoDirectorMode] = useState('pip');
  const [activeDualConfig, setActiveDualConfig] = useState('pc+tch');
  const [toastMessage, setToastMessage] = useState('');

  const getScreenLabel = (id) => {
    switch (id) {
      case 'tch': return t('teacher', '教师');
      case 'board': return t('board', '板书');
      case 'stu': return t('student', '学生');
      case 'pc': return t('computer', '电脑');
      case 'stu_p': return t('studentWide', '学生全景');
      case 'tch_p': return t('teacherWide', '教师全景');
      case 'board2': return t('board2', '板书2');
      case 'pc2': return t('computer2', '电脑2');
      case 'default': return t('default', '默认');
      default: return id;
    }
  };

  const defaultScreenOptions = [
    { value: 'tch', label: t('teacher', '教师') },
    { value: 'pc', label: t('computer', '电脑') },
    { value: 'stu', label: t('student', '学生') },
    { value: 'tch_p', label: t('teacherWide', '教师全景') },
    { value: 'stu_p', label: t('studentWide', '学生全景') },
  ];

  const screenOptions = [
    { value: 'default', label: t('default', '默认') },
    { value: 'stu_p', label: t('studentWide', '学生全景') },
    { value: 'tch_p', label: t('teacherWide', '教师全景') },
    { value: 'pc', label: t('computer', '电脑') },
    { value: 'tch', label: t('teacher', '教师') },
  ];

  const [strategyRows, setStrategyRows] = useState([
    { id: 'tch', enabled: true, level: '6', stayTime: '10', trans: false, screen: 'default', transTime: '2' },
    { id: 'board', enabled: true, level: '4', stayTime: '2', trans: false, screen: 'default', transTime: '2' },
    { id: 'stu', enabled: true, level: '3', stayTime: '2', trans: false, screen: 'default', transTime: '2' },
    { id: 'pc', enabled: true, level: '1', stayTime: '5', trans: false, screen: 'stu_p', transTime: '0' },
    { id: 'stu_p', enabled: true, level: '7', stayTime: '2', trans: false, screen: 'default', transTime: '0' },
    { id: 'tch_p', enabled: true, level: '8', stayTime: '2', trans: false, screen: 'default', transTime: '0' },
    { id: 'board2', enabled: true, level: '5', stayTime: '2', trans: false, screen: 'default', transTime: '2' },
    { id: 'pc2', enabled: true, level: '2', stayTime: '5', trans: false, screen: 'default', transTime: '2' },
  ]);

  const [conditions, setConditions] = useState({
    c1: false, c2: false, c3: false, c4: false, c5: false, c6: false, c7: false
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const dualOptions = [
    { id: 'pc+tch', label: `${t('computer', '电脑')}+${t('teacher', '教师')}` },
    { id: 'pc+tch_p', label: `${t('computer', '电脑')}+${t('teacherWide', '教师全景')}` },
    { id: 'pc+stu', label: `${t('computer', '电脑')}+${t('student', '学生')}` },
    { id: 'pc+stu_p', label: `${t('computer', '电脑')}+${t('studentWide', '学生全景')}` },
    { id: 'tch+stu', label: `${t('teacher', '教师')}+${t('student', '学生')}` },
    { id: 'tch+stu_p', label: `${t('teacher', '教师')}+${t('studentWide', '学生全景')}` },
    { id: 'tch_p+stu', label: `${t('teacherWide', '教师全景')}+${t('student', '学生')}` },
    { id: 'tch_p+stu_p', label: `${t('teacherWide', '教师全景')}+${t('studentWide', '学生全景')}` },
    { id: 'board+stu', label: `${t('board', '板书')}+${t('student', '学生')}` },
    { id: 'board+stu_p', label: `${t('board', '板书')}+${t('studentWide', '学生全景')}` },
    { id: 'board2+stu', label: `${t('board2', '板书2')}+${t('student', '学生')}` },
    { id: 'board2+stu_p', label: `${t('board2', '板书2')}+${t('studentWide', '学生全景')}` },
    { id: 'pc2+tch', label: `${t('computer2', '电脑2')}+${t('teacher', '教师')}` },
    { id: 'pc2+tch_p', label: `${t('computer2', '电脑2')}+${t('teacherWide', '教师全景')}` },
    { id: 'pc2+stu', label: `${t('computer2', '电脑2')}+${t('student', '学生')}` },
    { id: 'pc2+stu_p', label: `${t('computer2', '电脑2')}+${t('studentWide', '学生全景')}` },
  ];

  return (
    <section className="lcs-web-page lcs-web-strategy-page">
      {/* Card 1: 导播策略 */}
      <div className="lcs-web-card mb-4">
        <h3 className="lcs-web-card-inner-title">{t('pageTitle', '导播策略')}</h3>

        <div className="flex items-center gap-6 pb-3 border-b border-slate-100">
          <span className="text-xs text-slate-700 font-semibold">{t('defaultScreenSetting', '默认画面设置')}</span>
          <div className="w-48">
            <NativeSelect
              value={defaultScreen}
              options={defaultScreenOptions}
              onChange={setDefaultScreen}
            />
          </div>
        </div>

        <div className="lcs-web-table-card mt-3 overflow-x-auto">
          <table className="lcs-web-data-table text-center min-w-[800px]">
            <thead>
              <tr>
                <th>{t('colSourceScreen', '源画面名称')}</th>
                <th>{t('colParticipate', '是否参与切换')}</th>
                <th>{t('colAutoLevel', '自动切换等级')}</th>
                <th>{t('colStayTime', '停留时间(s)')}</th>
                <th>{t('colTransition', '画面过渡')}</th>
                <th>{t('colSelectScreen', '画面选择')}</th>
                <th>{t('colTransTime', '过渡时间(s)')}</th>
              </tr>
            </thead>
            <tbody>
              {strategyRows.map((r, idx) => (
                <tr key={r.id}>
                  <td>{getScreenLabel(r.id)}</td>
                  <td>
                    <label className="lcs-web-switch">
                      <input
                        type="checkbox"
                        checked={r.enabled}
                        onChange={e => {
                          const val = e.target.checked;
                          setStrategyRows(curr => curr.map((item, i) => i === idx ? { ...item, enabled: val } : item));
                        }}
                      />
                      <span className="slider" />
                    </label>
                  </td>
                  <td>
                    <div className="w-20 mx-auto">
                      <NativeSelect
                        value={r.level}
                        options={['1', '2', '3', '4', '5', '6', '7', '8']}
                        onChange={val => setStrategyRows(curr => curr.map((item, i) => i === idx ? { ...item, level: val } : item))}
                      />
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="lcs-web-compact-input w-20 text-center font-mono"
                      value={r.stayTime}
                      onChange={e => {
                        const val = e.target.value;
                        setStrategyRows(curr => curr.map((item, i) => i === idx ? { ...item, stayTime: val } : item));
                      }}
                    />
                  </td>
                  <td>
                    <label className="lcs-web-switch">
                      <input
                        type="checkbox"
                        checked={r.trans}
                        onChange={e => {
                          const val = e.target.checked;
                          setStrategyRows(curr => curr.map((item, i) => i === idx ? { ...item, trans: val } : item));
                        }}
                      />
                      <span className="slider" />
                    </label>
                  </td>
                  <td>
                    <div className="w-28 mx-auto">
                      <NativeSelect
                        value={r.screen}
                        options={screenOptions}
                        onChange={val => setStrategyRows(curr => curr.map((item, i) => i === idx ? { ...item, screen: val } : item))}
                      />
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="lcs-web-compact-input w-20 text-center font-mono"
                      value={r.transTime}
                      onChange={e => {
                        const val = e.target.value;
                        setStrategyRows(curr => curr.map((item, i) => i === idx ? { ...item, transTime: val } : item));
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Card 2: 多策略条件设置 */}
      <div className="lcs-web-card mb-4">
        <h3 className="lcs-web-card-inner-title">{t('cardMultiStrategy', '多策略条件设置')}</h3>
        <div className="flex flex-col gap-3 text-xs text-slate-700 py-1">
          <div className="flex items-center gap-6 flex-wrap">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={conditions.c1} onChange={e => setConditions(c => ({ ...c, c1: e.target.checked }))} />
              <span>{t('cond1', '板书检测要求同时检测到教师')}</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={conditions.c2} onChange={e => setConditions(c => ({ ...c, c2: e.target.checked }))} />
              <span>{t('cond2', '教师多目标切换到教师全景')}</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={conditions.c3} onChange={e => setConditions(c => ({ ...c, c3: e.target.checked }))} />
              <span>{t('cond3', '教师移动目标切换到教师全景')}</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={conditions.c4} onChange={e => setConditions(c => ({ ...c, c4: e.target.checked }))} />
              <span>{t('cond4', '教师单目标切换到教师全景')}</span>
            </label>
          </div>
          <div className="flex items-center gap-6 flex-wrap">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={conditions.c5} onChange={e => setConditions(c => ({ ...c, c5: e.target.checked }))} />
              <span>{t('cond5', '学生多目标切换到学生全景')}</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={conditions.c6} onChange={e => setConditions(c => ({ ...c, c6: e.target.checked }))} />
              <span>{t('cond6', '学生移动目标切换到学生全景')}</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={conditions.c7} onChange={e => setConditions(c => ({ ...c, c7: e.target.checked }))} />
              <span>{t('cond7', '学生单目标切换到学生全景')}</span>
            </label>
          </div>
        </div>
      </div>

      {/* Card 3: 自动导播模式 */}
      <div className="lcs-web-card mb-4">
        <h3 className="lcs-web-card-inner-title">{t('cardAutoMode', '自动导播模式')}</h3>

        <div className="flex items-center gap-6 py-2">
          <span className="text-xs text-slate-700 font-semibold">{t('modeSelect', '模式选择')}</span>
          <label className="flex items-center gap-1.5 cursor-pointer text-xs">
            <input type="radio" checked={autoDirectorMode === 'pip'} onChange={() => setAutoDirectorMode('pip')} />
            <span>{t('pip', '画中画')}</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer text-xs">
            <input type="radio" checked={autoDirectorMode === 'dual'} onChange={() => setAutoDirectorMode('dual')} />
            <span>{t('dualScreen', '双分屏')}</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer text-xs">
            <input type="radio" checked={autoDirectorMode === 'pop'} onChange={() => setAutoDirectorMode('pop')} />
            <span>{t('pop', '画外画')}</span>
          </label>
        </div>

        <div className="lcs-web-subcard-box my-3 p-4 bg-slate-50 border border-slate-200 rounded">
          <div className="text-xs text-slate-700 font-semibold mb-3">{t('dualConfigSelect', '双屏配置选择')}</div>
          <div className="grid grid-cols-6 gap-3">
            {dualOptions.map(opt => (
              <button
                key={opt.id}
                type="button"
                className={`py-1.5 px-2 text-xs border rounded text-center transition-colors ${activeDualConfig === opt.id ? 'border-blue-500 bg-blue-50 text-blue-600 font-semibold shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'}`}
                onClick={() => setActiveDualConfig(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <button className="lcs-web-ok mt-4" type="button" onClick={() => showToast(t('strategySaved', '导播策略已保存'))}>
          {t('ok', '确定')}
        </button>
      </div>

      {toastMessage && <div className="lcs-web-toast">{toastMessage}</div>}
    </section>
  );
}
