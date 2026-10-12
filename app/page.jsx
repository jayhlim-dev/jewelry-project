import { Hero } from 'components/sections/Hero';
import { BrandIntroduction } from 'components/sections/BrandIntroduction';
import { CategoryShowcase } from 'components/sections/CategoryShowcase';
import { FeaturedProducts } from 'components/sections/FeaturedProducts';
import { DiamondFeature } from 'components/sections/DiamondFeature';
import { BrandPillars } from 'components/sections/BrandPillars';
import { EditorialStories } from 'components/sections/EditorialStories';
import { ClosingCta } from 'components/sections/ClosingCta';
import { site } from 'data/site';

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
            <BrandIntroduction />
            <CategoryShowcase />
            <FeaturedProducts />
            <DiamondFeature />
            <BrandPillars />
            {/* <EditorialStories /> */}
            <ClosingCta />
        </>
    );
}
