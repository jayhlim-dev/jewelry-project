'use client';

import { useContent } from 'components/layout/ContentProvider';
import { ProductGridSkeleton } from 'components/products/ProductGridSkeleton';
import { ShopHeader } from 'components/products/ShopHeader';
import { Container } from 'components/ui/Container';

/** Same two-column frame as ShopBrowser so the real grid replaces it without shifting. */
export function ShopBrowserSkeleton({ denseTop = false, showCategoryTabs = true }) {
    return (
        <Container className={denseTop ? 'overflow-x-clip pt-5 md:pt-6' : 'overflow-x-clip'}>
            {showCategoryTabs ? (
                <div className="flex gap-6 py-1" aria-hidden="true">
                    <div className="h-3 w-8 rounded-sm bg-charcoal/8" />
                    <div className="h-3 w-12 rounded-sm bg-charcoal/8" />
                    <div className="h-3 w-16 rounded-sm bg-charcoal/8" />
                </div>
            ) : null}
            <div
                className={`lg:grid lg:grid-cols-[17rem_minmax(0,1fr)] lg:items-start lg:gap-12 xl:grid-cols-[18rem_minmax(0,1fr)] xl:gap-16 ${
                    showCategoryTabs
                        ? denseTop
                            ? 'mt-5 lg:mt-6'
                            : 'mt-8 lg:mt-10'
                        : denseTop
                          ? 'mt-5 lg:mt-6'
                          : 'mt-8 lg:mt-9'
                }`}
            >
                <aside className="lg:pr-6 xl:pr-10">
                    <div className="flex items-center justify-between border-b border-charcoal/8 pb-4 lg:hidden" aria-hidden="true">
                        <div className="h-3 w-16 rounded-sm bg-charcoal/8" />
                        <div className="h-3 w-20 rounded-sm bg-charcoal/8" />
                    </div>
                    <div className="hidden space-y-5 lg:block" aria-hidden="true">
                        <div className="h-3 w-24 rounded-sm bg-charcoal/8" />
                        <div className="h-4 w-32 rounded-sm bg-charcoal/8" />
                        <div className="h-4 w-28 rounded-sm bg-charcoal/8" />
                    </div>
                </aside>
                <div className="pt-4 lg:pt-0">
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
