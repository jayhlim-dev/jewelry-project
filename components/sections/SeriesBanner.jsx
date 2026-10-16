'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from 'data/products';
import { paths } from 'data/site';
import { ProductCard } from 'components/products/ProductCard';

const slides = ['rosa-cushion', 'celeste-stack', 'orla-link'];

export function SeriesBanner() {
    const [index, setIndex] = useState(0);
    const slug = slides[index];
    const product = products.find((item) => item.slug === slug);
    if (!product) return null;
    const image = product.images[0];

    const go = (step) => {
        setIndex((current) => (current + step + slides.length) % slides.length);
    };

    return (
        <section className="relative min-h-[78vh] bg-[#cbb7a4] text-ivory" aria-label="Series">
            <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/45 via-charcoal/10 to-transparent" />
            <div className="relative mx-auto flex min-h-[78vh] w-full max-w-[90rem] flex-col justify-end gap-5 px-5 py-8 md:flex-row md:items-end md:justify-between md:px-10 md:py-8 lg:px-14">
                <div className="max-w-sm">
                    <h2 className="font-serif text-[1.7rem] leading-tight font-normal md:text-[2rem]">{product.name}</h2>
                    <p className="mt-2 text-sm leading-6 text-ivory/85">{product.summary}</p>
                    <Link href={`${paths.shop}/${product.slug}`} className="mt-4 inline-flex bg-white/85 px-5 py-3 text-[11px] tracking-[0.16em] text-charcoal uppercase">
                        See the piece
                    </Link>
                </div>
                <div className="flex w-full flex-col items-end gap-3 sm:w-64">
                    <div className="w-full bg-ivory p-3 text-charcoal">
                        <ProductCard key={product.slug} product={product} />
                    </div>
                    <div className="flex items-center gap-2">
                        <button type="button" aria-label="Previous series piece" onClick={() => go(-1)} className="flex h-8 w-8 items-center justify-center bg-ivory text-lg text-charcoal">
                            ‹
                        </button>
                        <button type="button" aria-label="Next series piece" onClick={() => go(1)} className="flex h-8 w-8 items-center justify-center bg-ivory text-lg text-charcoal">
                            ›
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
