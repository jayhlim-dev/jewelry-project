'use client';

import { useContent } from 'components/layout/ContentProvider';
import { ProductGridSkeleton } from 'components/products/ProductGridSkeleton';
import { ShopHeader } from 'components/products/ShopHeader';
import { Container } from 'components/ui/Container';

/** Same two-column frame as ShopBrowser so the real grid replaces it without shifting. */
export function ShopBrowserSkeleton() {
    return (
        <Container>
            <div className="mt-8 lg:mt-10 lg:grid lg:grid-cols-[17rem_minmax(0,1fr)] lg:items-start lg:gap-12 xl:grid-cols-[18rem_minmax(0,1fr)] xl:gap-16">
                <aside className="hidden lg:block lg:pr-6 xl:pr-10" aria-hidden="true" />
                <div className="pt-4 pb-8 lg:pt-0 lg:pb-2">
                    <ProductGridSkeleton />
                </div>
            </div>
        </Container>
    );
}

/** Route-level fallback for /shop: heading plus skeleton, shown while the page streams in. */
export function ShopSkeleton() {
    const { site } = useContent();

    return (
        <div className="pb-16">
            <ShopHeader paths={site.paths} />
            <ShopBrowserSkeleton />
        </div>
    );
}
