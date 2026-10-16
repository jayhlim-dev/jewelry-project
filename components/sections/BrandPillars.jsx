import { home } from 'data/home';
import { Button } from 'components/ui/Button';
import { Container } from 'components/ui/Container';
import { ImageReveal } from 'components/ui/ImageReveal';
import { Reveal } from 'components/ui/Reveal';

export function BrandPillars({ showCta = true }) {
    const content = home.pillars;

    return (
        <section className="py-24 md:py-32">
            <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-6 lg:sticky lg:top-28 lg:self-start">
                    <ImageReveal
                        src={content.items[0].image.src}
                        alt={content.items[0].image.alt}
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="aspect-[4/5]"
                    />
                    <ImageReveal
                        src={content.items[2].image.src}
                        alt={content.items[2].image.alt}
                        sizes="(min-width: 1024px) 24vw, 70vw"
                        className="mt-4 ml-auto hidden aspect-[5/4] w-[72%] lg:block"
                    />
                </div>
                <div className="lg:col-span-5 lg:col-start-8">
                    <Reveal>
                        <p className="eyebrow mb-5">{content.eyebrow}</p>
                        <h2 className="type-headline">{content.title}</h2>
                        <p className="mt-5 max-w-md text-sm leading-7 text-ash">{content.text}</p>
                    </Reveal>
                    <ol className="mt-12 border-t border-charcoal/10">
                        {content.items.map((item, index) => (
                            <li key={item.id} className="border-b border-charcoal/10 py-8">
                                <Reveal>
                                    <p className="font-serif text-2xl leading-none text-champagne italic">0{index + 1}</p>
                                    <h3 className="mt-3 font-serif text-[1.85rem] leading-tight font-normal">{item.title}</h3>
                                    <p className="mt-3 max-w-md text-sm leading-7 text-ash">{item.summary}</p>
                                </Reveal>
                            </li>
                        ))}
                    </ol>
                    {showCta ? (
                        <div className="mt-10">
                            <Button href={content.href} variant="link">
                                {content.cta}
                            </Button>
                        </div>
                    ) : null}
                </div>
            </Container>
        </section>
    );
}
