import { useState } from 'react';
import { NativeSelect } from '../common';
import { useTranslation } from '../../i18n';

export function BroadcastSettingPage() {
  const { t, i18n } = useTranslation('broadcast');
  const isZh = i18n.language?.startsWith('zh');
  const defaultGroupName = isZh ? '默认分组' : 'Default Group';

  const [newGroupName, setNewGroupName] = useState('');
  const [deleteGroup, setDeleteGroup] = useState('');
  const [memberName, setMemberName] = useState('');
  const [memberIp, setMemberIp] = useState('');
  const [memberGroup, setMemberGroup] = useState('');
  const [groups, setGroups] = useState([defaultGroupName]);
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  void setToastMessage;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleAddGroup = () => {
    if (!newGroupName) return;
    setGroups(curr => [...curr, newGroupName]);
    setNewGroupName('');
    showToast(t('groupAdded', '已添加分组'));
  };

  const handleDeleteGroup = () => {
    if (!deleteGroup) return;
    setGroups(curr => curr.filter(g => g !== deleteGroup));
    setDeleteGroup('');
    showToast(t('groupDeleted', '已删除分组'));
  };

  const handleAddMember = () => {
    if (!memberName || !memberIp) return;
    setMembers(curr => [...curr, { id: Date.now(), name: memberName, ip: memberIp, group: memberGroup || defaultGroupName }]);
    setMemberName('');
    setMemberIp('');
    showToast(t('memberAdded', '已添加组成员'));
  };

  return (
    <section className="lcs-web-page lcs-web-broadcast-page">
      <div className="lcs-web-section-title">{t('pageTitle', '广播设置')}</div>

      <div className="lcs-web-card">
        <h3 className="lcs-web-card-inner-title">{t('cardTitleGroup', '分组管理')}</h3>

        <div className="lcs-web-broadcast-layout">
          {/* Left Panel: Form controls */}
          <div className="lcs-web-broadcast-left">
            {/* 添加分组 */}
            <div className="lcs-web-bcast-block">
              <span className="lcs-web-bcast-block-title">{t('addGroup', '添加分组')}</span>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-slate-600 w-12">{t('groupName', '组名')}</span>
                <input
                  type="text"
                  className="lcs-web-compact-input flex-1"
                  value={newGroupName}
                  onChange={e => setNewGroupName(e.target.value)}
                />
              </div>
              <div className="flex justify-end mt-2">
                <button type="button" className="lcs-web-btn-blue-sm" onClick={handleAddGroup}>
                  {t('add', '添加')}
                </button>
              </div>
            </div>

            {/* 删除分组 */}
            <div className="lcs-web-bcast-block mt-4 pt-3 border-t border-slate-100">
              <span className="lcs-web-bcast-block-title">{t('deleteGroup', '删除分组')}</span>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-slate-600 w-12">{t('groupLabel', '分组')}</span>
                <div className="flex-1">
                  <NativeSelect
                    value={deleteGroup}
                    options={[t('selectGroup', '请选择分组'), ...groups]}
                    onChange={setDeleteGroup}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <button type="button" className="lcs-web-btn-red-sm" onClick={handleDeleteGroup}>
                  {t('delete', '删除')}
                </button>
              </div>
            </div>

            {/* 添加组成员 */}
            <div className="lcs-web-bcast-block mt-4 pt-3 border-t border-slate-100">
              <span className="lcs-web-bcast-block-title">{t('addMember', '添加组成员')}</span>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-slate-600 w-12">{t('memberName', '名称')}</span>
                <input
                  type="text"
                  className="lcs-web-compact-input flex-1"
                  value={memberName}
                  onChange={e => setMemberName(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-slate-600 w-12">{t('ipAddress', 'IP地址')}</span>
                <input
                  type="text"
                  className="lcs-web-compact-input flex-1"
                  value={memberIp}
                  onChange={e => setMemberIp(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-slate-600 w-12">{t('groupLabel', '分组')}</span>
                <div className="flex-1">
                  <NativeSelect
                    value={memberGroup}
                    options={[t('selectGroup', '请选择分组'), ...groups]}
                    onChange={setMemberGroup}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <button type="button" className="lcs-web-btn-blue-sm" onClick={handleAddMember}>
                  {t('add', '添加')}
                </button>
              </div>
            </div>
          </div>

          {/* Middle Panel: List */}
          <div className="lcs-web-broadcast-middle">
            <div className="lcs-web-panel-header">
              <span className="text-xs text-slate-700 font-semibold">{t('listHeader', '列表')} (0)</span>
              <label className="flex items-center gap-1 cursor-pointer text-xs ml-4">
                <input type="checkbox" />
                <span>{t('selectAll', '全选')}</span>
              </label>
              <button type="button" className="lcs-web-btn-red-outline-sm ml-auto">
                {t('delete', '删除')}
              </button>
            </div>
            <div className="lcs-web-panel-box">
              {members.length === 0 ? (
                <div className="lcs-web-panel-empty" />
              ) : (
                members.map(m => (
                  <div key={m.id} className="p-2 border-b border-slate-100 flex items-center justify-between text-xs">
                    <span>{m.name} ({m.ip})</span>
                    <button type="button" className="text-blue-500" onClick={() => setSelectedMembers(curr => [...curr, m])}>{t('select', '选择')}</button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Panel: Selected & Actions */}
          <div className="lcs-web-broadcast-right">
            <div className="lcs-web-panel-header">
              <span className="text-xs text-slate-700 font-semibold">{t('selectedHeader', '已选')} ({selectedMembers.length})</span>
            </div>
            <div className="lcs-web-panel-box">
              {selectedMembers.length === 0 ? (
                <div className="lcs-web-panel-empty" />
              ) : (
                selectedMembers.map(m => (
                  <div key={m.id} className="p-2 border-b border-slate-100 flex items-center justify-between text-xs">
                    <span>{m.name}</span>
                  </div>
                ))
              )}
            </div>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-xs text-slate-600">{t('startBroadcast', '开始广播')}</span>
              <button type="button" className="lcs-web-btn-blue-sm" onClick={() => showToast('广播已开始')}>
                {t('start', '开始')}
              </button>
              <button type="button" className="lcs-web-btn-pink-disabled-sm" onClick={() => showToast('广播已停止')}>
                {t('stop', '停止')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-slate-500 mt-4">
        <span>{t('pluginTip', '广播接收插件: setup_broadcast.exe')} </span>
        <a href="#download" className="text-blue-500 hover:underline">{t('download', '下载')}</a>
      </div>

      {toastMessage && <div className="lcs-web-toast">{toastMessage}</div>}
    </section>
  );
}
