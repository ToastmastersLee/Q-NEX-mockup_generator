import { useState } from 'react';
import { isValidIp } from '../../utils/ipValidation';

export const StaticIpConfigModal = ({
    isDark,
    ipAddress,
    netmask,
    gateway,
    dns1,
    dns2,
    onSave,
    onClose,
    dialogBgClass,
    flatBtnClass
}) => {
    const [tempIp, setTempIp] = useState(ipAddress);
    const [tempNetmask, setTempNetmask] = useState(netmask);
    const [tempGateway, setTempGateway] = useState(gateway);
    const [tempDns1, setTempDns1] = useState(dns1);
    const [tempDns2, setTempDns2] = useState(dns2);

    const [errors, setErrors] = useState({
        ip: false,
        netmask: false,
        gateway: false,
        dns1: false,
        dns2: false
    });

    const handleConnect = () => {
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
            onSave({
                ip: tempIp,
                netmask: tempNetmask,
                gateway: tempGateway,
                dns1: tempDns1,
                dns2: tempDns2 || '0.0.0.0'
            });
        }
    };

    const inputUnderlineClass = (hasError) => {
        if (hasError) {
            return isDark ? 'border-b-2 border-red-500 text-white' : 'border-b-2 border-red-600 text-black';
        }
        return isDark 
            ? 'border-b border-gray-500 focus:border-[#4d90fe] text-white' 
            : 'border-b-2 border-black focus:border-blue-600 text-black';
    };

    return (
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
                        onClick={onClose}
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
    );
};
