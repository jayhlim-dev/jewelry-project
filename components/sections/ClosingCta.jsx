import { home } from 'data/home';
import { Button } from 'components/ui/Button';
import { ImageReveal } from 'components/ui/ImageReveal';

export function ClosingCta() {
    const content = home.closing;

    return (
        <section>
            <div className="grid lg:min-h-[36rem] lg:grid-cols-2">
                <div className="flex flex-col justify-end px-5 py-20 md:px-14 md:py-24 lg:px-20 lg:py-28">
                    <p className="eyebrow">{content.eyebrow}</p>
                    <span className="mt-6 block h-px w-10 bg-champagne" />
                    <h2 className="type-headline mt-6 max-w-[12ch]">{content.title}</h2>
                    <div className="mt-10">
                        <Button href={content.href} variant="link">
                            {content.cta}
                        </Button>
                    </div>
                </div>
                <ImageReveal
                    src={content.image.src}
                    alt={content.image.alt}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="min-h-[24rem] lg:min-h-full"
                />
            </div>
        </section>
    );
}
