import { Container } from 'components/ui/Container';

/** Mirrors `/shop/[slug]`: breadcrumb, ProductStage (gallery + summary), detail block. */
export function ProductPageSkeleton() {
    return (
        <article className="pb-20" role="status" aria-busy="true" aria-label="Loading product">
            <Container className="pt-6 md:pt-8">
                <div className="animate-pulse motion-reduce:animate-none" aria-hidden="true">
                    <div className="flex flex-wrap gap-2">
                        <div className="h-3 w-10 rounded-sm bg-charcoal/8" />
                        <div className="h-3 w-8 rounded-sm bg-charcoal/8" />
                        <div className="h-3 w-16 rounded-sm bg-charcoal/8" />
                        <div className="h-3 w-24 rounded-sm bg-charcoal/8" />
                    </div>

                    <div className="mt-6 grid items-start gap-8 lg:mt-8 lg:grid-cols-12 lg:gap-10">
                        <div className="lg:col-span-7">
                            <div className="aspect-square w-full rounded-lg bg-[#f3f3f3]" />
                            <div className="mt-3 flex gap-2">
                                <div className="h-14 w-14 rounded-md bg-[#f3f3f3]" />
                                <div className="h-14 w-14 rounded-md bg-[#f3f3f3]" />
                                <div className="h-14 w-14 rounded-md bg-[#f3f3f3]" />
                            </div>
                        </div>
                        <div className="lg:col-span-5">
                            <div className="h-3 w-16 rounded-sm bg-charcoal/8" />
                            <div className="mt-4 h-9 w-4/5 max-w-sm rounded-sm bg-charcoal/8" />
                            <div className="mt-3 h-5 w-3/5 rounded-sm bg-charcoal/8" />
                            <div className="mt-6 h-11 w-full max-w-xs rounded-sm bg-charcoal/8" />
                            <div className="mt-4 flex gap-2">
                                <div className="h-9 w-16 rounded-md bg-charcoal/8" />
                                <div className="h-9 w-16 rounded-md bg-charcoal/8" />
                                <div className="h-9 w-16 rounded-md bg-charcoal/8" />
                            </div>
                            <div className="mt-8 h-12 w-full rounded-sm bg-charcoal/12" />
                        </div>
                    </div>

                    <div className="mt-16 border-t border-charcoal/10 pt-10">
                        <div className="h-3 w-28 rounded-sm bg-charcoal/8" />
                        <div className="mt-6 space-y-3">
                            <div className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-charcoal/8 py-3">
                                <div className="h-3 w-20 rounded-sm bg-charcoal/8" />
                                <div className="h-4 w-full max-w-sm rounded-sm bg-charcoal/8" />
                            </div>
                            <div className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-charcoal/8 py-3">
                                <div className="h-3 w-16 rounded-sm bg-charcoal/8" />
                                <div className="h-4 w-2/3 max-w-xs rounded-sm bg-charcoal/8" />
                            </div>
                            <div className="grid grid-cols-[7.5rem_1fr] gap-4 py-3">
                                <div className="h-3 w-24 rounded-sm bg-charcoal/8" />
                                <div className="h-4 w-1/2 max-w-[12rem] rounded-sm bg-charcoal/8" />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </article>
    );
}
