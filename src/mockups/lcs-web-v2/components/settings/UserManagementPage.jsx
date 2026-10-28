import { useState } from 'react';
import { useTranslation } from '../../i18n';
import { UserDialog } from './modals/UserDialog';

export function UserManagementPage() {
  const { t } = useTranslation('userManagement');
  const [defaultUser, setDefaultUser] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [dialog, setDialog] = useState(null);

  const [users, setUsers] = useState([
    { id: 1, name: 'admin', type: 'admin', isOnline: true },
    { id: 2, name: 'demoUser', type: 'normalUser', isOnline: false },
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <section className="lcs-web-page lcs-web-user-page">
      <div className="lcs-web-card">
        <h3 className="lcs-web-card-inner-title">{t('pageTitle', '用户管理')}</h3>

        <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-4">
          <button type="button" className="lcs-web-btn-blue-sm" onClick={() => setDialog({ mode: 'add' })}>
            {t('addUser', '添加用户')}
          </button>
          <div className="flex items-center gap-3">
            <input
              type="text"
              className="lcs-web-compact-input w-48 text-xs"
              placeholder={t('phDefaultUser', '输入默认用户')}
              value={defaultUser}
              onChange={e => setDefaultUser(e.target.value)}
            />
            <button type="button" className="lcs-web-btn-blue-sm" onClick={() => showToast(t('saved'))}>
              {t('setDefaultUser', '设置默认用户')}
            </button>
          </div>
        </div>

        <div className="lcs-web-table-card mt-4">
          <table className="lcs-web-data-table text-center">
            <thead>
              <tr>
                <th className="w-16">{t('colSeq', '序号')}</th>
                <th>{t('colUsername', '用户名')}</th>
                <th>{t('colUserType', '用户类型')}</th>
                <th>{t('colOnlineStatus', '在线状态')}</th>
                <th>{t('colOnlineDetail', '在线详情')}</th>
                <th className="w-48">{t('colAction', '操作')}</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{t(u.type)}</td>
                  <td>
                    <span className={u.isOnline ? 'text-emerald-600 font-semibold' : 'text-slate-400'}>
                      {u.isOnline ? t('online', '在线') : t('offline', '离线')}
                    </span>
                  </td>
                  <td>
                    <button type="button" className="lcs-web-btn-blue-sm" onClick={() => setDialog({ mode: 'details', user: u })}>
                      {t('view', '查看')}
                    </button>
                  </td>
                  <td>
                    <div className="flex items-center justify-center gap-2">
                      <button type="button" className="lcs-web-btn-green-sm" onClick={() => setDialog({ mode: 'password', user: u })}>
                        {t('changePassword', '修改密码')}
                      </button>
                      <button
                        type="button"
                        disabled={u.id === 1}
                        className={u.id === 1 ? 'lcs-web-btn-pink-disabled-sm' : 'lcs-web-btn-red-sm'}
                        onClick={() => {
                          if (u.id === 1) return;
                          setDialog({ mode: 'delete', user: u });
                        }}
                      >
                        {t('deleteUser', '删除用户')}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {dialog && <UserDialog {...dialog} users={users} onClose={() => setDialog(null)} onSave={data => {
        if (dialog.mode === 'add') setUsers(curr => [...curr, { ...data, id: Date.now(), isOnline: false }]);
        if (dialog.mode === 'delete') setUsers(curr => curr.filter(u => u.id !== dialog.user.id));
        if (data.disconnect) setUsers(curr => curr.map(u => u.id === dialog.user.id ? { ...u, isOnline: false } : u));
        showToast(t(dialog.mode === 'add' ? 'addUserSuccess' : dialog.mode === 'password' ? 'updatePasswordSuccess' : dialog.mode === 'delete' ? 'deleteUserSuccess' : 'userOfflineSuccess'));
        setDialog(null);
      }} />}
      {toastMessage && <div className="lcs-web-toast">{toastMessage}</div>}
    </section>
  );
}

