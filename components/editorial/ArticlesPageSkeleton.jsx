import { Container } from 'components/ui/Container';

function ArticleCardSkeleton() {
    return (
        <div>
            <div className="aspect-[4/3] rounded-md bg-[#f3f3f3]" />
            <div className="mt-4 h-3 w-2/3 rounded-sm bg-charcoal/8" />
            <div className="mt-2 h-7 w-full rounded-sm bg-charcoal/8" />
            <div className="mt-2 h-4 w-full rounded-sm bg-charcoal/8" />
        </div>
    );
}

/** `/articles` index. */
export function ArticlesPageSkeleton() {
    return (
        <div className="pb-20" role="status" aria-busy="true" aria-label="Loading articles">
            <Container className="pt-10 md:pt-14">
                <div className="animate-pulse motion-reduce:animate-none" aria-hidden="true">
                    <div className="flex gap-2">
                        <div className="h-3 w-10 rounded-sm bg-charcoal/8" />
                        <div className="h-3 w-14 rounded-sm bg-charcoal/8" />
                    </div>
                    <div className="mt-6 h-3 w-20 rounded-sm bg-charcoal/8" />
                    <div className="mt-4 h-12 w-2/3 max-w-md rounded-sm bg-charcoal/8" />
                    <div className="mt-4 h-4 w-full max-w-2xl rounded-sm bg-charcoal/8" />
                    <div className="mt-8 h-3 w-16 rounded-sm bg-charcoal/8" />
                    <div className="mt-3 flex flex-wrap gap-2">
                        {Array.from({ length: 4 }, (_, i) => (
                            <div key={i} className="h-10 w-20 rounded-md bg-charcoal/8" />
                        ))}
                    </div>
                    <ul className="mt-12 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }, (_, i) => (
                            <li key={i}>
                                <ArticleCardSkeleton />
                            </li>
                        ))}
                    </ul>
                </div>
            </Container>
        </div>
    );
}
