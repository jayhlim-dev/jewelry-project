import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductGrid } from 'components/products/ProductGrid';
import { Breadcrumb } from 'components/ui/Breadcrumb';
import { Container } from 'components/ui/Container';
import { getCollection, getProductsInCollection } from 'lib/catalog';
import { getContent } from 'lib/content';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const { site, collections } = await getContent();
    const paths = site.paths;
    const collection = getCollection(collections, slug);
    if (!collection) return { title: 'Collection' };
    const url = `${paths.collections}/${collection.slug}`;
    return {
        title: collection.name,
        description: collection.description,
        alternates: { canonical: url },
        openGraph: {
            title: collection.name,
            description: collection.description,
            url,
            images: [{ url: collection.image.src, alt: collection.image.alt }]
        }
    };
}

export default async function CollectionPage({ params }) {
    const { slug } = await params;
    const { site, products, collections } = await getContent();
    const paths = site.paths;
    const collection = getCollection(collections, slug);
    if (!collection) notFound();
    const pieces = getProductsInCollection(products, collection);

    return (
        <div className="pb-20">
            <Container className="pt-10 md:pt-14">
                <Breadcrumb
                    items={[
                        { label: 'Home', href: paths.home },
                        { label: 'Shop', href: paths.shop },
                        { label: collection.name }
                    ]}
                />
                <p className="eyebrow mt-8">Collection</p>
                <h1 className="type-headline mt-4">{collection.name}</h1>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-ash md:text-base">{collection.description}</p>
                <p className="mt-8">
                    <Link
                        href={paths.shop}
                        className="text-[11px] tracking-[0.18em] text-ash uppercase underline-offset-4 hover:text-charcoal hover:underline"
                    >
                        All pieces
                    </Link>
                </p>
                <div className="mt-12">
                    {pieces.length ? (
                        <ProductGrid products={pieces} />
                    ) : (
                        <p className="py-16 text-ash">No pieces in this collection yet.</p>
                    )}
                </div>
            </Container>
        </div>
    );
}
