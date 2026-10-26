import { pillars, story } from 'data/story';
import { paths, site } from 'data/site';
import { isCatalogPriceVisible } from 'lib/features';
import { Button } from 'components/ui/Button';
import { Container } from 'components/ui/Container';
import { ImageReveal } from 'components/ui/ImageReveal';

function Philosophy() {
    const { philosophy } = story;

    return (
        <section className="bg-ivory py-14 md:py-16">
            <Container>
                <div className="max-w-xl">
                    <p className="eyebrow mb-3">{philosophy.eyebrow}</p>
                    <h2 className="type-title text-balance">{philosophy.title}</h2>
                    <p className="mt-4 max-w-[36rem] text-[15px] leading-7 text-ash">{philosophy.paragraphs[0]}</p>
                </div>
                <ImageReveal
                    src={philosophy.image.src}
                    alt={philosophy.image.alt}
                    sizes="(min-width: 1024px) 80vw, 100vw"
                    className="mt-8 aspect-[16/10] w-full md:mt-10 md:aspect-[21/9] rounded-md"
                />
            </Container>
        </section>
    );
}

function Standards() {
    return (
        <section className="border-t border-charcoal/8 bg-white py-14 md:py-16">
            <Container>
                <header className="max-w-lg">
                    <p className="eyebrow mb-3">Four standards</p>
                    <h2 className="type-title text-balance">What we hold every piece to.</h2>
                </header>
                <ul className="mt-10 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
                    {pillars.map((pillar, index) => (
                        <li key={pillar.id}>
                            <ImageReveal
                                src={pillar.image.src}
                                alt={pillar.image.alt}
                                sizes="(min-width: 1024px) 22vw, 50vw"
                                className="aspect-[4/5] rounded-md"
                            />
                            <p className="mt-4 text-[11px] tracking-[0.2em] text-taupe uppercase">0{index + 1}</p>
                            <h3 className="mt-1.5 font-serif text-[1.2rem] leading-snug text-charcoal md:text-[1.35rem]">
                                {pillar.title}
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-ash">{pillar.summary}</p>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}

function HowToShop() {
    const { shopping, closing } = story;
    const pieceStepText = isCatalogPriceVisible()
        ? 'Metal, known stones, and price on each piece page.'
        : 'Metal and known stones on each piece page.';

    const steps = shopping.steps.map((step) =>
        step.title === 'Read each piece' ? { ...step, text: pieceStepText } : step
    );

    return (
        <section className="border-t border-charcoal/8 bg-ivory py-14 md:py-16">
            <Container>
                <p className="eyebrow mb-3">{shopping.eyebrow}</p>
                <h2 className="type-title max-w-[20ch] text-balance">{closing.title}</h2>
                <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
                    {steps.map((step, index) => (
                        <li key={step.title}>
                            <p className="font-serif text-2xl leading-none text-champagne italic">0{index + 1}</p>
                            <h3 className="mt-3 font-serif text-xl leading-snug">{step.title}</h3>
                            <p className="mt-2 text-sm leading-6 text-ash">{step.text}</p>
                        </li>
                    ))}
                </ol>
                <div className="mt-10 flex flex-wrap gap-4">
                    <Button href={paths.shop}>{shopping.shopCta}</Button>
                    <Button href={`https://wa.me/${site.contact.whatsapp}`} external variant="secondary">
                        {shopping.whatsappCta}
                    </Button>
                </div>
                <p className="mt-6 text-sm text-ash">
                    Prefer email?{' '}
                    <a href={paths.contact} className="border-b border-charcoal/25 text-charcoal hover:border-charcoal">
                        Contact form
                    </a>
                    .
                </p>
            </Container>
        </section>
    );
}

export function WhyPageContent() {
    return (
        <>
            <Philosophy />
            <Standards />
            <HowToShop />
        </>
    );
}
