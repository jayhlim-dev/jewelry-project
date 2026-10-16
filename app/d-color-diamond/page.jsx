import { notFound } from 'next/navigation';
import { diamondPage } from 'data/diamond';
import { paths, site } from 'data/site';
import { isDColorDiamondEnabled } from 'lib/features';
import { Button } from 'components/ui/Button';
import { Container } from 'components/ui/Container';
import { FaqList } from 'components/ui/FaqList';
import { ImageReveal } from 'components/ui/ImageReveal';
import { Reveal } from 'components/ui/Reveal';

export const metadata = {
    title: 'D Color Diamonds',
    description: site.seo.diamond,
    alternates: { canonical: paths.diamond },
    openGraph: { title: 'D Color Diamonds', description: site.seo.diamond, url: paths.diamond }
};

export default function DiamondPage() {
    if (!isDColorDiamondEnabled()) notFound();

    const page = diamondPage;

    return (
        <article>
            <section className="relative min-h-[78svh] bg-charcoal text-ivory">
                <div className="absolute inset-0">
                    <ImageReveal src={page.hero.image.src} alt={page.hero.image.alt} priority sizes="100vw" className="h-full min-h-[78svh]" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/25 to-charcoal/25" />
                <Container className="relative flex min-h-[78svh] flex-col justify-end py-16">
                    <p className="eyebrow text-champagne">{page.hero.eyebrow}</p>
                    <h1 className="type-display mt-4 max-w-[16ch]">{page.hero.title}</h1>
                    <p className="mt-5 max-w-lg text-sm leading-relaxed text-ivory/80 md:text-base">{page.hero.text}</p>
                </Container>
            </section>

            <section className="py-20 md:py-28">
                <Container className="grid gap-8 lg:grid-cols-12">
                    <h2 className="type-headline lg:col-span-5">{page.intro.title}</h2>
                    <div className="lg:col-span-6 lg:col-start-7">
                        {page.intro.paragraphs.map((paragraph) => (
                            <p key={paragraph} className="mt-4 text-[15px] leading-relaxed text-ash first:mt-0 md:text-base">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="bg-white py-16 md:py-24">
                <Container>
                    <Reveal className="max-w-2xl">
                        <h2 className="type-headline">{page.scaleIntro.title}</h2>
                        <p className="mt-5 text-[15px] leading-relaxed text-ash">{page.scaleIntro.text}</p>
                    </Reveal>
                    <ol className="mt-12 divide-y divide-charcoal/10 border-y border-charcoal/10">
                        {page.groups.map((group) => (
                            <li key={group.name} className="grid gap-3 py-6 md:grid-cols-12 md:items-baseline">
                                <h3 className="font-serif text-2xl md:col-span-3">{group.name}</h3>
                                <p className="text-sm tracking-[0.14em] text-champagne uppercase md:col-span-3">{group.letters}</p>
                                <p className="text-sm leading-relaxed text-ash md:col-span-6">{group.note}</p>
                            </li>
                        ))}
                    </ol>
                </Container>
            </section>

            <section className="py-16 md:py-24">
                <Container className="grid items-center gap-10 lg:grid-cols-12">
                    <ImageReveal
                        src={page.appearance.image.src}
                        alt={page.appearance.image.alt}
                        sizes="(min-width: 1024px) 42vw, 100vw"
                        className="aspect-[4/5] lg:col-span-5"
                    />
                    <div className="lg:col-span-6 lg:col-start-7">
                        <h2 className="type-headline">{page.appearance.title}</h2>
                        {page.appearance.paragraphs.map((paragraph) => (
                            <p key={paragraph} className="mt-5 text-[15px] leading-relaxed text-ash">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="bg-charcoal py-16 text-ivory md:py-24">
                <Container>
                    <h2 className="type-headline max-w-xl">{page.fourCs.title}</h2>
                    <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ivory/70">{page.fourCs.text}</p>
                    <div className="mt-12 grid gap-px bg-ivory/15 md:grid-cols-2">
                        {page.fourCs.items.map((item) => (
                            <div key={item.title} className="bg-charcoal p-6 md:p-8">
                                <h3 className="font-serif text-3xl">{item.title}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-ivory/70">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="py-16 md:py-24">
                <Container className="max-w-3xl">
                    <h2 className="type-headline">{page.certification.title}</h2>
                    {page.certification.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="mt-5 text-[15px] leading-relaxed text-ash">
                            {paragraph}
                        </p>
                    ))}
                </Container>
            </section>

            <section className="pb-16 md:pb-24">
                <Container className="max-w-3xl">
                    <h2 className="type-headline mb-8">Questions</h2>
                    <FaqList items={page.faqs} />
                </Container>
            </section>

            <section className="border-t border-charcoal/10 py-16 md:py-20">
                <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                    <h2 className="type-title max-w-md">See the pieces, without treating color as the only measure.</h2>
                    <Button href={paths.shop}>Browse jewelry</Button>
                </Container>
            </section>
        </article>
    );
}
