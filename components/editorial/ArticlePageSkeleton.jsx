import { Container } from 'components/ui/Container';

/** `/articles/[slug]`. */
export function ArticlePageSkeleton() {
    return (
        <article className="pb-20" role="status" aria-busy="true" aria-label="Loading article">
            <Container className="pt-8 md:pt-12">
                <div className="animate-pulse motion-reduce:animate-none" aria-hidden="true">
                    <div className="flex gap-2">
                        <div className="h-3 w-10 rounded-sm bg-charcoal/8" />
                        <div className="h-3 w-14 rounded-sm bg-charcoal/8" />
                        <div className="h-3 w-32 rounded-sm bg-charcoal/8" />
                    </div>
                    <div className="mt-8 h-3 w-40 rounded-sm bg-charcoal/8" />
                    <div className="mt-4 h-12 w-full max-w-3xl rounded-sm bg-charcoal/8" />
                    <div className="mt-5 h-4 w-full max-w-2xl rounded-sm bg-charcoal/8" />
                </div>
            </Container>
            <Container className="mt-10">
                <div className="aspect-[20/9] min-h-56 w-full rounded-md bg-[#f3f3f3] md:min-h-72" aria-hidden="true" />
            </Container>
            <Container className="mt-12 max-w-3xl">
                <div className="animate-pulse space-y-3 motion-reduce:animate-none" aria-hidden="true">
                    <div className="h-4 w-full rounded-sm bg-charcoal/8" />
                    <div className="h-4 w-full rounded-sm bg-charcoal/8" />
                    <div className="h-4 w-11/12 rounded-sm bg-charcoal/8" />
                    <div className="h-4 w-full rounded-sm bg-charcoal/8" />
                    <div className="h-4 w-4/5 rounded-sm bg-charcoal/8" />
                </div>
            </Container>
        </article>
    );
}
