import { useState, useRef, useEffect } from 'react';
import { Modal } from '../components/Modal';
import { SettingsRow } from '../components/SettingsRow';
import { inputBox, inputText, textSecondary, textTitle } from '../styles/theme';

const EditableText = ({ text, className }) => {
    const [isEditable, setIsEditable] = useState(false);
    const spanRef = useRef(null);

    useEffect(() => {
        if (isEditable && spanRef.current) {
            spanRef.current.focus();
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(spanRef.current);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }, [isEditable]);

    return (
        <span 
            ref={spanRef}
            className={`outline-none cursor-text ${isEditable ? 'bg-blue-500/20 px-1 -mx-1 rounded' : ''} ${className}`}
            contentEditable={isEditable}
            suppressContentEditableWarning
            onDoubleClick={(e) => { e.stopPropagation(); setIsEditable(true); }}
            onBlur={() => setIsEditable(false)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); setIsEditable(false); } }}
            title="Double-click to edit"
        >
            {text}
        </span>
    );
};

export const Settings = ({ isDark, onDisconnectionClick, onPanelIpClick, panelIpAddress, onCustomizeClick, onDivisibleRoomClick }) => {
    const clickCountRef = useRef(0);
    const clickTimerRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deviceModel, setDeviceModel] = useState('Q-NEX-NMP311-RK');
    const [tempDeviceModel, setTempDeviceModel] = useState('');

    const deviceNameClickCountRef = useRef(0);
    const deviceNameClickTimerRef = useRef(null);
    const [isDeviceNameModalOpen, setIsDeviceNameModalOpen] = useState(false);
    const [deviceName, setDeviceName] = useState('NMP311-Product');
    const [tempDeviceName, setTempDeviceName] = useState('');

    const clickableLabels = ['Software Version', 'Disconnection', 'Device Name', 'Panel IP', 'Customize', 'Divisible Room Mode'];

    const settingsItems = [
        { label: 'Device Name', value: deviceName, type: 'text' },
        { label: 'Device ID', value: '6D171B770608', type: 'qrcode' },
        { label: 'Panel IP', value: `${panelIpAddress} (30:11:9a:69:2e:d8)`, type: 'text_chevron' },
        { label: 'Divisible Room Mode', type: 'chevron' },
        { label: 'Language', type: 'chevron' },
        { label: 'HDMI OUT Resolution', type: 'chevron' },
        { label: 'Display', type: 'chevron' },
        { label: 'Customize', type: 'chevron' },
        { label: 'Password Unlock', type: 'chevron' },
        { label: 'Date & Time', type: 'chevron' },
        { label: 'Software Version', value: 'V 1.0.1.2', type: 'text_chevron' },
        { label: 'Q-NEX Cloud Server Address', type: 'chevron' },
        { label: 'Disconnection', type: 'text' },
        { label: 'Clear Cache & Restart Touch Panel', type: 'text' }
    ];

    const handleItemClick = (label) => {
        if (label === 'Software Version') {
            clickCountRef.current += 1;
            if (clickCountRef.current === 3) {
                setTempDeviceModel(deviceModel);
                setIsModalOpen(true);
                clickCountRef.current = 0;
            }
            if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
            clickTimerRef.current = setTimeout(() => { clickCountRef.current = 0; }, 600);
        } else if (label === 'Device Name') {
            deviceNameClickCountRef.current += 1;
            if (deviceNameClickCountRef.current === 4) {
                setTempDeviceName(deviceName);
                setIsDeviceNameModalOpen(true);
                deviceNameClickCountRef.current = 0;
            }
            if (deviceNameClickTimerRef.current) clearTimeout(deviceNameClickTimerRef.current);
            deviceNameClickTimerRef.current = setTimeout(() => { deviceNameClickCountRef.current = 0; }, 800);
        } else if (label === 'Disconnection') {
            onDisconnectionClick?.();
        } else if (label === 'Panel IP') {
            onPanelIpClick?.();
        } else if (label === 'Customize') {
            onCustomizeClick?.();
        } else if (label === 'Divisible Room Mode') {
            onDivisibleRoomClick?.();
        }
    };

    const renderItemRight = (item) => {
        if (item.type === 'text') {
            return <EditableText text={item.value || ''} className={`text-base ${textSecondary(isDark)}`} />;
        }
        if (item.type === 'qrcode') {
            return (
                <div className="flex flex-col items-end gap-2 my-2">
                    <EditableText text={item.value} className={`text-sm tracking-wider ${textSecondary(isDark)}`} />
                    <div className={`w-16 h-16 p-1 ${isDark ? 'bg-white rounded-sm' : 'border border-gray-300'}`}>
                        <div className="w-full h-full" style={{backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #fff 25%, #fff 75%, #000 75%, #000)', backgroundPosition: '0 0, 4px 4px', backgroundSize: '8px 8px'}}></div>
                    </div>
                </div>
            );
        }
        return null; // chevron/text_chevron handled by SettingsRow default
    };

    return (
        <div className="p-8 h-full flex flex-col overflow-y-auto relative">
            <div className="max-w-5xl w-full mx-auto pb-10">
                {settingsItems.map((item, idx) => {
                    const isClickable = clickableLabels.includes(item.label);
                    const customRight = renderItemRight(item);
                    return (
                        <SettingsRow
                            key={idx}
                            isDark={isDark}
                            label={item.label}
                            value={item.value}
                            type={customRight ? 'custom' : item.type}
                            clickable={isClickable}
                            onClick={() => handleItemClick(item.label)}
                            rightContent={customRight}
                        />
                    );
                })}
            </div>

            {/* Device Model Modal */}
            <Modal isOpen={isModalOpen} isDark={isDark} onClose={() => setIsModalOpen(false)} onConfirm={() => { setDeviceModel(tempDeviceModel); setIsModalOpen(false); }}>
                <h3 className={`text-lg font-bold tracking-widest ${textTitle(isDark)}`}>{tempDeviceModel}</h3>
                <div className={inputBox(isDark)}>
                    <input type="text" value={tempDeviceModel} onChange={(e) => setTempDeviceModel(e.target.value)} className={inputText(isDark)} autoFocus />
                </div>
            </Modal>

            {/* Device Name Modal */}
            <Modal isOpen={isDeviceNameModalOpen} isDark={isDark} onClose={() => setIsDeviceNameModalOpen(false)} onConfirm={() => { setDeviceName(tempDeviceName); setIsDeviceNameModalOpen(false); }}>
                <div className={inputBox(isDark)}>
                    <input type="text" value={tempDeviceName} onChange={(e) => setTempDeviceName(e.target.value)} className={inputText(isDark)} autoFocus />
                </div>
            </Modal>
        </div>
    );
};
