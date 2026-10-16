import { Suspense } from 'react';
import { paths, site } from 'data/site';
import { Breadcrumb } from 'components/ui/Breadcrumb';
import { Container } from 'components/ui/Container';
import { ShopBrowser } from 'components/products/ShopBrowser';

export const metadata = {
    title: 'The Collection',
    description: site.seo.shop,
    alternates: { canonical: paths.shop },
    openGraph: { title: 'The Collection', description: site.seo.shop, url: paths.shop }
};

export default function ShopPage() {
    return (
        <div className="pb-16">
            <Container className="pt-10 pb-6 md:pt-14">
                <Breadcrumb items={[{ label: 'Home', href: paths.home }, { label: 'Shop' }]} />
                <h1 className="type-headline mt-6">The Collection</h1>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-ash md:text-base">
                    Rings, earrings, necklaces, and bracelets. Filter by availability, price, metal, or shape.
                </p>
            </Container>
            <Suspense fallback={<Container className="py-10 text-sm text-ash">Loading the collection…</Container>}>
                <ShopBrowser />
            </Suspense>
        </div>
    );
}
