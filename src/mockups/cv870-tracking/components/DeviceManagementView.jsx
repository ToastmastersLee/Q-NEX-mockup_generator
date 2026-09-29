import { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Settings2, 
  Search, 
  RefreshCw, 
  Edit3, 
  ArrowUpCircle, 
  Filter,
  Check
} from 'lucide-react';
import { AddClientModal } from './AddClientModal';

export function DeviceManagementView({
  managedDevices = [],
  setManagedDevices,
  onNavigateToMainView,
  onShowToast
}) {
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(managedDevices.length > 0);
  const [selectedOnlineId, setSelectedOnlineId] = useState('2');
  const [selectedManagedId, setSelectedManagedId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Initial discovered list (available after search)
  const [discoveredDevices, setDiscoveredDevices] = useState([
    {
      id: '1',
      no: '001',
      ip: '192.167.32.65',
      serialNo: '7556X302MLORQUV327W4',
      mac: '00:04:05:0F:46:99',
      wifi: 'No',
      deviceName: 'Teacher Camera (CV870Pro)',
      type: 'IP Camera',
      version: '1.0.40'
    },
    {
      id: '2',
      no: '002',
      ip: '192.167.32.66',
      serialNo: 'J2E54102MLOMQUS5X464',
      mac: '00:04:05:0F:45:E5',
      wifi: 'No',
      deviceName: 'Student Camera (CV870Pro)',
      type: 'IP Camera',
      version: '1.0.40'
    }
  ]);

  const handleStartSearch = () => {
    setIsSearching(true);
    onShowToast?.('Scanning network segment 192.167.32.0/24 for cameras...');
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
      onShowToast?.('Search completed! Found 2 CV870 cameras online.');
    }, 900);
  };

  const handleStopSearch = () => {
    setIsSearching(false);
  };

  const handleAddConfirm = ({ ip, port, userName }) => {
    const matched = discoveredDevices.find(d => d.ip === ip) || {
      id: String(Date.now()),
      no: `00${managedDevices.length + 1}`,
      ip,
      serialNo: 'J2E54102MLOMQUS5X464',
      type: 'IP Camera',
      version: '1.0.40',
      deviceName: 'Camera'
    };

    if (!managedDevices.some(d => d.ip === ip)) {
      const newDev = {
        ...matched,
        nickname: matched.deviceName,
        port,
        userName,
        status: 'connected'
      };
      setManagedDevices([...managedDevices, newDev]);
      onShowToast?.(`Camera ${ip} added to client successfully!`);
    } else {
      onShowToast?.(`Camera ${ip} is already in the management list.`);
    }

    setIsAddModalOpen(false);
  };

  const handleDeleteManaged = () => {
    if (!selectedManagedId) {
      alert('Please select a device from the management list to delete.');
      return;
    }
    setManagedDevices(managedDevices.filter(d => d.id !== selectedManagedId));
    setSelectedManagedId(null);
    onShowToast?.('Device removed from client.');
  };

  const currentSelectedOnline = discoveredDevices.find(d => d.id === selectedOnlineId);

  return (
    <div className="cms-device-management-page">
      {/* TOP PANE: Device for Management */}
      <section className="cms-panel cms-management-panel">
        <div className="cms-panel-header">
          <div className="cms-panel-title-group">
            <span className="cms-panel-title">Device for Management</span>
            <span className="cms-panel-stat">Mgr : {managedDevices.length}</span>
            <span className="cms-panel-stat">Online : {managedDevices.filter(d => d.status === 'connected').length}</span>
          </div>

          <div className="cms-panel-actions">
            <button
              type="button"
              className="cms-btn cms-btn-tool"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus size={13} />
              <span>Add device</span>
            </button>
            <button
              type="button"
              className="cms-btn cms-btn-tool"
              onClick={handleDeleteManaged}
              disabled={!selectedManagedId}
            >
              <Trash2 size={13} />
              <span>Delete</span>
            </button>
            <button
              type="button"
              className="cms-btn cms-btn-tool"
              onClick={() => onNavigateToMainView?.()}
            >
              <Settings2 size={13} />
              <span>Remote configuration</span>
            </button>
            <button type="button" className="cms-btn cms-btn-tool is-filter">
              <Filter size={13} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Management Devices Table */}
        <div className="cms-table-wrapper">
          <table className="cms-table">
            <thead>
              <tr>
                <th style={{ width: '40px', textAlign: 'center' }}>No.</th>
                <th style={{ width: '180px' }}>Nickname</th>
                <th style={{ width: '150px' }}>IP</th>
                <th style={{ width: '220px' }}>Serial No.</th>
                <th style={{ width: '120px' }}>Type</th>
                <th style={{ width: '100px' }}>Version</th>
                <th>ConnectStatus</th>
              </tr>
            </thead>
            <tbody>
              {managedDevices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="cms-table-empty">
                    No devices in management list. Search online devices below and click &quot;+ Add to client&quot;.
                  </td>
                </tr>
              ) : (
                managedDevices.map((dev, idx) => {
                  const isSelected = selectedManagedId === dev.id;
                  return (
                    <tr
                      key={dev.id}
                      className={isSelected ? 'is-selected' : ''}
                      onClick={() => setSelectedManagedId(dev.id)}
                      onDoubleClick={() => onNavigateToMainView?.()}
                    >
                      <td style={{ textAlign: 'center' }}>{String(idx + 1).padStart(3, '0')}</td>
                      <td>{dev.nickname || dev.deviceName || 'Camera'}</td>
                      <td style={{ fontWeight: 600 }}>{dev.ip}</td>
                      <td style={{ fontFamily: 'monospace' }}>{dev.serialNo}</td>
                      <td>{dev.type}</td>
                      <td>{dev.version}</td>
                      <td>
                        <span className="cms-status-pill is-connected">
                          <span className="cms-status-dot" />
                          <span>connected</span>
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* HORIZONTAL RESIZER BAR */}
      <div className="cms-panel-resizer" />

      {/* BOTTOM PANE: Online Device */}
      <section className="cms-panel cms-online-panel">
        <div className="cms-panel-header">
          <div className="cms-panel-title-group">
            <span className="cms-panel-title">Online Device</span>
            <span className="cms-panel-stat">
              Search : {hasSearched ? discoveredDevices.length : 0}
            </span>
          </div>

          <div className="cms-panel-actions">
            <button
              type="button"
              className="cms-btn cms-btn-tool"
              onClick={() => setIsAddModalOpen(true)}
              disabled={!hasSearched || !selectedOnlineId}
            >
              <Plus size={13} />
              <span>Add to client</span>
            </button>
            <button type="button" className="cms-btn cms-btn-tool">
              <Edit3 size={13} />
              <span>Modify netinfo</span>
            </button>
            <button
              type="button"
              className="cms-btn cms-btn-tool"
              onClick={handleStartSearch}
            >
              <RefreshCw size={13} className={isSearching ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>

            {/* Start Search / Stop Search Button */}
            {!isSearching ? (
              <button
                type="button"
                className="cms-btn cms-btn-tool cms-btn-search"
                onClick={handleStartSearch}
              >
                <Search size={13} />
                <span>Start search</span>
              </button>
            ) : (
              <button
                type="button"
                className="cms-btn cms-btn-tool cms-btn-searching"
                onClick={handleStopSearch}
              >
                <Search size={13} className="animate-spin" />
                <span>Stop search</span>
              </button>
            )}

            <button type="button" className="cms-btn cms-btn-tool">
              <ArrowUpCircle size={13} />
              <span>Upgrade</span>
            </button>
            <button type="button" className="cms-btn cms-btn-tool is-filter">
              <Filter size={13} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Online Devices Table */}
        <div className="cms-table-wrapper">
          <table className="cms-table">
            <thead>
              <tr>
                <th style={{ width: '40px', textAlign: 'center' }}>No.</th>
                <th style={{ width: '150px' }}>IP</th>
                <th style={{ width: '220px' }}>Serial No.</th>
                <th style={{ width: '160px' }}>MAC</th>
                <th style={{ width: '60px' }}>WIFI</th>
                <th style={{ width: '180px' }}>Device Name</th>
                <th style={{ width: '120px' }}>Type</th>
                <th>Version</th>
              </tr>
            </thead>
            <tbody>
              {!hasSearched ? (
                <tr>
                  <td colSpan={8} className="cms-table-empty">
                    Click &quot;Start search&quot; to discover CV870 cameras in the 192.167.32.0/24 subnet.
                  </td>
                </tr>
              ) : isSearching ? (
                <tr>
                  <td colSpan={8} className="cms-table-empty">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Scanning local subnet for ONVIF / CameraCMS devices...</span>
                    </div>
                  </td>
                </tr>
              ) : (
                discoveredDevices.map((dev) => {
                  const isSelected = selectedOnlineId === dev.id;
                  const isAdded = managedDevices.some(m => m.ip === dev.ip);
                  return (
                    <tr
                      key={dev.id}
                      className={isSelected ? 'is-selected' : ''}
                      onClick={() => setSelectedOnlineId(dev.id)}
                    >
                      <td style={{ textAlign: 'center' }}>{dev.no}</td>
                      <td style={{ fontWeight: 600 }}>
                        {dev.ip}
                        {isAdded && <span style={{ marginLeft: '6px', fontSize: '10px', color: '#10b981' }}>[Added]</span>}
                      </td>
                      <td style={{ fontFamily: 'monospace' }}>{dev.serialNo}</td>
                      <td style={{ fontFamily: 'monospace' }}>{dev.mac}</td>
                      <td>{dev.wifi}</td>
                      <td>{dev.deviceName}</td>
                      <td>{dev.type}</td>
                      <td>{dev.version}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add Client Dialog Modal */}
      <AddClientModal
        isOpen={isAddModalOpen}
        initialIp={currentSelectedOnline ? currentSelectedOnline.ip : '192.167.32.66'}
        onClose={() => setIsAddModalOpen(false)}
        onConfirm={handleAddConfirm}
      />
    </div>
  );
}
