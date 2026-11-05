import { Container } from 'components/ui/Container';

/** Neutral route fallback. Lets a link click render instantly while the server builds the page. */
export function PageSkeleton() {
    return (
        <Container className="py-14 md:py-20" role="status" aria-busy="true" aria-label="Loading page">
            <div className="animate-pulse motion-reduce:animate-none" aria-hidden="true">
                <div className="h-3 w-40 rounded-sm bg-charcoal/8" />
                <div className="mt-6 h-12 w-2/3 max-w-xl rounded-sm bg-charcoal/8" />
                <div className="mt-6 h-4 w-full max-w-xl rounded-sm bg-charcoal/8" />
                <div className="mt-3 h-4 w-4/5 max-w-lg rounded-sm bg-charcoal/8" />
                <div className="mt-12 aspect-[16/9] w-full rounded-lg bg-[#f3f3f3]" />
            </div>
        </Container>
    );
}
