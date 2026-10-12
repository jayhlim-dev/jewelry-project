'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ease, viewport } from 'lib/motion';

export function AnimatedText({ text, className = '', as = 'h2' }) {
    const reduce = useReducedMotion();
    const Tag = as;
    const words = text.split(' ');

    if (reduce) {
        return <Tag className={className}>{text}</Tag>;
    }

    return (
        <Tag className={className}>
            {words.map((word, index) => (
                <motion.span
                    key={`${word}-${index}`}
                    className="inline-block"
                    style={{ marginRight: '0.28em' }}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewport}
                    transition={{ duration: 0.55, ease, delay: index * 0.045 }}
                >
                    {word}
                </motion.span>
            ))}
        </Tag>
    );
}
