import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from 'data/products';
import { paths, site } from 'data/site';
import { getCollectionForCategory, getProduct, getRelatedProducts } from 'lib/catalog';
import { ProductStage } from 'components/products/ProductStage';
import { Breadcrumb } from 'components/ui/Breadcrumb';
import { Container } from 'components/ui/Container';
import { ProductGrid } from 'components/products/ProductGrid';

export function generateStaticParams() {
    return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const product = getProduct(slug);
    if (!product) return { title: 'Piece' };
    const description = product.summary;
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
    const collection = getCollectionForCategory(product.category);
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.url}${paths.home}` },
            { '@type': 'ListItem', position: 2, name: 'Shop', item: `${site.url}${paths.shop}` },
            {
                '@type': 'ListItem',
                position: 3,
                name: product.category,
                item: collection ? `${site.url}${collection.href}` : `${site.url}${paths.shop}`
            },
            { '@type': 'ListItem', position: 4, name: product.name, item: `${site.url}${paths.shop}/${product.slug}` }
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
                        { label: product.category, href: collection?.href || paths.shop },
                        { label: product.name }
                    ]}
                />
                <ProductStage product={product} />
                {related.length ? (
                    <section className="mt-24 border-t border-charcoal/10 pt-16">
                        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <p className="eyebrow mb-4">{product.category}</p>
                                <h2 className="type-title">Other pieces</h2>
                            </div>
                            {collection ? (
                                <Link
                                    href={collection.href}
                                    className="text-[11px] tracking-[0.18em] text-ash uppercase underline-offset-4 hover:text-charcoal hover:underline"
                                >
                                    See {collection.name}
                                </Link>
                            ) : null}
                        </div>
                        <ProductGrid products={related} titleAs="h3" />
                    </section>
                ) : null}
            </Container>
        </article>
    );
}
