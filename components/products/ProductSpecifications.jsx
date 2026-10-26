import Link from 'next/link';
import { paths } from 'data/site';
import { formatMetalLabel } from 'lib/format';
import {
    computeTotalStoneCount,
    effectiveTotalCaratWeight,
    formatCaratWeight,
    formatStoneMeasurements,
    formatTotalCaratWeight,
    shouldShowAdvancedGrading,
    shouldShowSpecifications,
    specificationsFootnote,
    sortStonesForDisplay,
    stoneCaratEach,
    stoneTableLabel,
    stonesWithAdvancedDetails
} from 'lib/productSpecs';

function SpecRow({ label, children }) {
    if (!children) return null;
    return (
        <div className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-charcoal/8 py-3 text-sm last:border-b-0">
            <dt className="text-[11px] tracking-[0.16em] text-taupe uppercase">{label}</dt>
            <dd className="text-charcoal/90">{children}</dd>
        </div>
    );
}

function cell(value, fallback = '—') {
    if (value == null || value === '') return <span className="text-ash">{fallback}</span>;
    return value;
}

function CertificateBadge({ certificate }) {
    if (!certificate?.lab && !certificate?.number) return null;
    const label = [certificate.lab, certificate.number].filter(Boolean).join(' · ');

    return (
        <div className="mt-4 flex flex-col gap-3 border border-charcoal/12 bg-[#f7f5f1] px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <p className="text-[10px] font-medium tracking-[0.22em] text-taupe uppercase">Certified</p>
                <p className="mt-1 text-sm text-charcoal">{label || 'Grading report on file'}</p>
            </div>
            {certificate.url ? (
                <a
                    href={certificate.url}
                    className="inline-flex min-h-10 items-center justify-center border border-charcoal/20 bg-white px-4 text-[11px] tracking-[0.14em] text-charcoal uppercase transition-colors hover:border-charcoal/40"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View report
                </a>
            ) : null}
        </div>
    );
}

function AdvancedGrading({ product }) {
    if (!shouldShowAdvancedGrading(product)) return null;

    const stones = stonesWithAdvancedDetails(product.stones);

    return (
        <details className="group mt-5 border-t border-charcoal/10 pt-4">
            <summary className="cursor-pointer list-none text-[11px] tracking-[0.16em] text-taupe uppercase [&::-webkit-details-marker]:hidden">
                <span className="inline-flex min-h-10 items-center gap-2">
                    <span className="text-charcoal/50 transition group-open:rotate-90" aria-hidden="true">
                        ›
                    </span>
                    Advanced grading
                </span>
            </summary>
            <div className="mt-3 space-y-4">
                {stones.map((stone, index) => {
                    const measurements = formatStoneMeasurements(stone);
                    const title = stoneTableLabel(stone);
                    const key = `${title}-advanced-${index}`;
                    return (
                        <dl key={key} className="border border-charcoal/8 bg-ivory/40 p-4">
                            <dt className="text-[11px] tracking-[0.14em] text-ash uppercase">{title}</dt>
                            <dd className="mt-3 space-y-2 text-sm">
                                {measurements ? (
                                    <div className="flex justify-between gap-4 border-b border-charcoal/6 pb-2">
                                        <span className="text-ash">Measurements</span>
                                        <span className="text-right text-charcoal/90">{measurements}</span>
                                    </div>
                                ) : null}
                                {stone.polish ? (
                                    <div className="flex justify-between gap-4 border-b border-charcoal/6 pb-2">
                                        <span className="text-ash">Polish</span>
                                        <span className="text-charcoal/90">{stone.polish}</span>
                                    </div>
                                ) : null}
                                {stone.symmetry ? (
                                    <div className="flex justify-between gap-4 border-b border-charcoal/6 pb-2">
                                        <span className="text-ash">Symmetry</span>
                                        <span className="text-charcoal/90">{stone.symmetry}</span>
                                    </div>
                                ) : null}
                                {stone.fluorescence ? (
                                    <div className="flex justify-between gap-4">
                                        <span className="text-ash">Fluorescence</span>
                                        <span className="text-charcoal/90">{stone.fluorescence}</span>
                                    </div>
                                ) : null}
                            </dd>
                        </dl>
                    );
                })}
            </div>
        </details>
    );
}

