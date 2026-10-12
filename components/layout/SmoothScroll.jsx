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
            // How fast the page catches the wheel. Lower = longer glide. 1 = no glide.
            lerp: 0.1,
            // How far one wheel tick moves. Lower = shorter steps.
            wheelMultiplier: 0.85,
            // Smooth mouse-wheel scrolling. Touch stays normal.
            smoothWheel: true,
            // Lenis runs its own animation loop.
            autoRaf: true,
            // Pause while a menu locks the page (body overflow hidden).
            autoToggle: true,
            // Smooth in-page links like #section.
            anchors: true,
            // Let menus and drawers scroll on their own.
            allowNestedScroll: true,
            // Stop the glide when you click a link to another page.
            stopInertiaOnNavigate: true,
            // Turn the glide off if the user prefers reduced motion.
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
