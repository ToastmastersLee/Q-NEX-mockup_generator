import React from 'react';
import { SettingsRow } from '../components/SettingsRow';

export const Customize = ({ isDark, onItemClick }) => {
    const items = [
        { label: 'Navigation bar' },
        { label: 'Homepage Template' },
        { label: 'Scheduled Power-Off', description: '(Set the device to automatically power off at a specified time each day)' }
    ];

    return (
        <div className="p-8 h-full flex flex-col overflow-y-auto relative animate-fade-in">
            <div className="max-w-5xl w-full mx-auto pb-10">
                {items.map((item, idx) => (
                    <SettingsRow
                        key={idx}
                        isDark={isDark}
                        label={item.label}
                        description={item.description}
                        type="chevron"
                        clickable
                        onClick={() => onItemClick(item.label)}
                    />
                ))}
            </div>
        </div>
    );
};
