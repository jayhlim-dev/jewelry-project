'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { paths, site } from 'data/site';
import { CloseIcon } from 'components/ui/Icons';
import { ease } from 'lib/motion';
import { useInquiry } from 'components/layout/InquiryProvider';
import { useEscape, useLockBody } from 'components/layout/useOverlay';

export function BagDrawer({ open, onClose }) {
    const reduce = useReducedMotion();
    const closeRef = useRef(null);
    const { items, remove } = useInquiry();
    useLockBody(open);
    useEscape(open, onClose);

    useEffect(() => {
        if (open) closeRef.current?.focus();
    }, [open]);

    return (
        <AnimatePresence>
            {open ? (
                <motion.div
                    className="fixed inset-0 z-[70] bg-charcoal/40"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.aside
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="bag-title"
                        className="ml-auto flex h-full w-full max-w-md flex-col bg-ivory"
                        initial={reduce ? false : { x: 28, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 20, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-charcoal/10 px-5 py-4">
                            <h2 id="bag-title" className="font-serif text-2xl">
                                Saved pieces
                            </h2>
                            <button ref={closeRef} type="button" className="inline-flex h-11 w-11 items-center justify-center" onClick={onClose} aria-label="Close saved pieces">
                                <CloseIcon />
                            </button>
                        </div>
                        <p className="px-5 py-4 text-sm leading-relaxed text-ash">
                            This is not a shopping bag. Nothing is reserved or purchased. Save pieces here, then chat about them on WhatsApp.
                        </p>
                        <ul className="flex-1 space-y-5 overflow-y-auto px-5">
                            {items.length === 0 ? <li className="text-sm text-ash">No pieces saved yet.</li> : null}
                            {items.map((item) => (
                                <li key={item.slug} className="flex gap-4 border-b border-charcoal/10 pb-5">
                                    <Link href={`${paths.shop}/${item.slug}`} onClick={onClose} className="relative h-24 w-20 shrink-0 bg-white">
                                        {item.image ? (
                                            <Image src={item.image} alt={item.imageAlt} fill sizes="80px" className="object-cover" />
                                        ) : null}
                                    </Link>
                                    <div className="min-w-0 flex-1">
                                        <Link href={`${paths.shop}/${item.slug}`} onClick={onClose} className="font-serif text-xl">
                                            {item.name}
                                        </Link>
                                        <p className="mt-1 text-xs tracking-[0.14em] text-ash uppercase">{item.category}</p>
                                        {item.code ? <p className="mt-1 text-[11px] tracking-[0.16em] text-taupe uppercase">Sample code {item.code}</p> : null}
                                        <button type="button" className="mt-2 text-xs tracking-[0.14em] text-ash uppercase underline-offset-4 hover:underline" onClick={() => remove(item.slug)}>
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="border-t border-charcoal/10 p-5">
                            {items.length ? (
                                <a
                                    href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
                                        `Hello, I would like to ask about: ${items
                                            .map((item) => (item.code ? `${item.name} (${item.code})` : item.name))
                                            .join(', ')}.`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={onClose}
                                    className="inline-flex min-h-11 w-full items-center justify-center bg-charcoal px-6 text-[11px] tracking-[0.18em] text-ivory uppercase"
                                >
                                    Chat on WhatsApp
                                </a>
                            ) : (
                                <p className="text-sm text-ash">Save a piece to start a WhatsApp chat.</p>
                            )}
                            <p className="mt-3 text-xs leading-relaxed text-ash">{site.footer.legalNote}</p>
                        </div>
                    </motion.aside>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
