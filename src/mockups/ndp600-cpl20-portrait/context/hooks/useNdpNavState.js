import { useState } from 'react';
import { navItems, defaultNavConfig, getInitialTab } from '../../constants/nav';

export function useNdpNavState() {
    const [activeTab, setActiveTab] = useState(getInitialTab);
    const [settingsSubpage, setSettingsSubpage] = useState(null);
    const [navConfig, setNavConfig] = useState(defaultNavConfig);
    const [itemsOrder, setItemsOrder] = useState(['power', 'video', 'volume', 'serial', 'air', 'projector', 'remote']);

    const handleNavConfigChange = (id) => {
        const next = { ...navConfig, [id]: !navConfig[id] };
        setNavConfig(next);
        if (activeTab === id && !next[id]) {
            const fallback = navItems.find((item) => item.id !== 'home' && next[item.id]);
            setActiveTab(fallback?.id ?? 'home');
        }
    };

    const handleSettingsBack = () => {
        if (settingsSubpage === 'customize-nav' || settingsSubpage === 'customize-template') {
            setSettingsSubpage('customize');
        } else if (settingsSubpage === 'password-setting') {
            setSettingsSubpage('password-unlock');
        } else {
            setSettingsSubpage(null);
        }
    };

    return {
        activeTab,
        setActiveTab,
        settingsSubpage,
        setSettingsSubpage,
        navConfig,
        setNavConfig,
        handleNavConfigChange,
        itemsOrder,
        setItemsOrder,
        handleSettingsBack
    };
}
