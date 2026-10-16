import { site, paths } from 'data/site';
import { pillars } from 'data/story';

export const home = {
    intro: {
        title: site.name,
        text: 'Each piece names its metal. The stone shape is named when it is known. Ask us to confirm the rest.'
    },
    hero: {
        eyebrow: 'Fine jewelry',
        title: 'Gold, kept close.',
        text: 'Rings, earrings, necklaces, and bangles. Each piece names its metal.',
        primary: { label: 'Explore the collection', href: paths.shop },
        secondary: { label: 'Shop rings', href: `${paths.collections}/rings` },
        image: {
            src: '/images/hero/campaign.jpg',
            alt: 'Gold hoop earrings on pale stone, in hard daylight'
        }
    },
    facts: [
        { title: 'Metal', text: 'Named on every piece.' },
        { title: 'Price', text: 'Written in rupiah, before you ask.' },
        { title: 'Size', text: 'Rings are measured in millimetres.' },
        { title: 'Ask', text: 'WhatsApp opens a draft. Nothing is held.' }
    ],
    campaign: {
        eyebrow: '',
        title: '',
        text: '',
        slugs: ['rosa-cushion', 'celeste-stack', 'lune-pendant', 'orla-link']
    },
    more: {
        slugs: ['halo-ring', 'ivy-drops', 'noor-collar', 'linea-bracelet']
    },
    introduction: {
        eyebrow: 'The house',
        title: 'Beyond brilliance. Into meaning.',
        paragraphs: [
            'A diamond can be bright and still say very little. The pieces worth keeping are the ones someone reaches for again, years later, without an occasion.',
            `${site.name} stays quiet on purpose: room to look, and a clear line between what is shown and what is still unknown.`
        ],
        image: {
            src: '/images/hero/campaign.jpg',
            alt: 'Still life of gold hoop earrings resting on pale stones in daylight'
        }
    },
    categories: {
        eyebrow: 'Categories',
        title: 'Choose a form.'
    },
    featured: {
        eyebrow: 'Selected pieces',
        title: 'Pieces to linger over.',
        text: 'Open any piece for materials and an inquiry.'
    },
    diamond: {
        eyebrow: 'D color',
        title: 'D is a color grade.',
        text: 'D is the top of the D-to-Z scale. It describes color only. It does not tell you the size, the cut, or whether a report belongs to that stone.',
        cta: 'Read the guide',
        href: paths.diamond,
        image: {
            src: '/images/editorial/diamond.jpg',
            alt: 'A diamond ring resting on a dark box'
        }
    },
    pillars: {
        eyebrow: `Why ${site.name}`,
        title: 'A quiet standard.',
        text: 'Four standards for every piece.',
        items: pillars,
        cta: `Read why ${site.name}`,
        href: paths.why
    },
    stories: {
        eyebrow: 'Journal',
        title: 'Notes on color, care, and keeping.',
        cta: 'All articles',
        href: paths.articles
    },
    closing: {
        eyebrow: 'The collection',
        title: 'Find a piece that feels like yours.',
        cta: 'Explore the Collection',
        href: paths.shop,
        image: {
            src: '/images/editorial/atelier.jpg',
            alt: 'Sample photograph of hands wearing several fine rings, seated in daylight'
        }
    }
};
