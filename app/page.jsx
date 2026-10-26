import { Hero } from 'components/sections/Hero';
import { HomeIntro } from 'components/sections/HomeIntro';
import { CategoryShowcase } from 'components/sections/CategoryShowcase';
import { SignatureStory } from 'components/sections/SignatureStory';
import { CampaignSelection } from 'components/sections/CampaignSelection';
import { DiamondFeature } from 'components/sections/DiamondFeature';
import { SeriesBanner } from 'components/sections/SeriesBanner';
import { site } from 'data/site';
import { isDColorDiamondEnabled } from 'lib/features';

const popular = ['pearl-strand', 'halo-ring', 'linea-bracelet', 'ivy-drops'];
const mustHave = [
    'mira-band',
    'rosa-cushion',
    'lune-pendant',
    'celeste-stack',
    'halo-ring',
    'ivy-drops',
    'pearl-strand',
    'linea-bracelet'
];

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
                    slugs={popular}
                    label="Popular products"
                    title="Popular products"
                    titleClassName="text-base font-medium"
                />
                <SignatureStory />
                <CampaignSelection
                    slugs={mustHave}
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
