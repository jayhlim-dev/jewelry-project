import { site, paths } from 'data/site';
import { pillars } from 'data/story';

export const home = {
    hero: {
        eyebrow: 'Fine jewelry',
        title: 'A lasting expression of you.',
        text: 'Exceptional diamonds. Thoughtful design. Jewelry to treasure for generations.',
        primary: { label: 'Explore the Collection', href: paths.shop },
        secondary: { label: 'Discover Our Philosophy', href: paths.why },
        image: {
            src: '/images/collections/bracelets.jpg',
            alt: 'Editorial photograph of a person wearing fine gold necklaces and rings, in soft daylight'
        }
    },
    introduction: {
        eyebrow: 'The house',
        title: 'Beyond brilliance. Into meaning.',
        paragraphs: [
            'A diamond can be bright and still say very little. The pieces worth keeping are the ones someone reaches for again, years later, without an occasion.',
            `${site.name} is a preview. The pages stay quiet on purpose: room to look, and a clear line between what is shown and what is not yet known.`
        ],
        image: {
            src: '/images/hero/campaign.jpg',
            alt: 'Still life of gold hoop earrings resting on pale stones in daylight'
        }
    },
    categories: {
        eyebrow: 'Categories',
        title: 'Begin with a form.'
    },
    featured: {
        eyebrow: 'Selected pieces',
        title: 'Pieces to linger over.',
        text: 'The full sample collection. Open any piece for materials and an inquiry. Nothing here is a checkout.'
    },
    diamond: {
        eyebrow: 'D color',
        title: 'Discover the beauty of D Color diamonds.',
        text: 'On the D-to-Z scale, D is the grade with the least color. It is a beautiful place to start, and only one part of how a diamond looks. Cut, clarity, carat, and the setting complete the picture.',
        cta: 'Read the guide',
        href: paths.diamond,
        image: {
            src: '/images/products/solenne-ring.png',
            alt: 'Sample photograph of a round center stone ring on a pale ground'
        }
    },
    pillars: {
        eyebrow: `Why ${site.name}`,
        title: 'A quiet standard.',
        text: site.placeholderNotice,
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
