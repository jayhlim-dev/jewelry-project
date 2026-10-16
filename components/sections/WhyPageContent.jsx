import { pillars, story } from 'data/story';
import { paths, site } from 'data/site';
import { isDColorDiamondEnabled } from 'lib/features';
import { Button } from 'components/ui/Button';
import { Container } from 'components/ui/Container';
import { ImageReveal } from 'components/ui/ImageReveal';
import { Reveal } from 'components/ui/Reveal';

function Philosophy() {
    const { philosophy } = story;

    return (
        <section className="py-20 md:py-28">
            <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
                <Reveal className="lg:col-span-5">
                    <p className="eyebrow mb-4">{philosophy.eyebrow}</p>
                    <h2 className="type-headline">{philosophy.title}</h2>
                    {philosophy.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="mt-5 text-[15px] leading-relaxed text-ash md:text-base">
                            {paragraph}
                        </p>
                    ))}
                </Reveal>
                <ImageReveal
                    src={philosophy.image.src}
                    alt={philosophy.image.alt}
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="aspect-[4/5] lg:col-span-6 lg:col-start-7"
                />
            </Container>
        </section>
    );
}

function PillarList() {
    return (
        <section className="border-t border-charcoal/8 bg-white py-16 md:py-24">
            <Container>
                <Reveal className="max-w-2xl">
                    <p className="eyebrow mb-4">Four standards</p>
                    <h2 className="type-headline">What we hold every piece to.</h2>
                    <p className="mt-5 text-[15px] leading-relaxed text-ash">
                        Quality, design, craft, and service — named plainly, without borrowed language.
                    </p>
                </Reveal>
                <ol className="mt-14 space-y-16 md:space-y-24">
                    {pillars.map((pillar, index) => {
                        const imageFirst = index % 2 === 0;
                        return (
                            <li
                                key={pillar.id}
                                className="grid items-center gap-10 border-t border-charcoal/10 pt-14 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-14"
                            >
                                <div
                                    className={`md:col-span-5 ${imageFirst ? 'md:order-1' : 'md:order-2 md:col-start-8'}`}
                                >
                                    <ImageReveal
                                        src={pillar.image.src}
                                        alt={pillar.image.alt}
                                        sizes="(min-width: 768px) 36vw, 100vw"
                                        className="aspect-[5/4] md:aspect-[4/5]"
                                    />
                                </div>
                                <Reveal
                                    className={`md:col-span-6 ${imageFirst ? 'md:order-2 md:col-start-7' : 'md:order-1'}`}
                                >
                                    <p className="text-[11px] tracking-[0.2em] text-taupe uppercase">0{index + 1}</p>
                                    <h3 className="mt-2 font-serif text-[clamp(1.75rem,2.5vw,2.25rem)] leading-tight">{pillar.title}</h3>
                                    <p className="mt-4 text-base leading-relaxed text-charcoal">{pillar.summary}</p>
                                    <p className="mt-4 text-[15px] leading-relaxed text-ash">{pillar.body}</p>
                                </Reveal>
                            </li>
                        );
                    })}
                </ol>
            </Container>
        </section>
    );
}

function QualityBand() {
    const { quality } = story;

    return (
        <section className="py-16 md:py-20">
            <Container>
                <div className="grid gap-10 border border-charcoal/10 bg-ivory p-8 md:grid-cols-12 md:gap-12 md:p-12 lg:p-14">
                    <div className="md:col-span-5">
                        <p className="eyebrow mb-4">{quality.eyebrow}</p>
                        <h2 className="type-title">{quality.title}</h2>
                        {quality.paragraphs.map((paragraph) => (
                            <p key={paragraph} className="mt-4 text-[15px] leading-relaxed text-ash">
                                {paragraph}
                            </p>
                        ))}
                        {isDColorDiamondEnabled() ? (
                            <div className="mt-8">
                                <Button href={paths.diamond} variant="link">
                                    Read the D color guide
                                </Button>
                            </div>
                        ) : null}
                    </div>
                    <ul className="md:col-span-6 md:col-start-7 md:self-center">
                        {quality.points.map((point) => (
                            <li key={point} className="border-t border-charcoal/10 py-4 text-[15px] leading-relaxed text-ash first:border-t-0 first:pt-0">
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>
            </Container>
        </section>
    );
}

function Visit() {
    const { shopping } = story;

    return (
        <section className="bg-white py-16 md:py-24">
            <Container className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
                <div className="lg:col-span-5 lg:sticky lg:top-28">
                    <Reveal>
                        <p className="eyebrow mb-4">{shopping.eyebrow}</p>
                        <h2 className="type-headline">{shopping.title}</h2>
                        {shopping.paragraphs.map((paragraph) => (
                            <p key={paragraph} className="mt-5 text-[15px] leading-relaxed text-ash">
                                {paragraph}
                            </p>
                        ))}
                    </Reveal>
                    <ImageReveal
                        src={shopping.image.src}
                        alt={shopping.image.alt}
                        sizes="(min-width: 1024px) 32vw, 100vw"
                        className="mt-10 aspect-square bg-ivory"
                    />
                </div>
                <ol className="lg:col-span-6 lg:col-start-7">
                    {shopping.steps.map((step, index) => (
                        <li key={step.title} className="group border-t border-charcoal/10 py-7 first:border-t-0 first:pt-0">
                            <Reveal>
                                <div className="flex items-baseline gap-4">
                                    <span className="font-serif text-3xl leading-none text-champagne/90 italic">0{index + 1}</span>
                                    <h3 className="font-serif text-2xl leading-tight">{step.title}</h3>
                                </div>
                                <p className="mt-3 max-w-md pl-[2.75rem] text-[15px] leading-relaxed text-ash md:pl-14">{step.text}</p>
                            </Reveal>
                        </li>
                    ))}
                    <li className="flex flex-wrap gap-4 border-t border-charcoal/10 pt-8">
                        <Button href={paths.shop} variant="secondary">
                            {shopping.shopCta}
                        </Button>
                        <Button href={`https://wa.me/${site.contact.whatsapp}`} external variant="link">
                            {shopping.whatsappCta}
                        </Button>
                    </li>
                </ol>
            </Container>
        </section>
    );
}

function Closing() {
    const { closing } = story;

    return (
        <section className="border-t border-charcoal/8 py-20 md:py-28">
            <Container className="grid gap-10 md:grid-cols-12 md:items-end">
                <div className="md:col-span-7">
                    <h2 className="type-headline max-w-[16ch]">{closing.title}</h2>
                    <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ash">
                        Browse the full catalog online. When you are ready, continue on WhatsApp—we are not a walk-in store.
                    </p>
                </div>
                <div className="flex flex-wrap gap-4 md:col-span-5 md:justify-end">
                    <Button href={paths.shop}>{closing.cta}</Button>
                    <Button href={paths.contact} variant="secondary">
                        Contact
                    </Button>
                </div>
            </Container>
        </section>
    );
}

export function WhyPageContent() {
    return (
        <>
            <Philosophy />
            <PillarList />
            <QualityBand />
            <Visit />
            <Closing />
        </>
    );
}
