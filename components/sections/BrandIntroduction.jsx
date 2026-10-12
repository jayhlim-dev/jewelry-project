import { home } from 'data/home';
import { Container } from 'components/ui/Container';
import { ImageReveal } from 'components/ui/ImageReveal';
import { Reveal } from 'components/ui/Reveal';
import { AnimatedText } from 'components/ui/AnimatedText';

export function BrandIntroduction() {
    const content = home.introduction;

    return (
        <section className="py-24 md:py-32 lg:py-40">
            <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
                <div className="lg:col-span-6">
                    <ImageReveal
                        src={content.image.src}
                        alt={content.image.alt}
                        sizes="(min-width: 1024px) 42vw, 100vw"
                        className="aspect-[4/5]"
                    />
                    <p className="mt-4 text-[11px] tracking-[0.18em] text-taupe uppercase">Still life</p>
                </div>
                <div className="lg:col-span-5 lg:col-start-8">
                    <Reveal>
                        <p className="eyebrow mb-5">{content.eyebrow}</p>
                    </Reveal>
                    <AnimatedText text={content.title} as="h2" className="type-headline" />
                    <Reveal>
                        <span className="mt-6 block h-px w-10 bg-champagne" />
                    </Reveal>
                    {content.paragraphs.map((paragraph, index) => (
                        <Reveal key={paragraph}>
                            <p
                                className={
                                    index === 0
                                        ? 'mt-6 font-serif text-[1.35rem] leading-snug text-charcoal md:text-[1.55rem]'
                                        : 'mt-6 max-w-md text-sm leading-7 text-ash'
                                }
                            >
                                {paragraph}
                            </p>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    );
}
