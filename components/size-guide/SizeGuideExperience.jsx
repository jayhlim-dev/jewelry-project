'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { braceletSizes, nearestRingRow, ringSizes, sizeGuide } from 'data/size-guide';
import { paths, site } from 'data/site';
import { Button } from 'components/ui/Button';
function parseMm(value) {
    const normalized = String(value).trim().replace(',', '.');
    const n = Number(normalized);
    return Number.isFinite(n) ? n : 0;
}

function whatsappHref(text) {
    return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function SizeGuideExperience() {
    const [aroundInput, setAroundInput] = useState('');
    const aroundMm = parseMm(aroundInput);
    const hasAround = aroundInput.trim() !== '' && aroundMm > 0;
    const nearest = useMemo(() => (hasAround ? nearestRingRow(aroundMm) : null), [aroundMm, hasAround]);

    const whatsappMessage = hasAround ? sizeGuide.cta.whatsappWithSize(aroundMm) : sizeGuide.cta.whatsappGeneric;

    return (
        <div className="space-y-14 md:space-y-16">
            <p className="max-w-xl text-[15px] leading-7 text-ash md:text-base">{sizeGuide.estimate}</p>
            <p className="max-w-lg text-sm leading-relaxed text-charcoal">{sizeGuide.sendHint}</p>

            <div className="relative aspect-[16/10] max-h-72 w-full overflow-hidden bg-charcoal/5">
                <Image
                    src={sizeGuide.illustration.src}
                    alt={sizeGuide.illustration.alt}
                    fill
                    sizes="(min-width: 768px) 640px, 100vw"
                    className="object-cover"
                />
            </div>

            <div className="grid gap-10 border-t border-charcoal/10 pt-10 md:grid-cols-2 md:gap-12">
                {sizeGuide.methods.map((method, index) => (
                    <section key={method.title}>
                        <p className="text-[11px] tracking-[0.2em] text-taupe uppercase">0{index + 1}</p>
                        <h2 className="mt-2 font-serif text-[1.5rem] leading-snug md:text-[1.65rem]">{method.title}</h2>
                        <ol className="mt-5 space-y-3">
                            {method.steps.map((step, stepIndex) => (
                                <li
                                    key={step}
                                    className="grid grid-cols-[1.5rem_1fr] gap-2 text-sm leading-relaxed text-ash"
                                >
                                    <span className="text-taupe tabular-nums">{stepIndex + 1}</span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ol>
                    </section>
                ))}
            </div>

            <p className="max-w-xl text-sm leading-relaxed text-ash">{sizeGuide.note}</p>

            <section aria-labelledby="ring-chart-title">
                <h2 id="ring-chart-title" className="font-serif text-2xl leading-tight">
                    {sizeGuide.chartTitle}
                </h2>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-ash">{sizeGuide.chartLead}</p>

                <div className="mt-8 max-w-sm">
                    <label htmlFor="around-mm" className="text-[11px] tracking-[0.18em] text-ash uppercase">
                        {sizeGuide.lookupLabel}
                    </label>
                    <div className="mt-2 flex items-stretch border border-charcoal/15 bg-white">
                        <input
                            id="around-mm"
                            inputMode="decimal"
                            placeholder={sizeGuide.lookupPlaceholder}
                            value={aroundInput}
                            onChange={(event) => setAroundInput(event.target.value)}
                            className="min-w-0 flex-1 px-3 py-2.5 text-[15px] tabular-nums outline-none"
                        />
                        <span className="flex items-center border-l border-charcoal/10 px-3 text-sm text-ash">mm</span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-ash">{sizeGuide.lookupHint}</p>
                    {nearest && hasAround ? (
                        <p className="mt-2 text-sm text-charcoal">
                            Closest chart row:{' '}
                            <strong className="font-medium whitespace-nowrap">
                                {nearest.circumference} mm around · {nearest.diameter.toFixed(1)} mm across · ~US{' '}
                                {nearest.us}
                            </strong>
                        </p>
                    ) : null}
                </div>

                <div className="relative mt-8 max-h-[min(24rem,55vh)] overflow-auto border border-charcoal/10 bg-white">
                    <table className="w-full min-w-[20rem] border-collapse text-left text-sm">
                        <thead className="sticky top-0 z-10 bg-ivory shadow-[0_1px_0_rgba(32,32,30,0.08)]">
                            <tr className="text-[11px] tracking-[0.14em] text-ash uppercase">
                                <th scope="col" className="px-4 py-3 font-medium">
                                    Around (mm)
                                </th>
                                <th scope="col" className="px-4 py-3 font-medium">
                                    Across (mm)
                                </th>
                                <th scope="col" className="px-4 py-3 font-medium text-right">
                                    US ref.
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {ringSizes.map((row) => {
                                const highlighted = hasAround && nearest?.circumference === row.circumference;
                                return (
                                    <tr
                                        key={row.circumference}
                                        role="button"
                                        tabIndex={0}
                                        aria-selected={highlighted}
                                        aria-label={`${row.circumference} millimetres around, ${row.diameter.toFixed(1)} across, US reference ${row.us}`}
                                        onClick={() => setAroundInput(String(row.circumference))}
                                        onKeyDown={(event) => {
                                            if (event.key === 'Enter' || event.key === ' ') {
                                                event.preventDefault();
                                                setAroundInput(String(row.circumference));
                                            }
                                        }}
                                        className={`cursor-pointer border-t border-charcoal/8 tabular-nums transition-colors hover:bg-charcoal/[0.04] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[-1px] focus-visible:outline-charcoal ${highlighted ? 'bg-champagne/25 hover:bg-champagne/30' : ''}`}
                                    >
                                        <td className="px-4 py-2.5">{row.circumference} mm</td>
                                        <td className="px-4 py-2.5 text-ash">{row.diameter.toFixed(1)} mm</td>
                                        <td className="px-4 py-2.5 text-right text-ash">~{row.us}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="border-t border-charcoal/10 pt-12" aria-labelledby="bracelet-title">
                <p className="eyebrow mb-2">{sizeGuide.bracelet.eyebrow}</p>
                <h2 id="bracelet-title" className="font-serif text-2xl leading-tight">
                    {sizeGuide.bracelet.title}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-ash">{sizeGuide.bracelet.lead}</p>
                <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-start">
                    <div className="relative aspect-[4/3] overflow-hidden bg-charcoal/5 lg:col-span-5">
                        <Image
                            src={sizeGuide.bracelet.image.src}
                            alt={sizeGuide.bracelet.image.alt}
                            fill
                            sizes="(min-width: 1024px) 360px, 100vw"
                            className="object-cover"
                        />
                    </div>
                    <div className="lg:col-span-7">
                        <ol className="space-y-2 text-sm leading-relaxed text-ash">
                            {sizeGuide.bracelet.measureSteps.map((step, index) => (
                                <li key={step} className="grid grid-cols-[1.5rem_1fr] gap-2">
                                    <span className="text-taupe">{index + 1}</span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ol>
                        <p className="mt-6 text-[11px] tracking-[0.14em] text-taupe uppercase">
                            {sizeGuide.bracelet.chartTitle}
                        </p>
                        <ul className="mt-3 divide-y divide-charcoal/10 border border-charcoal/10 bg-white">
                            {braceletSizes.map((row) => (
                                <li
                                    key={row.wrist}
                                    className="grid grid-cols-[5rem_1fr] gap-3 px-4 py-3 text-sm sm:grid-cols-[6rem_1fr]"
                                >
                                    <span className="tabular-nums text-charcoal">{row.wrist} mm</span>
                                    <span className="text-ash">{row.fit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <div className="border-t border-charcoal/10 pt-10">
                <p className="max-w-md text-sm leading-relaxed text-ash">
                    {hasAround
                        ? `Ready to confirm ${aroundMm} mm with us?`
                        : 'Measured? Send us the number — we reply on WhatsApp.'}
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Button
                        href={whatsappHref(whatsappMessage)}
                        external
                        variant="primary"
                        className="w-full sm:w-auto"
                    >
                        {site.contact.whatsappLabel}
                    </Button>
                    <Button href={paths.contact} variant="secondary" className="w-full sm:w-auto">
                        Contact
                    </Button>
                </div>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[11px] tracking-[0.16em] uppercase">
                    <Link href={`${paths.collections}/rings`} className="text-charcoal hover:text-ash">
                        {sizeGuide.cta.shopRings}
                    </Link>
                    <Link href={`${paths.collections}/bracelets`} className="text-charcoal hover:text-ash">
                        {sizeGuide.cta.shopBracelets}
                    </Link>
                    <Link href={paths.shop} className="text-ash hover:text-charcoal">
                        All pieces
                    </Link>
                </div>
            </div>
        </div>
    );
}
