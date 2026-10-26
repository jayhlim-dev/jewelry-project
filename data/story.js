import { site } from 'data/site';

export const pillars = [
    {
        id: 'quality',
        title: 'Diamond quality',
        summary:
            'Color, cut, clarity, and carat belong together. A single grade, including D color, is never the whole story.',
        body: 'The house talks about diamonds in full sentences: color beside cut, clarity beside carat, and the setting that holds them. A page does not claim a grade, a mine, or a laboratory that the piece itself does not name.',
        image: {
            src: 'https://i.pinimg.com/736x/cb/2b/d4/cb2bd471e27b8261e0f1d95602383faf.jpg',
            alt: 'Round diamond ring photographed against a pale ground'
        }
    },
    {
        id: 'design',
        title: 'Thoughtful design',
        summary: 'Lines stay fine. Settings stay low enough to live beside the hand, not above it.',
        body: 'Design means proportion, metal weight, and how a piece sits when the arm moves. The line stays fine enough to live beside the hand.',
        image: {
            src: 'https://i.pinimg.com/736x/9b/61/db/9b61db22cf90a2d811ee1cbc10b20b6d.jpg',
            alt: 'Slim pale link bracelet with a small clasp'
        }
    },
    {
        id: 'craft',
        title: 'Craftsmanship',
        summary: 'Making is visible in edges, clasps, and the way a stone is held.',
        body: 'Craft is read in the edge of a band, the clasp, and the way a stone is held. A photograph should be able to defend those details.',
        image: {
            src: 'https://i.pinimg.com/736x/34/a6/86/34a686fb24c408f09be7dbbae5ebb729.jpg',
            alt: 'Bracelet with detailed scroll links'
        }
    },
    {
        id: 'service',
        title: 'Personal service',
        summary: 'A person should be able to ask a plain question and get a plain answer before they decide.',
        body: 'Service means time: looking at a piece together, explaining a report, and saying when a detail is not known.',
        image: {
            src: 'https://i.pinimg.com/1200x/be/f4/20/bef4208579d8bfd94817655659ef1820.jpg',
            alt: 'A person wearing delicate gold necklaces and rings'
        }
    }
];

export const story = {
    hero: {
        eyebrow: 'The house',
        title: 'Jewelry with a reason to stay.',
        text: 'A standard for color, proportion, and a plain answer before a piece is chosen.',
        image: {
            src: 'https://i.pinimg.com/736x/05/20/36/052036d80ec7761c3d587754e7f77df3.jpg',
            alt: 'Campaign portrait of a person wearing a ring, hand resting near the face'
        }
    },
    philosophy: {
        eyebrow: 'Philosophy',
        title: 'Beyond brilliance. Into meaning.',
        paragraphs: [
            'Brilliance is the first thing a diamond does. Meaning is what happens after someone keeps the piece.',
            `${site.name} would rather make fewer jewels, with a clear account of what they are, than surround a stone with adjectives.`
        ],
        image: {
            src: 'https://i.pinimg.com/1200x/c8/a9/57/c8a95772e46703f5b16133d5f526709a.jpg',
            alt: 'Still life of gold jewelry arranged on a book'
        }
    },
    quality: {
        eyebrow: 'Quality',
        title: 'A standard you can read.',
        paragraphs: [
            'A useful standard names what is graded, who graded it, and what was not graded. It does not stop at one flattering letter.',
            'A piece page names the metal and the stones that are known. What is not known is left unsaid.'
        ],
        points: [
            'Color is read on the D-to-Z scale. D is the least color, not a complete verdict.',
            'Cut governs how light leaves the stone. It can matter more to the eye than a small step in color.',
            'Clarity and carat complete the description. They are named when they are known.'
        ],
        image: pillars[0].image
    },
    design: {
        eyebrow: 'Design',
        title: 'Quiet lines, considered up close.',
        paragraphs: [
            'The house favors pieces that photograph honestly: metal that is allowed to be thin, stones that are not asked to shout, and compositions with space around them.'
        ],
        principles: [
            { title: 'Proportion', text: 'The stone, the metal, and the finger should agree. Height is kept in check unless a design truly needs it.' },
            { title: 'Pace', text: 'A collection should feel edited. Not every shape needs a matching suite on day one.' },
            { title: 'Honesty', text: 'A jewel should be shown as it is, without borrowed sparkle.' }
        ],
        image: {
            src: '/images/editorial/philosophy.jpg',
            alt: 'Sample photograph of a diamond line bracelet on a black reflective surface'
        }
    },
    craft: {
        eyebrow: 'Craft',
        title: 'Seen in the finishing.',
        paragraphs: [
            'Craft shows up in the edge of a band, the clasp, and the way a stone is held. Those are the details a photograph should be able to defend.',
            'A claim about a workshop belongs next to the object. If a detail is not on the piece page, it is not assumed.'
        ],
        image: pillars[2].image
    },
    service: {
        eyebrow: 'Service',
        title: 'Questions before ceremonies.',
        paragraphs: [
            'Personal service here means a direct answer: what the piece is, what is known, and what is not. It does not mean a script about rarity.',
            'Resizing and care are confirmed in conversation, not promised in a banner.'
        ],
        image: pillars[3].image
    },
    shopping: {
        eyebrow: 'Online only',
        title: 'Browse the catalog. Chat when you are ready.',
        paragraphs: [
            'The full collection is here on the site. There is no boutique to visit—look through every piece at your own pace.',
            'When you want to go further, message us on WhatsApp. We answer questions about metal, stones, sizing, and timing. Nothing is reserved until you confirm in that chat.'
        ],
        steps: [
            { title: 'Browse the shop', text: 'Open the full catalog. Category, metal, and shape filters narrow what you see.' },
            {
                title: 'Read each piece',
                text: 'Every product page names the metal and the stones that are known. Ask us for pricing in chat.'
            },
            { title: 'Chat on WhatsApp', text: 'Tap Inquire on a piece—or save pieces and open one chat. For rings, add your finger size in millimetres. We continue the conversation there.' }
        ],
        image: {
            src: '/images/products/trio-pendant.png',
            alt: 'Fine chain with a cluster of stones on a pale studio background'
        },
        shopCta: 'View full catalog',
        whatsappCta: 'Chat on WhatsApp'
    },
    closing: {
        title: 'Find a piece that feels like yours.',
        cta: 'Explore the Collection'
    }
};
