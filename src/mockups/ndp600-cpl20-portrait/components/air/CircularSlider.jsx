import { Flame, Snowflake, Fan, Wind } from 'lucide-react';

export const CircularSlider = ({
    enabled,
    temperature,
    setTemperature,
    mode,
    minTemp = 16,
    maxTemp = 30
}) => {
    const size = 200;
    const center = size / 2;
    const radius = 80;
    const strokeWidth = 10;

    const startAngle = 135;
    const endAngle = 405;
    const angleRange = endAngle - startAngle;
    const tempRange = maxTemp - minTemp;

    const currentAngle = startAngle + ((temperature - minTemp) / tempRange) * angleRange;

    const polarToCartesian = (centerX, centerY, rad, angleInDegrees) => {
        const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
        return {
            x: centerX + rad * Math.cos(angleInRadians),
            y: centerY + rad * Math.sin(angleInRadians),
        };
    };

    const describeArc = (x, y, rad, sAngle, eAngle) => {
        const start = polarToCartesian(x, y, rad, eAngle);
        const end = polarToCartesian(x, y, rad, sAngle);
        const largeArcFlag = eAngle - sAngle <= 180 ? '0' : '1';
        return [
            'M', start.x, start.y,
            'A', rad, rad, 0, largeArcFlag, 0, end.x, end.y
        ].join(' ');
    };

    const getAngleFromCoordinates = (x, y) => {
        const dx = x - center;
        const dy = y - center;
        let angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
        if (angle < 0) angle += 360;
        return angle;
    };

    const handlePointerEvent = (e) => {
        if (!enabled) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        if (clientX === undefined || clientY === undefined) return;

        const x = clientX - rect.left;
        const y = clientY - rect.top;
        let angle = getAngleFromCoordinates(x, y);

        if (angle < 135) {
            if (angle < 45) {
                angle += 360;
            } else {
                angle = angle < 90 ? 405 : 135;
            }
        }

        const percentage = (angle - startAngle) / angleRange;
        const nextTemp = Math.round(minTemp + percentage * tempRange);
        setTemperature(Math.max(minTemp, Math.min(maxTemp, nextTemp)));
    };

    const handlePointerDown = (e) => {
        e.preventDefault();
        handlePointerEvent(e);
        const moveHandler = (moveEvent) => handlePointerEvent(moveEvent);
        const upHandler = () => {
            window.removeEventListener('pointermove', moveHandler);
            window.removeEventListener('pointerup', upHandler);
        };
        window.addEventListener('pointermove', moveHandler);
        window.addEventListener('pointerup', upHandler);
    };

    const activeArc = describeArc(center, center, radius, startAngle, currentAngle);
    const trackArc = describeArc(center, center, radius, startAngle, endAngle);
    const thumbPos = polarToCartesian(center, center, radius, currentAngle);

    const getDialIcon = () => {
        switch (mode) {
            case 'heat':
                return <Flame size={32} className={`ndp-air-dial-icon ${enabled ? 'is-active' : ''}`} />;
            case 'cool':
                return <Snowflake size={32} className={`ndp-air-dial-icon ${enabled ? 'is-active' : ''}`} style={{ color: enabled ? '#3b82f6' : '#a0aab8' }} />;
            case 'fan':
                return <Fan size={32} className={`ndp-air-dial-icon ${enabled ? 'is-active' : ''}`} style={{ color: enabled ? '#10b981' : '#a0aab8' }} />;
            case 'dry':
                return <Wind size={32} className={`ndp-air-dial-icon ${enabled ? 'is-active' : ''}`} style={{ color: enabled ? '#a855f7' : '#a0aab8' }} />;
            default:
                return <span className="font-extrabold text-[22px]" style={{ color: enabled ? '#3b82f6' : '#a0aab8' }}>A</span>;
        }
    };

    return (
        <div 
            className="ndp-air-dial-wrapper"
            onPointerDown={handlePointerDown}
            style={{ cursor: enabled ? 'pointer' : 'default' }}
        >
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <path
                    d={trackArc}
                    fill="none"
                    stroke="rgba(74, 106, 142, 0.22)"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />
                <path
                    d={activeArc}
                    fill="none"
                    stroke={enabled ? '#127bff' : 'rgba(74, 106, 142, 0.4)'}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />
                <circle
                    cx={thumbPos.x}
                    cy={thumbPos.y}
                    r="9"
                    fill="#ffffff"
                    stroke="rgba(0,0,0,0.15)"
                    strokeWidth="2"
                    style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.3))' }}
                />
            </svg>

            <div className="ndp-air-dial-inner">
                {getDialIcon()}
                <strong className="ndp-air-dial-temp">{temperature}°C</strong>
            </div>
        </div>
    );
};
