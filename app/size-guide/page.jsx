import { sizeGuide } from 'data/size-guide';
import { paths, site } from 'data/site';
import { SizeGuideExperience } from 'components/size-guide/SizeGuideExperience';
import { Breadcrumb } from 'components/ui/Breadcrumb';
import { Container } from 'components/ui/Container';

export const metadata = {
    title: 'Size guide',
    description: site.seo.sizeGuide,
    alternates: { canonical: paths.sizeGuide },
    openGraph: { title: 'Size guide', description: site.seo.sizeGuide, url: paths.sizeGuide }
};

export default function SizeGuidePage() {
    return (
        <Container className="max-w-3xl py-12 md:py-16">
            <Breadcrumb items={[{ label: 'Home', href: paths.home }, { label: 'Size guide' }]} />
            <p className="eyebrow mt-8">{sizeGuide.eyebrow}</p>
            <h1 className="type-headline mt-4 max-w-[14ch] text-balance">{sizeGuide.title}</h1>
            <SizeGuideExperience />
        </Container>
    );
}
