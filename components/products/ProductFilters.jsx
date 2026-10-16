'use client';

import { useEffect, useState } from 'react';
import { collections } from 'data/collections';
import { parseRp } from 'lib/format';

const metalSwatch = {
    'White Gold': '#e4e2dc',
    'Yellow Gold': '#c6a15b',
    'Rose Gold': '#c4897a'
};

function formatAmountInput(amount) {
    if (typeof amount !== 'number' || Number.isNaN(amount)) return '0';
    return new Intl.NumberFormat('id-ID').format(amount);
}

function Section({ title, onReset, children, className = '' }) {
    return (
        <section className={`border-b border-charcoal/8 py-5 first:pt-0 last:border-b-0 ${className}`}>
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-[11px] font-medium tracking-[0.2em] text-charcoal uppercase">{title}</h2>
                {onReset ? (
                    <button
                        type="button"
                        onClick={onReset}
                        className="text-[11px] tracking-[0.04em] text-ash normal-case transition-colors hover:text-charcoal"
                    >
                        Reset
                    </button>
                ) : (
                    <span className="w-10" aria-hidden="true" />
                )}
            </div>
            <div className="mt-3.5">{children}</div>
        </section>
    );
}

function CheckRow({ checked, onChange, label }) {
    return (
        <label className="group flex min-h-9 cursor-pointer items-center gap-3 text-[15px] text-charcoal">
            <span className="relative h-[15px] w-[15px] shrink-0">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) => onChange(event.target.checked)}
                    className="absolute inset-0 cursor-pointer appearance-none border border-charcoal/30 bg-ivory transition-colors checked:border-charcoal checked:bg-charcoal group-hover:border-charcoal/50"
                />
                <svg
                    viewBox="0 0 12 12"
                    className={`pointer-events-none absolute inset-[1px] text-ivory ${checked ? 'opacity-100' : 'opacity-0'}`}
                    aria-hidden="true"
                >
                    <path d="M2.2 6.2 4.6 8.6 9.8 3.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
            </span>
            <span className="leading-none">{label}</span>
        </label>
    );
}

function PriceField({ label, value, onChange, onCommit }) {
    return (
        <label className="block">
            <span className="text-[11px] tracking-[0.12em] text-ash">{label}</span>
            <div className="mt-1.5 flex items-stretch overflow-hidden border border-charcoal/12 bg-ivory transition-colors focus-within:border-charcoal/35">
                <span className="flex items-center border-r border-charcoal/8 px-2.5 text-[13px] text-ash select-none">
                    Rp
                </span>
                <input
                    inputMode="numeric"
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    onBlur={(event) => onCommit(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') event.currentTarget.blur();
                    }}
                    className="min-w-0 flex-1 bg-transparent px-2.5 py-2 text-[14px] tabular-nums outline-none"
                />
            </div>
        </label>
    );
}

function PriceRange({ minBound, maxBound, min, max, onChange }) {
    const [fromText, setFromText] = useState(formatAmountInput(min));
    const [toText, setToText] = useState(formatAmountInput(max));

    useEffect(() => {
        setFromText(formatAmountInput(min));
        setToText(formatAmountInput(max));
    }, [min, max]);

    const span = maxBound - minBound || 1;
    const left = ((min - minBound) / span) * 100;
    const right = ((maxBound - max) / span) * 100;

    function commitFrom(raw) {
        const next = Math.min(Math.max(parseRp(raw), minBound), max);
        onChange(next, max);
        setFromText(formatAmountInput(next));
    }

    function commitTo(raw) {
        const next = Math.max(Math.min(parseRp(raw), maxBound), min);
        onChange(min, next);
        setToText(formatAmountInput(next));
    }

    return (
        <div>
            <div className="dual-range px-0.5">
                <div className="pointer-events-none absolute top-1/2 right-0 left-0 h-[2px] -translate-y-1/2 rounded-full bg-charcoal/10" />
                <div
                    className="pointer-events-none absolute top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-charcoal"
                    style={{ left: `${left}%`, right: `${right}%` }}
                />
                <input
                    type="range"
                    min={minBound}
                    max={maxBound}
                    step={100000}
                    value={min}
                    aria-label="Minimum price"
                    onChange={(event) => onChange(Math.min(Number(event.target.value), max), max)}
                />
                <input
                    type="range"
                    min={minBound}
                    max={maxBound}
                    step={100000}
                    value={max}
                    aria-label="Maximum price"
                    onChange={(event) => onChange(min, Math.max(Number(event.target.value), min))}
                />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
                <PriceField label="From" value={fromText} onChange={setFromText} onCommit={commitFrom} />
                <PriceField label="To" value={toText} onChange={setToText} onCommit={commitTo} />
            </div>
        </div>
    );
}

