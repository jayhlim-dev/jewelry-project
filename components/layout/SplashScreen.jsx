'use client';

import { useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useContent } from 'components/layout/ContentProvider';
import { useLockBody } from 'components/layout/useOverlay';
import { ease } from 'lib/motion';

const LOGO_FADE_S = 0.55;
const LOGO_HOLD_MS = 700;

export function SplashScreen() {
    const { site } = useContent();
    const [showShell, setShowShell] = useState(true);
    const [logoPhase, setLogoPhase] = useState('in');
    useLockBody(showShell);

    useLayoutEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) {
            setShowShell(false);
            return;
        }

        const fadeOutTimer = window.setTimeout(() => setLogoPhase('out'), LOGO_FADE_S * 1000 + LOGO_HOLD_MS);
        return () => window.clearTimeout(fadeOutTimer);
    }, []);

    if (!showShell) return null;

    return (
        <div
            className="fixed inset-0 z-[90] flex touch-none items-center justify-center overscroll-none bg-ivory"
            aria-hidden="true"
            data-lenis-prevent
        >
            <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: logoPhase === 'in' ? 1 : 0 }}
                transition={{ duration: LOGO_FADE_S, ease }}
                onAnimationComplete={() => {
                    if (logoPhase === 'out') setShowShell(false);
                }}
            >
                <p className="font-serif text-[1.7rem] tracking-[0.42em] uppercase -mr-[0.42em] sm:text-[2rem]">
                    {site.name}
                </p>
                <motion.span
                    className="mt-5 block h-px w-10 origin-center bg-champagne"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={
                        logoPhase === 'in'
                            ? { scaleX: 1, opacity: 1 }
                            : { scaleX: 0.85, opacity: 0 }
                    }
                    transition={{ duration: LOGO_FADE_S, ease, delay: logoPhase === 'in' ? 0.1 : 0 }}
                />
            </motion.div>
        </div>
    );
}
