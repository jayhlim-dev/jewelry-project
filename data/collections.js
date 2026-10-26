import { paths } from 'data/site';

export const collections = [
    {
        slug: 'rings',
        name: 'Rings',
        shortName: 'Ring',
        href: `${paths.collections}/rings`,
        description: 'Solitaires, bands, and stacks with a quiet profile.',
        image: {
            src: 'https://i.pinimg.com/1200x/81/db/1b/81db1b4c41707dc84607fd426775b7aa.jpg',
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
            src: 'https://i.pinimg.com/736x/fd/7e/b9/fd7eb9485872ddfc8c70264ecf0a8b73.jpg',
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
            src: 'https://i.pinimg.com/736x/4e/03/71/4e0371d58fc8037c7957b61afe05ce19.jpg',
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
            // src: '/images/products/orla-link-bracelet.jpg',
            src: 'https://i.pinimg.com/736x/22/de/07/22de075aad04d7f218100092726e22b4.jpg',
            alt: 'Slim pale link bracelet with a small clasp'
        }
    }
];
