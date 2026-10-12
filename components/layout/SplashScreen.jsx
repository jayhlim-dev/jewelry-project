'use client';

import { useLayoutEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { site } from 'data/site';
import { ease } from 'lib/motion';

export function SplashScreen() {
    const [show, setShow] = useState(true);

    useLayoutEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) {
            setShow(false);
            return;
        }

        const timer = window.setTimeout(() => setShow(false), 1000);
        return () => window.clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {show ? (
                <motion.div
                    className="fixed inset-0 z-[90] flex items-center justify-center bg-ivory"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease }}
                    aria-hidden="true"
                >
                    <div className="flex flex-col items-center">
                        <motion.p
                            className="font-serif text-[1.7rem] tracking-[0.42em] uppercase -mr-[0.42em] sm:text-[2rem]"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, ease }}
                        >
                            {site.name}
                        </motion.p>
                        <motion.span
                            className="mt-5 block h-px w-10 origin-center bg-champagne"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.45, ease, delay: 0.12 }}
                        />
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
