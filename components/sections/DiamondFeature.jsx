import Image from 'next/image';
import { home } from 'data/home';
import { Button } from 'components/ui/Button';

export function DiamondFeature() {
    const content = home.diamond;

    return (
        <section className="grid bg-white md:grid-cols-2" aria-label="Diamond color">
            <div className="relative min-h-[18rem] md:min-h-[24rem]">
                <Image src={content.image.src} alt={content.image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center px-5 py-8 md:px-16 md:py-10">
                <p className="text-[11px] tracking-[0.22em] text-champagne uppercase">{content.eyebrow}</p>
                <h2 className="mt-2 max-w-sm font-serif text-[1.7rem] leading-tight font-normal md:text-[2rem]">{content.title}</h2>
                <p className="mt-2 max-w-md text-sm leading-7 text-ash">{content.text}</p>
                <div className="mt-4">
                    <Button href={content.href} variant="link">
                        {content.cta}
                    </Button>
                </div>
            </div>
        </section>
    );
}
