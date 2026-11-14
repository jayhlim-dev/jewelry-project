import { LegalPage } from 'components/legal/LegalPage';
import { getContent } from 'lib/content';

const UPDATED = '14 November 2026';

export async function generateMetadata() {
    const { site } = await getContent();
    return {
        title: 'Privacy policy',
        description: `How ${site.name} handles a message you send, and pieces saved in this browser.`,
        alternates: { canonical: site.paths.privacy },
        openGraph: {
            title: 'Privacy policy',
            description: `How ${site.name} handles a message you send, and pieces saved in this browser.`,
            url: site.paths.privacy
        }
    };
}

export default async function PrivacyPage() {
    const { site } = await getContent();
    const paths = site.paths;
    const name = site.name;

    return (
        <LegalPage
            breadcrumb={[
                { label: 'Home', href: paths.home },
                { label: 'Privacy policy' }
            ]}
            eyebrow="Privacy"
            title="Privacy policy"
            lead={`${name} uses this website to show pieces and take inquiries. This page says what we keep, and what we leave on your device.`}
            updated={UPDATED}
            email={site.contact.email}
            contactHref={paths.contact}
            related={[
                { label: 'Terms of use', href: paths.terms },
                { label: 'Contact', href: paths.contact }
            ]}
            sections={[
                {
                    id: 'scope',
                    title: 'What this page covers',
                    paragraphs: [
                        `This policy is about the ${name} website. It covers the contact form, links that open WhatsApp, and pieces you save in this browser.`,
                        'It is written in plain language so you can see what the site actually does.'
                    ]
                },
                {
                    id: 'who',
                    title: 'Who we are',
                    paragraphs: [
                        `${name} is an online jewelry house. This website has no showroom and no checkout.`,
                        'If you have a question about this policy, write to the email on this page. We reply to the address you give us.'
                    ]
                },
                {
                    id: 'messages',
                    title: 'Messages you send',
                    paragraphs: [
                        'The contact form sends a note to the house by email. We use it to answer you. We do not add you to a mailing list.'
                    ],
                    points: [
                        'Your name',
                        'Your email address',
                        'The topic you chose',
                        'The message you wrote'
                    ]
                },
                {
                    id: 'saved',
                    title: 'Pieces saved in this browser',
                    paragraphs: [
                        'When you save a piece, this browser keeps a short record so you can ask about it later. That record stays on your device. It is not sent to us until you choose to inquire.',
                        'Clearing this site’s data in your browser removes it. Saving a piece does not hold or reserve the jewel.'
                    ],
                    points: [
                        'Name, code, and category',
                        'Metal, size, and any note you add',
                        'The listed price, when a price is shown',
                        'A picture of the piece'
                    ]
                },
                {
                    id: 'whatsapp',
                    title: 'WhatsApp',
                    paragraphs: [
                        'A WhatsApp button opens WhatsApp with a draft. That draft can name the piece. WhatsApp then handles the chat under its own rules.',
                        'We see the message only if you send it.'
                    ]
                },
                {
                    id: 'not-collected',
                    title: 'What we do not do',
                    paragraphs: [
                        'This website does not take payment and does not ask you to create an account. We do not sell your details.'
                    ],
                    points: [
                        'No card numbers',
                        'No customer accounts',
                        'No mailing list from this site',
                        'No sale of your name or email'
                    ]
                },
                {
                    id: 'keeping',
                    title: 'How long we keep a message',
                    paragraphs: [
                        'We keep a contact message for as long as we need it to answer you, and for a short time after, in case you write again about the same piece.',
                        'You can ask us to delete a message you sent. Write to the email on this page and tell us which note you mean.'
                    ]
                },
                {
                    id: 'other-sites',
                    title: 'Other services',
                    paragraphs: [
                        'WhatsApp and your email app are separate services. When you leave this website, their own privacy rules apply.',
                        'We do not control what those services store after you send a message.'
                    ]
                },
                {
                    id: 'changes',
                    title: 'Changes to this page',
                    paragraphs: [
                        'If this page changes, the date at the top changes with it. The new text applies from that date.'
                    ]
                }
            ]}
        />
    );
}
