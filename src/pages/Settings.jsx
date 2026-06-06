import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const EditableText = ({ text, className }) => {
    const [isEditable, setIsEditable] = useState(false);
    const spanRef = useRef(null);

    useEffect(() => {
        if (isEditable && spanRef.current) {
            spanRef.current.focus();
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(spanRef.current);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }, [isEditable]);

    return (
        <span 
            ref={spanRef}
            className={`outline-none cursor-text ${isEditable ? 'bg-blue-500/20 px-1 -mx-1 rounded' : ''} ${className}`}
            contentEditable={isEditable}
            suppressContentEditableWarning
            onDoubleClick={(e) => {
                e.stopPropagation();
                setIsEditable(true);
            }}
            onBlur={() => setIsEditable(false)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    setIsEditable(false);
                }
            }}
            title="Double-click to edit"
        >
            {text}
        </span>
    );
};

export const Settings = ({ isDark }) => {
    const settingsItems = [
        { label: 'Device Name', value: 'NMP311-Product', type: 'text' },
        { label: 'Device ID', value: '6D171B770608', type: 'qrcode' },
        { label: 'Panel IP', value: '192.168.101.108 (B6:55:A6:96:79:76)', type: 'text_chevron' },
        { label: 'Divisible Room Mode', type: 'chevron' },
        { label: 'Language', type: 'chevron' },
        { label: 'HDMI OUT Resolution', type: 'chevron' },
        { label: 'Display', type: 'chevron' },
        { label: 'Customize', type: 'chevron' },
        { label: 'Password Unlock', type: 'chevron' },
        { label: 'Date & Time', type: 'chevron' },
        { label: 'Software Version', value: 'V 1.0.0.8', type: 'text_chevron' },
        { label: 'Q-NEX Cloud Server Address', type: 'chevron' },
        { label: 'Disconnection', type: 'text' },
        { label: 'Clear Cache & Restart Touch Panel', type: 'text' }
    ];

    return (
        <div className="p-8 h-full flex flex-col overflow-y-auto">
            <div className="max-w-5xl w-full mx-auto pb-10">
                {settingsItems.map((item, idx) => (
                    <div key={idx} className={`flex justify-between items-center py-5 ${isDark ? 'border-b border-gray-600/50' : 'border-b border-gray-300'}`}>
                        <span className={`text-lg font-bold tracking-wide ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>{item.label}</span>
                        <div className="flex items-center gap-4">
                            {item.type === 'text' && (
                                <EditableText text={item.value || ''} className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                            )}
                            {item.type === 'qrcode' && (
                                <div className="flex flex-col items-end gap-2 my-2">
                                    <EditableText text={item.value} className={`text-sm tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                                    <div className={`w-16 h-16 p-1 ${isDark ? 'bg-white rounded-sm' : 'border border-gray-300'}`}>
                                        <div className="w-full h-full" style={{backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #fff 25%, #fff 75%, #000 75%, #000)', backgroundPosition: '0 0, 4px 4px', backgroundSize: '8px 8px'}}></div>
                                    </div>
                                </div>
                            )}
                            {(item.type === 'text_chevron' || item.type === 'chevron') && (
                                <div className="flex items-center gap-4">
                                    {item.value && <EditableText text={item.value} className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />}
                                    <ChevronRight className={`w-6 h-6 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
