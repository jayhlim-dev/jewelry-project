import { ShopBrowserSkeleton } from 'components/products/ShopSkeleton';

/** `/collections/[slug]`: parallax-height banner + shop grid (no category tabs). */
export function CollectionPageSkeleton() {
    return (
        <div className="pb-14 md:pb-16" role="status" aria-busy="true" aria-label="Loading collection">
            <div className="relative h-[240px] overflow-hidden border-b border-charcoal/10 bg-[#f3f1ee] md:h-[320px]">
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[#e8e6e3] via-[#f3f1ee] to-[#eceae7] motion-reduce:animate-none" />
                <div className="mx-auto flex h-full w-full max-w-[90rem] flex-col justify-center px-5 md:px-10 lg:px-14">
                    <div className="animate-pulse motion-reduce:animate-none" aria-hidden="true">
                        <div className="h-3 w-48 rounded-sm bg-charcoal/10" />
                        <div className="mt-5 h-10 w-56 max-w-full rounded-sm bg-charcoal/10" />
                        <div className="mt-3 h-4 w-72 max-w-full rounded-sm bg-charcoal/8" />
                    </div>
                </div>
            </div>
            <ShopBrowserSkeleton denseTop showCategoryTabs={false} />
        </div>
    );
}
