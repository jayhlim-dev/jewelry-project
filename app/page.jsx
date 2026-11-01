import { Hero } from 'components/sections/Hero';
import { HomeIntro } from 'components/sections/HomeIntro';
import { CategoryShowcase } from 'components/sections/CategoryShowcase';
import { SignatureStory } from 'components/sections/SignatureStory';
import { CampaignSelection } from 'components/sections/CampaignSelection';
import { DiamondFeature } from 'components/sections/DiamondFeature';
import { SeriesBanner } from 'components/sections/SeriesBanner';
import { site } from 'data/site';
import { isDColorDiamondEnabled } from 'lib/features';
import { getCollection, getProductsInCollection } from 'lib/catalog';

const rings = getCollection('rings');
const ringProducts = rings ? getProductsInCollection(rings) : [];

export const metadata = {
    title: { absolute: `${site.name} · Fine Jewelry` },
    description: site.seo.home,
    alternates: { canonical: '/' },
    openGraph: {
        title: `${site.name} · Fine Jewelry`,
        description: site.seo.home,
        url: '/'
    }
};

export default function Page() {
    return (
        <>
            <Hero />
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
                {isDColorDiamondEnabled() ? <DiamondFeature /> : null}
            </div>
        </>
    );
}
