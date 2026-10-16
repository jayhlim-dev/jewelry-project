'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const InquiryContext = createContext(null);
const STORAGE_KEY = 'xxxx-inquiry-bag';

export function InquiryProvider({ children }) {
    const [items, setItems] = useState([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        try {
            const saved = window.localStorage.getItem(STORAGE_KEY);
            if (saved) setItems(JSON.parse(saved));
        } catch {
            setItems([]);
        }
        setReady(true);
    }, []);

    useEffect(() => {
        if (!ready) return;
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items, ready]);

    const add = (product) => {
        setItems((current) => {
            const next = {
                slug: product.slug,
                name: product.name,
                code: product.code || '',
                category: product.category,
                metal: product.metal || '',
                size: product.size || '',
                note: product.note || '',
                gift: Boolean(product.gift),
                price: product.price,
                priceMax: product.priceMax || null,
                currency: product.currency,
                image: product.images[0]?.src || '',
                imageAlt: product.images[0]?.alt || product.name
            };
            const index = current.findIndex((item) => item.slug === product.slug);
            if (index === -1) return [...current, next];
            const copy = [...current];
            copy[index] = next;
            return copy;
        });
    };

    const remove = (slug) => setItems((current) => current.filter((item) => item.slug !== slug));
    const has = (slug) => items.some((item) => item.slug === slug);

    return <InquiryContext.Provider value={{ items, add, remove, has }}>{children}</InquiryContext.Provider>;
}

export function useInquiry() {
    const value = useContext(InquiryContext);
    if (!value) throw new Error('useInquiry must be used within InquiryProvider');
    return value;
}
