
import { modalOverlay, modalCard, btnCancel, btnConfirm } from '../styles/theme';

export const Modal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    isDark, 
    children, 
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    width = 'w-[28rem]'
}) => {
    if (!isOpen) return null;

    return (
        <div className={modalOverlay}>
            <div className={`${width} p-8 rounded-[2rem] flex flex-col items-center gap-6 ${modalCard(isDark)}`}>
                {children}
                <div className="flex w-full gap-6 mt-2">
                    <button onClick={onClose} className={btnCancel(isDark)}>
                        {cancelText}
                    </button>
                    <button onClick={onConfirm} className={btnConfirm()}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};
