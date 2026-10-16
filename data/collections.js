import { paths } from 'data/site';

export const collections = [
    {
        slug: 'rings',
        name: 'Rings',
        shortName: 'Ring',
        href: `${paths.collections}/rings`,
        description: 'Solitaires, bands, and stacks with a quiet profile.',
        image: {
            src: '/images/collections/rings-solitaire.jpg',
            alt: 'Diamond solitaire ring in pale metal, close up'
        }
    },
    {
        slug: 'necklaces',
        name: 'Necklaces',
        shortName: 'Necklace',
        href: `${paths.collections}/necklaces`,
        description: 'Chains and pendants drawn in fine lines.',
        image: {
            src: '/images/collections/necklaces.jpg',
            alt: 'Layered gold necklaces with a blue stone and a crescent pendant'
        }
    },
    {
        slug: 'earrings',
        name: 'Earrings',
        shortName: 'Earrings',
        href: `${paths.collections}/earrings`,
        description: 'Drops and studs meant to sit close to the face.',
        image: {
            src: '/images/products/oval-hoops.png',
            alt: 'Pale metal hoops set with oval stones'
        }
    },
    {
        slug: 'bracelets',
        name: 'Bracelets and Bangles',
        shortName: 'Bangle',
        href: `${paths.collections}/bracelets`,
        description: 'Lines of light for the wrist.',
        image: {
            src: '/images/products/orla-link-bracelet.jpg',
            alt: 'Slim pale link bracelet with a small clasp'
        }
    }
];
