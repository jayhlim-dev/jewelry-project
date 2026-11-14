import Link from 'next/link';
import { Breadcrumb } from 'components/ui/Breadcrumb';
import { Container } from 'components/ui/Container';

function pad(index) {
    return String(index + 1).padStart(2, '0');
}

export function LegalPage({
    breadcrumb,
    eyebrow,
    title,
    lead,
    updated,
    sections,
    email,
    contactHref,
    related = []
}) {
    return (
        <div className="bg-ivory pb-16 text-charcoal md:pb-24">
            <section className="border-b border-white/10 bg-charcoal text-ivory">
                <Container className="pt-10 pb-12 md:pt-14 md:pb-16">
                    <Breadcrumb variant="light" items={breadcrumb} />
                    <header className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
                        <div className="lg:col-span-7">
                            <p className="eyebrow mb-4 text-champagne">{eyebrow}</p>
                            <h1 className="type-headline max-w-[14ch] text-balance text-ivory">{title}</h1>
                        </div>
                        <div className="lg:col-span-5 lg:pb-1">
                            <p className="max-w-md text-[15px] leading-7 text-ivory/80">{lead}</p>
                            <p className="mt-5 text-[11px] tracking-[0.22em] text-ivory/55 uppercase">Updated {updated}</p>
                        </div>
                    </header>
                </Container>
            </section>

            <Container className="grid gap-12 py-12 lg:grid-cols-12 lg:gap-16 lg:py-16">
                <aside className="lg:col-span-4">
                    <div className="lg:sticky lg:top-28">
                        <p className="eyebrow mb-4">On this page</p>
                        <nav aria-label="On this page">
                            <ol className="space-y-3">
                                {sections.map((section, index) => (
                                    <li key={section.id}>
                                        <a
                                            href={`#${section.id}`}
                                            className="group flex items-baseline gap-3 text-sm leading-snug text-ash transition-colors hover:text-charcoal"
                                        >
                                            <span className="w-7 shrink-0 font-serif text-[15px] text-champagne italic">
                                                {pad(index)}
                                            </span>
                                            <span className="border-b border-transparent pb-0.5 group-hover:border-charcoal/25">
                                                {section.title}
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ol>
                        </nav>

                        <div className="mt-10 border border-charcoal/10 bg-white p-5 md:p-6">
                            <p className="eyebrow mb-3">Write to us</p>
                            <p className="text-sm leading-6 text-ash">
                                Questions about this page go to the house.
                            </p>
                            <a
                                href={`mailto:${email}`}
                                className="mt-4 inline-block border-b border-charcoal/25 pb-0.5 text-sm text-charcoal hover:border-charcoal"
                            >
                                {email}
                            </a>
                            <div className="mt-4">
                                <Link
                                    href={contactHref}
                                    className="text-[11px] tracking-[0.18em] text-ash uppercase transition-colors hover:text-charcoal"
                                >
                                    Contact form
                                </Link>
                            </div>
                        </div>
                    </div>
                </aside>

                <div className="lg:col-span-7 lg:col-start-6">
                    {sections.map((section, index) => (
                        <section
                            key={section.id}
                            id={section.id}
                            className="scroll-mt-28 border-t border-charcoal/10 py-8 first:border-t-0 first:pt-0 md:py-10"
                        >
                            <p className="font-serif text-xl leading-none text-champagne italic">{pad(index)}</p>
                            <h2 className="mt-3 font-serif text-[1.65rem] leading-snug text-charcoal md:text-[1.85rem]">
                                {section.title}
                            </h2>
                            <div className="mt-4 space-y-4 text-[15px] leading-7 text-ash">
                                {section.paragraphs.map((paragraph) => (
                                    <p key={paragraph}>{paragraph}</p>
                                ))}
                            </div>
                            {section.points?.length ? (
                                <ul className="mt-5 space-y-3">
                                    {section.points.map((point) => (
                                        <li key={point} className="flex gap-3 text-[15px] leading-7 text-charcoal">
                                            <span aria-hidden className="mt-[0.7rem] h-px w-4 shrink-0 bg-champagne" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : null}
                        </section>
                    ))}

                    {related.length ? (
                        <nav
                            aria-label="Related pages"
                            className="mt-4 flex flex-wrap gap-x-6 gap-y-3 border-t border-charcoal/10 pt-8 text-sm"
                        >
                            {related.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="border-b border-charcoal/20 pb-0.5 text-charcoal hover:border-charcoal"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    ) : null}
                </div>
            </Container>
        </div>
    );
}
