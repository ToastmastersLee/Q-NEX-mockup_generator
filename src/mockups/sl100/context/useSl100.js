import { useContext } from 'react';
import { Sl100Context } from './Sl100ContextInstance';

export function useSl100() {
  const context = useContext(Sl100Context);
  if (!context) {
    throw new Error('useSl100 must be used within a Sl100Provider');
  }
  return context;
}
