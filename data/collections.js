import { paths } from 'data/site';

export const collections = [
    {
        slug: 'rings',
        name: 'Rings',
        href: `${paths.shop}?category=Rings`,
        description: 'Solitaires, bands, and stacks with a quiet profile.',
        image: {
            src: '/images/products/solenne-ring.png',
            alt: 'Sample photograph of a round center stone ring with smaller stones along a pale metal band'
        }
    },
    {
        slug: 'earrings',
        name: 'Earrings',
        href: `${paths.shop}?category=Earrings`,
        description: 'Drops and studs meant to sit close to the face.',
        image: {
            src: '/images/products/oval-hoops.png',
            alt: 'Sample photograph of pale metal hoops set with oval stones'
        }
    },
    {
        slug: 'necklaces',
        name: 'Necklaces',
        href: `${paths.shop}?category=Necklaces`,
        description: 'Chains and pendants drawn in fine lines.',
        image: {
            src: '/images/products/halo-pendant.png',
            alt: 'Sample photograph of a round diamond halo pendant on a fine pale chain'
        }
    },
    {
        slug: 'bracelets',
        name: 'Bracelets and Bangles',
        href: `${paths.shop}?category=${encodeURIComponent('Bracelets and Bangles')}`,
        description: 'Lines of light for the wrist.',
        image: {
            src: '/images/products/linea-bangle.png',
            alt: 'Sample photograph of a slim pale bangle with a line of small stones and a round cluster'
        }
    }
];
