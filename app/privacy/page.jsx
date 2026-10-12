import { paths, site } from 'data/site';
import { Container } from 'components/ui/Container';
import { Breadcrumb } from 'components/ui/Breadcrumb';

export const metadata = {
    title: 'Privacy',
    description: `Privacy placeholder for the ${site.name} preview. No policy has been published.`,
    alternates: { canonical: paths.privacy }
};

export default function PrivacyPage() {
    return (
        <Container className="max-w-3xl py-12 md:py-16">
            <Breadcrumb items={[{ label: 'Home', href: paths.home }, { label: 'Privacy' }]} />
            <h1 className="type-headline mt-6">Privacy</h1>
            <p className="mt-6 text-[15px] leading-relaxed text-ash">
                This is a placeholder. {site.name} has not published a privacy policy. The inquiry form and newsletter do not store or send what you type beyond this browser session, except for pieces you save locally for an inquiry draft.
            </p>
        </Container>
    );
}
