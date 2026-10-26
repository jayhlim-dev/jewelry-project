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
    const [cardOpen, setCardOpen] = useState(false);
    const slug = slides[index];
    const product = products.find((item) => item.slug === slug);
    if (!product) return null;
    const image = product.images[0];

    const go = (step) => {
        setIndex((current) => (current + step + slides.length) % slides.length);
        setCardOpen(false);
    };

    return (
        <section className="relative min-h-[78vh] overflow-hidden bg-[#cbb7a4] text-ivory" aria-label="Series">
            <Image
                key={image.src}
                src={image.src}
                alt=""
                fill
                sizes="100vw"
                priority
                aria-hidden="true"
                className="scale-125 object-cover object-center sm:scale-110 md:scale-100"
            />
            <div className="absolute inset-0 bg-charcoal/40 md:bg-gradient-to-r md:from-charcoal/55 md:via-charcoal/25 md:to-charcoal/15" />

            <div className="relative z-10 mx-auto flex min-h-[78vh] w-full max-w-[90rem] flex-col justify-end gap-5 px-5 py-8 md:flex-row md:items-end md:justify-between md:px-10 md:py-8 lg:px-14">
                <div className="max-w-sm">
                    <h2 className="font-serif text-[1.7rem] leading-tight font-normal md:text-[2rem]">{product.name}</h2>
                    <p className="mt-2 text-sm leading-6 text-ivory/85">{product.summary}</p>
                    <Link
                        href={`${paths.shop}/${product.slug}`}
                        className="mt-4 inline-flex bg-white/85 px-5 py-3 text-[11px] tracking-[0.16em] text-charcoal uppercase"
                    >
                        See the piece
                    </Link>
                </div>

                {/* Desktop: always show the product card */}
                <div className="hidden w-full flex-col items-end gap-3 sm:w-64 md:flex">
                    <div className="w-full bg-ivory p-3 text-charcoal">
                        <ProductCard key={product.slug} product={product} />
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            aria-label="Previous series piece"
                            onClick={() => go(-1)}
                            className="flex h-8 w-8 items-center justify-center bg-ivory text-lg text-charcoal"
                        >
                            ‹
                        </button>
                        <button
                            type="button"
                            aria-label="Next series piece"
                            onClick={() => go(1)}
                            className="flex h-8 w-8 items-center justify-center bg-ivory text-lg text-charcoal"
                        >
                            ›
                        </button>
                    </div>
                </div>

                {/* Mobile: arrows only in the bottom row */}
                <div className="flex items-center justify-end gap-2 md:hidden">
                    <button
                        type="button"
                        aria-label="Previous series piece"
                        onClick={() => go(-1)}
                        className="flex h-8 w-8 items-center justify-center bg-ivory text-lg text-charcoal"
                    >
                        ‹
                    </button>
                    <button
                        type="button"
                        aria-label="Next series piece"
                        onClick={() => go(1)}
                        className="flex h-8 w-8 items-center justify-center bg-ivory text-lg text-charcoal"
                    >
                        ›
                    </button>
                </div>
            </div>

            {/* Mobile: hotspot dot + optional product card */}
            <div className="absolute inset-0 z-20 md:hidden">
                {!cardOpen ? (
                    <button
                        type="button"
                        onClick={() => setCardOpen(true)}
                        aria-label={`Show ${product.name} card`}
                        className="absolute top-[42%] right-[18%] flex h-11 w-11 -translate-y-1/2 items-center justify-center"
                    >
                        <span className="absolute h-11 w-11 animate-ping rounded-full bg-white/35" aria-hidden="true" />
                        <span className="relative h-3.5 w-3.5 rounded-full bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.28)]" />
                    </button>
                ) : (
                    <>
                        <button
                            type="button"
                            aria-label="Close product card"
                            className="absolute inset-0 bg-charcoal/25"
                            onClick={() => setCardOpen(false)}
                        />
                        <div className="absolute top-1/2 right-5 left-5 z-10 -translate-y-1/2">
                            <div className="relative bg-ivory p-3 text-charcoal shadow-[0_20px_60px_rgba(32,32,30,0.28)]">
                                <ProductCard key={product.slug} product={product} />
                                <button
                                    type="button"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        setCardOpen(false);
                                    }}
                                    className="absolute top-2 right-2 z-30 flex h-9 w-9 items-center justify-center bg-white text-base leading-none text-charcoal shadow-[0_4px_16px_rgba(32,32,30,0.15)]"
                                    aria-label="Close"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
