import { paths, site } from 'data/site';
import { story } from 'data/story';
import { Button } from 'components/ui/Button';
import { Container } from 'components/ui/Container';
import { ImageReveal } from 'components/ui/ImageReveal';
import { Reveal } from 'components/ui/Reveal';

export const metadata = {
    title: { absolute: `Why ${site.name}` },
    description: site.seo.why,
    alternates: { canonical: paths.why },
    openGraph: { title: `Why ${site.name}`, description: site.seo.why, url: paths.why }
};

export default function WhyPage() {
    return (
        <article>
            <section className="relative min-h-[78svh] bg-charcoal text-ivory">
                <div className="absolute inset-0">
                    <ImageReveal
                        src={story.hero.image.src}
                        alt={story.hero.image.alt}
                        priority
                        sizes="100vw"
                        className="h-full min-h-[78svh]"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/20 to-charcoal/30" />
                <Container className="relative flex min-h-[78svh] flex-col justify-end py-16">
                    <p className="eyebrow text-champagne">{story.hero.eyebrow}</p>
                    <h1 className="type-display mt-4 max-w-[14ch]">{story.hero.title}</h1>
                    <p className="mt-5 max-w-md text-sm leading-relaxed text-ivory/80 md:text-base">{story.hero.text}</p>
                </Container>
            </section>

            <Container className="py-8">
                <p className="max-w-3xl text-sm leading-relaxed text-ash">{site.placeholderNotice}</p>
            </Container>

            <section className="py-12 md:py-20">
                <Container className="grid items-center gap-10 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <Reveal>
                            <p className="eyebrow mb-4">{story.philosophy.eyebrow}</p>
                            <h2 className="type-headline">{story.philosophy.title}</h2>
                            {story.philosophy.paragraphs.map((paragraph) => (
                                <p key={paragraph} className="mt-5 text-[15px] leading-relaxed text-ash">
                                    {paragraph}
                                </p>
                            ))}
                        </Reveal>
                    </div>
                    <ImageReveal
                        src={story.philosophy.image.src}
                        alt={story.philosophy.image.alt}
                        sizes="(min-width: 1024px) 42vw, 100vw"
                        className="aspect-[4/5] lg:col-span-6 lg:col-start-7"
                    />
                </Container>
            </section>

            <section className="bg-white py-16 md:py-24">
                <Container className="grid items-center gap-12 lg:grid-cols-12">
                    <ImageReveal
                        src={story.quality.image.src}
                        alt={story.quality.image.alt}
                        sizes="(min-width: 1024px) 46vw, 100vw"
                        className="aspect-[4/5] lg:col-span-6"
                    />
                    <div className="lg:col-span-5 lg:col-start-8">
                        <Reveal>
                            <p className="eyebrow mb-4">{story.quality.eyebrow}</p>
                            <h2 className="type-headline">{story.quality.title}</h2>
                            {story.quality.paragraphs.map((paragraph) => (
                                <p key={paragraph} className="mt-5 text-[15px] leading-relaxed text-ash">
                                    {paragraph}
                                </p>
                            ))}
                        </Reveal>
                        <ol className="mt-8 space-y-4">
                            {story.quality.points.map((point, index) => (
                                <li key={point} className="border-t border-charcoal/10 pt-4 text-sm leading-relaxed">
                                    <span className="mr-3 text-[11px] tracking-[0.16em] text-taupe">0{index + 1}</span>
                                    {point}
                                </li>
                            ))}
                        </ol>
                    </div>
                </Container>
            </section>

            <section className="py-16 md:py-24">
                <Container>
                    <Reveal className="max-w-xl">
                        <p className="eyebrow mb-4">{story.design.eyebrow}</p>
                        <h2 className="type-headline">{story.design.title}</h2>
                        {story.design.paragraphs.map((paragraph) => (
                            <p key={paragraph} className="mt-5 text-[15px] leading-relaxed text-ash">
                                {paragraph}
                            </p>
                        ))}
                    </Reveal>
                    <ImageReveal
                        src={story.design.image.src}
                        alt={story.design.image.alt}
                        sizes="100vw"
                        className="mt-10 aspect-[16/8] min-h-64"
                    />
                    <div className="mt-10 grid gap-10 md:grid-cols-3">
                        {story.design.principles.map((principle, index) => (
                            <div key={principle.title} className={index > 0 ? 'md:border-l md:border-charcoal/10 md:pl-8' : ''}>
                                <h3 className="font-serif text-2xl">{principle.title}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-ash">{principle.text}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="py-8 md:py-16">
                <Container className="grid items-center gap-10 lg:grid-cols-12">
                    <div className="order-2 lg:order-1 lg:col-span-5">
                        <Reveal>
                            <p className="eyebrow mb-4">{story.craft.eyebrow}</p>
                            <h2 className="type-headline">{story.craft.title}</h2>
                            {story.craft.paragraphs.map((paragraph) => (
                                <p key={paragraph} className="mt-5 text-[15px] leading-relaxed text-ash">
                                    {paragraph}
                                </p>
                            ))}
                        </Reveal>
                    </div>
                    <ImageReveal
                        src={story.craft.image.src}
                        alt={story.craft.image.alt}
                        sizes="(min-width: 1024px) 48vw, 100vw"
                        className="order-1 aspect-[5/4] lg:order-2 lg:col-span-6 lg:col-start-7"
                    />
                </Container>
            </section>

            <section className="py-8 md:py-16">
                <Container className="grid items-center gap-10 lg:grid-cols-12">
                    <ImageReveal
                        src={story.service.image.src}
                        alt={story.service.image.alt}
                        sizes="(min-width: 1024px) 48vw, 100vw"
                        className="aspect-[4/5] lg:col-span-6"
                    />
                    <div className="lg:col-span-5 lg:col-start-8">
                        <Reveal>
                            <p className="eyebrow mb-4">{story.service.eyebrow}</p>
                            <h2 className="type-headline">{story.service.title}</h2>
                            {story.service.paragraphs.map((paragraph) => (
                                <p key={paragraph} className="mt-5 text-[15px] leading-relaxed text-ash">
                                    {paragraph}
                                </p>
                            ))}
                        </Reveal>
                    </div>
                </Container>
            </section>

            <section className="bg-white py-16 md:py-24">
                <Container className="grid gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <p className="eyebrow mb-4">{story.shopping.eyebrow}</p>
                        <h2 className="type-headline">{story.shopping.title}</h2>
                        {story.shopping.paragraphs.map((paragraph) => (
                            <p key={paragraph} className="mt-5 text-[15px] leading-relaxed text-ash">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                    <ol className="lg:col-span-6 lg:col-start-7">
                        {story.shopping.steps.map((step, index) => (
                            <li key={step.title} className="border-t border-charcoal/10 py-6">
                                <p className="text-[11px] tracking-[0.18em] text-taupe">0{index + 1}</p>
                                <h3 className="mt-2 font-serif text-2xl">{step.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-ash">{step.text}</p>
                            </li>
                        ))}
                    </ol>
                </Container>
            </section>

            <section className="py-20 md:py-28">
                <Container className="max-w-3xl">
                    <h2 className="type-headline">{story.closing.title}</h2>
                    <div className="mt-8">
                        <Button href={paths.shop}>{story.closing.cta}</Button>
                    </div>
                </Container>
            </section>
        </article>
    );
}
