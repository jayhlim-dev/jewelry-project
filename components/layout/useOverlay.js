'use client';

import { useEffect } from 'react';

export function useLockBody(locked) {
    useEffect(() => {
        if (!locked) return undefined;
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = previous;
        };
    }, [locked]);
}

export function useEscape(active, onClose) {
    useEffect(() => {
        if (!active) return undefined;
        const onKey = (event) => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [active, onClose]);
}
