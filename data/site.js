const brandName = 'XXXX';

export const paths = {
    home: '/',
    shop: '/shop',
    why: '/why-xxxx',
    diamond: '/d-color-diamond',
    contact: '/contact',
    articles: '/articles',
    privacy: '/privacy',
    terms: '/terms'
};

export const site = {
    name: brandName,
    tagline: 'Fine jewelry, considered slowly.',
    description:
        'XXXX is a fictional fine jewelry house. This website is a design preview with sample pieces, placeholder contact details, and temporary photography.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://xxxx.example',
    previewNote:
        'Sample collection for this design preview. Names, prices, metals, and photographs are temporary and are not an offer to sell.',
    placeholderNotice:
        'Placeholder. Statements about diamond origin, certification, making, or sourcing are not confirmed and should not be read as facts about a real business.',
    navigation: [
        { label: 'Home', href: paths.home },
        { label: 'Shop', href: paths.shop },
        { label: `Why ${brandName}`, href: paths.why },
        { label: 'D Color Diamond', href: paths.diamond },
        { label: 'Contact', href: paths.contact },
        { label: 'Articles', href: paths.articles }
    ],
    contact: {
        email: 'hello@xxxx.example',
        phone: '+62 000 0000 0000',
        phoneNote: 'Placeholder number. This line is not connected.',
        whatsapp: '620000000000',
        whatsappLabel: 'WhatsApp',
        whatsappNote: 'Opens WhatsApp. The number is still a placeholder.',
        addressLines: ['Boutique address placeholder', 'City placeholder'],
        hours: ['Tuesday–Saturday, 11:00–19:00', 'Sunday and Monday, by appointment'],
        hoursNote: 'Opening hours are placeholders.'
    },
    social: [
        { label: 'Instagram', href: null },
        { label: 'Pinterest', href: null }
    ],
    footer: {
        statement:
            'A fictional fine jewelry house devoted to quiet design, careful proportions, and pieces meant to be kept.',
        legalNote: 'Fictional preview. No orders are taken on this website.'
    },
    seo: {
        home: 'A fictional fine jewelry house. Editorial campaign imagery, sample diamond jewelry, and stories about color, design, and care.',
        shop: 'Browse the sample XXXX collection of rings, earrings, necklaces, and bracelets. Prices and details are placeholders.',
        why: 'The design story behind XXXX: quality, design, craft, and service — written as editable placeholders, not verified claims.',
        diamond:
            'A clear guide to D color diamonds and the D-to-Z color scale, and why color is only one part of how a diamond looks.',
        contact: 'Contact placeholders and an inquiry form for the XXXX preview. Messages are not sent.',
        articles: 'Editorial notes on diamond color, choosing a ring, jewelry care, milestones, and certification.'
    }
};

export const inquiryTypes = ['An order', 'Shipping', 'A return', 'Something else'];

export const contactFaqs = [
    {
        question: 'Can I buy a piece on this website?',
        answer: 'No. There is no checkout, payment, or order system. The form only shows what a successful inquiry could look like. Nothing is sent.'
    },
    {
        question: 'Are the phone, email, and address real?',
        answer: 'No. Every contact detail on this preview is a placeholder. Please do not treat them as a way to reach a store.'
    },
    {
        question: 'Will WhatsApp open a chat?',
        answer: 'Yes. A piece page, and the saved-pieces list, open WhatsApp with a draft message. The number on this preview is a placeholder, so it does not reach a real boutique. The email form is for other questions, and it does not send.'
    }
];
