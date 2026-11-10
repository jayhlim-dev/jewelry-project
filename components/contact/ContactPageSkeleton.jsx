import { Container } from 'components/ui/Container';

/** `/contact`. */
export function ContactPageSkeleton() {
    return (
        <div className="pb-10 md:pb-14" role="status" aria-busy="true" aria-label="Loading contact">
            <section className="relative overflow-hidden border-b border-charcoal/10 bg-[#e8e6e3]">
                <Container className="relative z-10 pt-10 pb-12 md:pt-14 md:pb-16">
                    <div className="animate-pulse motion-reduce:animate-none" aria-hidden="true">
                        <div className="flex gap-2">
                            <div className="h-3 w-10 rounded-sm bg-charcoal/10" />
                            <div className="h-3 w-14 rounded-sm bg-charcoal/10" />
                        </div>
                        <div className="mt-8 h-3 w-24 rounded-sm bg-charcoal/10" />
                        <div className="mt-4 h-12 w-2/3 max-w-xl rounded-sm bg-charcoal/10" />
                        <div className="mt-5 h-4 w-full max-w-lg rounded-sm bg-charcoal/8" />
                        <div className="mt-3 h-4 w-4/5 max-w-md rounded-sm bg-charcoal/8" />
                    </div>
                </Container>
            </section>
            <section className="bg-white py-12 md:py-16">
                <Container>
                    <div className="grid animate-pulse grid-cols-1 gap-6 motion-reduce:animate-none lg:grid-cols-12 lg:gap-7" aria-hidden="true">
                        <div className="rounded-md border border-charcoal/12 p-6 lg:col-span-5">
                            <div className="h-3 w-28 rounded-sm bg-charcoal/8" />
                            <div className="mt-4 h-8 w-3/4 rounded-sm bg-charcoal/8" />
                            <div className="mt-3 h-4 w-full rounded-sm bg-charcoal/8" />
                            <div className="mt-2 h-4 w-5/6 rounded-sm bg-charcoal/8" />
                            <div className="mt-6 h-11 w-40 rounded-sm bg-charcoal/12" />
                        </div>
                        <div className="rounded-md border border-charcoal/12 p-6 lg:col-span-7">
                            <div className="h-8 w-1/2 rounded-sm bg-charcoal/8" />
                            <div className="mt-6 h-11 w-full rounded-sm bg-charcoal/8" />
                            <div className="mt-4 h-11 w-full rounded-sm bg-charcoal/8" />
                            <div className="mt-4 h-32 w-full rounded-sm bg-charcoal/8" />
                            <div className="mt-6 h-11 w-full rounded-sm bg-charcoal/12" />
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}
