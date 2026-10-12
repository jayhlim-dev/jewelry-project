'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ease, viewport } from 'lib/motion';

export function ImageReveal({ src, alt, className = '', sizes = '100vw', priority = false }) {
    const reduce = useReducedMotion();

    return (
        <motion.div
            className={`relative overflow-hidden bg-white ${className}`}
            initial={reduce ? false : { clipPath: 'inset(8% 0% 8% 0%)', opacity: 0 }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
            viewport={viewport}
            transition={{ duration: reduce ? 0 : 0.9, ease }}
        >
            <motion.div
                className="absolute inset-0"
                initial={reduce ? false : { scale: 1.06 }}
                whileInView={{ scale: 1 }}
                viewport={viewport}
                transition={{ duration: reduce ? 0 : 1.15, ease }}
            >
                <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
            </motion.div>
        </motion.div>
    );
}
