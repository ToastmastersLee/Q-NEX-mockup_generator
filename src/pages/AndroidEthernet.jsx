import { useState } from 'react';
import { IpModeModal } from '../components/modals/IpModeModal';
import { StaticIpConfigModal } from '../components/modals/StaticIpConfigModal';

export const AndroidEthernet = ({ isDark, initialIp, onSave, onBack }) => {
    const [isEnabled, setIsEnabled] = useState(true);
    const [ipMode, setIpMode] = useState('static'); // 'static' | 'dhcp'
    
    // IP Settings State
    const [ipAddress, setIpAddress] = useState(initialIp || '192.168.101.108');
    const [netmask, setNetmask] = useState('255.255.255.0');
    const [gateway, setGateway] = useState('192.168.101.1');
    const [dns1, setDns1] = useState('192.168.101.1');
    const [dns2, setDns2] = useState('0.0.0.0');
    const macAddress = '30:11:9a:69:2e:d8';

    // Modal Control States
    const [isModeModalOpen, setIsModeModalOpen] = useState(false);
    const [isStaticModalOpen, setIsStaticModalOpen] = useState(false);

    const handleModeSelect = (mode) => {
        setIsModeModalOpen(false);
        if (mode === 'static') {
            setIsStaticModalOpen(true);
        } else {
            setIpMode('dhcp');
            setIpAddress('192.168.101.124');
            setNetmask('255.255.255.0');
            setGateway('192.168.101.1');
            setDns1('8.8.8.8');
            setDns2('8.8.4.4');
            if (onSave) onSave('192.168.101.124');
        }
    };

    const handleSaveStatic = (values) => {
        setIpAddress(values.ip);
        setNetmask(values.netmask);
        setGateway(values.gateway);
        setDns1(values.dns1);
        setDns2(values.dns2);
        setIpMode('static');
        setIsStaticModalOpen(false);
        if (onSave) onSave(values.ip);
    };

    // Styling helpers
    const pageBgClass = isDark ? 'bg-[#0f1726]' : 'bg-white border-4 border-black';
    const headerClass = isDark ? 'border-b border-[#2b3a4a] text-white' : 'border-b-4 border-black text-black';
    const textMainClass = isDark ? 'text-white' : 'text-black';
    const textSubClass = isDark ? 'text-gray-400' : 'text-gray-600';
    const rowBorderClass = isDark ? 'border-b border-[#182333]' : 'border-b-2 border-black';
    const backBtnClass = isDark 
        ? 'bg-[#2b3a4a] text-white hover:bg-[#394a5d] active:scale-95' 
        : 'bg-white border-2 border-black text-black font-bold hover:bg-gray-100 active:translate-x-0.5 active:translate-y-0.5';

    const dialogBgClass = isDark 
        ? 'bg-[#202e3f] text-white shadow-2xl border border-white/5' 
        : 'bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-black';
    const flatBtnClass = isDark
        ? 'text-[#4d90fe] hover:bg-white/5 active:bg-white/10 font-bold px-4 py-2 rounded'
        : 'text-black hover:bg-gray-100 font-bold border-2 border-black px-4 py-2 rounded';

    return (
        <div className={`w-full h-full flex flex-col p-6 font-sans relative select-none ${pageBgClass}`}>
            {/* Header */}
            <div className={`pb-3 mb-4 flex items-center justify-between ${headerClass}`}>
                <h2 className="text-xl font-bold tracking-wide">Ethernet</h2>
            </div>

            {/* List Container */}
            <div className={`flex-1 overflow-y-auto flex flex-col gap-1 pr-2 ${!isEnabled ? 'opacity-50 pointer-events-none' : ''}`} style={{ pointerEvents: isEnabled ? 'auto' : 'none' }}>
                {/* Ethernet Toggle */}
                <div 
                    className={`flex items-center justify-between py-3 px-4 rounded-lg cursor-pointer hover:bg-white/5 transition-colors ${rowBorderClass}`}
                    style={{ pointerEvents: 'auto' }}
                    onClick={() => setIsEnabled(!isEnabled)}
                >
                    <div className="flex flex-col">
                        <span className={`text-base font-semibold ${textMainClass}`}>Ethernet</span>
                        <span className={`text-xs ${textSubClass}`}>
                            {isEnabled ? 'Ethernet is enabled' : 'Ethernet is disabled'}
                        </span>
                    </div>
                    <div className={`w-12 h-6 rounded-full p-1 transition-all duration-300 flex items-center ${isEnabled ? (isDark ? 'bg-blue-600 justify-end' : 'bg-blue-600 justify-end border-2 border-black') : (isDark ? 'bg-gray-700 justify-start' : 'bg-gray-300 justify-start border-2 border-black')}`}>
                        <div className={`w-4 h-4 rounded-full bg-white shadow-md ${!isDark ? 'border border-black' : ''}`}></div>
                    </div>
                </div>

                {/* Info Rows */}
                <div className={`flex flex-col py-3 px-4 ${rowBorderClass}`}>
                    <span className={`text-base font-semibold ${textMainClass}`}>MAC</span>
                    <span className={`text-sm ${textSubClass}`}>{macAddress}</span>
                </div>

                <div className={`flex flex-col py-3 px-4 ${rowBorderClass}`}>
                    <span className={`text-base font-semibold ${textMainClass}`}>IP address</span>
                    <span className={`text-sm ${textSubClass}`}>{isEnabled ? ipAddress : 'Unavailable'}</span>
                </div>

                <div className={`flex flex-col py-3 px-4 ${rowBorderClass}`}>
                    <span className={`text-base font-semibold ${textMainClass}`}>netmask</span>
                    <span className={`text-sm ${textSubClass}`}>{isEnabled ? netmask : 'Unavailable'}</span>
                </div>

                <div className={`flex flex-col py-3 px-4 ${rowBorderClass}`}>
                    <span className={`text-base font-semibold ${textMainClass}`}>gateway</span>
                    <span className={`text-sm ${textSubClass}`}>{isEnabled ? gateway : 'Unavailable'}</span>
                </div>

                <div className={`flex flex-col py-3 px-4 ${rowBorderClass}`}>
                    <span className={`text-base font-semibold ${textMainClass}`}>dns1</span>
                    <span className={`text-sm ${textSubClass}`}>{isEnabled ? dns1 : 'Unavailable'}</span>
                </div>

                <div className={`flex flex-col py-3 px-4 ${rowBorderClass}`}>
                    <span className={`text-base font-semibold ${textMainClass}`}>dns2</span>
                    <span className={`text-sm ${textSubClass}`}>{isEnabled ? dns2 : 'Unavailable'}</span>
                </div>

                {/* Ethernet IP Mode */}
                <div 
                    className={`flex flex-col py-3 px-4 cursor-pointer hover:bg-white/5 transition-colors ${rowBorderClass}`}
                    onClick={() => setIsModeModalOpen(true)}
                >
                    <span className={`text-base font-semibold ${textMainClass}`}>Ethernet ip mode</span>
                    <span className={`text-sm capitalize ${isDark ? 'text-blue-400 font-semibold' : 'text-blue-600 font-bold'}`}>
                        {ipMode}
                    </span>
                </div>
            </div>

            {/* Back Button Footer */}
            <div className="pt-4 flex justify-between items-center border-t border-white/5 mt-2">
                <button 
                    onClick={onBack}
                    className={`px-6 py-2 rounded text-sm font-bold uppercase transition-all ${backBtnClass}`}
                >
                    Back
                </button>
            </div>

            {/* Modals */}
            {isModeModalOpen && (
                <IpModeModal 
                    isDark={isDark}
                    ipMode={ipMode}
                    onSelectMode={handleModeSelect}
                    onClose={() => setIsModeModalOpen(false)}
                    dialogBgClass={dialogBgClass}
                    flatBtnClass={flatBtnClass}
                />
            )}

            {isStaticModalOpen && (
                <StaticIpConfigModal 
                    isDark={isDark}
                    ipAddress={ipAddress}
                    netmask={netmask}
                    gateway={gateway}
                    dns1={dns1}
                    dns2={dns2}
                    onSave={handleSaveStatic}
                    onClose={() => setIsStaticModalOpen(false)}
                    dialogBgClass={dialogBgClass}
                    flatBtnClass={flatBtnClass}
                />
            )}
        </div>
    );
};
