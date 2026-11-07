'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

function toPublicGcsUrl(src) {
    return typeof src === 'string' ? src.replace('https://storage.cloud.google.com/', 'https://storage.googleapis.com/') : src;
}

/**
 * Fixed-height banner with a background image that shifts on scroll (matches home Hero).
 */
export function ParallaxBannerSection({
    imageSrc,
    imageAlt = '',
    imagePriority = false,
    heightClass = 'h-[240px] md:h-[320px]',
    parallaxScrollRange = 320,
    parallaxScrollRangeMobile = 240,
    parallaxShift = 80,
    className = '',
    gradientClassName = 'bg-gradient-to-r from-charcoal/75 via-charcoal/50 to-charcoal/25',
    children
}) {
    const reduce = useReducedMotion();
    const sectionRef = useRef(null);
    const [scrollRange, setScrollRange] = useState(parallaxScrollRangeMobile);

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 768px)');
        const update = () => setScrollRange(mq.matches ? parallaxScrollRange : parallaxScrollRangeMobile);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, [parallaxScrollRange, parallaxScrollRangeMobile]);

    // Page has top padding below the nav, so target-based progress stays at 0 until you scroll
    // that far. Tie shift to document scroll so parallax starts on the first wheel tick.
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, scrollRange], [0, parallaxShift], { clamp: true });
    const bannerSrc = imageSrc ? toPublicGcsUrl(imageSrc) : imageSrc;

    return (
        <section ref={sectionRef} className={`relative overflow-hidden ${heightClass} ${className}`.trim()}>
            {bannerSrc ? (
                <motion.div
                    className="pointer-events-none absolute inset-x-0 top-[-14%] h-[128%] will-change-transform"
                    style={reduce ? undefined : { y }}
                    aria-hidden
                >
                    <div className="relative h-full w-full scale-[1.06]">
                        <Image
                            src={bannerSrc}
                            alt={imageAlt}
                            fill
                            priority={imagePriority}
                            fetchPriority={imagePriority ? 'high' : undefined}
                            sizes="100vw"
                            quality={80}
                            className="object-cover object-center"
                        />
                    </div>
                </motion.div>
            ) : null}
            <div className={`pointer-events-none absolute inset-0 ${gradientClassName}`} aria-hidden />
            <div className="relative z-10 h-full">{children}</div>
        </section>
    );
}
