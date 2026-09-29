import { useState } from 'react';
import { Rs232DetailView } from './serial/Rs232DetailView';
import { Rs485DetailView } from './serial/Rs485DetailView';
import { CurtainDetailView } from './serial/CurtainDetailView';
import { SerialDashboard } from './serial/SerialDashboard';

export const SerialControl = ({ isDark }) => {
    const [rs232Power, setRs232Power] = useState(true);
    const [rs232Input, setRs232Input] = useState('windows');
    const [rs485Power, setRs485Power] = useState(true);
    const [cbx3Power, setCbx3Power] = useState(true);
    const [lectureCapture, setLectureCapture] = useState(true);
    const [activeDetail, setActiveDetail] = useState(null);
    const [cbx1ActiveBtn, setCbx1ActiveBtn] = useState(null);

    const handleCbx1Press = (btn) => {
        setCbx1ActiveBtn(btn);
        setTimeout(() => setCbx1ActiveBtn(null), 200);
    };

    const cardClass = `w-full h-full flex flex-col p-5 rounded-[1.5rem] ${isDark ? 'bg-[#3b4356] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_10px_20px_rgba(0,0,0,0.4)] border border-white/5' : 'bg-gray-100 border border-gray-300 shadow-lg'}`;
    const innerCardClass = `flex-1 flex flex-col justify-center rounded-[1rem] px-5 py-3 ${isDark ? 'bg-[#353c4d] shadow-[0_10px_20px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.05)] border border-white/5' : 'bg-white border border-gray-200'}`;
    const headerClass = `flex items-center gap-3 mb-3 pl-2`;
    const titleClass = `text-[15px] font-bold tracking-wider ${isDark ? 'text-gray-200' : 'text-gray-800'}`;

    if (activeDetail === 'RS232') {
        return (
            <Rs232DetailView 
                isDark={isDark}
                rs232Power={rs232Power}
                setRs232Power={setRs232Power}
                rs232Input={rs232Input}
                setRs232Input={setRs232Input}
                onBack={() => setActiveDetail(null)}
                cardClass={cardClass}
                innerCardClass={innerCardClass}
            />
        );
    }

    if (activeDetail === 'RS485') {
        return (
            <Rs485DetailView 
                isDark={isDark}
                onBack={() => setActiveDetail(null)}
            />
        );
    }

    if (activeDetail === 'e-Curtain') {
        return (
            <CurtainDetailView 
                isDark={isDark}
                onBack={() => setActiveDetail(null)}
                cbx1ActiveBtn={cbx1ActiveBtn}
                handleCbx1Press={handleCbx1Press}
            />
        );
    }

    return (
        <SerialDashboard 
            isDark={isDark}
            rs232Power={rs232Power}
            setRs232Power={setRs232Power}
            rs232Input={rs232Input}
            setRs232Input={setRs232Input}
            rs485Power={rs485Power}
            setRs485Power={setRs485Power}
            cbx3Power={cbx3Power}
            setCbx3Power={setCbx3Power}
            lectureCapture={lectureCapture}
            setLectureCapture={setLectureCapture}
            cbx1ActiveBtn={cbx1ActiveBtn}
            handleCbx1Press={handleCbx1Press}
            setActiveDetail={setActiveDetail}
            cardClass={cardClass}
            innerCardClass={innerCardClass}
            headerClass={headerClass}
            titleClass={titleClass}
        />
    );
};
