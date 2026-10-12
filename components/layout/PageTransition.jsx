'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ease } from 'lib/motion';

export function PageTransition({ children }) {
    const reduce = useReducedMotion();

    if (reduce) return children;

    return (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }}>
            {children}
        </motion.div>
    );
}
