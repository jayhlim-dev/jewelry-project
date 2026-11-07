import { ShopBrowser } from 'components/products/ShopBrowser';
import { ShopHeader } from 'components/products/ShopHeader';
import { getContent } from 'lib/content';

export async function generateMetadata() {
    const { site } = await getContent();
    const paths = site.paths;
    return {
        title: 'The Collection',
        description: site.seo.shop,
        alternates: { canonical: paths.shop },
        openGraph: { title: 'The Collection', description: site.seo.shop, url: paths.shop }
    };
}

export default async function ShopPage() {
    // getContent() is cached and shared with the root layout, so this adds no extra Firestore read.
    const { site, products, catalog, home } = await getContent();
    const paths = site.paths;
    const bannerImage = catalog?.banner?.src ? catalog.banner : home?.hero?.image;

    return (
        <div className="pb-14 md:pb-16">
            <ShopHeader paths={paths} bannerImage={bannerImage} />
            {/* No Suspense/skeleton here: the root layout is force-dynamic, so this renders per request with the
                products already in the HTML. If the route is ever made static, useSearchParams will need a Suspense boundary. */}
            <ShopBrowser initialProducts={products} denseTop />
        </div>
    );
}
