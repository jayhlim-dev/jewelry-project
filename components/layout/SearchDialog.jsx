'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { articles } from 'data/articles';
import { collections } from 'data/collections';
import { searchCopy, searchPopularArticleSlugs, searchQuickLinks } from 'data/search';
import { paths } from 'data/site';
import { formatMetalLabel } from 'lib/format';
import { isDColorDiamondEnabled } from 'lib/features';
import { hasSearchResults, searchSite } from 'lib/siteSearch';
import { ease } from 'lib/motion';
import { CloseIcon } from 'components/ui/Icons';
import { useEscape, useLockBody } from 'components/layout/useOverlay';

function ResultSection({ title, count, children }) {
    if (!children) return null;
    return (
        <section className="mt-8 first:mt-0">
            <p className="eyebrow mb-3">
                {title}
                {typeof count === 'number' ? <span className="ml-2 text-taupe">({count})</span> : null}
            </p>
            {children}
        </section>
    );
}

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

    const result = useMemo(() => searchSite(query), [query]);
    const popularArticles = useMemo(
        () => searchPopularArticleSlugs.map((slug) => articles.find((article) => article.slug === slug)).filter(Boolean),
        []
    );

    const showEmpty = result.hasQuery && !hasSearchResults(result);

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
                            <div>
                                <h2 id="search-title" className="font-serif text-2xl">{searchCopy.title}</h2>
                                <p className="mt-1 hidden text-[11px] tracking-[0.12em] text-ash uppercase sm:block">
                                    <kbd className="rounded border border-charcoal/15 px-1.5 py-0.5 font-sans normal-case tracking-normal">⌘</kbd>
                                    <span className="mx-1">+</span>
                                    <kbd className="rounded border border-charcoal/15 px-1.5 py-0.5 font-sans normal-case tracking-normal">K</kbd>
                                </p>
                            </div>
                            <button type="button" className="inline-flex h-11 w-11 items-center justify-center" onClick={onClose} aria-label="Close search">
                                <CloseIcon />
                            </button>
                        </div>
                        <div className="px-5 py-5">
                            <label htmlFor="site-search" className="sr-only">{searchCopy.inputLabel}</label>
                            <input
                                ref={inputRef}
                                id="site-search"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder={searchCopy.placeholder}
                                autoComplete="off"
                                className="w-full border-b border-charcoal/20 bg-transparent py-3 text-base outline-none placeholder:text-ash"
                            />
                        </div>
                        <div className="flex-1 overflow-y-auto px-5 pb-8">
                            {result.hasQuery ? (
                                <>
                                    {showEmpty ? (
                                        <div className="border border-charcoal/10 bg-white p-5">
                                            <p className="font-serif text-lg">{searchCopy.noResultsTitle}</p>
                                            <p className="mt-2 text-sm leading-relaxed text-ash">{searchCopy.noResultsBody}</p>
                                        </div>
                                    ) : null}

                                    {result.products.length ? (
                                        <ResultSection title={searchCopy.sections.pieces} count={result.products.length}>
                                            <ul className="space-y-4">
                                                {result.products.map((product) => (
                                                    <li key={product.slug}>
                                                        <Link
                                                            href={`${paths.shop}/${product.slug}`}
                                                            onClick={onClose}
                                                            className="block hover:text-ash"
                                                        >
                                                            <span className="block font-serif text-xl">{product.name}</span>
                                                            <span className="mt-1 block text-xs tracking-[0.14em] text-ash uppercase">
                                                                {product.code ? `${product.code} · ` : ''}
                                                                {formatMetalLabel(product.metal)}
                                                                {product.diamondShape ? ` · ${product.diamondShape}` : ''}
                                                                {' · '}
                                                                {product.category}
                                                            </span>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </ResultSection>
                                    ) : null}

                                    {result.articles.length ? (
                                        <ResultSection title={searchCopy.sections.articles} count={result.articles.length}>
                                            <ul className="space-y-4">
                                                {result.articles.map((article) => (
                                                    <li key={article.slug}>
                                                        <Link
                                                            href={`${paths.articles}/${article.slug}`}
                                                            onClick={onClose}
                                                            className="block hover:text-ash"
                                                        >
                                                            <span className="block font-serif text-xl">{article.title}</span>
                                                            <span className="mt-1 block text-xs tracking-[0.14em] text-ash uppercase">{article.category}</span>
                                                            <span className="mt-1 block text-sm leading-relaxed text-ash line-clamp-2">{article.excerpt}</span>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </ResultSection>
                                    ) : null}

                                    {result.pages.length ? (
                                        <ResultSection title={searchCopy.sections.pages} count={result.pages.length}>
                                            <ul className="space-y-3">
                                                {result.pages.map((page) => (
                                                    <li key={page.href}>
                                                        <Link href={page.href} onClick={onClose} className="block hover:text-ash">
                                                            <span className="block font-serif text-xl">{page.title}</span>
                                                            <span className="mt-1 block text-sm text-ash">{page.subtitle}</span>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </ResultSection>
                                    ) : null}

                                    {showEmpty ? (
                                        <ResultSection title={searchCopy.sections.collections}>
                                            <ul className="mt-3 space-y-3">
                                                {collections.map((collection) => (
                                                    <li key={collection.slug}>
                                                        <Link href={collection.href} onClick={onClose} className="block font-serif text-lg hover:text-ash">
                                                            {collection.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </ResultSection>
                                    ) : null}
                                </>
                            ) : (
                                <>
                                    <p className="text-sm leading-relaxed text-ash">{searchCopy.idleLead}</p>
                                    <p className="mt-2 text-xs leading-relaxed text-ash">{searchCopy.idleHint}</p>

                                    <ResultSection title="Popular reads">
                                        <ul className="space-y-3">
                                            {popularArticles.map((article) => (
                                                <li key={article.slug}>
                                                    <Link
                                                        href={`${paths.articles}/${article.slug}`}
                                                        onClick={onClose}
                                                        className="block hover:text-ash"
                                                    >
                                                        <span className="block font-serif text-xl">{article.title}</span>
                                                        <span className="mt-1 block text-sm text-ash line-clamp-2">{article.excerpt}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </ResultSection>

                                    <ResultSection title={searchCopy.sections.guides}>
                                        <ul className="space-y-3">
                                            {searchQuickLinks.map((link) => (
                                                <li key={link.href}>
                                                    <Link href={link.href} onClick={onClose} className="block font-serif text-xl hover:text-ash">
                                                        {link.label}
                                                    </Link>
                                                </li>
                                            ))}
                                            {isDColorDiamondEnabled() ? (
                                                <li>
                                                    <Link href={paths.diamond} onClick={onClose} className="block font-serif text-xl hover:text-ash">
                                                        D color diamonds
                                                    </Link>
                                                </li>
                                            ) : null}
                                        </ul>
                                    </ResultSection>

                                    <ResultSection title={searchCopy.sections.collections}>
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
                                    </ResultSection>
                                </>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
