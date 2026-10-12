import Link from 'next/link';
import { collections } from 'data/collections';
import { home } from 'data/home';
import { Container } from 'components/ui/Container';
import { HoverImage } from 'components/ui/HoverImage';
import { Reveal } from 'components/ui/Reveal';

export function CategoryShowcase() {
    const [rings, earrings, necklaces, bracelets] = collections;
    const content = home.categories;

    return (
        <section className="border-t border-charcoal/10 pt-20 pb-24 md:pt-28 md:pb-32">
            <Container>
                <Reveal className="mb-12 max-w-lg md:mb-16">
                    <p className="eyebrow mb-5">{content.eyebrow}</p>
                    <h2 className="type-headline">{content.title}</h2>
                </Reveal>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2 lg:gap-5">
                    <CategoryTile item={rings} className="min-h-[28rem] lg:col-span-7 lg:row-span-2 lg:min-h-[44rem]" />
                    <CategoryTile item={earrings} className="min-h-[22rem] lg:col-span-5" />
                    <CategoryTile item={necklaces} className="min-h-[22rem] lg:col-span-5" />
                </div>
                <CategoryTile item={bracelets} className="mt-4 min-h-[20rem] lg:mt-5 lg:min-h-[26rem]" wide />
            </Container>
        </section>
    );
}

function CategoryTile({ item, className, wide = false }) {
    return (
        <Link href={item.href} className={`group relative block overflow-hidden bg-charcoal text-ivory ${className}`}>
            <HoverImage
                src={item.image.src}
                alt={item.image.alt}
                className="absolute inset-0 h-full w-full"
                sizes={wide ? '100vw' : '(min-width: 1024px) 50vw, 100vw'}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <span className="mb-3 block h-px w-8 bg-champagne/80" />
                <h3 className="font-serif text-[2rem] leading-none font-normal md:text-[2.35rem]">{item.name}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory/75">{item.description}</p>
            </div>
        </Link>
    );
}
