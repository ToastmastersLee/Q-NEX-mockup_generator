import { useState } from 'react';

export function useNmpVideoState() {
    const [activeOutA, setActiveOutA] = useState('hdmi1');
    const [activeOutB, setActiveOutB] = useState('hdmi1');
    const [activeOutC, setActiveOutC] = useState('hdmi1');
    const [isDuplicateMode, setIsDuplicateMode] = useState(false);
    const [activeDuplicate, setActiveDuplicate] = useState('hdmi1');

    return {
        activeOutA,
        setActiveOutA,
        activeOutB,
        setActiveOutB,
        activeOutC,
        setActiveOutC,
        isDuplicateMode,
        setIsDuplicateMode,
        activeDuplicate,
        setActiveDuplicate
    };
}
