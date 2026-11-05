'use client';

import { Container } from 'components/ui/Container';

export default function ErrorPage({ reset }) {
    return (
        <Container className="py-24">
            <p className="eyebrow">Something went wrong</p>
            <h1 className="type-headline mt-4">We could not load this page.</h1>
            <p className="mt-4 max-w-md text-sm text-ash">Please try again in a moment.</p>
            <button
                type="button"
                onClick={reset}
                className="mt-8 inline-flex text-[11px] tracking-[0.18em] uppercase transition-colors hover:text-ash"
            >
                Try again
            </button>
        </Container>
    );
}
