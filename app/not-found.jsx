import Link from 'next/link';
import { paths, site } from 'data/site';
import { Container } from 'components/ui/Container';

export default function NotFound() {
    return (
        <Container className="py-24">
            <p className="eyebrow">404</p>
            <h1 className="type-headline mt-4">This page is not in the collection.</h1>
            <p className="mt-4 max-w-md text-sm text-ash">The link may be old, or that piece is no longer listed.</p>
            <Link href={paths.home} className="mt-8 inline-flex text-[11px] tracking-[0.18em] uppercase">
                Back to {site.name}
            </Link>
        </Container>
    );
}
