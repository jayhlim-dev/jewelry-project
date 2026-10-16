import { paths, site } from 'data/site';
import { Container } from 'components/ui/Container';
import { Breadcrumb } from 'components/ui/Breadcrumb';

export const metadata = {
    title: 'Terms',
    description: `How ${site.name} lists pieces and confirms an inquiry.`,
    alternates: { canonical: paths.terms }
};

export default function TermsPage() {
    return (
        <Container className="max-w-3xl py-12 md:py-16">
            <Breadcrumb items={[{ label: 'Home', href: paths.home }, { label: 'Terms' }]} />
            <h1 className="type-headline mt-6">Terms</h1>
            <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ash">
                <p>This website lists pieces and takes inquiries. It does not take payment.</p>
                <p>A price is in rupiah. It is confirmed with you before anything is agreed.</p>
                <p>Saving a piece keeps it in this browser so you can ask about it. It does not reserve the jewel.</p>
            </div>
        </Container>
    );
}
