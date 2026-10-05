import { useState } from 'react';

export function useSlVideoSwitchState() {
  const [duplicateMode, setDuplicateMode] = useState(true);
  const [duplicateInput, setDuplicateInput] = useState('ops'); // 'ops' | 'hdmi' | 'typec'
  const [matrixOutputs, setMatrixOutputs] = useState({
    outA: 'ops',
    outB: 'ops',
    outC: 'ops',
  });

  const setMatrixOutput = (outId, inpId) => {
    setMatrixOutputs((prev) => ({
      ...prev,
      [outId]: inpId,
    }));
  };

  return {
    duplicateMode,
    setDuplicateMode,
    duplicateInput,
    setDuplicateInput,
    matrixOutputs,
    setMatrixOutputs,
    setMatrixOutput,
  };
}
