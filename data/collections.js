import { paths } from 'data/site';

export const collections = [
    {
        slug: 'rings',
        name: 'Rings',
        shortName: 'Ring',
        href: `${paths.collections}/rings`,
        description: 'Solitaires, bands, and stacks with a quiet profile.',
        image: {
            src: 'https://storage.googleapis.com/lilo-porto-picture/lilo-project/jewelry/banner-ring.png',
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
            src: 'https://storage.googleapis.com/lilo-porto-picture/lilo-project/jewelry/banner-necklace.png',
            alt: 'Gold chain necklace worn close to the neckline'
        }
    },
    {
        slug: 'earrings',
        name: 'Earrings',
        shortName: 'Earrings',
        href: `${paths.collections}/earrings`,
        description: 'Drops and studs meant to sit close to the face.',
        image: {
            src: 'https://storage.googleapis.com/lilo-porto-picture/lilo-project/jewelry/banner-earrings.png',
            alt: 'Diamond stud earring worn on the ear'
        }
    },
    {
        slug: 'bracelets',
        name: 'Bracelets and Bangles',
        shortName: 'Bangle',
        href: `${paths.collections}/bracelets`,
        description: 'Lines of light for the wrist.',
        image: {
            src: 'https://storage.googleapis.com/lilo-porto-picture/lilo-project/jewelry/banner-bracelet.png',
            alt: 'Diamond bracelet on the wrist'
        }
    }
];
