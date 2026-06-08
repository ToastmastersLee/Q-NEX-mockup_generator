/**
 * Shared theme utility — centralizes repeated isDark ternary patterns
 * to reduce code duplication and token consumption.
 */

// ── Border styles ──
export const borderB = (isDark) => isDark ? 'border-b border-gray-600/50' : 'border-b border-gray-300';

// ── Text styles ──
export const textPrimary = (isDark) => isDark ? 'text-gray-100' : 'text-gray-800';
export const textSecondary = (isDark) => isDark ? 'text-gray-400' : 'text-gray-500';
export const textTertiary = (isDark) => isDark ? 'text-gray-300' : 'text-gray-600';
export const textTitle = (isDark) => isDark ? 'text-white' : 'text-black';

// ── Button styles ──
export const btnCircle = (isDark) => 
    `p-3 rounded-full border-[1.5px] ${isDark ? 'border-gray-600 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100 text-black'} transition-colors`;

export const btnCancel = (isDark) =>
    `flex-1 py-3 rounded-full font-bold text-lg transition-all ${isDark ? 'bg-[#5b7db1] text-white hover:bg-[#6c91cd] shadow-[0_4px_10px_rgba(0,0,0,0.2)]' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-md'}`;

export const btnConfirm = () =>
    `flex-1 py-3 rounded-full font-bold text-lg transition-all shadow-[0_4px_15px_rgba(0,255,204,0.4)] hover:opacity-90 bg-[#00eecd] text-white`;

// ── Container / Card styles ──
export const modalOverlay = 'absolute inset-0 z-50 flex items-center justify-center bg-black/20 rounded-3xl';

export const modalCard = (isDark) =>
    isDark 
        ? 'bg-gradient-to-br from-[#5f7eb0] to-[#456499] shadow-[0_15px_50px_rgba(0,0,0,0.5)] border border-white/10' 
        : 'bg-white shadow-2xl border border-gray-200';

export const inputBox = (isDark) =>
    `w-full px-4 py-3 rounded-md ${isDark ? 'bg-[#7392c6] border border-white/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]' : 'bg-gray-50 border border-gray-300'}`;

export const inputText = (isDark) =>
    `w-full bg-transparent outline-none font-bold text-base tracking-wide ${isDark ? 'text-white placeholder-white/70' : 'text-gray-800'}`;

// ── Settings list row ──
export const settingsRow = (isDark, clickable = false) =>
    `flex justify-between items-center py-5 ${clickable ? 'cursor-pointer active:opacity-70' : ''} ${borderB(isDark)}`;

export const settingsLabel = (isDark) =>
    `text-lg font-bold tracking-wide ${textPrimary(isDark)}`;

// ── Chevron icon ──
export const chevronColor = (isDark) => isDark ? 'text-gray-500' : 'text-gray-400';
