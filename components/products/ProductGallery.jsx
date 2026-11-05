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
    const triggerRef = useRef(null);
    const touchX = useRef(null);
    const [active, setActive] = useState(0);
    const many = images.length > 1;
    const current = images[active] || images[0];
    const goMain = (direction) => setActive((value) => (value + direction + images.length) % images.length);
    const wasOpen = useRef(false);

    const close = useCallback(() => {
        if (openIndex !== null) setActive(openIndex);
        setOpenIndex(null);
        window.requestAnimationFrame(() => triggerRef.current?.focus());
    }, [openIndex]);

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
            <div aria-label={`Photographs of ${name}`}>
                <div
                    className="group relative aspect-square overflow-hidden"
                    onTouchStart={(event) => {
                        touchX.current = event.touches[0].clientX;
                    }}
                    onTouchEnd={(event) => {
                        if (touchX.current === null || !many) return;
                        const delta = event.changedTouches[0].clientX - touchX.current;
                        touchX.current = null;
                        if (Math.abs(delta) > 40) goMain(delta < 0 ? 1 : -1);
                    }}
                >
                    <button
                        ref={triggerRef}
                        type="button"
                        className="absolute inset-0 block text-left"
                        onClick={() => setOpenIndex(active)}
                        aria-label={`Enlarge photograph ${active + 1} of ${images.length}`}
                    >
                        <Image
                            key={current.src}
                            src={current.src}
                            alt={current.alt}
                            fill
                            priority
                            sizes="(min-width: 1024px) 54vw, 100vw"
                            className="object-cover"
                        />
                        <span className="absolute right-3 bottom-3 bg-ivory/95 px-3 py-2 text-[11px] font-medium tracking-[0.18em] text-charcoal uppercase">
                            Enlarge
                        </span>
                    </button>

                    {many ? (
                        <>
                            <button
                                type="button"
                                className="absolute top-1/2 left-3 z-10 inline-flex h-10 w-10 -translate-x-2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-charcoal opacity-0 shadow-[0_6px_20px_rgba(32,32,30,0.12)] hover:bg-white transition duration-500 ease-out motion-reduce:transition-none focus-visible:translate-x-0 focus-visible:opacity-100 group-hover:translate-x-0 group-hover:opacity-100 pointer-coarse:translate-x-0 pointer-coarse:opacity-100"
                                onClick={() => goMain(-1)}
                                aria-label="Previous photograph"
                            >
                                <StepIcon direction="previous" />
                            </button>
                            <button
                                type="button"
                                className="absolute top-1/2 right-3 z-10 inline-flex h-10 w-10 translate-x-2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-charcoal opacity-0 shadow-[0_6px_20px_rgba(32,32,30,0.12)] hover:bg-white transition duration-500 ease-out motion-reduce:transition-none focus-visible:translate-x-0 focus-visible:opacity-100 group-hover:translate-x-0 group-hover:opacity-100 pointer-coarse:translate-x-0 pointer-coarse:opacity-100"
                                onClick={() => goMain(1)}
                                aria-label="Next photograph"
                            >
                                <StepIcon direction="next" />
                            </button>
                        </>
                    ) : null}
                </div>

                {many ? (
                    <ul className="mt-3 flex flex-wrap justify-start gap-2" aria-label="Choose photograph">
                        {images.map((item, index) => (
                            <li key={`${item.src}-${index}`}>
                                <button
                                    type="button"
                                    onClick={() => setActive(index)}
                                    aria-label={`Show photograph ${index + 1} of ${images.length}`}
                                    aria-current={index === active ? 'true' : undefined}
                                    className={`relative block h-16 w-16 overflow-hidden transition md:h-20 md:w-20 ${
                                        index === active ? 'ring-2 ring-white' : 'opacity-60 hover:opacity-100'
                                    }`}
                                >
                                    <Image src={item.src} alt="" fill sizes="80px" className="object-cover" />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : null}
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
