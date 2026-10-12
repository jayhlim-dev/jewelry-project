import { site } from 'data/site';

export const pillars = [
    {
        id: 'quality',
        title: 'Diamond quality',
        summary:
            'Color, cut, clarity, and carat belong together. A single grade, including D color, is never the whole story.',
        body: 'The house intends to talk about diamonds in full sentences: color beside cut, clarity beside carat, and the setting that holds them. Until a real standard is confirmed, this page does not claim a minimum grade, a mine, or a laboratory.',
        image: {
            src: '/images/editorial/diamond.jpg',
            alt: 'Sample photograph of a round diamond ring used as a placeholder for quality'
        }
    },
    {
        id: 'design',
        title: 'Thoughtful design',
        summary: 'Lines stay fine. Settings stay low enough to live beside the hand, not above it.',
        body: 'Design, in this preview, means proportion, metal weight, and how a piece sits when the arm moves. Specific collections and signatures will be added when the brand is real. Nothing here is a registered design claim.',
        image: {
            src: '/images/products/orla-1.jpg',
            alt: 'Sample photograph of hands wearing a fine gold bracelet and rings'
        }
    },
    {
        id: 'craft',
        title: 'Craftsmanship',
        summary: 'Making is visible in edges, clasps, and the way a stone is held. The workshop story is not written yet.',
        body: 'This section is a place for process: who makes a piece, where, and how a setting is finished. Those facts are unknown. Please read any future note about artisans, local making, or hand finishing as empty until it is replaced with a confirmed account.',
        image: {
            src: '/images/editorial/craft.jpg',
            alt: 'Sample photograph of a bracelet with detailed scroll links'
        }
    },
    {
        id: 'service',
        title: 'Personal service',
        summary: 'A person should be able to ask a plain question and get a plain answer before they decide.',
        body: 'Service, for this preview, means time: looking at a piece together, explaining a report, and saying when a detail is not known. Appointments, repairs, and aftercare are not offered here because no boutique is operating behind this site.',
        image: {
            src: '/images/collections/bracelets.jpg',
            alt: 'Sample photograph of a person wearing delicate gold necklaces and rings'
        }
    }
];

export const story = {
    hero: {
        eyebrow: 'The house',
        title: 'Jewelry with a reason to stay.',
        text: 'A philosophy page for a house that is still fictional. The structure is ready. The business claims are not.',
        image: {
            src: '/images/hero/campaign.jpg',
            alt: 'Sample campaign portrait of a person wearing a ring, hand resting near the face'
        }
    },
    philosophy: {
        eyebrow: 'Philosophy',
        title: 'Beyond brilliance. Into meaning.',
        paragraphs: [
            'Brilliance is the first thing a diamond does. Meaning is what happens after someone keeps the piece.',
            `${site.name} would rather make fewer jewels, with a clear account of what they are, than surround a stone with adjectives. That preference is a design intention for this preview. It is not a verified production standard.`
        ],
        image: {
            src: '/images/articles/color.jpg',
            alt: 'Sample still life of gold jewelry arranged on a book'
        }
    },
    quality: {
        eyebrow: 'Quality',
        title: 'A standard you can read.',
        paragraphs: [
            'A useful standard names what is graded, who graded it, and what was not graded. It does not stop at one flattering letter.',
            'When this brand is real, this section should list the actual diamond criteria, metal karat, and any laboratory partners. Until then it stays a heading with room underneath.'
        ],
        points: [
            'Color is read on the D-to-Z scale. D is the least color, not a complete verdict.',
            'Cut governs how light leaves the stone. It can matter more to the eye than a small step in color.',
            'Clarity and carat complete the description. They are not implied by the photography here.'
        ],
        image: pillars[0].image
    },
    design: {
        eyebrow: 'Design',
        title: 'Quiet lines, considered up close.',
        paragraphs: [
            'The preview favors pieces that photograph honestly: metal that is allowed to be thin, stones that are not asked to shout, and compositions with space around them.'
        ],
        principles: [
            { title: 'Proportion', text: 'The stone, the metal, and the finger should agree. Height is kept in check unless a design truly needs it.' },
            { title: 'Pace', text: 'A collection should feel edited. Not every shape needs a matching suite on day one.' },
            { title: 'Honesty', text: 'Photographs in this preview are temporary. Final jewels should be shown as they are, without borrowed sparkle.' }
        ],
        image: {
            src: '/images/editorial/philosophy.jpg',
            alt: 'Sample photograph of a diamond line bracelet on a black reflective surface'
        }
    },
    craft: {
        eyebrow: 'Craft',
        title: 'The making is still unwritten.',
        paragraphs: [
            'A craft section should name benches, cities, and the hands that finish a clasp. This one does not, because inventing a workshop would be a false comfort.',
            'Use this layout later for process photographs and a short account of how a piece moves from drawing to finger. Leave out any claim that cannot be stood next to the object.'
        ],
        image: pillars[2].image
    },
    service: {
        eyebrow: 'Service',
        title: 'Questions before ceremonies.',
        paragraphs: [
            'Personal service here means a direct answer: what the piece is, what is known, and what is not. It does not mean a script about rarity.',
            'Repairs, resizing, and appointments can be added when a real studio can keep those promises. The contact page on this site does not book anything.'
        ],
        image: pillars[3].image
    },
    shopping: {
        eyebrow: 'The visit',
        title: 'A calm way to look.',
        paragraphs: [
            'The shopping experience in this preview is a catalog you can filter and an inquiry you can draft. It is not a boutique, a queue, or a payment flow.'
        ],
        steps: [
            { title: 'Look slowly', text: 'Category, metal, and shape narrow the sample grid. Nothing is reserved.' },
            { title: 'Read the limits', text: 'Each piece says what the photograph shows and what has not been supplied.' },
            { title: 'Ask, if you wish', text: 'The inquiry form confirms on screen and explains that the note was not sent.' }
        ],
        image: {
            src: '/images/products/orla-2.jpg',
            alt: 'Sample photograph of necklaces hanging in a row'
        }
    },
    closing: {
        title: 'When the facts arrive, the page should still feel this quiet.',
        cta: 'Explore the Collection'
    }
};
