import { Check } from 'lucide-react';

export const AirDeviceSelectModal = ({
    isOpen,
    onClose,
    selectedDevices,
    onToggleDevice
}) => {
    if (!isOpen) return null;

    return (
        <div className="ndp-bottom-sheet-overlay" onClick={onClose}>
            <div className="ndp-bottom-sheet" onClick={e => e.stopPropagation()}>
                <div className="ndp-sheet-list">
                    {['All', 'NDP600', 'CBX 2'].map(device => (
                        <div key={device} className="ndp-sheet-item" onClick={() => onToggleDevice(device)}>
                            <span style={{ visibility: selectedDevices.includes(device) ? 'visible' : 'hidden', color: '#00c8ff' }}>
                                <Check size={20} strokeWidth={3} />
                            </span>
                            <span>{device}</span>
                        </div>
                    ))}
                </div>
                <div className="ndp-sheet-actions">
                    <button className="ndp-sheet-btn ndp-btn-cancel" onClick={onClose}>Cancel</button>
                    <button className="ndp-sheet-btn ndp-btn-confirm" onClick={onClose}>Confirm</button>
                </div>
            </div>
        </div>
    );
};
