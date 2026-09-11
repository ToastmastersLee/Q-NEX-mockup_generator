import { useRef } from 'react';

export const FaqModal = ({ isOpen, onClose, isDark }) => {
  const scrollRef = useRef(null);
  const isDown = useRef(false);
  const startY = useRef(0);
  const scrollTop = useRef(0);

  const onMouseDown = (e) => {
    isDown.current = true;
    startY.current = e.pageY - scrollRef.current.offsetTop;
    scrollTop.current = scrollRef.current.scrollTop;
    scrollRef.current.style.cursor = 'grabbing';
    scrollRef.current.style.userSelect = 'none';
  };

  const onMouseLeave = () => {
    isDown.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
    }
  };

  const onMouseUp = () => {
    isDown.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
      scrollRef.current.style.removeProperty('user-select');
    }
  };

  const onMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const y = e.pageY - scrollRef.current.offsetTop;
    const walk = (y - startY.current) * 1.5; // drag scroll speed factor
    scrollRef.current.scrollTop = scrollTop.current - walk;
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/45 z-[150] flex items-center justify-center p-4">
      <div 
        className={`w-full max-w-lg rounded-3xl p-6 shadow-2xl relative flex flex-col justify-between transition-colors duration-300 ${
          isDark 
            ? 'bg-[#1b2535] border border-slate-700/50' 
            : 'bg-white border border-gray-200'
        }`}
        style={{ minHeight: '340px' }}
      >
        <div>
          <h3 className={`font-bold text-base mb-4 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>FAQ</h3>
          
          <div 
            ref={scrollRef}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            className="max-h-[220px] overflow-y-auto no-scrollbar flex flex-col gap-3 text-left px-1 cursor-grab"
            style={{ touchAction: 'none' }}
          >
            <div>
              <h4 className={`font-bold text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>1.What if encounter a power outage?</h4>
              <p className={`text-[11px] mt-1 leading-relaxed font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Once you've set up the divisible room,NMP will store all the configurations. You don't have to reconfigure anything after power recovery.
              </p>
            </div>
            
            <div className={`border-b border-dashed w-full my-1 ${isDark ? 'border-gray-600/30' : 'border-gray-200'}`} />
            
            <div>
              <h4 className={`font-bold text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>2. When turning on the divisible room mode, no devices are available for selection</h4>
              <p className={`text-[11px] mt-1 leading-relaxed font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Make sure that NMP is connected to the network. If it is not connected, please add the devices manually.
              </p>
            </div>
            
            <div className={`border-b border-dashed w-full my-1 ${isDark ? 'border-gray-600/30' : 'border-gray-200'}`} />
            
            <div>
              <h4 className={`font-bold text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>3. I cannot find the divisible room mode on the Touch Panel.</h4>
              <p className={`text-[11px] mt-1 leading-relaxed font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                The room you're controlling might be designated as a secondary room.<br />
                To access the divisible room function, untie it from the primary room's touch panel.<br />
                Then, the secondary room's touch panel will display the option.
              </p>
            </div>
            
            <div className={`mt-2 text-[10px] leading-relaxed border-t pt-2 font-medium ${isDark ? 'text-gray-500 border-slate-700/50' : 'text-gray-400 border-gray-200'}`}>
              <p>•If the issue remains unresolved, kindly reach out to your local agent, or contact the manufacturer by email for further assistance.</p>
              <p className="mt-0.5">Email: info@qnextech.com</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button 
            onClick={onClose}
            className="px-12 py-2 rounded-full text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-95 font-semibold text-xs shadow-md active:scale-95 cursor-pointer"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
