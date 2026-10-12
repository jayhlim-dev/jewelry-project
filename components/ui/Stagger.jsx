'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ease, viewport } from 'lib/motion';

const container = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.08, delayChildren: 0.04 }
    }
};

const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } }
};

export function StaggerContainer({ children, className = '' }) {
    const reduce = useReducedMotion();
    if (reduce) return <div className={className}>{children}</div>;

    return (
        <motion.div className={className} initial="hidden" whileInView="show" viewport={viewport} variants={container}>
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className = '' }) {
    const reduce = useReducedMotion();
    if (reduce) return <div className={className}>{children}</div>;
    return (
        <motion.div className={className} variants={item}>
            {children}
        </motion.div>
    );
}
