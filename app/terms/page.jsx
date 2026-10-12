import { paths, site } from 'data/site';
import { Container } from 'components/ui/Container';
import { Breadcrumb } from 'components/ui/Breadcrumb';

export const metadata = {
    title: 'Terms',
    description: `Terms placeholder for the ${site.name} preview. No terms of sale have been published.`,
    alternates: { canonical: paths.terms }
};

export default function TermsPage() {
    return (
        <Container className="max-w-3xl py-12 md:py-16">
            <Breadcrumb items={[{ label: 'Home', href: paths.home }, { label: 'Terms' }]} />
            <h1 className="type-headline mt-6">Terms</h1>
            <p className="mt-6 text-[15px] leading-relaxed text-ash">
                This is a placeholder. There are no terms of sale, because this website does not sell jewelry. Sample prices, product names, and photographs can be replaced when a real catalog exists.
            </p>
        </Container>
    );
}
