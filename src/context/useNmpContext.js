import { useContext } from 'react';
import { NmpContext } from './nmpContextInstance';

export function useNmpContext() {
    const context = useContext(NmpContext);
    if (!context) {
        throw new Error('useNmpContext must be used within an NmpProvider');
    }
    return context;
}
