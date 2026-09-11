import { useState } from 'react';

export function CloudServerModal({ isDark, initialValue, onCancel, onSave }) {
  const [value, setValue] = useState(initialValue);

  const backdropClass = isDark
    ? 'bg-black/40 backdrop-blur-xs'
    : 'bg-black/20';

  const cardClass = isDark
    ? 'bg-[#182740]/95 border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.5)] text-white rounded-[2rem] w-[28rem] p-8'
    : 'bg-white border border-gray-200 shadow-xl text-black rounded-3xl w-[28rem] p-8';

  const inputBgClass = isDark
    ? 'bg-[#0f1b2c] border border-white/10 text-white'
    : 'bg-gray-50 border border-gray-300 text-black';

  const cancelBtnClass = isDark
    ? 'bg-[#3b4c6b] hover:bg-[#485c80] text-white/95 hover:text-white transition-all active:scale-95 shadow-md shadow-black/10'
    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold';

  const saveBtnClass = isDark
    ? 'bg-gradient-to-r from-[#00d4ff] to-[#00f2fe] text-white hover:brightness-110 shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-all active:scale-95'
    : 'bg-blue-600 text-white hover:bg-blue-700 font-bold';

  return (
    <div className={`absolute inset-0 z-50 flex items-center justify-center rounded-2xl select-none ${backdropClass}`}>
      <div className={`flex flex-col items-center gap-6 text-center transition-all duration-300 ${cardClass}`}>
        <h3 className="text-xl font-semibold leading-relaxed px-4">
          Q-NEX Cloud Server Address
        </h3>

        <div className={`w-full px-4 py-3 rounded-xl ${inputBgClass}`}>
          <input 
            type="text" 
            value={value} 
            onChange={(e) => setValue(e.target.value)} 
            className="w-full bg-transparent outline-none text-center font-medium text-base"
            autoFocus 
          />
        </div>

        <div className="flex gap-4 w-full px-2">
          <button 
            type="button"
            onClick={onCancel}
            className={`flex-1 py-3 px-6 rounded-full text-base font-semibold transition-all cursor-pointer ${cancelBtnClass}`}
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={() => onSave(value)}
            className={`flex-1 py-3 px-6 rounded-full text-base font-bold transition-all cursor-pointer ${saveBtnClass}`}
          >
            Update now
          </button>
        </div>
      </div>
    </div>
  );
}
