import { paths, site } from 'data/site';
import { story } from 'data/story';
import { WhyPageContent } from 'components/sections/WhyPageContent';
import { Breadcrumb } from 'components/ui/Breadcrumb';
import { Container } from 'components/ui/Container';
import { ImageReveal } from 'components/ui/ImageReveal';

export const metadata = {
    title: { absolute: `Why ${site.name}` },
    description: site.seo.why,
    alternates: { canonical: paths.why },
    openGraph: { title: `Why ${site.name}`, description: site.seo.why, url: paths.why }
};

export default function WhyPage() {
    return (
        <article>
            <section className="relative min-h-[58svh] bg-charcoal text-ivory md:min-h-[62svh]">
                <div className="absolute inset-0">
                    <ImageReveal
                        src={story.hero.image.src}
                        alt={story.hero.image.alt}
                        priority
                        sizes="100vw"
                        className="h-full min-h-[58svh] md:min-h-[62svh]"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-charcoal/25" />
                <Container className="relative flex min-h-[58svh] flex-col justify-end pb-12 pt-28 md:min-h-[62svh] md:pb-14">
                    <Breadcrumb
                        className="mb-8 [&_a]:text-ivory/80 [&_a:hover]:text-ivory [&_li_span]:text-ivory/50 [&_ol]:text-ivory/80 [&_span[aria-current]]:text-ivory"
                        items={[{ label: 'Home', href: paths.home }, { label: `Why ${site.name}` }]}
                    />
                    <p className="eyebrow text-champagne">{story.hero.eyebrow}</p>
                    <h1 className="type-headline mt-3 max-w-[18ch] text-balance">{story.hero.title}</h1>
                    <p className="mt-4 max-w-md text-[15px] leading-7 text-ivory/90">{story.hero.text}</p>
                </Container>
            </section>

            <WhyPageContent />
        </article>
    );
}
