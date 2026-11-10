'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useContent } from 'components/layout/ContentProvider';
import { ease } from 'lib/motion';

const AUTO_MS = (() => {
    const parsed = Number(process.env.NEXT_PUBLIC_SIGNATURE_AUTO_MS);
    return Number.isFinite(parsed) && parsed >= 1000 ? parsed : 3000;
})();

const slides = [
    {
        slug: 'celeste-stack',
        text: 'Three low bands meant to be worn together. The gold is textured, with small round, heart, and bar motifs on the bands. Yellow gold is the metal shown. White gold can be asked.'
    },
    {
        slug: 'orla-link',
        text: 'A light link bracelet with a small clasp. The links are gold, shown close on the wrist. Yellow gold is the metal shown. Rose gold can be asked.'
    },
    {
        slug: 'noor-collar',
        text: 'A closer gold collar, more ornate than a simple chain. Red stones are set through the collar. Yellow gold is the metal shown.'
    }
];

export function SignatureStory() {
    const { products, site } = useContent();
    const paths = site.paths;
    const reduceMotion = useReducedMotion();
    const sectionRef = useRef(null);
    const [index, setIndex] = useState(0);
    const [inView, setInView] = useState(false);
    const slide = slides[index];
    const product = products.find((item) => item.slug === slide.slug);
    const image = product?.signature_images?.[0] || product?.images?.[0];

    const go = (step) => {
        setIndex((current) => (current + step + slides.length) % slides.length);
    };

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return undefined;
        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.35, rootMargin: '0px 0px -8% 0px' }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (reduceMotion || !inView) return undefined;
        const id = window.setTimeout(() => {
            setIndex((current) => (current + 1) % slides.length);
        }, AUTO_MS);
        return () => window.clearTimeout(id);
    }, [index, reduceMotion, inView]);

    if (!product || !image?.src) return null;

    return (
        <section ref={sectionRef} className="bg-white" aria-label="Signature">
            <div className="grid items-center md:grid-cols-[minmax(16rem,2fr)_minmax(0,3fr)]">
                <div className="mx-auto max-w-sm px-6 py-10 text-center md:px-10 md:py-12">
                    <p className="text-[11px] tracking-[0.22em] text-taupe uppercase">Signature</p>
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={slide.slug}
                            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                            transition={{ duration: 0.5, ease }}
                        >
                            <h2 className="mt-4 font-serif text-[1.85rem] leading-tight font-normal text-champagne md:text-[2.15rem]">
                                “{product.name}”
                            </h2>
                            <p className="mt-4 text-sm leading-7 text-ash">{slide.text}</p>
                            <Link
                                href={`${paths.shop}/${product.slug}`}
                                className="mt-5 inline-flex border-b border-charcoal/30 pb-1 text-[11px] tracking-[0.18em] uppercase hover:border-charcoal"
                            >
                                See the piece
                            </Link>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div>
                    <div className="relative aspect-[3/2] overflow-hidden bg-[#f3f1ee]">
                        <AnimatePresence initial={false}>
                            <motion.div
                                key={slide.slug}
                                className="absolute inset-0"
                                initial={reduceMotion ? false : { opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={reduceMotion ? undefined : { opacity: 0 }}
                                transition={{ duration: 0.65, ease }}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    sizes="(min-width: 768px) 60vw, 100vw"
                                    className="object-cover object-center"
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    <div className="flex items-center justify-start gap-4 px-4 py-3">
                        <div className="flex gap-1.5" role="tablist" aria-label="Signature pieces">
                            {slides.map((item, itemIndex) => {
                                const active = itemIndex === index;
                                return (
                                    <button
                                        key={item.slug}
                                        type="button"
                                        role="tab"
                                        aria-selected={active}
                                        aria-label={`Show ${item.slug.replaceAll('-', ' ')}`}
                                        onClick={() => setIndex(itemIndex)}
                                        className="inline-flex h-4 w-4 items-center justify-center"
                                    >
                                        {active ? (
                                            <span className="block h-1.5 w-5 overflow-hidden rounded-full bg-charcoal/25">
                                                <span
                                                    key={`dot-${index}-${inView ? 'run' : 'pause'}`}
                                                    className={`block h-full rounded-full bg-charcoal ${reduceMotion ? 'w-full' : inView ? 'animate-signature-dot-progress' : 'w-0'}`}
                                                    style={
                                                        inView && !reduceMotion
                                                            ? { animationDuration: `${AUTO_MS}ms` }
                                                            : undefined
                                                    }
                                                />
                                            </span>
                                        ) : (
                                            <span className="block h-1.5 w-1.5 rounded-full bg-charcoal/25" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            type="button"
                            aria-label="Previous signature piece"
                            onClick={() => go(-1)}
                            className="text-sm text-ash hover:text-charcoal"
                        >
                            ‹
                        </button>
                        <button
                            type="button"
                            aria-label="Next signature piece"
                            onClick={() => go(1)}
                            className="text-sm text-ash hover:text-charcoal"
                        >
                            ›
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
