'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { paths, site } from 'data/site';
import { ringSizes } from 'data/size-guide';
import { Button } from 'components/ui/Button';
import { formatMetalLabel, formatStoneLine, stoneFootnote } from 'lib/format';
import { useInquiry } from 'components/layout/InquiryProvider';

const metalSwatch = {
    'White Gold': '#e4e2dc',
    'Yellow Gold': '#c6a15b',
    'Rose Gold': '#c4897a'
};

function photographNotes(product) {
    return product.materials
        .map((line) =>
            line
                .replace(/^sample metal tone:\s*/i, '')
                .replace(/\s+in the photograph\.?$/i, '')
                .replace(/\s+visible in the photograph\.?$/i, '')
                .trim()
        )
        .filter((line) => line && !/^pale metal$/i.test(line) && !line.toLowerCase().includes('sample'))
        .map((line) => line.charAt(0).toUpperCase() + line.slice(1));
}

function addsDetail(summary, description) {
    if (!description) return false;
    const plain = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    const left = plain(summary || '');
    const right = plain(description);
    if (!right || !left || right === left || right.includes(left) || left.includes(right)) return false;
    const leftWords = left.split(' ').filter((word) => word.length > 2);
    if (!leftWords.length) return true;
    if (right.split(' ').length > leftWords.length + 8) return true;
    const shared = leftWords.filter((word) => right.includes(word)).length;
    return shared / leftWords.length < 0.7;
}

function sizeLabel(size) {
    if (!size) return '';
    if (size === 'help') return 'Help with size';
    return `${size} mm`;
}

