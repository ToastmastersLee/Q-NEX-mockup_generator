import { useState, useCallback } from 'react';
import { getScreenFromUrl } from '../../constants/screens';

export function useVideoSwitchState() {
  const [duplicateMode, setDuplicateMode] = useState(() => {
    const s = getScreenFromUrl();
    return s !== 'home-matrix';
  });

  const [duplicateInput, setDuplicateInput] = useState(() => {
    const s = getScreenFromUrl();
    if (s === 'home-dup-hdmi1') return 'hdmi1';
    return 'hdmi3';
  });

  const [matrixOutputs, setMatrixOutputs] = useState({
    outA: 'hdmi1',
    outB: 'hdmi1',
    outC: 'hdmi1',
  });

  const [displayPower, setDisplayPower] = useState(true);
  const [externalPower, setExternalPower] = useState(() => getScreenFromUrl() !== 'home-dup-hdmi1');
  const [projectorScreenState, setProjectorScreenState] = useState(null); // 'up' | 'pause' | 'down'

  const setMatrixOutput = useCallback((outId, inId) => {
    setMatrixOutputs((prev) => ({ ...prev, [outId]: inId }));
  }, []);

  return {
    duplicateMode,
    setDuplicateMode,
    duplicateInput,
    setDuplicateInput,
    matrixOutputs,
    setMatrixOutputs,
    setMatrixOutput,
    displayPower,
    setDisplayPower,
    externalPower,
    setExternalPower,
    projectorScreenState,
    setProjectorScreenState,
  };
}
