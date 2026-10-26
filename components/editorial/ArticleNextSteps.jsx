import Link from 'next/link';
import { Button } from 'components/ui/Button';

export function ArticleNextSteps({ title, lead, steps }) {
    if (!steps?.length) return null;

    const [primary, ...secondary] = steps;

    return (
        <section className="border border-charcoal/12 bg-white p-6 sm:p-8" aria-labelledby="article-next-steps-heading">
            <h2 id="article-next-steps-heading" className="font-serif text-[1.35rem] leading-tight md:text-[1.5rem]">
                {title}
            </h2>
            {lead ? <p className="mt-2 max-w-lg text-sm leading-7 text-ash">{lead}</p> : null}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                {primary.external ? (
                    <Button href={primary.href} external className="w-full sm:w-auto">
                        {primary.label}
                    </Button>
                ) : (
                    <Button href={primary.href} className="w-full sm:w-auto">
                        {primary.label}
                    </Button>
                )}
                {secondary.map((step) => (
                    <Link
                        key={step.href}
                        href={step.href}
                        className="min-h-11 inline-flex items-center text-sm text-ash underline-offset-4 hover:text-charcoal hover:underline"
                    >
                        {step.label}
                    </Link>
                ))}
            </div>
        </section>
    );
}