export function ProductSummary({ product, metal, metalChoices = [], onMetalChange }) {
    const { add, items } = useInquiry();
    const notes = photographNotes(product);
    const stoneLines = (product.stones || []).map(formatStoneLine).filter(Boolean);
    const stoneText = stoneLines.join(' ').toLowerCase();
    const detailNotes = notes.filter((note) => {
        const words = note.toLowerCase().split(/\s+/).filter((word) => word.length > 3);
        if (!words.length) return true;
        const hits = words.filter((word) => stoneText.includes(word)).length;
        return hits / words.length < 0.75;
    });
    const showDescription = addsDetail(product.summary, product.description);
    const footnote = stoneFootnote(product);
    const shownMetal = metal || product.metal;
    const choices = metalChoices.length ? metalChoices : [shownMetal];
    const canChooseMetal = choices.length > 1;
    const metalsWithoutPhoto = (product.metals || []).filter((item) => !choices.includes(item));
    const needsSize = product.category === 'Rings';
    const [size, setSize] = useState('');
    const [sizeError, setSizeError] = useState(false);
    const [isGift, setIsGift] = useState(false);
    const [note, setNote] = useState('');
    const noteTrim = note.trim();
    const chosenSize = sizeLabel(size);
    const chosenRow = ringSizes.find((row) => String(row.circumference) === size);
    const savedItem = items.find((item) => item.slug === product.slug);
    const sameSaved =
        savedItem &&
        savedItem.metal === shownMetal &&
        (savedItem.size || '') === chosenSize &&
        Boolean(savedItem.gift) === isGift &&
        (savedItem.note || '') === noteTrim;
    const pieceLabel = product.code ? `${product.name} (${product.code})` : product.name;
    const giftLine = isGift ? ' This is a gift.' : '';
    const sizeLine = !needsSize ? '' : size === 'help' ? ' I need help with the size.' : ` Finger size ${size} mm.`;
    const noteLine = noteTrim ? ` Note: ${noteTrim}` : '';
    const whatsappText = `Hello, I would like to ask about ${pieceLabel} in ${shownMetal}.${sizeLine}${giftLine}${noteLine}`;
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
            <h1 className="mt-4 font-serif text-[2rem] leading-none font-normal text-balance md:text-[2.35rem]">{product.name}</h1>
            {product.code ? <p className="mt-4 text-[11px] tracking-[0.18em] text-taupe uppercase">Code {product.code}</p> : null}
            <p className="mt-5 max-w-sm font-serif text-lg leading-snug italic text-charcoal/80">{product.summary}</p>
            <p className="mt-4 text-xs tracking-wide text-ash">Ask us to confirm this piece.</p>

            {showDescription ? <p className="mt-8 max-w-md text-sm leading-7 text-ash">{product.description}</p> : null}

            <dl className="mt-10 border-t border-charcoal/10">
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
                        {product.fineness && shownMetal === product.metal ? (
                            <span className="mt-2 block text-xs leading-relaxed text-ash">{product.fineness}</span>
                        ) : null}
                        {metalsWithoutPhoto.length ? (
                            <span className="mt-2 block text-xs leading-relaxed text-ash">
                                Also made in {metalsWithoutPhoto.map(formatMetalLabel).join(' and ')}. Shown here in{' '}
                                {formatMetalLabel(shownMetal)}.
                            </span>
                        ) : null}
                    </dd>
                </div>
                {stoneLines.length ? (
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
                ) : product.diamondShape ? (
                    <div className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 border-b border-charcoal/10 py-4 text-sm">
                        <dt className="text-[11px] tracking-[0.18em] text-taupe uppercase">Shape</dt>
                        <dd>{product.diamondShape}</dd>
                    </div>
                ) : null}
            </dl>

            {detailNotes.length ? (
                <div className="border-b border-charcoal/10 py-5">
                    <p className="text-[11px] tracking-[0.18em] text-taupe uppercase">Details</p>
                    <ul className="mt-3 space-y-2">
                        {detailNotes.map((note) => (
                            <li key={note} className="text-sm leading-relaxed text-ash">
                                {note}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}

            <div className="mt-10 flex flex-col items-start gap-5">
                {product.available ? (
                    <>
                        {needsSize ? (
                            <div id="ring-size" tabIndex={-1} className="w-full scroll-mt-28 outline-none">
                                <div className="flex items-baseline justify-between gap-4">
                                    <p className="text-[11px] tracking-[0.16em] text-ash uppercase">Finger size</p>
                                    <Link href={paths.sizeGuide} className="text-[11px] tracking-[0.16em] text-ash uppercase underline-offset-4 hover:text-charcoal hover:underline">
                                        Size guide
                                    </Link>
                                </div>
                                <div
                                    role="radiogroup"
                                    aria-label="Finger size in millimetres, measured around the finger"
                                    aria-invalid={sizeError}
                                    aria-describedby={sizeError ? 'ring-size-error' : 'ring-size-hint'}
                                    className="mt-3 grid grid-cols-6 gap-px border border-charcoal/10 bg-charcoal/10 sm:grid-cols-7"
                                >
                                    {ringSizes.map((row) => {
                                        const value = String(row.circumference);
                                        const selected = size === value;
                                        return (
                                            <button
                                                key={value}
                                                type="button"
                                                role="radio"
                                                aria-checked={selected}
                                                onClick={() => {
                                                    setSize(value);
                                                    setSizeError(false);
                                                }}
                                                className={`min-h-10 text-sm tabular-nums ${selected ? 'bg-charcoal text-ivory' : 'bg-ivory text-charcoal hover:bg-white'}`}
                                            >
                                                {row.circumference}
                                            </button>
                                        );
                                    })}
                                </div>
                                <button
                                    type="button"
                                    aria-pressed={size === 'help'}
                                    onClick={() => {
                                        setSize('help');
                                        setSizeError(false);
                                    }}
                                    className={`mt-3 min-h-11 text-left text-sm underline-offset-4 hover:underline ${size === 'help' ? 'text-charcoal' : 'text-ash'}`}
                                >
                                    I need help with the size
                                </button>
                                <p id="ring-size-hint" className="text-xs leading-relaxed text-ash">
                                    {chosenRow
                                        ? `${chosenRow.circumference} mm around the finger. ${chosenRow.diameter.toFixed(1)} mm across the inside.`
                                        : size === 'help'
                                          ? 'We will ask about the fit in the conversation.'
                                          : 'The number is millimetres around the finger.'}
                                </p>
                                {sizeError ? (
                                    <p id="ring-size-error" className="text-xs text-charcoal">
                                        Choose a finger size before you ask.
                                    </p>
                                ) : null}
                            </div>
                        ) : null}
                        <div ref={inquireRef} className="flex w-full flex-wrap items-center gap-x-6 gap-y-3">
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
                                    add({ ...product, metal: shownMetal, size: chosenSize, gift: isGift, note: noteTrim });
                                }}
                                disabled={Boolean(sameSaved)}
                                ariaLabel={sameSaved ? `${product.name} is already saved` : `Save ${product.name} for an inquiry`}
                            >
                                {sameSaved ? 'Saved for inquiry' : savedItem ? 'Update saved piece' : 'Save for inquiry'}
                            </Button>
                        </div>
                        <label className="block w-full text-[11px] tracking-[0.16em] text-ash uppercase">
                            A note
                            <textarea
                                value={note}
                                maxLength={140}
                                rows={2}
                                onChange={(event) => setNote(event.target.value)}
                                placeholder="A question, or words you want remembered"
                                className="mt-2 w-full resize-none border-b border-charcoal/20 bg-transparent py-2 text-sm tracking-normal text-charcoal normal-case outline-none placeholder:text-ash"
                            />
                        </label>
                        <label className="inline-flex min-h-11 cursor-pointer items-center gap-3 text-sm">
                            <input
                                type="checkbox"
                                checked={isGift}
                                onChange={(event) => setIsGift(event.target.checked)}
                                className="h-4 w-4 accent-charcoal"
                            />
                            This is a gift
                        </label>
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
