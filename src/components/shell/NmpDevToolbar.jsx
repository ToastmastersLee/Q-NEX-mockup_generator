import { Sun, Moon } from 'lucide-react';
import { useNmpContext } from '../../context/useNmpContext';

export const NmpDevToolbar = () => {
    const {
        isDark,
        setTheme,
        isDisconnected,
        setIsDisconnected,
        allNavItems,
        navConfig,
        setNavConfig,
        settingsSubPage,
        simulatedBranch,
        handleSelectBranch
    } = useNmpContext();

    return (
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between w-full gap-4 mb-2">
            <div className="flex flex-wrap gap-4 items-center">
                {/* Connection Status Toggle */}
                <div className={`flex items-center gap-3 p-4 rounded-xl shadow-md ${isDark ? 'bg-gray-800/80 border border-gray-700' : 'bg-white border-2 border-black'}`}>
                    <span className={`text-sm font-bold ${isDark ? 'text-gray-300' : 'text-black'}`}>Status:</span>
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            className="w-4 h-4 cursor-pointer accent-red-500"
                            checked={isDisconnected} 
                            onChange={() => setIsDisconnected(!isDisconnected)} 
                        />
                        <span className={`text-xs font-bold transition-colors ${isDisconnected ? 'text-red-500' : (isDark ? 'text-emerald-400 group-hover:text-emerald-300' : 'text-emerald-600 group-hover:text-emerald-700')}`}>
                            {isDisconnected ? 'Disconnected' : 'Connected'}
                        </span>
                    </label>
                </div>

                {/* Dynamic Menu Visibility Checkboxes */}
                <div className={`flex flex-wrap gap-4 p-4 rounded-xl shadow-md ${isDark ? 'bg-gray-800/80 border border-gray-700' : 'bg-white border-2 border-black'}`}>
                    <span className={`text-sm font-bold mr-2 ${isDark ? 'text-gray-300' : 'text-black'}`}>Menu Config:</span>
                    {allNavItems.map(item => (
                        <label key={item.id} className="flex items-center gap-2 cursor-pointer group">
                            <input 
                                type="checkbox" 
                                className="w-4 h-4 cursor-pointer"
                                checked={navConfig[item.id]} 
                                onChange={() => setNavConfig({...navConfig, [item.id]: !navConfig[item.id]})} 
                            />
                            <span className={`text-xs ${isDark ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-700 font-semibold group-hover:text-black'}`}>{item.label}</span>
                        </label>
                    ))}
                </div>

                {/* Test Simulation Toggle (Only visible during connection testing step 3/4) */}
                {settingsSubPage === 'control-binding' && (
                    <div className={`flex items-center gap-3 p-4 rounded-xl shadow-md ${isDark ? 'bg-gray-800/80 border border-gray-700' : 'bg-white border-2 border-black'}`}>
                        <span className={`text-sm font-bold ${isDark ? 'text-gray-300' : 'text-black'}`}>Test Simulation:</span>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => handleSelectBranch('success')}
                                className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                                    simulatedBranch === 'success' 
                                        ? 'bg-blue-600 text-white shadow-sm animate-pulse' 
                                        : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Success Branch
                            </button>
                            <button 
                                onClick={() => handleSelectBranch('failed')}
                                className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                                    simulatedBranch === 'failed' 
                                        ? 'bg-rose-600 text-white shadow-sm animate-pulse' 
                                        : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Failure Branch
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* External Theme Toggle */}
            <button 
                onClick={() => setTheme(isDark ? 'wireframe' : 'dark')} 
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold ${isDark ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700' : 'bg-white border-2 border-black text-black hover:bg-gray-100'} transition-colors shadow-md`} 
                title="Toggle Theme"
            >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span>{isDark ? 'Light Theme' : 'Dark Theme'}</span>
            </button>
        </div>
    );
};
