import { products as catalog } from 'data/products';
import { sortProducts } from 'lib/catalog';
import { home } from 'data/home';
import { paths } from 'data/site';
import { Container } from 'components/ui/Container';
import { ProductGrid } from 'components/products/ProductGrid';
import { Reveal } from 'components/ui/Reveal';
import { Button } from 'components/ui/Button';

export function FeaturedProducts() {
    const products = sortProducts(catalog, 'featured');
    const content = home.featured;

    return (
        <section className="border-t border-charcoal/10 bg-white py-24 md:py-32">
            <Container>
                <div className="mb-16 flex flex-col items-start gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
                    <Reveal>
                        <p className="eyebrow mb-5">{content.eyebrow}</p>
                        <h2 className="type-headline max-w-[12ch]">{content.title}</h2>
                        <p className="mt-5 max-w-md text-sm leading-7 text-ash">{content.text}</p>
                    </Reveal>
                    <Button href={paths.shop} variant="link">
                        View the collection
                    </Button>
                </div>
                <ProductGrid products={products} titleAs="h3" />
            </Container>
        </section>
    );
}
