import React, { useState, useEffect } from 'react';

// Simple helper to check if a string is a valid IPv4 address
const isValidIp = (ip) => {
    const regex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip.trim());
};

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

    // Form Temporary State
    const [tempIp, setTempIp] = useState(ipAddress);
    const [tempNetmask, setTempNetmask] = useState(netmask);
    const [tempGateway, setTempGateway] = useState(gateway);
    const [tempDns1, setTempDns1] = useState(dns1);
    const [tempDns2, setTempDns2] = useState(dns2);

    // Validation Errors State
    const [errors, setErrors] = useState({
        ip: false,
        netmask: false,
        gateway: false,
        dns1: false,
        dns2: false
    });

    const openStaticModal = () => {
        setTempIp(ipAddress);
        setTempNetmask(netmask);
        setTempGateway(gateway);
        setTempDns1(dns1);
        setTempDns2(dns2);
        setErrors({ ip: false, netmask: false, gateway: false, dns1: false, dns2: false });
        setIsStaticModalOpen(true);
    };

    const handleModeSelect = (mode) => {
        setIsModeModalOpen(false);
        if (mode === 'static') {
            openStaticModal();
        } else {
            setIpMode('dhcp');
            // If DHCP, simulate receiving dynamic configuration
            setIpAddress('192.168.101.124');
            setNetmask('255.255.255.0');
            setGateway('192.168.101.1');
            setDns1('8.8.8.8');
            setDns2('8.8.4.4');
            if (onSave) onSave('192.168.101.124');
        }
    };

    const handleConnect = () => {
        // Validate all fields
        const ipValid = isValidIp(tempIp);
        const netmaskValid = isValidIp(tempNetmask);
        const gatewayValid = isValidIp(tempGateway);
        const dns1Valid = isValidIp(tempDns1);
        const dns2Valid = tempDns2.trim() === '' || isValidIp(tempDns2);

        setErrors({
            ip: !ipValid,
            netmask: !netmaskValid,
            gateway: !gatewayValid,
            dns1: !dns1Valid,
            dns2: !dns2Valid
        });

        if (ipValid && netmaskValid && gatewayValid && dns1Valid && dns2Valid) {
            setIpAddress(tempIp);
            setNetmask(tempNetmask);
            setGateway(tempGateway);
            setDns1(tempDns1);
            setDns2(tempDns2 || '0.0.0.0');
            setIpMode('static');
            setIsStaticModalOpen(false);
            if (onSave) onSave(tempIp);
        }
    };

    // Dark Mode Theme Styling (Android AOSP Material Style)
    const pageBgClass = isDark ? 'bg-[#0f1726]' : 'bg-white border-4 border-black';
    const headerClass = isDark ? 'border-b border-[#2b3a4a] text-white' : 'border-b-4 border-black text-black';
    const textMainClass = isDark ? 'text-white' : 'text-black';
    const textSubClass = isDark ? 'text-gray-400' : 'text-gray-600';
    const rowBorderClass = isDark ? 'border-b border-[#182333]' : 'border-b-2 border-black';
    const backBtnClass = isDark 
        ? 'bg-[#2b3a4a] text-white hover:bg-[#394a5d] active:scale-95' 
        : 'bg-white border-2 border-black text-black font-bold hover:bg-gray-100 active:translate-x-0.5 active:translate-y-0.5';

    // Dialog Styling
    const dialogBgClass = isDark 
        ? 'bg-[#202e3f] text-white shadow-2xl border border-white/5' 
        : 'bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-black';
    const inputUnderlineClass = (hasError) => {
        if (hasError) {
            return isDark ? 'border-b-2 border-red-500 text-white' : 'border-b-2 border-red-600 text-black';
        }
        return isDark 
            ? 'border-b border-gray-500 focus:border-[#4d90fe] text-white' 
            : 'border-b-2 border-black focus:border-blue-600 text-black';
    };
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
                
                {/* Ethernet Toggle (Always active so they can toggle it back) */}
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
                    {/* Toggle Switch */}
                    <div className={`w-12 h-6 rounded-full p-1 transition-all duration-300 flex items-center ${isEnabled ? (isDark ? 'bg-blue-600 justify-end' : 'bg-blue-600 justify-end border-2 border-black') : (isDark ? 'bg-gray-700 justify-start' : 'bg-gray-300 justify-start border-2 border-black')}`}>
                        <div className={`w-4 h-4 rounded-full bg-white shadow-md ${!isDark ? 'border border-black' : ''}`}></div>
                    </div>
                </div>

                {/* MAC Address */}
                <div className={`flex flex-col py-3 px-4 ${rowBorderClass}`}>
                    <span className={`text-base font-semibold ${textMainClass}`}>MAC</span>
                    <span className={`text-sm ${textSubClass}`}>{macAddress}</span>
                </div>

                {/* IP Address */}
                <div className={`flex flex-col py-3 px-4 ${rowBorderClass}`}>
                    <span className={`text-base font-semibold ${textMainClass}`}>IP address</span>
                    <span className={`text-sm ${textSubClass}`}>{isEnabled ? ipAddress : 'Unavailable'}</span>
                </div>

                {/* Netmask */}
                <div className={`flex flex-col py-3 px-4 ${rowBorderClass}`}>
                    <span className={`text-base font-semibold ${textMainClass}`}>netmask</span>
                    <span className={`text-sm ${textSubClass}`}>{isEnabled ? netmask : 'Unavailable'}</span>
                </div>

                {/* Gateway */}
                <div className={`flex flex-col py-3 px-4 ${rowBorderClass}`}>
                    <span className={`text-base font-semibold ${textMainClass}`}>gateway</span>
                    <span className={`text-sm ${textSubClass}`}>{isEnabled ? gateway : 'Unavailable'}</span>
                </div>

                {/* DNS 1 */}
                <div className={`flex flex-col py-3 px-4 ${rowBorderClass}`}>
                    <span className={`text-base font-semibold ${textMainClass}`}>dns1</span>
                    <span className={`text-sm ${textSubClass}`}>{isEnabled ? dns1 : 'Unavailable'}</span>
                </div>

                {/* DNS 2 */}
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

            {/* Back Button Footer (Always visible) */}
            <div className="pt-4 flex justify-between items-center border-t border-white/5 mt-2">
                <button 
                    onClick={onBack}
                    className={`px-6 py-2 rounded text-sm font-bold uppercase transition-all ${backBtnClass}`}
                >
                    Back
                </button>
            </div>

            {/* MODAL 1: Ethernet IP Mode Radio Options */}
            {isModeModalOpen && (
                <div className="absolute inset-0 z-40 bg-black/40 backdrop-blur-xs flex items-center justify-center rounded-2xl">
                    <div className={`w-80 p-6 rounded-md flex flex-col gap-6 ${dialogBgClass}`}>
                        <h3 className="text-lg font-bold">Ethernet ip mode</h3>
                        
                        <div className="flex flex-col gap-4">
                            {/* Static Radio Option */}
                            <label 
                                className="flex items-center gap-4 cursor-pointer"
                                onClick={() => handleModeSelect('static')}
                            >
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${ipMode === 'static' ? (isDark ? 'border-blue-400' : 'border-blue-600') : 'border-gray-400'}`}>
                                    {ipMode === 'static' && (
                                        <div className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
                                    )}
                                </div>
                                <span className="text-sm font-semibold capitalize">static</span>
                            </label>

                            {/* DHCP Radio Option */}
                            <label 
                                className="flex items-center gap-4 cursor-pointer"
                                onClick={() => handleModeSelect('dhcp')}
                            >
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${ipMode === 'dhcp' ? (isDark ? 'border-blue-400' : 'border-blue-600') : 'border-gray-400'}`}>
                                    {ipMode === 'dhcp' && (
                                        <div className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
                                    )}
                                </div>
                                <span className="text-sm font-semibold capitalize">dhcp</span>
                            </label>
                        </div>

                        <div className="flex justify-end gap-2 mt-2">
                            <button 
                                onClick={() => setIsModeModalOpen(false)}
                                className={`text-sm tracking-wide uppercase transition-all cursor-pointer ${flatBtnClass}`}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL 2: Static IP Setup Dialog */}
            {isStaticModalOpen && (
                <div className="absolute inset-0 z-40 bg-black/40 backdrop-blur-xs flex items-center justify-center rounded-2xl overflow-y-auto">
                    <div className={`w-[26rem] p-6 rounded-md flex flex-col gap-6 max-h-[90%] overflow-y-auto ${dialogBgClass}`}>
                        <h3 className="text-lg font-bold">Ethernet</h3>
                        
                        <div className="flex flex-col gap-4">
                            {/* IP Input */}
                            <div className="flex flex-col gap-1">
                                <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>IP address</label>
                                <input 
                                    type="text" 
                                    value={tempIp}
                                    onChange={(e) => setTempIp(e.target.value)}
                                    onBlur={() => setErrors(prev => ({ ...prev, ip: !isValidIp(tempIp) }))}
                                    className={`bg-transparent outline-none py-1 text-sm tracking-wide font-medium ${inputUnderlineClass(errors.ip)}`}
                                    placeholder="e.g. 192.168.1.100"
                                />
                                {errors.ip && <span className="text-[10px] text-red-500 font-semibold mt-0.5">Invalid IP format</span>}
                            </div>

                            {/* Gateway Input */}
                            <div className="flex flex-col gap-1">
                                <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>Gateway</label>
                                <input 
                                    type="text" 
                                    value={tempGateway}
                                    onChange={(e) => setTempGateway(e.target.value)}
                                    onBlur={() => setErrors(prev => ({ ...prev, gateway: !isValidIp(tempGateway) }))}
                                    className={`bg-transparent outline-none py-1 text-sm tracking-wide font-medium ${inputUnderlineClass(errors.gateway)}`}
                                    placeholder="e.g. 192.168.1.1"
                                />
                                {errors.gateway && <span className="text-[10px] text-red-500 font-semibold mt-0.5">Invalid Gateway format</span>}
                            </div>

                            {/* Netmask Input */}
                            <div className="flex flex-col gap-1">
                                <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>netmask</label>
                                <input 
                                    type="text" 
                                    value={tempNetmask}
                                    onChange={(e) => setTempNetmask(e.target.value)}
                                    onBlur={() => setErrors(prev => ({ ...prev, netmask: !isValidIp(tempNetmask) }))}
                                    className={`bg-transparent outline-none py-1 text-sm tracking-wide font-medium ${inputUnderlineClass(errors.netmask)}`}
                                    placeholder="e.g. 255.255.255.0"
                                />
                                {errors.netmask && <span className="text-[10px] text-red-500 font-semibold mt-0.5">Invalid Netmask format</span>}
                            </div>

                            {/* DNS 1 Input */}
                            <div className="flex flex-col gap-1">
                                <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>DNS 1</label>
                                <input 
                                    type="text" 
                                    value={tempDns1}
                                    onChange={(e) => setTempDns1(e.target.value)}
                                    onBlur={() => setErrors(prev => ({ ...prev, dns1: !isValidIp(tempDns1) }))}
                                    className={`bg-transparent outline-none py-1 text-sm tracking-wide font-medium ${inputUnderlineClass(errors.dns1)}`}
                                    placeholder="e.g. 8.8.8.8"
                                />
                                {errors.dns1 && <span className="text-[10px] text-red-500 font-semibold mt-0.5">Invalid DNS format</span>}
                            </div>

                            {/* DNS 2 Input */}
                            <div className="flex flex-col gap-1">
                                <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>DNS 2</label>
                                <input 
                                    type="text" 
                                    value={tempDns2}
                                    onChange={(e) => setTempDns2(e.target.value)}
                                    onBlur={() => setErrors(prev => ({ ...prev, dns2: tempDns2.trim() !== '' && !isValidIp(tempDns2) }))}
                                    className={`bg-transparent outline-none py-1 text-sm tracking-wide font-medium ${inputUnderlineClass(errors.dns2)}`}
                                    placeholder="e.g. 8.8.4.4"
                                />
                                {errors.dns2 && <span className="text-[10px] text-red-500 font-semibold mt-0.5">Invalid DNS format</span>}
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-2">
                            <button 
                                onClick={() => setIsStaticModalOpen(false)}
                                className={`text-sm tracking-wide uppercase transition-all cursor-pointer ${flatBtnClass}`}
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleConnect}
                                className={`text-sm tracking-wide uppercase transition-all cursor-pointer ${flatBtnClass}`}
                            >
                                Connect
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};
