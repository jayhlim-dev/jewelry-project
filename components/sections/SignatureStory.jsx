'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from 'data/products';
import { paths } from 'data/site';

const slides = [
    {
        slug: 'celeste-stack',
        text: 'Three low bands meant to be worn together. The gold is textured, with small round, heart, and bar motifs on the bands. Yellow gold is the metal shown. White gold can be asked.'
    },
    {
        slug: 'orla-link',
        text: 'A light link bracelet with a small clasp. The links are gold, shown close on the wrist. Yellow gold is the metal shown. Rose gold can be asked.'
    },
    {
        slug: 'noor-collar',
        text: 'A closer gold collar, more ornate than a simple chain. Red stones are set through the collar. Yellow gold is the metal shown.'
    }
];

export function SignatureStory() {
    const [index, setIndex] = useState(0);
    const slide = slides[index];
    const product = products.find((item) => item.slug === slide.slug);
    if (!product) return null;
    const image = product.images[0];

    const go = (step) => {
        setIndex((current) => (current + step + slides.length) % slides.length);
    };

    return (
        <section className="bg-white" aria-label="Signature">
            <div className="grid items-center md:grid-cols-[minmax(16rem,2fr)_minmax(0,3fr)]">
                <div className="mx-auto max-w-sm px-6 py-10 text-center md:px-10 md:py-12">
                    <p className="text-[11px] tracking-[0.22em] text-taupe uppercase">Signature</p>
                    <h2 className="mt-4 font-serif text-[1.85rem] leading-tight font-normal text-champagne md:text-[2.15rem]">“{product.name}”</h2>
                    <p className="mt-4 text-sm leading-7 text-ash">{slide.text}</p>
                    <Link
                        href={`${paths.shop}/${product.slug}`}
                        className="mt-5 inline-flex border-b border-charcoal/30 pb-1 text-[11px] tracking-[0.18em] uppercase hover:border-charcoal"
                    >
                        See the piece
                    </Link>
                </div>
                <div>
                    <div className="relative aspect-[3/2] overflow-hidden bg-[#f3f1ee]">
                        <Image key={image.src} src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover object-center" />
                    </div>
                    <div className="flex items-center justify-end gap-4 px-4 py-3">
                        <div className="flex gap-1.5" role="tablist" aria-label="Signature pieces">
                            {slides.map((item, itemIndex) => (
                                <button
                                    key={item.slug}
                                    type="button"
                                    role="tab"
                                    aria-selected={itemIndex === index}
                                    aria-label={`Show ${item.slug.replaceAll('-', ' ')}`}
                                    onClick={() => setIndex(itemIndex)}
                                    className={`h-1.5 w-1.5 rounded-full ${itemIndex === index ? 'bg-charcoal' : 'bg-charcoal/25'}`}
                                />
                            ))}
                        </div>
                        <button type="button" aria-label="Previous signature piece" onClick={() => go(-1)} className="text-sm text-ash hover:text-charcoal">
                            ‹
                        </button>
                        <button type="button" aria-label="Next signature piece" onClick={() => go(1)} className="text-sm text-ash hover:text-charcoal">
                            ›
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
