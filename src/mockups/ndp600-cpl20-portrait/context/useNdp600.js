import { useContext } from 'react';
import { Ndp600Context } from './ndp600ContextInstance';

export function useNdp600() {
    const context = useContext(Ndp600Context);
    if (!context) {
        throw new Error('useNdp600 must be used within an Ndp600Provider');
    }
    return context;
}
