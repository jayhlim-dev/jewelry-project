'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ease, viewport } from 'lib/motion';

export function Reveal({ children, className = '', delay = 0, as = 'div' }) {
    const reduce = useReducedMotion();
    const Tag = motion[as] || motion.div;

    if (reduce) {
        const Static = as;
        return <Static className={className}>{children}</Static>;
    }

    return (
        <Tag
            className={className}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.65, ease, delay }}
        >
            {children}
        </Tag>
    );
}
