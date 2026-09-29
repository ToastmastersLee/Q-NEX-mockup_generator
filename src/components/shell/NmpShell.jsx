import { TopBar } from '../TopBar';
import { BottomNav } from '../BottomNav';
import { Disconnection } from '../../pages/Disconnection';
import { LockScreen } from '../../pages/LockScreen';
import { AndroidEthernet } from '../../pages/AndroidEthernet';
import { LockCountdownModal } from '../LockCountdownModal';
import { FaqModal } from '../FaqModal';
import { NmpDevToolbar } from './NmpDevToolbar';
import { NmpContentRouter } from './NmpContentRouter';
import { useNmpContext } from '../../context/useNmpContext';

export const NmpShell = () => {
    const {
        isDark,
        activeTab,
        setActiveTab,
        settingsSubPage,
        setSettingsSubPage,
        handleBack,
        activeConnectionPage,
        isDisconnected,
        setIsDisconnected,
        isLocked,
        unlock,
        isLockCountdown,
        lockCountdownTime,
        handleLockClick,
        cancelLockCountdown,
        executeLockNow,
        isAndroidEthernetOpen,
        setIsAndroidEthernetOpen,
        panelIpAddress,
        setPanelIpAddress,
        toastMessage,
        isFaqOpen,
        setIsFaqOpen,
        navConfig,
        allNavItems
    } = useNmpContext();

    const containerClass = isDark 
        ? 'bg-gradient-to-br from-[#414a5e] to-[#252a36] text-white border-none' 
        : 'bg-white border-4 border-black text-black';

    const getTopBarTitle = () => {
        if (activeTab === 'settings') {
            if (settingsSubPage === 'customize') return 'Customize';
            if (settingsSubPage === 'navigation-bar') return 'Navigation bar';
            if (settingsSubPage === 'power-off') return 'Scheduled Power-Off';
            if (settingsSubPage === 'divisible-room') return 'Divisible Room Mode';
            if (settingsSubPage === 'device-select') {
                return (
                    <div className="flex flex-col items-center">
                        <span className="text-xl font-bold">NMP of Secondary Room (1/4)</span>
                    </div>
                );
            }
            if (settingsSubPage === 'edit-device') return 'Edit Device';
            if (settingsSubPage === 'add-device') return 'Add Devices';
            if (settingsSubPage === 'connection-instruction') {
                const subtitle = activeConnectionPage === 2 ? 'Multiple secondary rooms' : 'Single secondary room';
                return (
                    <div className="flex flex-col items-center">
                        <span className="text-xl font-bold">Connection Instruction (2/4)</span>
                        <span className="text-xs text-gray-500 font-semibold mt-0.5">{subtitle}</span>
                    </div>
                );
            }
            if (settingsSubPage === 'control-binding') {
                return (
                    <div className="flex flex-col items-center">
                        <span className="text-xl font-bold">Testing (3/4)</span>
                    </div>
                );
            }
            if (settingsSubPage === 'setup-complete') {
                return (
                    <div className="flex flex-col items-center">
                        <span className="text-xl font-bold">Testing (4/4)</span>
                    </div>
                );
            }
            return 'Setting';
        }
        if (activeTab === 'audioSwitch') {
            return 'Audio Switch';
        }
        return '';
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-950 p-8 w-full">
            <div className="w-full max-w-5xl relative">
                <div className="flex flex-col items-end gap-4 w-full">
                    <NmpDevToolbar />

                    <div className={`w-full shadow-2xl rounded-2xl overflow-hidden aspect-video-container flex flex-col font-sans ${containerClass} relative`}>
                        {isDisconnected ? (
                            <Disconnection 
                                isDark={isDark} 
                                onConnect={() => setIsDisconnected(false)} 
                            />
                        ) : isLocked ? (
                            <LockScreen 
                                isDark={isDark} 
                                onUnlock={unlock} 
                            />
                        ) : isAndroidEthernetOpen ? (
                            <AndroidEthernet 
                                isDark={isDark} 
                                initialIp={panelIpAddress}
                                onSave={(newIp) => setPanelIpAddress(newIp)}
                                onBack={() => setIsAndroidEthernetOpen(false)}
                            />
                        ) : (
                            <>
                                <TopBar 
                                    isDark={isDark} 
                                    activeTab={activeTab} 
                                    onSettingsClick={() => {
                                        setSettingsSubPage(null);
                                        setActiveTab('settings');
                                    }} 
                                    onHomeClick={() => {
                                        setSettingsSubPage(null);
                                        setActiveTab('home');
                                    }}
                                    onLockClick={handleLockClick}
                                    title={getTopBarTitle()}
                                    showBackButton={activeTab === 'settings' && settingsSubPage !== null}
                                    onBack={handleBack}
                                />

                                {/* Main Content Area */}
                                <div className="flex-1 overflow-auto relative">
                                    <NmpContentRouter />
                                    {isLockCountdown && (
                                        <LockCountdownModal 
                                            isDark={isDark}
                                            countdown={lockCountdownTime}
                                            onCancel={cancelLockCountdown}
                                            onExecute={executeLockNow}
                                        />
                                    )}
                                    {toastMessage && (
                                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-gray-200/90 text-gray-800 shadow-xl border border-gray-300/40 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 animate-pulse text-center whitespace-nowrap">
                                            {toastMessage}
                                        </div>
                                    )}
                                </div>

                                <BottomNav 
                                    isDark={isDark} 
                                    activeTab={activeTab} 
                                    setActiveTab={(tab) => {
                                        setSettingsSubPage(null);
                                        setActiveTab(tab);
                                    }} 
                                    navConfig={navConfig} 
                                    allNavItems={allNavItems} 
                                />
                                <FaqModal isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)} isDark={isDark} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
