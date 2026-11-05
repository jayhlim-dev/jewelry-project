import { SizeGuideExperience } from 'components/size-guide/SizeGuideExperience';
import { Breadcrumb } from 'components/ui/Breadcrumb';
import { Container } from 'components/ui/Container';
import { getContent } from 'lib/content';

export async function generateMetadata() {
    const { site } = await getContent();
    const paths = site.paths;
    return {
        title: 'Size guide',
        description: site.seo.sizeGuide,
        alternates: { canonical: paths.sizeGuide },
        openGraph: { title: 'Size guide', description: site.seo.sizeGuide, url: paths.sizeGuide }
    };
}

export default async function SizeGuidePage() {
    const { site, sizeGuide } = await getContent();
    const paths = site.paths;
    return (
        <Container className="max-w-3xl py-12 md:py-16">
            <Breadcrumb items={[{ label: 'Home', href: paths.home }, { label: 'Size guide' }]} />
            <p className="eyebrow mt-8">{sizeGuide.eyebrow}</p>
            <h1 className="type-headline mt-4 max-w-[14ch] text-balance">{sizeGuide.title}</h1>
            <SizeGuideExperience />
        </Container>
    );
}
