import React from 'react';
import { ChevronRight } from 'lucide-react';

export const Customize = ({ isDark, onItemClick }) => {
    const items = [
        { label: 'Navigation bar', type: 'chevron' },
        { label: 'Homepage Template', type: 'chevron' },
        { 
            label: 'Scheduled Power-Off', 
            description: '(Set the device to automatically power off at a specified time each day)', 
            type: 'chevron' 
        }
    ];

    return (
        <div className="p-8 h-full flex flex-col overflow-y-auto relative animate-fade-in">
            <div className="max-w-5xl w-full mx-auto pb-10">
                {items.map((item, idx) => (
                    <div 
                        key={idx} 
                        className={`flex justify-between items-center py-5 cursor-pointer active:opacity-70 ${isDark ? 'border-b border-gray-600/50' : 'border-b border-gray-300'}`}
                        onClick={() => onItemClick(item.label)}
                    >
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <span className={`text-lg font-bold tracking-wide ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                                {item.label}
                            </span>
                            {item.description && (
                                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500 font-medium'}`}>
                                    {item.description}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-4 pointer-events-none">
                            <ChevronRight className={`w-6 h-6 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
