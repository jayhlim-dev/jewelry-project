'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { home } from 'data/home';
import { Button } from 'components/ui/Button';
import { ease } from 'lib/motion';

export function Hero() {
    const reduce = useReducedMotion();
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 700], [0, 70]);
    const content = home.hero;

    return (
        <section className="relative min-h-[100svh] overflow-hidden bg-charcoal text-ivory">
            <motion.div className="absolute inset-0" style={reduce ? undefined : { y }}>
                <motion.div
                    className="absolute inset-0"
                    initial={reduce ? false : { scale: 1.08, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.3, ease }}
                >
                    <Image
                        src={content.image.src}
                        alt={content.image.alt}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-[center_30%]"
                    />
                </motion.div>
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-charcoal/15" />
            <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[90rem] flex-col justify-end px-5 pt-28 pb-16 md:px-10 md:pb-20 lg:px-14">
                <motion.p
                    className="eyebrow text-champagne"
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease, delay: 0.25 }}
                >
                    {content.eyebrow}
                </motion.p>
                <motion.span
                    className="mt-5 block h-px w-10 bg-champagne/80"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, ease, delay: 0.32 }}
                />
                <motion.h1
                    className="type-display mt-6 max-w-[11ch] text-balance"
                    initial={reduce ? false : { opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease, delay: 0.35 }}
                >
                    {content.title}
                </motion.h1>
                <motion.p
                    className="mt-6 max-w-sm text-sm leading-7 text-ivory/80 md:text-[15px]"
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease, delay: 0.5 }}
                >
                    {content.text}
                </motion.p>
                <motion.div
                    className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8"
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease, delay: 0.64 }}
                >
                    <Button href={content.primary.href} variant="light">
                        {content.primary.label}
                    </Button>
                    <Button href={content.secondary.href} variant="linkLight">
                        {content.secondary.label}
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
