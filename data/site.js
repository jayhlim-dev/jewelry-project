import { siteFeatures } from 'config/siteFeatures';

const brandName = 'XXXX';

export const paths = {
    home: '/',
    shop: '/shop',
    collections: '/collections',
    why: '/why-xxxx',
    diamond: '/d-color-diamond',
    contact: '/contact',
    articles: '/articles',
    sizeGuide: '/size-guide',
    privacy: '/privacy',
    terms: '/terms'
};

export const site = {
    name: brandName,
    tagline: 'Fine jewelry, considered slowly.',
    description:
        'Fine jewelry, considered slowly. Rings, earrings, necklaces, and bracelets, with a plain account of each piece.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://xxxx.example',
    previewNote:
        'Sample collection for this design preview. Names, prices, metals, and photographs are temporary and are not an offer to sell.',
    placeholderNotice:
        'Placeholder. Statements about diamond origin, certification, making, or sourcing are not confirmed and should not be read as facts about a real business.',
    navigation: [
        { label: 'Home', href: paths.home },
        { label: 'Shop', href: paths.shop },
        { label: `Why ${brandName}`, href: paths.why },
        ...(siteFeatures.showDColorDiamondPage ? [{ label: 'D Color Diamond', href: paths.diamond }] : []),
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
        addressLines: ['Online only — no showroom'],
        hours: ['WhatsApp replies during business hours'],
        hoursNote: 'Message us on WhatsApp from any product page.'
    },
    social: [
        { label: 'Instagram', href: null },
        { label: 'Pinterest', href: null }
    ],
    footer: {
        statement: 'Quiet design, careful proportions, and pieces meant to be kept.',
        onlineNote: 'Online only — no showroom.',
        legalNote: 'Confirm a piece by inquiry.'
    },
    seo: {
        home: 'Fine jewelry. A campaign, a short selection, and a guide to D color diamonds.',
        shop: 'Rings, earrings, necklaces, and bracelets. Filter by category, metal, or shape.',
        why: 'Why the house works this way: diamond quality, design, craft, and a plain answer before a piece is chosen.',
        diamond:
            'A clear guide to D color diamonds and the D-to-Z color scale, and why color is only one part of how a diamond looks.',
        contact: `Contact ${brandName} online: stock, pieces, orders, shipping, partnership, returns, or anything else — WhatsApp or email.`,
        articles:
            'Guides on diamond color, certification, reading product specifications, ring sizing, care, and inquiry-friendly buying.',
        sizeGuide:
            'Ring and bracelet sizing in millimetres, with a home chart, US reference, and WhatsApp to confirm the fit.'
    }
};

export { contactFaqs, inquiryTopics } from 'data/contact';