function SortSelect({ sort, sortOptions, onSort }) {
    const label = sortOptions.find((option) => option.id === sort)?.label ?? 'Most relevant';

    return (
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-[11px] font-medium tracking-[0.2em] text-charcoal uppercase">Sort by:</span>
            <div className="relative min-w-0 flex-1">
                <select
                    value={sort}
                    onChange={(event) => onSort(event.target.value)}
                    aria-label="Sort products"
                    className="w-full min-w-[10rem] cursor-pointer appearance-none bg-transparent py-0.5 pr-6 text-[15px] text-charcoal outline-none"
                >
                    {sortOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <svg
                    viewBox="0 0 12 12"
                    className="pointer-events-none absolute top-1/2 right-0 h-3.5 w-3.5 -translate-y-1/2 text-charcoal"
                    aria-hidden="true"
                >
                    <path d="M2.5 4.5 6 8 9.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.25" />
                </svg>
                <span className="sr-only">Current sort: {label}</span>
            </div>
        </div>
    );
}

export function CategoryTabs({ category, onCategory }) {
    const categories = ['All', ...collections.map((item) => item.name)];

    return (
        <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:overflow-visible md:px-0">
            <div className="flex w-max gap-x-6 py-1 md:w-auto md:flex-wrap" role="group" aria-label="Categories">
                {categories.map((name) => {
                    const active = category === name;
                    return (
                        <button
                            key={name}
                            type="button"
                            aria-pressed={active}
                            onClick={() => onCategory(name)}
                            className={`pb-1 text-[12px] tracking-[0.16em] uppercase transition-colors ${active ? 'border-b border-charcoal text-charcoal' : 'text-ash hover:text-charcoal'}`}
                        >
                            {name}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export function ProductFilters({
    metal,
    onMetal,
    metals,
    shape,
    onShape,
    shapes,
    inStock,
    outStock,
    onAvailability,
    priceMin,
    priceMax,
    priceBoundMin,
    priceBoundMax,
    onPrice,
    sort,
    onSort,
    sortOptions,
    resultCount
}) {
    const availabilityDirty = !inStock || outStock;
    const priceDirty = priceMin !== priceBoundMin || priceMax !== priceBoundMax;
    const metalDirty = metal !== 'All';
    const shapeDirty = shape !== 'All';

    return (
        <div className="lg:sticky lg:top-24">
            <Section
                title="Availability"
                onReset={availabilityDirty ? () => onAvailability({ inStock: true, outStock: false }) : undefined}
            >
                <div className="space-y-0.5">
                    <CheckRow
                        checked={inStock}
                        onChange={(checked) => onAvailability({ inStock: checked, outStock })}
                        label="In stock"
                    />
                    <CheckRow
                        checked={outStock}
                        onChange={(checked) => onAvailability({ inStock, outStock: checked })}
                        label="Out of stock"
                    />
                </div>
            </Section>

            {/* <Section title="Price" onReset={priceDirty ? () => onPrice(priceBoundMin, priceBoundMax) : undefined}>
                <PriceRange
                    minBound={priceBoundMin}
                    maxBound={priceBoundMax}
                    min={priceMin}
                    max={priceMax}
                    onChange={onPrice}
                />
            </Section> */}

            <Section title="Metal" onReset={metalDirty ? () => onMetal('All') : undefined}>
                <div className="flex flex-col gap-0.5" role="group" aria-label="Metal">
                    {metals.map((item) => {
                        const selected = metal === item;
                        return (
                            <button
                                key={item}
                                type="button"
                                aria-pressed={selected}
                                onClick={() => onMetal(selected ? 'All' : item)}
                                className={`flex min-h-9 items-center gap-3 rounded-sm px-0.5 text-left text-[15px] transition-colors ${selected ? 'text-charcoal' : 'text-ash hover:text-charcoal'}`}
                            >
                                <span
                                    aria-hidden="true"
                                    className={`inline-block h-3.5 w-3.5 shrink-0 rounded-full border border-charcoal/15 ${selected ? 'ring-1 ring-charcoal ring-offset-2 ring-offset-ivory' : ''}`}
                                    style={{ backgroundColor: metalSwatch[item] || '#d8d4cc' }}
                                />
                                {item}
                            </button>
                        );
                    })}
                </div>
            </Section>

            <Section title="Diamond shape" onReset={shapeDirty ? () => onShape('All') : undefined}>
                <div className="flex flex-wrap gap-1.5">
                    {shapes.map((item) => {
                        const selected = shape === item;
                        return (
                            <button
                                key={item}
                                type="button"
                                aria-pressed={selected}
                                onClick={() => onShape(selected ? 'All' : item)}
                                className={`min-h-8 border px-2.5 text-[12px] tracking-[0.06em] transition-colors ${
                                    selected
                                        ? 'border-charcoal bg-charcoal text-ivory'
                                        : 'border-charcoal/12 bg-ivory text-ash hover:border-charcoal/30 hover:text-charcoal'
                                }`}
                            >
                                {item}
                            </button>
                        );
                    })}
                </div>
            </Section>

            <section className="border-b border-charcoal/8 py-5">
                <SortSelect sort={sort} sortOptions={sortOptions} onSort={onSort} />
            </section>

            <p className="pt-5 text-[14px] text-charcoal/75 tabular-nums" aria-live="polite">
                {resultCount} {resultCount === 1 ? 'Result' : 'Results'}
            </p>
        </div>
    );
}