export function ProductSpecifications({ product, metal }) {
    if (!shouldShowSpecifications(product)) return null;

    const specs = product.specs || {};
    const stones = sortStonesForDisplay(product.stones || []);
    const shownMetal = metal || product.metal;
    const metalLine = [formatMetalLabel(shownMetal), product.fineness].filter(Boolean).join(' · ');
    const tdw = effectiveTotalCaratWeight(product);
    const stoneCount = computeTotalStoneCount(stones);
    const showTable = stones.some((stone) => stone.count || stone.shape || stoneCaratEach(stone) != null || stone.color || stone.clarity || stone.cut);
    const footnote = specificationsFootnote(product);
    const certificate = specs.certificate;
    const showCertBadge = Boolean(certificate?.lab || certificate?.number);

    return (
        <section className="mt-10 border border-charcoal/12 bg-white p-5 sm:p-6" aria-labelledby="piece-specifications-heading">
            <h2 id="piece-specifications-heading" className="text-[11px] tracking-[0.18em] text-taupe uppercase">
                Specifications
            </h2>

            {showCertBadge ? <CertificateBadge certificate={certificate} /> : null}

            <dl className="mt-4">
                <SpecRow label="Metal">{metalLine}</SpecRow>
                {specs.composition ? <SpecRow label="Piece">{specs.composition}</SpecRow> : null}
                {specs.stoneType ? <SpecRow label="Stones">{specs.stoneType}</SpecRow> : null}
                {specs.setting ? <SpecRow label="Setting">{specs.setting}</SpecRow> : null}
                {specs.bandWidthMm ? <SpecRow label="Band width">{specs.bandWidthMm} mm</SpecRow> : null}
                {tdw ? <SpecRow label="Total weight">{formatTotalCaratWeight(tdw)}</SpecRow> : null}
                {stoneCount ? <SpecRow label="Stone count">{stoneCount} stones</SpecRow> : null}
            </dl>

            {showTable ? (
                <div className="mt-5 overflow-x-auto border-t border-charcoal/10 pt-4">
                    <p className="text-[11px] tracking-[0.16em] text-taupe uppercase">Diamond breakdown</p>
                    <table className="mt-3 w-full min-w-[32rem] border-collapse text-left text-sm">
                        <thead>
                            <tr className="border-b border-charcoal/10 text-[10px] tracking-[0.14em] text-ash uppercase">
                                <th className="pb-2 pr-3 font-medium">Stones</th>
                                <th className="pb-2 pr-3 font-medium">Qty</th>
                                <th className="pb-2 pr-3 font-medium">Shape</th>
                                <th className="pb-2 pr-3 font-medium">Each</th>
                                <th className="pb-2 pr-3 font-medium">Color</th>
                                <th className="pb-2 pr-3 font-medium">Clarity</th>
                                <th className="pb-2 font-medium">Cut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stones.map((stone, index) => {
                                const each = stoneCaratEach(stone);
                                const key = `${stoneTableLabel(stone)}-${index}`;
                                return (
                                    <tr key={key} className="border-b border-charcoal/8 text-charcoal/90 last:border-b-0">
                                        <td className="py-2.5 pr-3 align-top">{stoneTableLabel(stone)}</td>
                                        <td className="py-2.5 pr-3 tabular-nums align-top">{cell(stone.count)}</td>
                                        <td className="py-2.5 pr-3 align-top">{cell(stone.shape)}</td>
                                        <td className="py-2.5 pr-3 align-top">{each != null ? formatCaratWeight(each) : cell()}</td>
                                        <td className="py-2.5 pr-3 align-top">{cell(stone.color)}</td>
                                        <td className="py-2.5 pr-3 align-top">{cell(stone.clarity)}</td>
                                        <td className="py-2.5 align-top">{cell(stone.cut)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : null}

            <AdvancedGrading product={product} />

            <p className="mt-4 text-xs leading-relaxed text-ash">{footnote}</p>
            <p className="mt-2 text-xs leading-relaxed text-ash">
                <Link href={`${paths.articles}/reading-a-piece-specification`} className="underline-offset-4 hover:text-charcoal hover:underline">
                    How to read a specification
                </Link>
                <span className="mx-2 text-ash">·</span>
                <Link href={`${paths.articles}/understanding-diamond-certification`} className="underline-offset-4 hover:text-charcoal hover:underline">
                    Certification
                </Link>
            </p>
        </section>
    );
}
