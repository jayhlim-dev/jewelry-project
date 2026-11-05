'use client';

import { useEffect, useRef, useState } from 'react';
import { useContent } from 'components/layout/ContentProvider';
import { ProductRingSizePicker } from 'components/products/ProductRingSizePicker';
import { Button } from 'components/ui/Button';
import { formatMetalLabel, formatStoneLine, stoneFootnote } from 'lib/format';
import { hasSpecificationSheet, shouldShowSpecifications } from 'lib/productSpecs';
import { ProductSpecifications } from 'components/products/ProductSpecifications';
import { useInquiry } from 'components/layout/InquiryProvider';

const metalSwatch = {
    'White Gold': '#e4e2dc',
    'Yellow Gold': '#c6a15b',
    'Rose Gold': '#c4897a'
};

function sizeLabel(size) {
    if (!size) return '';
    if (size === 'help') return 'Help with size';
    return `${size} mm`;
}

export function ProductSummary({ product, metal, metalChoices = [], onMetalChange }) {
    const { site } = useContent();
    const { add, items } = useInquiry();
    const showSpecifications = shouldShowSpecifications(product);
    const specificationSheet = hasSpecificationSheet(product);
    const stoneLines = (product.stones || []).map(formatStoneLine).filter(Boolean);
    const footnote = stoneFootnote(product);
    const shownMetal = metal || product.metal;
    const choices = metalChoices.length ? metalChoices : [shownMetal];
    const canChooseMetal = choices.length > 1;
    const metalsWithoutPhoto = (product.metals || []).filter((item) => !choices.includes(item));
    const showMetalRow = !specificationSheet && (!showSpecifications || canChooseMetal);
    const metalOnInquiry =
        metalsWithoutPhoto.length > 0 && !canChooseMetal
            ? `Also available in ${metalsWithoutPhoto.map(formatMetalLabel).join(' and ')} on inquiry. Shown in ${formatMetalLabel(shownMetal)}.`
            : '';
    const showLegacyStones = !showSpecifications && stoneLines.length > 0;
    const hasAttributeList = showMetalRow || showLegacyStones;
    const needsSize = product.category === 'Rings';
    const [size, setSize] = useState('');
    const [sizeError, setSizeError] = useState(false);
    const chosenSize = sizeLabel(size);
    const savedItem = items.find((item) => item.slug === product.slug);
    const sameSaved =
        savedItem &&
        savedItem.metal === shownMetal &&
        (savedItem.size || '') === chosenSize;
    const pieceLabel = product.code ? `${product.name} (${product.code})` : product.name;
    const sizeLine = !needsSize ? '' : size === 'help' ? ' I need help with the size.' : ` Finger size ${size} mm.`;
    const whatsappText = `Hello, I would like to ask about ${pieceLabel} in ${shownMetal}.${sizeLine}`;
    const whatsappHref = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(whatsappText)}`;
    const inquireRef = useRef(null);
    const [barVisible, setBarVisible] = useState(false);

    useEffect(() => {
        const node = inquireRef.current;
        if (!node || !product.available) return undefined;

        const narrow = window.matchMedia('(max-width: 1023px)');
        let observer = null;

        const watch = () => {
            observer?.disconnect();
            observer = null;
            if (!narrow.matches) {
                setBarVisible(false);
                return;
            }
            observer = new IntersectionObserver(([entry]) => setBarVisible(!entry.isIntersecting), {
                threshold: 0,
                rootMargin: '0px 0px -72px 0px'
            });
            observer.observe(node);
        };

        watch();
        narrow.addEventListener('change', watch);
        return () => {
            narrow.removeEventListener('change', watch);
            observer?.disconnect();
        };
    }, [product.available, product.slug]);

    useEffect(() => {
        if (!barVisible) return undefined;
        const previous = document.body.style.paddingBottom;
        document.body.style.paddingBottom = '5.5rem';
        return () => {
            document.body.style.paddingBottom = previous;
        };
    }, [barVisible]);

    return (
        <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">{product.category}</p>
            <h1 className="mt-2 font-serif text-[1.85rem] leading-none font-normal text-balance md:text-[2.15rem]">{product.name}</h1>
            {product.code ? <p className="mt-2 text-[11px] tracking-[0.18em] text-taupe uppercase">Code {product.code}</p> : null}
            <p className="mt-3 max-w-sm font-serif text-base leading-snug italic text-charcoal/80 md:text-lg">{product.summary}</p>
            <p className="mt-2 text-xs tracking-wide text-ash">Ask us to confirm this piece.</p>

            {specificationSheet ? (
                <p className="mt-4 text-sm text-ash">
                    <a href="#piece-specification-sheet-heading" className="underline-offset-4 hover:text-charcoal hover:underline">
                        Full specification below
                    </a>
                    {product.available ? (
                        <>
                            {' '}
                            · In stock
                        </>
                    ) : (
                        <> · Unavailable</>
                    )}
                </p>
            ) : (
                <dl className="mt-8 grid grid-cols-[7.5rem_1fr] gap-x-4 gap-y-3 border-t border-charcoal/10 pt-6 text-sm">
                    <div className="contents">
                        <dt className="text-[11px] tracking-[0.16em] text-taupe uppercase">Availability</dt>
                        <dd className="text-charcoal/90">{product.available ? 'In stock' : 'Unavailable'}</dd>
                    </div>
                    {product.fineness ? (
                        <div className="contents">
                            <dt className="text-[11px] tracking-[0.16em] text-taupe uppercase">Fineness</dt>
                            <dd className="text-charcoal/90">{product.fineness}</dd>
                        </div>
                    ) : null}
                    {product.diamondShape ? (
                        <div className="contents">
                            <dt className="text-[11px] tracking-[0.16em] text-taupe uppercase">Shape</dt>
                            <dd className="text-charcoal/90">{product.diamondShape}</dd>
                        </div>
                    ) : null}
                </dl>
            )}

            {hasAttributeList ? (
            <dl className="mt-10 border-t border-charcoal/10">
                {showMetalRow ? (
                <div className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 border-b border-charcoal/10 py-4 text-sm">
                    <dt className="text-[11px] tracking-[0.18em] text-taupe uppercase">Gold tone</dt>
                    <dd>
                        {canChooseMetal ? (
                            <div role="radiogroup" aria-label="Gold tone" className="flex flex-wrap gap-x-2">
                                {choices.map((choice) => {
                                    const selected = choice === shownMetal;
                                    return (
                                        <button
                                            key={choice}
                                            type="button"
                                            role="radio"
                                            aria-checked={selected}
                                            onClick={() => onMetalChange?.(choice)}
                                            className="inline-flex min-h-11 items-center gap-2 pr-3"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className={`inline-block h-3.5 w-3.5 rounded-full border border-charcoal/20 ${selected ? 'ring-1 ring-charcoal ring-offset-2' : ''}`}
                                                style={{ backgroundColor: metalSwatch[choice] || '#d8d4cc' }}
                                            />
                                            {formatMetalLabel(choice)}
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            <span className="inline-flex items-center gap-2">
                                <span
                                    aria-hidden="true"
                                    className="inline-block h-3.5 w-3.5 rounded-full border border-charcoal/20"
                                    style={{ backgroundColor: metalSwatch[shownMetal] || '#d8d4cc' }}
                                />
                                {formatMetalLabel(shownMetal)}
                            </span>
                        )}
                        {!showSpecifications && product.fineness && shownMetal === product.metal ? (
                            <span className="mt-2 block text-xs leading-relaxed text-ash">{product.fineness}</span>
                        ) : null}
                        {!showSpecifications && canChooseMetal && metalsWithoutPhoto.length ? (
                            <span className="mt-2 block text-xs leading-relaxed text-ash">
                                Also made in {metalsWithoutPhoto.map(formatMetalLabel).join(' and ')}. Shown here in{' '}
                                {formatMetalLabel(shownMetal)}.
                            </span>
                        ) : null}
                        {showSpecifications && metalOnInquiry ? (
                            <span className="mt-2 block text-xs leading-relaxed text-ash">{metalOnInquiry}</span>
                        ) : null}
                    </dd>
                </div>
                ) : null}
                {showLegacyStones ? (
                    <div className="grid grid-cols-[7.5rem_1fr] items-start gap-4 border-b border-charcoal/10 py-4 text-sm">
                        <dt className="pt-0.5 text-[11px] tracking-[0.18em] text-taupe uppercase">Stones</dt>
                        <dd>
                            <ul className="space-y-1">
                                {stoneLines.map((line) => (
                                    <li key={line}>{line}</li>
                                ))}
                            </ul>
                            {footnote ? <p className="mt-2 text-xs leading-relaxed text-ash">{footnote}</p> : null}
                        </dd>
                    </div>
                ) : null}
            </dl>
            ) : null}

            {showSpecifications && !specificationSheet && !showMetalRow && metalOnInquiry ? (
                <p className="mt-10 border-t border-charcoal/10 pt-4 text-xs leading-relaxed text-ash">{metalOnInquiry}</p>
            ) : null}

            <ProductSpecifications product={product} metal={shownMetal} />

            <div className="mt-8 flex flex-col items-start gap-4">
                {product.available ? (
                    <>
                        {needsSize ? (
                            <ProductRingSizePicker
                                size={size}
                                sizeError={sizeError}
                                onSizeChange={(next) => {
                                    setSize(next);
                                    setSizeError(false);
                                }}
                            />
                        ) : null}
                        <div ref={inquireRef} className="flex w-full flex-wrap items-center gap-x-5 gap-y-2">
                            {needsSize && !size ? (
                                <Button
                                    className="w-full sm:w-auto"
                                    onClick={() => {
                                        setSizeError(true);
                                        document.getElementById('ring-size')?.focus();
                                    }}
                                >
                                    Inquire on WhatsApp
                                </Button>
                            ) : (
                                <Button className="w-full sm:w-auto" href={whatsappHref} external>
                                    Inquire on WhatsApp
                                </Button>
                            )}
                            <Button
                                variant="link"
                                onClick={() => {
                                    if (needsSize && !size) {
                                        setSizeError(true);
                                        document.getElementById('ring-size')?.focus();
                                        return;
                                    }
                                    add({ ...product, metal: shownMetal, size: chosenSize });
                                }}
                                disabled={Boolean(sameSaved)}
                                ariaLabel={sameSaved ? `${product.name} is already saved` : `Save ${product.name} for an inquiry`}
                            >
                                {sameSaved ? 'Saved for inquiry' : savedItem ? 'Update saved piece' : 'Save for inquiry'}
                            </Button>
                        </div>
                    </>
                ) : (
                    <p className="max-w-sm text-sm leading-relaxed text-ash">
                        This piece is unavailable, so inquiry is turned off.
                    </p>
                )}
            </div>
            {barVisible ? (
                <div className="fixed inset-x-0 bottom-0 z-40 border-t border-charcoal/10 bg-ivory/95 px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
                    <div className="mx-auto flex max-w-[90rem] items-center gap-4">
                        <div className="min-w-0 flex-1">
                            <p className="truncate font-serif text-lg leading-tight">{product.name}</p>
                            {chosenSize ? <p className="mt-0.5 text-[11px] tracking-[0.14em] text-ash uppercase">{chosenSize}</p> : null}
                        </div>
                        {needsSize && !size ? (
                            <button
                                type="button"
                                onClick={() => {
                                    setSizeError(true);
                                    document.getElementById('ring-size')?.scrollIntoView({ block: 'center' });
                                    document.getElementById('ring-size')?.focus();
                                }}
                                className="inline-flex min-h-11 shrink-0 items-center justify-center bg-charcoal px-5 text-[11px] font-medium tracking-[0.16em] text-ivory uppercase"
                            >
                                Choose a size
                            </button>
                        ) : (
                            <a
                                href={whatsappHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Inquire on WhatsApp about ${product.name}`}
                                className="inline-flex min-h-11 shrink-0 items-center justify-center bg-charcoal px-5 text-[11px] font-medium tracking-[0.16em] text-ivory uppercase"
                            >
                                Inquire
                            </a>
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    );
}
