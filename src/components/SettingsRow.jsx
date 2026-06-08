import React from 'react';
import { ChevronRight } from 'lucide-react';
import { settingsRow, settingsLabel, textSecondary, chevronColor } from '../styles/theme';

export const SettingsRow = ({ 
    isDark, 
    label, 
    value, 
    description,
    type = 'chevron',  // 'chevron' | 'text' | 'text_chevron' | 'custom'
    clickable = false,
    onClick,
    rightContent,
    children 
}) => {
    return (
        <div 
            className={settingsRow(isDark, clickable)}
            onClick={onClick}
        >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className={settingsLabel(isDark)}>{label}</span>
                {description && (
                    <span className={`text-sm ${textSecondary(isDark)} font-medium`}>
                        {description}
                    </span>
                )}
            </div>
            <div className="flex items-center gap-4">
                {rightContent || (
                    <>
                        {(type === 'text' || type === 'text_chevron') && value && (
                            <span className={`text-base ${textSecondary(isDark)}`}>{value}</span>
                        )}
                        {(type === 'chevron' || type === 'text_chevron') && (
                            <ChevronRight className={`w-6 h-6 ${chevronColor(isDark)}`} />
                        )}
                        {children}
                    </>
                )}
            </div>
        </div>
    );
};
