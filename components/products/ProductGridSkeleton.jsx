'use client';

import { useContent } from 'components/layout/ContentProvider';
import { isCatalogPriceVisible } from 'lib/features';
import { cn } from 'lib/format';

export const PRODUCT_SKELETON_COUNT = 4;

/** Mirrors ProductCard: square image, then category, title, optional price, and metal lines. */
function ProductCardSkeleton({ showPrice }) {
    return (
        <div>
            <div className="aspect-square rounded-lg bg-[#f3f3f3]" />
            <div className="pt-5">
                <div className="h-[15px] w-1/4 rounded-sm bg-charcoal/8" />
                <div className="mt-2 h-6 w-3/4 rounded-sm bg-charcoal/8 md:h-[1.5rem]" />
                {showPrice ? <div className="mt-2 h-[20px] w-1/3 rounded-sm bg-charcoal/8" /> : null}
                <div className={cn('h-[18px] w-1/2 rounded-sm bg-charcoal/8', showPrice ? 'mt-1.5' : 'mt-2')} />
            </div>
        </div>
    );
}

/** Always exactly four placeholder cards, laid out with the same grid as ProductGrid. */
export function ProductGridSkeleton({ className = 'lg:grid-cols-3' }) {
    const { site } = useContent();
    const showPrice = isCatalogPriceVisible(site.features);

    return (
        <ul
            className={cn(
                'grid animate-pulse grid-cols-2 gap-x-3 gap-y-3 motion-reduce:animate-none md:gap-x-5 md:gap-y-5',
                className
            )}
            role="status"
            aria-busy="true"
            aria-label="Loading pieces"
        >
            {Array.from({ length: PRODUCT_SKELETON_COUNT }, (_, index) => (
                <li key={index} aria-hidden="true">
                    <ProductCardSkeleton showPrice={showPrice} />
                </li>
            ))}
        </ul>
    );
}
