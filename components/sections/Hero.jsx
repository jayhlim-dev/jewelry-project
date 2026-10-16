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
        <section className="relative h-[72svh] min-h-[26rem] overflow-hidden bg-charcoal text-ivory">
            <motion.div className="absolute inset-0" style={reduce ? undefined : { y }}>
                <motion.div
                    className="absolute inset-0"
                    initial={reduce ? false : { scale: 1.06, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease }}
                >
                    <Image
                        src={content.image.src}
                        alt={content.image.alt}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-[center_38%]"
                    />
                </motion.div>
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/50 via-charcoal/20 to-transparent" />
            <div className="relative mx-auto flex h-full w-full max-w-[90rem] flex-col justify-center px-5 md:px-10 lg:px-14">
                <motion.p
                    className="text-[10px] tracking-[0.28em] text-ivory/70 uppercase"
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease, delay: 0.12 }}
                >
                    {content.eyebrow}
                </motion.p>
                <motion.h1
                    className="mt-3 max-w-[16ch] font-serif text-[2.5rem] leading-[1.1] font-normal text-ivory md:text-[3.1rem]"
                    initial={reduce ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, ease, delay: 0.22 }}
                >
                    {content.title}
                </motion.h1>
                <motion.p
                    className="mt-3 max-w-xs text-sm leading-6 text-ivory/75"
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease, delay: 0.34 }}
                >
                    {content.text}
                </motion.p>
                <motion.div
                    className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6"
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease, delay: 0.46 }}
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
