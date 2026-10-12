'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { site } from 'data/site';
import { CloseIcon } from 'components/ui/Icons';
import { ease } from 'lib/motion';
import { useEscape, useLockBody } from 'components/layout/useOverlay';

const list = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } }
};

const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } }
};

export function MobileMenu({ open, onClose }) {
    const reduce = useReducedMotion();
    const closeRef = useRef(null);
    useLockBody(open);
    useEscape(open, onClose);

    useEffect(() => {
        if (open) closeRef.current?.focus();
    }, [open]);

    return (
        <AnimatePresence>
            {open ? (
                <motion.div
                    className="fixed inset-0 z-[70] flex flex-col bg-ivory text-charcoal"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Menu"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease }}
                >
                    <div className="flex h-[4.5rem] items-center justify-between px-5">
                        <p className="font-serif text-xl tracking-[0.35em]">{site.name}</p>
                        <button
                            ref={closeRef}
                            type="button"
                            className="inline-flex h-11 w-11 items-center justify-center"
                            onClick={onClose}
                            aria-label="Close menu"
                        >
                            <CloseIcon />
                        </button>
                    </div>
                    <motion.nav
                        className="flex flex-1 flex-col justify-center px-6"
                        aria-label="Primary"
                        variants={reduce ? undefined : list}
                        initial={reduce ? false : 'hidden'}
                        animate="show"
                    >
                        <ul className="space-y-2">
                            {site.navigation.map((link) => (
                                <motion.li key={link.href} variants={reduce ? undefined : item}>
                                    <Link
                                        href={link.href}
                                        onClick={onClose}
                                        className="block py-2 font-serif text-[clamp(2rem,8vw,3.2rem)] leading-none font-medium"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.nav>
                    <p className="px-6 pb-8 text-sm text-ash">{site.contact.email}</p>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
