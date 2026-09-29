import { Home } from '../../pages/Home';
import { VideoSwitch } from '../../pages/VideoSwitch';
import { Settings } from '../../pages/Settings';
import { PowerControl } from '../../pages/PowerControl';
import { Volume } from '../../pages/Volume';
import { AirConditioner } from '../../pages/AirConditioner';
import { ProjectionScreen } from '../../pages/ProjectionScreen';
import { RemoteControl } from '../../pages/RemoteControl';
import { Customize } from '../../pages/Customize';
import { ScheduledPowerOff } from '../../pages/ScheduledPowerOff';
import { SerialControl } from '../../pages/SerialControl';
import { DivisibleRoom } from '../../pages/DivisibleRoom';
import { AudioSwitch } from '../../pages/AudioSwitch';
import { NavigationBarConfig } from '../../pages/NavigationBarConfig';
import { useNmpContext } from '../../context/useNmpContext';

export const NmpContentRouter = () => {
    const {
        isDark,
        activeTab,
        isDuplicateMode,
        setIsDuplicateMode,
        activeDuplicate,
        setActiveDuplicate,
        activeOutA,
        setActiveOutA,
        activeOutB,
        setActiveOutB,
        activeOutC,
        setActiveOutC,
        settingsSubPage,
        setSettingsSubPage,
        navConfig,
        setNavConfig,
        allNavItems,
        isScheduledPowerOffEnabled,
        setIsScheduledPowerOffEnabled,
        scheduledPowerOffTime,
        setScheduledPowerOffTime,
        isDivisibleRoomModeEnabled,
        setIsDivisibleRoomModeEnabled,
        primaryRoomNmpName,
        setPrimaryRoomNmpName,
        secondaryDevices,
        setSecondaryDevices,
        editingDeviceId,
        setEditingDeviceId,
        activeConnectionPage,
        setActiveConnectionPage,
        showToast,
        testResult,
        setIsFaqOpen,
        setIsDisconnected,
        setIsAndroidEthernetOpen,
        panelIpAddress,
        setPanelIpAddress
    } = useNmpContext();

    if (activeTab === 'home') {
        return (
            <Home 
                isDark={isDark} 
                isDuplicateMode={isDuplicateMode}
                setIsDuplicateMode={setIsDuplicateMode}
                activeDuplicate={activeDuplicate}
                setActiveDuplicate={setActiveDuplicate}
                activeOutA={activeOutA}
                setActiveOutA={setActiveOutA}
                activeOutB={activeOutB}
                setActiveOutB={setActiveOutB}
                activeOutC={activeOutC}
                setActiveOutC={setActiveOutC}
            />
        );
    }
    
    if (activeTab === 'powerCtrl') {
        return <PowerControl isDark={isDark} />;
    }
    
    if (activeTab === 'vol') {
        return <Volume isDark={isDark} />;
    }
    
    if (activeTab === 'air') {
        return <AirConditioner isDark={isDark} />;
    }

    if (activeTab === 'projector') {
        return <ProjectionScreen isDark={isDark} />;
    }
    
    if (activeTab === 'remote') {
        return <RemoteControl isDark={isDark} />;
    }

    if (activeTab === 'serial') {
        return <SerialControl isDark={isDark} />;
    }

    if (activeTab === 'video') {
        return (
            <VideoSwitch 
                isDark={isDark}
                isDuplicateMode={isDuplicateMode}
                setIsDuplicateMode={setIsDuplicateMode}
                activeDuplicate={activeDuplicate}
                setActiveDuplicate={setActiveDuplicate}
                activeOutA={activeOutA}
                setActiveOutA={setActiveOutA}
                activeOutB={activeOutB}
                setActiveOutB={setActiveOutB}
                activeOutC={activeOutC}
                setActiveOutC={setActiveOutC}
            />
        );
    }
    
    if (activeTab === 'audioSwitch') {
        return <AudioSwitch isDark={isDark} />;
    }

    if (activeTab === 'settings') {
        if (settingsSubPage === 'customize') {
            return (
                <Customize 
                    isDark={isDark}
                    onItemClick={(subItem) => {
                        if (subItem === 'Scheduled Power-Off') {
                            setSettingsSubPage('power-off');
                        } else if (subItem === 'Navigation bar') {
                            setSettingsSubPage('navigation-bar');
                        }
                    }}
                />
            );
        }
        if (settingsSubPage === 'navigation-bar') {
            return (
                <NavigationBarConfig 
                    isDark={isDark}
                    navConfig={navConfig}
                    setNavConfig={setNavConfig}
                    allNavItems={allNavItems}
                />
            );
        }
        if (settingsSubPage === 'power-off') {
            return (
                <ScheduledPowerOff 
                    isDark={isDark}
                    isEnabled={isScheduledPowerOffEnabled}
                    setIsEnabled={setIsScheduledPowerOffEnabled}
                    powerOffTime={scheduledPowerOffTime}
                    setPowerOffTime={setScheduledPowerOffTime}
                />
            );
        }
        if (['divisible-room', 'device-select', 'edit-device', 'add-device', 'connection-instruction', 'control-binding', 'setup-complete'].includes(settingsSubPage)) {
            return (
                <DivisibleRoom 
                    isDark={isDark}
                    subPage={settingsSubPage}
                    setSubPage={setSettingsSubPage}
                    isDivisibleRoomModeEnabled={isDivisibleRoomModeEnabled}
                    setIsDivisibleRoomModeEnabled={setIsDivisibleRoomModeEnabled}
                    primaryRoomNmpName={primaryRoomNmpName}
                    setPrimaryRoomNmpName={setPrimaryRoomNmpName}
                    secondaryDevices={secondaryDevices}
                    setSecondaryDevices={setSecondaryDevices}
                    editingDeviceId={editingDeviceId}
                    setEditingDeviceId={setEditingDeviceId}
                    activeConnectionPage={activeConnectionPage}
                    setActiveConnectionPage={setActiveConnectionPage}
                    onShowToast={showToast}
                    testResult={testResult}
                    setIsFaqOpen={setIsFaqOpen}
                />
            );
        }
        return (
            <Settings 
                isDark={isDark} 
                onDisconnectionClick={() => setIsDisconnected(true)} 
                onPanelIpClick={() => setIsAndroidEthernetOpen(true)}
                panelIpAddress={panelIpAddress}
                setPanelIpAddress={setPanelIpAddress}
                onCustomizeClick={() => setSettingsSubPage('customize')}
                onDivisibleRoomClick={() => setSettingsSubPage('divisible-room')}
            />
        );
    }

    return (
        <div className="flex items-center justify-center h-full">
            <h2 className="text-4xl opacity-50 capitalize">{activeTab} View</h2>
        </div>
    );
};
