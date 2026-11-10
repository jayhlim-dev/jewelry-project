import { Container } from 'components/ui/Container';

/** `/size-guide`. */
export function SizeGuidePageSkeleton() {
    return (
        <Container className="max-w-3xl py-12 md:py-16" role="status" aria-busy="true" aria-label="Loading size guide">
            <div className="animate-pulse motion-reduce:animate-none" aria-hidden="true">
                <div className="flex gap-2">
                    <div className="h-3 w-10 rounded-sm bg-charcoal/8" />
                    <div className="h-3 w-20 rounded-sm bg-charcoal/8" />
                </div>
                <div className="mt-8 h-3 w-24 rounded-sm bg-charcoal/8" />
                <div className="mt-4 h-12 w-full max-w-[14ch] rounded-sm bg-charcoal/8" />

                <div className="mt-14 space-y-14 md:space-y-16 md:mt-16">
                    <div className="max-w-xl space-y-2">
                        <div className="h-4 w-full rounded-sm bg-charcoal/8" />
                        <div className="h-4 w-11/12 rounded-sm bg-charcoal/8" />
                    </div>
                    <div className="max-w-lg space-y-2">
                        <div className="h-4 w-full rounded-sm bg-charcoal/8" />
                        <div className="h-4 w-4/5 rounded-sm bg-charcoal/8" />
                    </div>

                    <div className="aspect-[16/10] max-h-72 w-full rounded-sm bg-[#f3f3f3]" />

                    <div className="grid gap-10 border-t border-charcoal/10 pt-10 md:grid-cols-2 md:gap-12">
                        {[0, 1].map((i) => (
                            <div key={i}>
                                <div className="h-3 w-6 rounded-sm bg-charcoal/8" />
                                <div className="mt-2 h-8 w-3/4 rounded-sm bg-charcoal/8" />
                                <div className="mt-5 space-y-3">
                                    {Array.from({ length: 4 }, (_, j) => (
                                        <div key={j} className="h-4 w-full rounded-sm bg-charcoal/8" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="max-w-xl space-y-2">
                        <div className="h-4 w-full rounded-sm bg-charcoal/8" />
                        <div className="h-4 w-5/6 rounded-sm bg-charcoal/8" />
                    </div>

                    <div>
                        <div className="h-8 w-2/3 rounded-sm bg-charcoal/8" />
                        <div className="mt-2 h-4 w-full max-w-lg rounded-sm bg-charcoal/8" />
                        <div className="mt-8 max-w-sm">
                            <div className="h-3 w-32 rounded-sm bg-charcoal/8" />
                            <div className="mt-2 h-11 w-full rounded-sm border border-charcoal/10 bg-white" />
                            <div className="mt-2 h-3 w-full rounded-sm bg-charcoal/8" />
                        </div>
                        <div className="mt-8 overflow-hidden rounded-sm border border-charcoal/10">
                            <div className="h-11 bg-ivory" />
                            {Array.from({ length: 6 }, (_, i) => (
                                <div key={i} className="h-10 border-t border-charcoal/8 bg-white" />
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-charcoal/10 pt-12">
                        <div className="h-3 w-20 rounded-sm bg-charcoal/8" />
                        <div className="mt-2 h-8 w-1/2 rounded-sm bg-charcoal/8" />
                        <div className="mt-3 h-4 w-full max-w-xl rounded-sm bg-charcoal/8" />
                        <div className="mt-8 grid gap-8 lg:grid-cols-12">
                            <div className="aspect-[4/3] rounded-sm bg-[#f3f3f3] lg:col-span-5" />
                            <div className="space-y-2 lg:col-span-7">
                                {Array.from({ length: 3 }, (_, i) => (
                                    <div key={i} className="h-4 w-full rounded-sm bg-charcoal/8" />
                                ))}
                                <div className="mt-4 h-3 w-28 rounded-sm bg-charcoal/8" />
                                <div className="mt-3 divide-y divide-charcoal/10 border border-charcoal/10">
                                    {Array.from({ length: 3 }, (_, i) => (
                                        <div key={i} className="h-11 bg-white" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-charcoal/10 pt-10">
                        <div className="h-4 w-full max-w-md rounded-sm bg-charcoal/8" />
                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <div className="h-11 w-full rounded-sm bg-charcoal/12 sm:w-40" />
                            <div className="h-11 w-full rounded-sm border border-charcoal/12 sm:w-32" />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
