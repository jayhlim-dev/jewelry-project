'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Button } from 'components/ui/Button';
import { CloseIcon } from 'components/ui/Icons';
import { useEscape, useLockBody } from 'components/layout/useOverlay';
import { ease } from 'lib/motion';

export function ShopFiltersSheet({ open, onClose, onApply, resultCount, children }) {
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
                <div className="fixed inset-0 z-[70] lg:hidden">
                    <motion.button
                        type="button"
                        aria-label="Close filters"
                        className="absolute inset-0 bg-charcoal/65"
                        initial={reduce ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.28, ease }}
                        onClick={onClose}
                    />
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="shop-filters-title"
                        className="absolute inset-x-0 bottom-0 flex max-h-[80vh] flex-col rounded-t-md bg-white shadow-[0_-12px_40px_rgb(32_32_30/12%)]"
                        initial={reduce ? false : { y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ duration: 0.38, ease }}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-charcoal/10 px-5 py-4">
                            <h2
                                id="shop-filters-title"
                                className="flex min-w-0 items-center gap-3 text-[12px] font-medium tracking-[0.18em] text-charcoal uppercase"
                            >
                                <span>Filters</span>
                                <span className="h-3 w-px shrink-0 bg-charcoal/20" aria-hidden="true" />
                                <span className="truncate text-[13px] font-normal tracking-normal text-ash normal-case tabular-nums">
                                    {resultCount} {resultCount === 1 ? 'result' : 'results'}
                                </span>
                            </h2>
                            <button
                                ref={closeRef}
                                type="button"
                                className="inline-flex h-11 w-11 items-center justify-center text-charcoal"
                                onClick={onClose}
                                aria-label="Close"
                            >
                                <CloseIcon />
                            </button>
                        </div>
                        <div className="scrollbar-none flex-1 overflow-y-auto overscroll-contain px-5 pb-6">{children}</div>
                        <div className="border-t border-charcoal/10 bg-white px-5 py-4">
                            <Button type="button" variant="primary" className="min-h-11 w-full" onClick={onApply}>
                                Apply
                            </Button>
                        </div>
                    </motion.div>
                </div>
            ) : null}
        </AnimatePresence>
    );
}
