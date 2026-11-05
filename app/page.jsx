import { Hero } from 'components/sections/Hero';
import { HomeIntro } from 'components/sections/HomeIntro';
import { CategoryShowcase } from 'components/sections/CategoryShowcase';
import { SignatureStory } from 'components/sections/SignatureStory';
import { CampaignSelection } from 'components/sections/CampaignSelection';
import { DiamondFeature } from 'components/sections/DiamondFeature';
import { getCollection, getProductsInCollection } from 'lib/catalog';
import { getContent } from 'lib/content';
import { isDColorDiamondEnabled } from 'lib/features';

export async function generateMetadata() {
    const { site } = await getContent();
    return {
        title: { absolute: `${site.name} · Fine Jewelry` },
        description: site.seo.home,
        alternates: { canonical: '/' },
        openGraph: {
            title: `${site.name} · Fine Jewelry`,
            description: site.seo.home,
            url: '/'
        }
    };
}

export default async function Page() {
    const { site, products, collections, home } = await getContent();
    const rings = getCollection(collections, 'rings');
    const ringProducts = rings ? getProductsInCollection(products, rings) : [];

    return (
        <>
            <Hero hero={home.hero} />
            <HomeIntro />
            <div className="gap-4 flex flex-col bg-white">
                <CategoryShowcase />
                <CampaignSelection
                    products={ringProducts}
                    showAllHref={rings?.href}
                    label="Popular products"
                    title="Popular products"
                    titleClassName="text-base font-medium"
                />
                <SignatureStory />
                <CampaignSelection
                    products={ringProducts}
                    showAllHref={rings?.href}
                    label="Must have"
                    title="Must have"
                    titleClassName="text-base font-medium"
                />
                {/* <SeriesBanner /> */}
                {isDColorDiamondEnabled(site.features) ? <DiamondFeature /> : null}
            </div>
        </>
    );
}
