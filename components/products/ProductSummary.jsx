'use client';

import { site } from 'data/site';
import { Button } from 'components/ui/Button';
import { formatPriceRange, formatStoneLine, stoneFootnote } from 'lib/format';
import { useInquiry } from 'components/layout/InquiryProvider';

const metalSwatch = {
    'White Gold': '#e4e2dc',
    'Yellow Gold': '#c6a15b',
    'Rose Gold': '#c4897a'
};

function photographNotes(product) {
    return product.materials.filter((line) => {
        const text = line.toLowerCase();
        if (text.startsWith('sample metal')) return false;
        if (text.startsWith('sample clasp')) return false;
        if (text.startsWith('sample center shape')) return false;
        return true;
    });
}

export function ProductSummary({ product }) {
    const { add, has } = useInquiry();
    const saved = has(product.slug);
    const notes = photographNotes(product);
    const stoneLines = (product.stones || []).map(formatStoneLine).filter(Boolean);
    const footnote = stoneFootnote(product);
    const otherMetals = (product.metals || []).filter((metal) => metal !== product.metal);
    const pieceLabel = product.code ? `${product.name} (${product.code})` : product.name;
    const whatsappText = `Hello, I would like to ask about ${pieceLabel} in ${product.metal}.`;
    const whatsappHref = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(whatsappText)}`;

    return (
        <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">{product.category}</p>
            <h1 className="mt-4 font-serif text-[2.75rem] leading-none font-normal text-balance md:text-[3.25rem]">{product.name}</h1>
            {product.code ? <p className="mt-4 text-[11px] tracking-[0.18em] text-taupe uppercase">Sample code {product.code}</p> : null}
            <p className="mt-5 max-w-sm font-serif text-xl leading-snug italic text-charcoal/80">{product.summary}</p>
            <p className="mt-8 font-serif text-[1.65rem] leading-none">{formatPriceRange(product)}</p>
            <p className="mt-3 text-xs tracking-wide text-ash">Shown on this page only. Not an offer to sell.</p>

            <p className="mt-8 max-w-md text-sm leading-7 text-ash">{product.description}</p>

            <dl className="mt-10 border-t border-charcoal/10">
                <div className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 border-b border-charcoal/10 py-4 text-sm">
                    <dt className="text-[11px] tracking-[0.18em] text-taupe uppercase">Metal</dt>
                    <dd>
                        <span className="inline-flex items-center gap-2">
                            <span
                                aria-hidden="true"
                                className="inline-block h-3.5 w-3.5 rounded-full border border-charcoal/20"
                                style={{ backgroundColor: metalSwatch[product.metal] || '#d8d4cc' }}
                            />
                            {product.metal}
                        </span>
                        {product.fineness ? (
                            <span className="mt-2 block text-xs leading-relaxed text-ash">A {product.fineness} mark is visible in the photograph.</span>
                        ) : null}
                        {otherMetals.length ? (
                            <span className="mt-2 block text-xs leading-relaxed text-ash">
                                {otherMetals.join(' and ')} {otherMetals.length > 1 ? 'are' : 'is'} named on this sample. The photograph shows {product.metal}.
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

            {notes.length ? (
                <div className="border-b border-charcoal/10 py-5">
                    <p className="text-[11px] tracking-[0.18em] text-taupe uppercase">In the photograph</p>
                    <ul className="mt-3 space-y-2">
                        {notes.map((note) => (
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
                        <Button className="w-full sm:w-auto" href={whatsappHref} external>
                            Inquire on WhatsApp
                        </Button>
                        <Button
                            variant="link"
                            onClick={() => add(product)}
                            disabled={saved}
                            ariaLabel={saved ? `${product.name} is already saved` : `Save ${product.name} for an inquiry`}
                        >
                            {saved ? 'Saved for inquiry' : 'Save for inquiry'}
                        </Button>
                    </>
                ) : (
                    <p className="max-w-sm text-sm leading-relaxed text-ash">
                        This sample is marked unavailable. Inquiry is turned off so the button is not a false promise.
                    </p>
                )}
            </div>
            <p className="mt-8 max-w-sm text-xs leading-relaxed text-ash">{site.placeholderNotice}</p>
        </div>
    );
}
