import { useState } from 'react';
import { ModalShell, NativeSelect } from '../../common';
import { useTranslation } from '../../../i18n';

export function UserDialog({ mode, user, users, onClose, onSave }) {
  const { t } = useTranslation('userManagement');
  const { t: common } = useTranslation();
  const [account, setAccount] = useState('');
  const [role, setRole] = useState('normalUser');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [error, setError] = useState('');
  const titles = { add: 'addUser', password: 'changePassword', details: 'colOnlineDetail', delete: 'deleteUser' };

  const submit = event => {
    event.preventDefault();
    if (mode === 'add') {
      if (!/^[A-Za-z][A-Za-z0-9]{4,10}$/.test(account)) return setError(t('validateUserName') + ' ' + t('validateLength'));
      if (users.some(item => item.name === account)) return setError(t('userAlreadyExists'));
    }
    if (mode === 'add' || mode === 'password') {
      if (password.length < 5 || password.length > 11) return setError(t('validateLength'));
      if (/[@&]/.test(password)) return setError(t('validatePassword'));
      if (password !== confirm) return setError(t('notSamePassword'));
    }
    // Passwords are deliberately not retained in preview state or storage.
    onSave({ name: account, type: role });
  };

  return <ModalShell title={t(titles[mode]) + (user ? ` · ${user.name}` : '')} onClose={onClose}>
    <form className="lcs-web-modal-body" onSubmit={submit}>
      {mode === 'details' ? <>
        <dl className="text-sm space-y-4">
          <div><dt>{t('account')}</dt><dd>{user.name}</dd></div>
          <div><dt>{t('system')}</dt><dd>Windows (Demo)</dd></div>
          <div><dt>{t('platform')}</dt><dd>Web UI Preview</dd></div>
          <div><dt>{t('IP')}</dt><dd>{user.isOnline ? '192.0.2.10' : '—'}</dd></div>
          <div><dt>{t('colOnlineStatus')}</dt><dd>{t(user.isOnline ? 'online' : 'offline')}</dd></div>
        </dl>
        <div className="lcs-web-form-actions">
          <button type="button" className="lcs-web-btn-blue-sm" disabled={!user.isOnline} onClick={() => onSave({ disconnect: true })}>{t('userOffline')}</button>
        </div>
      </> : mode === 'delete' ? <p>{t('confirmDeleteUser')}</p> : <>
        {mode === 'add' && <>
          <div className="lcs-web-field"><label htmlFor="preview-account">{t('account')}</label><input autoFocus id="preview-account" className="lcs-web-compact-input" value={account} onChange={e => setAccount(e.target.value)} required placeholder={t('inputUserName')} /></div>
          <p className="text-xs text-slate-500">{t('validateUserName')} {t('validateLength')}</p>
          <div className="lcs-web-field"><label htmlFor="preview-role">{t('colUserType')}</label><NativeSelect id="preview-role" value={role} onChange={setRole} options={['normalUser', 'admin', 'guest'].map(value => ({ value, label: t(value) }))} /></div>
        </>}
        {mode === 'password' && <div className="lcs-web-field"><label htmlFor="preview-old-password">{t('oldPassword')}</label><input id="preview-old-password" className="lcs-web-compact-input" type="password" autoComplete="off" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required /></div>}
        <div className="lcs-web-field"><label htmlFor="preview-password">{t(mode === 'add' ? 'password' : 'newPassword')}</label><input id="preview-password" className="lcs-web-compact-input" type="password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} required /></div>
        <div className="lcs-web-field"><label htmlFor="preview-confirm-password">{t('confirmPassword')}</label><input id="preview-confirm-password" className="lcs-web-compact-input" type="password" autoComplete="new-password" value={confirm} onChange={e => setConfirm(e.target.value)} required /></div>
        <p className="text-xs text-slate-500">{t('validateLength')} · {t('validatePassword')}</p>
      </>}
      {error && <p role="alert" className="lcs-web-form-error mt-4">{error}</p>}
      {mode !== 'details' && <div className="lcs-web-form-actions"><button type="button" className="lcs-web-btn-blue-outline-sm" onClick={onClose}>{common('actions.cancel')}</button><button type="submit" className="lcs-web-btn-blue-sm">{common('actions.ok')}</button></div>}
    </form>
  </ModalShell>;
}
