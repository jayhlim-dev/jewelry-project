import { Breadcrumb } from 'components/ui/Breadcrumb';
import { Container } from 'components/ui/Container';

const INTRO =
    'Rings, earrings, necklaces, and bracelets. Filter by availability, gold tone, or shape.';

export function ShopHeader({ paths, bannerImage }) {
    const hasBanner = Boolean(bannerImage?.src);

    if (!hasBanner) {
        return (
            <Container className="pt-8 pb-4 md:pt-10 md:pb-5">
                <Breadcrumb items={[{ label: 'Home', href: paths.home }, { label: 'Shop' }]} />
                <h1 className="type-headline mt-4 md:mt-5">The Collection</h1>
                <p className="mt-2 text-sm leading-relaxed text-ash md:text-base md:whitespace-nowrap">{INTRO}</p>
            </Container>
        );
    }

    return (
        <section className="relative overflow-hidden border-b border-charcoal/10 text-ivory">
            <div
                className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${bannerImage.src}')` }}
                aria-hidden
            />
            <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/45 to-charcoal/20"
                aria-hidden
            />
            <Container className="relative z-10 py-8 md:py-10">
                <Breadcrumb
                    variant="light"
                    items={[{ label: 'Home', href: paths.home }, { label: 'Shop' }]}
                />
                <h1 className="type-headline mt-4 text-ivory md:mt-5">The Collection</h1>
                <p className="mt-2 text-sm leading-relaxed text-ivory/85 md:text-[15px] md:whitespace-nowrap">{INTRO}</p>
            </Container>
        </section>
    );
}
