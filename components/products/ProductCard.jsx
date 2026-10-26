'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { paths } from 'data/site';
import { HoverImage } from 'components/ui/HoverImage';

function Chevron({ direction }) {
    const path = direction === 'left' ? 'M14.5 6.5 9 12l5.5 5.5' : 'M9.5 6.5 15 12l-5.5 5.5';

    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
            <path d={path} stroke="currentColor" strokeWidth="1.25" />
        </svg>
    );
}

export function ProductCard({ product, titleAs = 'h3', priority = false }) {
    const Title = titleAs;
    const images = product.images;
    const many = images.length > 1;
    const href = `${paths.shop}/${product.slug}`;
    const [index, setIndex] = useState(0);

    const go = (step) => {
        setIndex((current) => (current + step + images.length) % images.length);
    };

    const details = (
        <div className="pt-5">
            <p className="text-[10px] tracking-[0.22em] text-taupe uppercase">{product.category}</p>
            <Title className="mt-2 font-serif text-[1.05rem] leading-tight font-normal md:text-[1.2rem]">
                {product.name}
            </Title>
            <p className="mt-2 text-xs tracking-wide text-ash/80">
                {product.metal}
                {product.diamondShape ? ` · ${product.diamondShape}` : ''}
                {product.available ? '' : ' · Unavailable'}
            </p>
        </div>
    );

    const showDetail = false;

    return (
        <article className="group/card">
            <div className="group relative aspect-square overflow-hidden bg-[#f3f3f3] rounded-lg">
                {many ? (
                    images.map((image, imageIndex) => (
                        <Image
                            key={`${image.src}-${imageIndex}`}
                            src={image.src}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 25vw, 50vw"
                            priority={priority && imageIndex === 0}
                            aria-hidden="true"
                            className={`object-cover transition duration-700 ease-out group-hover/card:scale-[1.12] motion-reduce:transition-none motion-reduce:group-hover/card:scale-100 ${
                                imageIndex === index ? 'opacity-100' : 'opacity-0'
                            }`}
                        />
                    ))
                ) : (
                    <HoverImage
                        src={images[0].src}
                        alt={images[0].alt}
                        className="absolute inset-0"
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        priority={priority}
                        zoomClass="group-hover/card:scale-[1.12]"
                    />
                )}
                <Link href={href} className="absolute inset-0 z-10" aria-label={product.name} />
                {many ? (
                    <>
                        <button
                            type="button"
                            aria-label={`Previous photograph of ${product.name}`}
                            onClick={() => go(-1)}
                            className="absolute top-1/2 left-3 z-20 flex h-9 w-9 -translate-x-2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-charcoal opacity-0 shadow-[0_8px_24px_rgba(32,32,30,0.12)] transition duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100 focus-visible:translate-x-0 focus-visible:opacity-100 motion-reduce:transition-none"
                        >
                            <Chevron direction="left" />
                        </button>
                        <button
                            type="button"
                            aria-label={`Next photograph of ${product.name}`}
                            onClick={() => go(1)}
                            className="absolute top-1/2 right-3 z-20 flex h-9 w-9 translate-x-2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-charcoal opacity-0 shadow-[0_8px_24px_rgba(32,32,30,0.12)] transition duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100 focus-visible:translate-x-0 focus-visible:opacity-100 motion-reduce:transition-none"
                        >
                            <Chevron direction="right" />
                        </button>
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[3px] origin-left scale-x-0 bg-white/50 opacity-0 transition duration-500 ease-out group-hover:scale-x-100 group-hover:opacity-100 motion-reduce:transition-none">
                            <div
                                className="h-full bg-charcoal transition-[width] duration-500 ease-out motion-reduce:transition-none"
                                style={{ width: `${((index + 1) / images.length) * 100}%` }}
                            />
                        </div>
                    </>
                ) : null}
            </div>

            {showDetail && (
                <Link href={href} className="block">
                    {details}
                </Link>
            )}
        </article>
    );
}
