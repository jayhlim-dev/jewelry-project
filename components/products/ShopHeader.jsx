import { Breadcrumb } from 'components/ui/Breadcrumb';
import { Container } from 'components/ui/Container';

export function ShopHeader({ paths }) {
    return (
        <Container className="pt-10 pb-6 md:pt-14">
            <Breadcrumb items={[{ label: 'Home', href: paths.home }, { label: 'Shop' }]} />
            <h1 className="type-headline mt-6">The Collection</h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ash md:text-base">
                Rings, earrings, necklaces, and bracelets. Filter by availability, gold tone, or shape.
            </p>
        </Container>
    );
}
