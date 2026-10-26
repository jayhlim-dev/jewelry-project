'use client';

import Link from 'next/link';
import { useState } from 'react';
import { paths } from 'data/site';
import { ringSizes } from 'data/size-guide';

export function ProductRingSizePicker({ size, onSizeChange, sizeError }) {
    const [showGrid, setShowGrid] = useState(false);
    const chosenRow = ringSizes.find((row) => String(row.circumference) === size);

    function pick(next) {
        onSizeChange(next);
    }

    const hint =
        chosenRow
            ? `${chosenRow.circumference} mm around the finger. ${chosenRow.diameter.toFixed(1)} mm across the inside.`
            : size === 'help'
              ? 'We will ask about the fit in the conversation.'
              : 'The number is millimetres around the finger.';

    const grid = (
        <>
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
                            onClick={() => pick(value)}
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
                onClick={() => pick('help')}
                className={`mt-3 min-h-11 text-left text-sm underline-offset-4 hover:underline ${size === 'help' ? 'text-charcoal' : 'text-ash'}`}
            >
                I need help with the size
            </button>
        </>
    );

    return (
        <div id="ring-size" tabIndex={-1} className="w-full scroll-mt-28 outline-none">
            <div className="flex items-baseline justify-between gap-4">
                <p className="text-[11px] tracking-[0.16em] text-ash uppercase">Finger size</p>
                <Link
                    href={paths.sizeGuide}
                    className="text-[11px] tracking-[0.16em] text-ash uppercase underline-offset-4 hover:text-charcoal hover:underline"
                >
                    Size guide
                </Link>
            </div>

            <div className="mt-3 lg:hidden">
                {!showGrid ? (
                    <>
                        <label className="sr-only" htmlFor="ring-size-select">Finger size in millimetres</label>
                        <select
                            id="ring-size-select"
                            value={size}
                            onChange={(event) => pick(event.target.value)}
                            aria-invalid={sizeError}
                            aria-describedby={sizeError ? 'ring-size-error' : 'ring-size-hint'}
                            className={`w-full min-h-11 border bg-ivory px-3 text-sm text-charcoal outline-none ${sizeError ? 'border-charcoal' : 'border-charcoal/20'}`}
                        >
                            <option value="">Choose size (mm)</option>
                            {ringSizes.map((row) => (
                                <option key={row.circumference} value={String(row.circumference)}>
                                    {row.circumference} mm
                                </option>
                            ))}
                            <option value="help">I need help with the size</option>
                        </select>
                        <button
                            type="button"
                            onClick={() => setShowGrid(true)}
                            className="mt-3 min-h-11 text-sm text-ash underline-offset-4 hover:text-charcoal hover:underline"
                        >
                            Browse all sizes
                        </button>
                    </>
                ) : (
                    <>
                        {grid}
                        <button
                            type="button"
                            onClick={() => setShowGrid(false)}
                            className="mt-3 min-h-11 text-sm text-ash underline-offset-4 hover:text-charcoal hover:underline"
                        >
                            Use size menu
                        </button>
                    </>
                )}
            </div>

            <div className="mt-3 hidden lg:block">{grid}</div>

            <p id="ring-size-hint" className="mt-3 text-xs leading-relaxed text-ash">
                {hint}
            </p>
            {sizeError ? (
                <p id="ring-size-error" className="mt-1 text-xs text-charcoal">
                    Choose a finger size before you ask.
                </p>
            ) : null}
        </div>
    );
}
