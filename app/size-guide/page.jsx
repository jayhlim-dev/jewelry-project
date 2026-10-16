import Link from 'next/link';
import { ringSizes, sizeGuide } from 'data/size-guide';
import { paths, site } from 'data/site';
import { Breadcrumb } from 'components/ui/Breadcrumb';
import { Container } from 'components/ui/Container';
import { Button } from 'components/ui/Button';

export const metadata = {
    title: 'Size guide',
    description: site.seo.sizeGuide,
    alternates: { canonical: paths.sizeGuide },
    openGraph: { title: 'Size guide', description: site.seo.sizeGuide, url: paths.sizeGuide }
};

export default function SizeGuidePage() {
    return (
        <Container className="max-w-5xl py-12 md:py-16">
            <Breadcrumb items={[{ label: 'Home', href: paths.home }, { label: 'Size guide' }]} />
            <p className="eyebrow mt-8">{sizeGuide.eyebrow}</p>
            <h1 className="type-headline mt-4 max-w-[12ch]">{sizeGuide.title}</h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ash md:text-base">{sizeGuide.estimate}</p>

            <div className="mt-12 grid gap-12 border-t border-charcoal/10 pt-10 md:grid-cols-2">
                {sizeGuide.methods.map((method, index) => (
                    <section key={method.title}>
                        <p className="text-[11px] tracking-[0.18em] text-taupe">0{index + 1}</p>
                        <h2 className="mt-3 font-serif text-3xl font-normal">{method.title}</h2>
                        <ol className="mt-6 space-y-4">
                            {method.steps.map((step, stepIndex) => (
                                <li key={step} className="grid grid-cols-[2rem_1fr] gap-3 text-sm leading-relaxed">
                                    <span className="text-ash">{stepIndex + 1}</span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ol>
                    </section>
                ))}
            </div>

            <p className="mt-10 max-w-xl text-sm leading-relaxed text-ash">{sizeGuide.note}</p>

            <div className="mt-14">
                <h2 className="font-serif text-2xl font-normal">The chart</h2>
                <p className="mt-2 max-w-md text-sm text-ash">Match the number you measured. Both columns are millimetres.</p>
                <div className="mt-8 grid gap-x-16 md:grid-cols-2">
                    {[ringSizes.slice(0, 14), ringSizes.slice(14)].map((column) => (
                        <div key={column[0].circumference}>
                            <div className="grid grid-cols-2 border-b border-charcoal/10 pb-3 text-[11px] tracking-[0.14em] text-ash uppercase">
                                <p>Around</p>
                                <p className="text-right">Across</p>
                            </div>
                            <ul className="divide-y divide-charcoal/10">
                                {column.map((row) => (
                                    <li key={row.circumference} className="grid grid-cols-2 py-3 text-sm tabular-nums">
                                        <span>{row.circumference}</span>
                                        <span className="text-right text-ash">{row.diameter.toFixed(1)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-6">
                <Button href={`${paths.collections}/rings`}>Shop rings</Button>
                <Link href={paths.shop} className="text-[11px] tracking-[0.18em] uppercase underline-offset-4 hover:underline">
                    All pieces
                </Link>
            </div>
        </Container>
    );
}
