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
            <section className="relative min-h-[72svh] bg-charcoal text-ivory md:min-h-[78svh]">
                <div className="absolute inset-0">
                    <ImageReveal
                        src={story.hero.image.src}
                        alt={story.hero.image.alt}
                        priority
                        sizes="100vw"
                        className="h-full min-h-[72svh] md:min-h-[78svh]"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/35 to-charcoal/20" />
                <Container className="relative flex min-h-[72svh] flex-col justify-end pb-14 pt-28 md:min-h-[78svh] md:pb-16 md:pt-0">
                    <Breadcrumb
                        className="mb-10 [&_a]:text-ivory/75 [&_a:hover]:text-ivory [&_li_span]:text-ivory/45 [&_ol]:text-ivory/75 [&_span[aria-current]]:text-ivory"
                        items={[{ label: 'Home', href: paths.home }, { label: `Why ${site.name}` }]}
                    />
                    <p className="eyebrow text-champagne">{story.hero.eyebrow}</p>
                    <h1 className="type-display mt-4 max-w-[14ch]">{story.hero.title}</h1>
                    <p className="mt-5 max-w-lg text-sm leading-relaxed text-ivory/85 md:text-base">{story.hero.text}</p>
                </Container>
            </section>

            <WhyPageContent />
        </article>
    );
}
