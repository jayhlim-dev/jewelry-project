const shell = 'mx-auto w-full max-w-[90rem] px-5 md:px-10 lg:px-14';

function SectionHeaderSkeleton() {
    return (
        <div className="mb-4 flex items-baseline justify-between" aria-hidden="true">
            <div className="h-4 w-28 rounded-sm bg-charcoal/8" />
            <div className="h-3 w-14 rounded-sm bg-charcoal/8" />
        </div>
    );
}

function ProductCardSkeleton() {
    return (
        <div>
            <div className="aspect-square rounded-lg bg-[#f3f3f3]" />
            <div className="pt-5">
                <div className="h-[15px] w-1/4 rounded-sm bg-charcoal/8" />
                <div className="mt-2 h-6 w-3/4 rounded-sm bg-charcoal/8" />
                <div className="mt-2 h-[18px] w-1/2 rounded-sm bg-charcoal/8" />
            </div>
        </div>
    );
}

function CampaignRowSkeleton({ titleWidth = 'w-36' }) {
    return (
        <section className="bg-white py-8 md:py-10" aria-hidden="true">
            <div className={shell}>
                <div className="mb-4 flex items-baseline justify-between">
                    <div className={`h-4 ${titleWidth} rounded-sm bg-charcoal/8`} />
                    <div className="h-3 w-14 rounded-sm bg-charcoal/8" />
                </div>
                <ul className="grid grid-cols-2 gap-x-3 gap-y-5 md:grid-cols-4 md:gap-x-4">
                    {Array.from({ length: 4 }, (_, i) => (
                        <li key={i}>
                            <ProductCardSkeleton />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

/** Homepage: hero, intro, collections, product rails, signature. */
export function HomePageSkeleton() {
    return (
        <div className="flex flex-col bg-white" role="status" aria-busy="true" aria-label="Loading homepage">
            <section className="relative h-[85svh] min-h-[26rem] overflow-hidden bg-charcoal">
                <div
                    className="absolute inset-0 animate-pulse bg-gradient-to-br from-charcoal via-[#2a2826] to-charcoal motion-reduce:animate-none"
                    aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/50 via-charcoal/20 to-transparent" aria-hidden="true" />
                <div
                    className={`relative flex h-full flex-col justify-end pb-10 md:pb-14 lg:pb-16 ${shell} animate-pulse motion-reduce:animate-none`}
                    aria-hidden="true"
                >
                    <div className="h-3 w-32 rounded-sm bg-ivory/20" />
                    <div className="mt-3 h-12 w-56 max-w-[16ch] rounded-sm bg-ivory/25 md:h-14" />
                    <div className="mt-3 h-4 w-48 max-w-xs rounded-sm bg-ivory/15" />
                    <div className="mt-7 h-11 w-32 rounded-sm bg-ivory/20" />
                </div>
            </section>

            <section className="bg-white px-5 py-8 text-center md:py-10" aria-hidden="true">
                <div className="mx-auto max-w-md animate-pulse motion-reduce:animate-none">
                    <div className="mx-auto h-9 w-4/5 max-w-sm rounded-sm bg-charcoal/8 md:h-10" />
                    <div className="mx-auto mt-2 h-4 w-full rounded-sm bg-charcoal/8" />
                    <div className="mx-auto mt-2 h-4 w-5/6 rounded-sm bg-charcoal/8" />
                </div>
            </section>

            <div className="flex flex-col gap-4 bg-white">
                <section aria-hidden="true">
                    <div className={`${shell} animate-pulse pb-2 motion-reduce:animate-none`}>
                        <SectionHeaderSkeleton />
                        <ul className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-2.5">
                            {Array.from({ length: 4 }, (_, i) => (
                                <li key={i}>
                                    <div className="aspect-[3/4] rounded-lg bg-[#f3f3f3]" />
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <CampaignRowSkeleton titleWidth="w-36" />

                <section aria-hidden="true">
                    <div className="grid animate-pulse items-center motion-reduce:animate-none md:grid-cols-[minmax(16rem,2fr)_minmax(0,3fr)]">
                        <div className="mx-auto max-w-sm px-6 py-10 text-center md:px-10 md:py-12">
                            <div className="mx-auto h-3 w-20 rounded-sm bg-charcoal/8" />
                            <div className="mx-auto mt-4 h-10 w-full rounded-sm bg-charcoal/8" />
                            <div className="mx-auto mt-4 h-4 w-full rounded-sm bg-charcoal/8" />
                            <div className="mx-auto mt-2 h-4 w-11/12 rounded-sm bg-charcoal/8" />
                            <div className="mx-auto mt-5 h-3 w-28 rounded-sm bg-charcoal/8" />
                        </div>
                        <div>
                            <div className="aspect-[3/2] bg-[#f3f1ee]" />
                            <div className="flex items-center gap-4 px-4 py-3">
                                <div className="flex gap-1.5">
                                    <div className="h-1.5 w-5 rounded-full bg-charcoal/20" />
                                    <div className="h-1.5 w-1.5 rounded-full bg-charcoal/15" />
                                    <div className="h-1.5 w-1.5 rounded-full bg-charcoal/15" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <CampaignRowSkeleton titleWidth="w-24" />
            </div>
        </div>
    );
}
