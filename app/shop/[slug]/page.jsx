import { notFound } from 'next/navigation';
import { products } from 'data/products';
import { paths, site } from 'data/site';
import { getProduct, getRelatedProducts } from 'lib/catalog';
import { Breadcrumb } from 'components/ui/Breadcrumb';
import { Container } from 'components/ui/Container';
import { ProductGallery } from 'components/products/ProductGallery';
import { ProductSummary } from 'components/products/ProductSummary';
import { ProductGrid } from 'components/products/ProductGrid';

export function generateStaticParams() {
    return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const product = getProduct(slug);
    if (!product) return { title: 'Piece' };
    const description = `${product.summary} Sample piece in the ${site.name} preview.`;
    return {
        title: product.name,
        description,
        alternates: { canonical: `${paths.shop}/${product.slug}` },
        openGraph: {
            title: product.name,
            description,
            url: `${paths.shop}/${product.slug}`,
            images: [{ url: product.images[0].src, alt: product.images[0].alt }]
        }
    };
}

export default async function ProductPage({ params }) {
    const { slug } = await params;
    const product = getProduct(slug);
    if (!product) notFound();
    const related = getRelatedProducts(product);
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.url}${paths.home}` },
            { '@type': 'ListItem', position: 2, name: 'Shop', item: `${site.url}${paths.shop}` },
            { '@type': 'ListItem', position: 3, name: product.name, item: `${site.url}${paths.shop}/${product.slug}` }
        ]
    };

    return (
        <article className="pb-20">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Container className="pt-8 md:pt-12">
                <Breadcrumb
                    items={[
                        { label: 'Home', href: paths.home },
                        { label: 'Shop', href: paths.shop },
                        { label: product.category, href: `${paths.shop}?category=${encodeURIComponent(product.category)}` },
                        { label: product.name }
                    ]}
                />
                <div className="mt-8 grid items-start gap-12 lg:mt-10 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-7">
                        <ProductGallery images={product.images} name={product.name} />
                    </div>
                    <div className="lg:col-span-4 lg:col-start-9">
                        <ProductSummary product={product} />
                    </div>
                </div>
                <section className="mt-24 border-t border-charcoal/10 pt-16">
                    <p className="eyebrow mb-4">The collection</p>
                    <h2 className="type-title mb-10">Other pieces</h2>
                    <ProductGrid products={related} titleAs="h3" />
                </section>
            </Container>
        </article>
    );
}
