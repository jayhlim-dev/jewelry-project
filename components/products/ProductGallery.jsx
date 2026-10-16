'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CloseIcon } from 'components/ui/Icons';
import { ease } from 'lib/motion';
import { useEscape, useLockBody } from 'components/layout/useOverlay';

function StepIcon({ direction }) {
    const left = direction === 'previous';
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d={left ? 'M14.5 6.5 9 12l5.5 5.5' : 'M9.5 6.5 15 12l-5.5 5.5'}
                stroke="currentColor"
                strokeWidth="1.25"
            />
        </svg>
    );
}

export function ProductGallery({ images, name }) {
    const [openIndex, setOpenIndex] = useState(null);
    const open = openIndex !== null;
    const reduce = useReducedMotion();
    const dialogRef = useRef(null);
    const closeRef = useRef(null);
    const triggerRefs = useRef([]);
    const wasOpen = useRef(false);

    const close = useCallback(() => {
        setOpenIndex((current) => {
            if (current !== null) {
                window.requestAnimationFrame(() => triggerRefs.current[current]?.focus());
            }
            return null;
        });
    }, []);

    const step = useCallback(
        (direction) => {
            setOpenIndex((current) => {
                if (current === null || images.length < 2) return current;
                return (current + direction + images.length) % images.length;
            });
        },
        [images.length]
    );

    useLockBody(open);
    useEscape(open, close);

    useEffect(() => {
        if (open && !wasOpen.current) closeRef.current?.focus();
        wasOpen.current = open;
    }, [open]);

    useEffect(() => {
        if (!open) return undefined;
        const onKey = (event) => {
            if (event.key === 'ArrowRight') step(1);
            if (event.key === 'ArrowLeft') step(-1);
            if (event.key !== 'Tab') return;
            const root = dialogRef.current;
            if (!root) return;
            const items = [...root.querySelectorAll('button')];
            if (!items.length) return;
            const first = items[0];
            const last = items[items.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, step]);

    const image = open ? images[openIndex] : null;

    return (
        <>
            <div className="flex flex-col gap-3" aria-label={`Photographs of ${name}`}>
                {images.map((item, index) => (
                    <button
                        key={`${item.src}-${index}`}
                        ref={(node) => {
                            triggerRefs.current[index] = node;
                        }}
                        type="button"
                        className="relative bg-white text-left"
                        onClick={() => setOpenIndex(index)}
                        aria-label={`Enlarge photograph ${index + 1} of ${images.length}`}
                    >
                        <Image
                            src={item.src}
                            alt={item.alt}
                            width={item.width}
                            height={item.height}
                            priority={index === 0}
                            sizes="(min-width: 1024px) 54vw, 100vw"
                            className="h-auto w-full"
                        />
                        <span className="absolute right-3 bottom-3 bg-ivory/95 px-3 py-2 text-[11px] font-medium tracking-[0.18em] text-charcoal uppercase">
                            Enlarge
                        </span>
                    </button>
                ))}
            </div>

            <AnimatePresence>
                {image ? (
                    <motion.div
                        ref={dialogRef}
                        role="dialog"
                        aria-modal="true"
                        aria-label={`Enlarged photograph of ${name}`}
                        className="fixed inset-0 z-[80] flex items-center justify-center bg-ivory px-5 py-20"
                        initial={reduce ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease }}
                    >
                        <button
                            ref={closeRef}
                            type="button"
                            className="absolute top-4 right-4 inline-flex h-11 w-11 items-center justify-center"
                            onClick={close}
                            aria-label="Close photograph"
                        >
                            <CloseIcon />
                        </button>

                        {images.length > 1 ? (
                            <button
                                type="button"
                                className="absolute top-1/2 left-3 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-charcoal/15 bg-ivory"
                                onClick={() => step(-1)}
                                aria-label="Previous photograph"
                            >
                                <StepIcon direction="previous" />
                            </button>
                        ) : null}

                        <Image
                            src={image.src}
                            alt={image.alt}
                            width={image.width}
                            height={image.height}
                            priority
                            sizes="100vw"
                            className="h-auto max-h-full w-auto max-w-full object-contain"
                        />

                        {images.length > 1 ? (
                            <button
                                type="button"
                                className="absolute top-1/2 right-3 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-charcoal/15 bg-ivory"
                                onClick={() => step(1)}
                                aria-label="Next photograph"
                            >
                                <StepIcon direction="next" />
                            </button>
                        ) : null}

                        {images.length > 1 ? (
                            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.18em] text-ash uppercase tabular-nums">
                                {openIndex + 1} / {images.length}
                            </p>
                        ) : null}
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </>
    );
}
