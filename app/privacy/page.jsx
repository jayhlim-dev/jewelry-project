import { paths, site } from 'data/site';
import { Container } from 'components/ui/Container';
import { Breadcrumb } from 'components/ui/Breadcrumb';

export const metadata = {
    title: 'Privacy',
    description: `How ${site.name} handles an inquiry and pieces saved in this browser.`,
    alternates: { canonical: paths.privacy }
};

export default function PrivacyPage() {
    return (
        <Container className="max-w-3xl py-12 md:py-16">
            <Breadcrumb items={[{ label: 'Home', href: paths.home }, { label: 'Privacy' }]} />
            <h1 className="type-headline mt-6">Privacy</h1>
            <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ash">
                <p>Pieces you save stay in this browser. They are used to draft an inquiry. Clearing the site data removes them.</p>
                <p>The contact form opens your email app with the note you wrote. WhatsApp opens with a draft that names the piece.</p>
                <p>This website does not run a mailing list.</p>
            </div>
        </Container>
    );
}
