import { notFound } from 'next/navigation';
import { CollectionPageHeader } from 'components/products/CollectionPageHeader';
import { ShopBrowser } from 'components/products/ShopBrowser';
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
        <div className="pb-14 md:pb-16">
            <CollectionPageHeader collection={collection} paths={paths} />
            <ShopBrowser
                initialProducts={pieces}
                basePath={`${paths.collections}/${collection.slug}`}
                showCategoryTabs={false}
            />
        </div>
    );
}
