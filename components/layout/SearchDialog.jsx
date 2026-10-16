'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { products } from 'data/products';
import { articles } from 'data/articles';
import { collections } from 'data/collections';
import { paths } from 'data/site';
import { isDColorDiamondEnabled } from 'lib/features';
import { CloseIcon } from 'components/ui/Icons';
import { ease } from 'lib/motion';
import { useEscape, useLockBody } from 'components/layout/useOverlay';

export function SearchDialog({ open, onClose }) {
    const reduce = useReducedMotion();
    const inputRef = useRef(null);
    const [query, setQuery] = useState('');
    useLockBody(open);
    useEscape(open, onClose);

    useEffect(() => {
        if (open) inputRef.current?.focus();
        else setQuery('');
    }, [open]);

    const needle = query.trim().toLowerCase();
    const productHits = useMemo(() => {
        if (!needle) return [];
        return products.filter((product) => {
            if (!product.available) return false;
            return [product.name, product.code, product.category, product.metal, product.diamondShape, product.summary]
                .filter(Boolean)
                .join(' ')
                .toLowerCase()
                .includes(needle);
        });
    }, [needle]);

    const articleHits = useMemo(() => {
        if (!needle) return [];
        return articles.filter((article) => `${article.title} ${article.category} ${article.excerpt}`.toLowerCase().includes(needle));
    }, [needle]);

    return (
        <AnimatePresence>
            {open ? (
                <motion.div
                    className="fixed inset-0 z-[70] bg-charcoal/40"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="search-title"
                        className="ml-auto flex h-full w-full max-w-xl flex-col bg-ivory"
                        initial={reduce ? false : { x: 24, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 16, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-charcoal/10 px-5 py-4">
                            <h2 id="search-title" className="font-serif text-2xl">
                                Search
                            </h2>
                            <button type="button" className="inline-flex h-11 w-11 items-center justify-center" onClick={onClose} aria-label="Close search">
                                <CloseIcon />
                            </button>
                        </div>
                        <div className="px-5 py-5">
                            <label htmlFor="site-search" className="sr-only">
                                Search pieces and articles
                            </label>
                            <input
                                ref={inputRef}
                                id="site-search"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Search pieces and articles"
                                className="w-full border-b border-charcoal/20 bg-transparent py-3 text-base outline-none placeholder:text-ash"
                            />
                        </div>
                        <div className="flex-1 overflow-y-auto px-5 pb-8">
                            {needle ? (
                                <>
                                    <p className="eyebrow mb-3">Pieces</p>
                                    {productHits.length ? (
                                        <ul className="space-y-4">
                                            {productHits.map((product) => (
                                                <li key={product.slug}>
                                                    <Link href={`${paths.shop}/${product.slug}`} onClick={onClose} className="block hover:text-ash">
                                                        <span className="block font-serif text-xl">{product.name}</span>
                                                        <span className="mt-1 block text-xs tracking-[0.14em] text-ash uppercase">
                                                            {product.metal} · {product.category}
                                                        </span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-ash">No pieces match that search.</p>
                                    )}
                                    <p className="eyebrow mt-8 mb-3">Articles</p>
                                    {articleHits.length ? (
                                        <ul className="space-y-3">
                                            {articleHits.map((article) => (
                                                <li key={article.slug}>
                                                    <Link href={`${paths.articles}/${article.slug}`} onClick={onClose} className="block font-serif text-xl hover:text-ash">
                                                        {article.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-ash">No articles match that search.</p>
                                    )}
                                </>
                            ) : (
                                <>
                                    <p className="text-sm leading-relaxed text-ash">Search by name, metal, shape, or code.</p>
                                    <p className="eyebrow mt-8 mb-3">Shop by form</p>
                                    <ul className="space-y-3">
                                        {collections.map((collection) => (
                                            <li key={collection.slug}>
                                                <Link href={collection.href} onClick={onClose} className="block hover:text-ash">
                                                    <span className="block font-serif text-xl">{collection.name}</span>
                                                    <span className="mt-1 block text-sm text-ash">{collection.description}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="eyebrow mt-8 mb-3">Guides</p>
                                    <ul className="space-y-3">
                                        <li>
                                            <Link href={paths.sizeGuide} onClick={onClose} className="block font-serif text-xl hover:text-ash">
                                                Size guide
                                            </Link>
                                        </li>
                                        {isDColorDiamondEnabled() ? (
                                            <li>
                                                <Link href={paths.diamond} onClick={onClose} className="block font-serif text-xl hover:text-ash">
                                                    D color diamonds
                                                </Link>
                                            </li>
                                        ) : null}
                                    </ul>
                                </>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
