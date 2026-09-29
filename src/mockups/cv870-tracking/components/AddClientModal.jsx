import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export function AddClientModal({ isOpen, initialIp = '192.167.32.66', onClose, onConfirm }) {
  const [ip, setIp] = useState(initialIp);
  const [port, setPort] = useState('5000');
  const [userName, setUserName] = useState('admin');
  const [password, setPassword] = useState('admin');

  useEffect(() => {
    if (initialIp) setIp(initialIp);
  }, [initialIp]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({ ip, port, userName, password });
  };

  return (
    <div className="cms-modal-backdrop">
      <div className="cms-dialog-window cms-add-dialog">
        {/* Titlebar */}
        <div className="cms-dialog-titlebar">
          <span className="cms-dialog-title">Add</span>
          <button type="button" className="cms-dialog-close" onClick={onClose}>
            <X size={13} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="cms-dialog-body">
          <div className="cms-form-row">
            <label className="cms-form-label">IP</label>
            <input
              type="text"
              className="cms-form-input"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              required
            />
          </div>

          <div className="cms-form-row">
            <label className="cms-form-label">Port</label>
            <input
              type="text"
              className="cms-form-input"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              required
            />
          </div>

          <div className="cms-form-row">
            <label className="cms-form-label">User name</label>
            <input
              type="text"
              className="cms-form-input"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="cms-form-row">
            <label className="cms-form-label">Password</label>
            <input
              type="password"
              className="cms-form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="cms-form-hint">
            Ensure that IP and LAN share the same network segment
          </div>

          <div className="cms-dialog-footer">
            <button type="submit" className="cms-btn cms-btn-primary">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
