import { LegalPage } from 'components/legal/LegalPage';
import { getContent } from 'lib/content';

const UPDATED = '14 November 2026';

export async function generateMetadata() {
    const { site } = await getContent();
    return {
        title: 'Terms of use',
        description: `How ${site.name} lists pieces, shows a price, and confirms an inquiry.`,
        alternates: { canonical: site.paths.terms },
        openGraph: {
            title: 'Terms of use',
            description: `How ${site.name} lists pieces, shows a price, and confirms an inquiry.`,
            url: site.paths.terms
        }
    };
}

export default async function TermsPage() {
    const { site } = await getContent();
    const paths = site.paths;
    const name = site.name;

    return (
        <LegalPage
            breadcrumb={[
                { label: 'Home', href: paths.home },
                { label: 'Terms of use' }
            ]}
            eyebrow="Terms"
            title="Terms of use"
            lead={`This website shows pieces from ${name} and takes inquiries. It does not take payment, and it does not finish an order by itself.`}
            updated={UPDATED}
            email={site.contact.email}
            contactHref={paths.contact}
            related={[
                { label: 'Privacy policy', href: paths.privacy },
                { label: 'Contact', href: paths.contact }
            ]}
            sections={[
                {
                    id: 'use',
                    title: 'Using this website',
                    paragraphs: [
                        'You may browse the collection, read a piece, and write to us about it.',
                        'Please use the site to look, compare, and inquire. Do not try to break it, copy it in bulk, or send anything that is not yours to share.'
                    ]
                },
                {
                    id: 'pieces',
                    title: 'Pieces and prices',
                    paragraphs: [
                        'A price on a page is in rupiah when a price is shown. It is a guide.',
                        'We confirm the piece, the price, the size, and the details with you before anything is agreed. Stock can change. A listing is not a promise that a piece is held for you.'
                    ]
                },
                {
                    id: 'orders',
                    title: 'How an order is made',
                    paragraphs: [
                        'There is no checkout on this website. Nothing is charged here.',
                        'If you want a piece, we finish that conversation with you on WhatsApp or by email. A sale exists only after we confirm it with you.'
                    ]
                },
                {
                    id: 'saved',
                    title: 'Saved pieces',
                    paragraphs: [
                        'The list on this site remembers pieces in this browser so you can ask about them.',
                        'Saving a piece does not reserve it. Removing it, or clearing your browser data, only changes the list on your device.'
                    ]
                },
                {
                    id: 'words',
                    title: 'Words and pictures',
                    paragraphs: [
                        'Product text and pictures describe the piece as it is listed. Metal, stones, size, and stock are confirmed with you before you decide.',
                        'Please do not reuse our photographs or product text for your own shop without asking us first.'
                    ]
                },
                {
                    id: 'messages',
                    title: 'Your messages',
                    paragraphs: [
                        'Tell us what you need in plain words: the piece, the size, and the question.',
                        'Do not send passwords, card numbers, or another person’s private details. We only need enough to answer you.'
                    ]
                },
                {
                    id: 'changes',
                    title: 'Changes',
                    paragraphs: [
                        'We may update these terms when the website changes. The date at the top is the date of the latest version.',
                        'If you keep using the site after that date, you are using it under the new terms.'
                    ]
                }
            ]}
        />
    );
}
