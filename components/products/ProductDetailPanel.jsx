import Link from 'next/link';
import { getContent } from 'lib/content';
import { formatMetalLabel, formatStoneLine } from 'lib/format';
import { productMaterialLines } from 'lib/productMaterials';
import { hasSpecificationSheet, shouldShowSpecifications } from 'lib/productSpecs';
import { ProductSpecificationSheet } from 'components/products/ProductSpecificationSheet';

function SpecFact({ label, value }) {
    if (!value) return null;
    return (
        <div className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-charcoal/8 py-3 text-sm last:border-b-0">
            <dt className="text-[11px] tracking-[0.16em] text-taupe uppercase">{label}</dt>
            <dd className="text-charcoal/90">{value}</dd>
        </div>
    );
}

function InquiryStrip({ needsSize, compact = false, paths }) {
    const className = compact
        ? 'mt-6 flex flex-col gap-3 border-t border-charcoal/10 pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between'
        : '';

    const inner = (
        <>
            <p className={`text-sm leading-relaxed text-ash ${compact ? 'max-w-xl' : ''}`}>
                Confirm metal, grades, size, and availability on WhatsApp before you decide. Nothing is reserved until we
                reply.
            </p>
            <div className={`flex flex-wrap gap-x-5 gap-y-2 ${compact ? '' : 'mt-8'}`}>
                {needsSize ? (
                    <Link
                        href={paths.sizeGuide}
                        className="text-[11px] font-medium tracking-[0.16em] text-charcoal uppercase underline-offset-4 hover:underline"
                    >
                        Size guide
                    </Link>
                ) : null}
                <Link
                    href={paths.contact}
                    className="text-[11px] font-medium tracking-[0.16em] text-ash uppercase underline-offset-4 hover:text-charcoal hover:underline"
                >
                    Contact
                </Link>
            </div>
        </>
    );

    if (compact) {
        return <div className={className}>{inner}</div>;
    }

    return (
        <aside className="lg:col-span-5">
            <div className="border border-charcoal/12 bg-white p-6 sm:p-8">
                <p className="eyebrow mb-2">Before you inquire</p>
                {inner}
            </div>
        </aside>
    );
}

function descriptionAddsDetail(summary, description) {
    if (!description?.trim()) return false;
    const a = summary?.trim().toLowerCase();
    const b = description.trim().toLowerCase();
    return b !== a && !b.startsWith(a);
}

export async function ProductDetailPanel({ product }) {
    const { site } = await getContent();
    const paths = site.paths;
    const materials = productMaterialLines(product);
    const showSpecs = shouldShowSpecifications(product);
    const sheet = hasSpecificationSheet(product);
    const stoneLines = (product.stones || []).map(formatStoneLine).filter(Boolean);
    const stonesSummary = stoneLines.length ? stoneLines.join(' · ') : product.diamondShape || '';
    const needsSize = product.category === 'Rings';
    const extraDescription = descriptionAddsDetail(product.summary, product.description) ? product.description : null;

    if (sheet) {
        return (
            <section className="mt-10 border-t border-charcoal/10 pt-8 md:mt-12 md:pt-10" aria-labelledby="piece-specification-sheet-heading">
                <ProductSpecificationSheet product={product} />
                {extraDescription ? (
                    <p className="mt-6 max-w-2xl text-sm leading-7 text-charcoal/90">{extraDescription}</p>
                ) : null}
                <InquiryStrip needsSize={needsSize} compact paths={paths} />
            </section>
        );
    }

    return (
        <section className="mt-10 border-t border-charcoal/10 pt-8 md:mt-12 md:pt-10" aria-labelledby="piece-detail-heading">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-7">
                    <p className="eyebrow mb-3">The piece</p>
                    <h2 id="piece-detail-heading" className="type-title text-balance">
                        About this piece
                    </h2>
                    {product.description ? (
                        <p className="mt-6 max-w-2xl text-[17px] leading-8 text-charcoal/90">{product.description}</p>
                    ) : (
                        <p className="mt-6 max-w-2xl text-sm leading-7 text-ash">{product.summary}</p>
                    )}

                    {!showSpecs ? (
                        <dl className="mt-10 border border-charcoal/10 bg-white p-5 sm:p-6">
                            <SpecFact label="Metal" value={formatMetalLabel(product.metal)} />
                            {product.fineness ? <SpecFact label="Fineness" value={product.fineness} /> : null}
                            {stonesSummary ? <SpecFact label="Stones" value={stonesSummary} /> : null}
                            <SpecFact
                                label="Availability"
                                value={product.available ? 'In stock — confirm on inquiry' : 'Currently unavailable'}
                            />
                        </dl>
                    ) : null}

                    {materials.length ? (
                        <div className="mt-10">
                            <h3 className="text-[11px] tracking-[0.18em] text-taupe uppercase">From the photograph</h3>
                            <ul className="mt-4 space-y-2 border-l border-champagne pl-5">
                                {materials.map((line) => (
                                    <li key={line} className="text-sm leading-relaxed text-ash">
                                        {line}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : null}
                </div>

                <InquiryStrip needsSize={needsSize} paths={paths} />
            </div>
        </section>
    );
}
