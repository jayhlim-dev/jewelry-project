import { home } from 'data/home';
import { Button } from 'components/ui/Button';
import { ImageReveal } from 'components/ui/ImageReveal';
import { Reveal } from 'components/ui/Reveal';

export function DiamondFeature() {
    const content = home.diamond;

    return (
        <section className="bg-charcoal text-ivory">
            <div className="grid min-h-[36rem] lg:grid-cols-2">
                <ImageReveal
                    src={content.image.src}
                    alt={content.image.alt}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="min-h-[24rem] lg:min-h-full"
                />
                <div className="flex flex-col justify-center px-5 py-20 md:px-14 lg:px-20 lg:py-28">
                    <Reveal>
                        <p className="eyebrow mb-5 text-champagne">{content.eyebrow}</p>
                        <span className="mb-6 block h-px w-10 bg-champagne/80" />
                        <h2 className="type-headline max-w-[14ch] text-balance">{content.title}</h2>
                        <p className="mt-6 max-w-md text-sm leading-7 text-ivory/70 md:text-[15px]">{content.text}</p>
                        <div className="mt-10">
                            <Button href={content.href} variant="linkLight">
                                {content.cta}
                            </Button>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
