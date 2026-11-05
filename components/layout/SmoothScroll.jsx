'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export function SmoothScroll() {
    const pathname = usePathname();
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            // How fast the page catches the wheel. Lower = longer, heavier glide.
            lerp: 0.1,
            wheelMultiplier: 0.85,
            smoothWheel: true,
            autoRaf: true,
            autoToggle: true,
            anchors: true,
            allowNestedScroll: true,
            stopInertiaOnNavigate: true,
            respectReducedMotion: true
        });

        lenisRef.current = lenis;

        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    useEffect(() => {
        lenisRef.current?.scrollTo(0, { immediate: true });
    }, [pathname]);

    return null;
}
