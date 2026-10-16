/**
 * Sample catalog for the design preview.
 * Replace this module with a Shopify Storefront client, or another commerce API, later.
 * Keep the same fields so the shop and product pages do not need to change.
 * `code` is a sample catalog code for this preview.
 * `stones` lists only facts already known. Leave color, clarity, and carat off when they are unknown.
 * `metalViews` is optional. Add a metal there only when that metal has its own photograph.
 *
 * Do not treat prices, metals, or photographs as a live catalog.
 */

export const products = [
    {
        id: 'halo-ring',
        slug: 'halo-ring',
        code: 'SLN-001',
        name: 'Solenne Ring',
        category: 'Rings',
        price: 42500000,
        currency: 'IDR',
        images: [
            {
                src: '/images/products/solenne-ring.png',
                width: 940,
                height: 940,
                alt: 'Round center stone ring with smaller stones along a pale metal band'
            }
        ],
        metal: 'White Gold',
        metals: ['White Gold'],
        diamondShape: 'Round',
        stones: [
            { count: 1, shape: 'Round', detail: 'center stone' },
            { detail: 'Smaller round stones along the band' }
        ],
        featured: true,
        available: true,
        summary: 'A round center stone, with smaller stones along the band.',
        description:
            'A round center stone, held low, with smaller stones along the band.',
        materials: ['Pale metal in the photograph', 'Round center stone', 'Smaller round stones along the shoulders']
    },
    {
        id: 'rosa-cushion',
        slug: 'rosa-cushion',
        code: 'RSA-002',
        name: 'Rosa Cushion Ring',
        category: 'Rings',
        price: 18600000,
        priceMax: 24000000,
        currency: 'IDR',
        images: [
            {
                src: '/images/collections/rings.jpg',
                width: 1600,
                height: 1600,
                alt: 'Sample photograph of a cushion-cut pink stone ring with a diamond-set halo'
            }
        ],
        metal: 'Rose Gold',
        metals: ['Rose Gold', 'Yellow Gold'],
        diamondShape: null,
        stones: [{ count: 1, shape: 'Cushion', detail: 'colored center' }],
        featured: false,
        available: true,
        summary: 'A cushion-shaped colored center in a soft metal.',
        description:
            'A pink cushion center in rose gold, with a pale halo.',
        materials: ['Sample metal tone: rose gold', 'Center shown as a colored cushion-cut stone']
    },
    {
        id: 'celeste-stack',
        slug: 'celeste-stack',
        code: 'CEL-003',
        name: 'Celeste Stack',
        category: 'Rings',
        price: 22000000,
        currency: 'IDR',
        images: [
            {
                src: '/images/products/celeste-1.jpg',
                width: 1400,
                height: 933,
                alt: 'Sample photograph of three textured gold rings with round, heart, and bar diamond motifs'
            },
            {
                src: '/images/products/celeste-2.jpg',
                width: 1400,
                height: 933,
                alt: 'Textured gold bands worn together'
            }
        ],
        metal: 'Yellow Gold',
        metals: ['Yellow Gold', 'White Gold'],
        diamondShape: 'Round',
        stones: [{ detail: 'Small round, heart, and bar motifs on the bands' }],
        featured: false,
        available: true,
        summary: 'Three low bands meant to be worn together.',
        description:
            'Three low bands meant to be worn together. The photograph shows textured gold bands with small round, heart, and bar motifs.',
        materials: ['Sample metal tone: yellow gold', 'Small round stones visible on the bands']
    },
    {
        id: 'mira-band',
        slug: 'mira-band',
        code: 'ETN-004',
        name: 'Eterna Band',
        category: 'Rings',
        price: 9800000,
        currency: 'IDR',
        images: [
            {
                src: '/images/products/eternity-band.png',
                width: 940,
                height: 940,
                alt: 'Sample photograph of an emerald-cut stone band in pale metal, with a 750 mark inside'
            },
        ],
        metal: 'White Gold',
        metals: ['White Gold'],
        fineness: '750',
        diamondShape: 'Emerald',
        stones: [{ shape: 'Emerald', detail: 'stones around the band' }],
        featured: true,
        available: true,
        summary: 'A continuous row of emerald-cut stones.',
        description:
            'Emerald-cut stones set in a continuous row around a pale band.',
        materials: ['Pale metal in the photograph', 'Emerald-cut stones around the band', 'A 750 mark is visible inside the ring']
    },
    {
        id: 'ivy-drops',
        slug: 'ivy-drops',
        code: 'OVL-005',
        name: 'Oval Hoops',
        category: 'Earrings',
        price: 15400000,
        currency: 'IDR',
        images: [
            {
                src: '/images/products/oval-hoops.png',
                width: 940,
                height: 940,
                alt: 'Pale metal hoops set with oval stones, one shown from the side'
            }
        ],
        metal: 'White Gold',
        metals: ['White Gold'],
        diamondShape: 'Oval',
        stones: [{ shape: 'Oval', detail: 'stones set along the hoop' }],
        featured: true,
        available: true,
        summary: 'Hoops set with a row of oval stones.',
        description:
            'Oval stones set along a hinged hoop.',
        materials: ['Pale metal in the photograph', 'Oval stones set along the hoop']
    },
    {
        id: 'coeur-drops',
        slug: 'coeur-drops',
        code: 'COE-006',
        name: 'Coeur Drops',
        category: 'Earrings',
        price: 7200000,
        currency: 'IDR',
        images: [
            {
                src: '/images/editorial/closing.jpg',
                width: 1800,
                height: 2342,
                alt: 'Sample photograph of gold hook earrings with small blue heart-shaped stones on white cloth'
            }
        ],
        metal: 'Yellow Gold',
        metals: ['Yellow Gold'],
        diamondShape: null,
        stones: [{ shape: 'Heart', detail: 'heart-shaped blue stones on gold hooks' }],
        featured: false,
        available: false,
        summary: 'Small heart drops on a simple hook.',
        description:
            'Small heart drops on a simple hook, with blue heart-shaped stones.',
        materials: ['Sample metal tone: yellow gold', 'Heart-shaped blue stones visible in the photograph']
    },
    {
        id: 'lune-pendant',
        slug: 'lune-pendant',
        code: 'TRO-007',
        name: 'Trio Pendant',
        category: 'Necklaces',
        price: 12500000,
        currency: 'IDR',
        images: [
            {
                src: '/images/products/trio-pendant.png',
                width: 940,
                height: 940,
                alt: 'Fine chain with a pear, oval, and baguette stone cluster'
            }
        ],
        metal: 'White Gold',
        metals: ['White Gold'],
        diamondShape: 'Pear',
        stones: [{ detail: 'One pear, one oval, and one baguette in a cluster' }],
        featured: true,
        available: true,
        summary: 'A pear, an oval, and a baguette on a fine chain.',
        description:
            'A pear, an oval, and a baguette grouped on a fine chain.',
        materials: ['Pale metal in the photograph', 'Pear, oval, and baguette stones in one cluster']
    },
    {
        id: 'pearl-strand',
        slug: 'pearl-strand',
        code: 'HLO-008',
        name: 'Halo Pendant',
        category: 'Necklaces',
        price: 16800000,
        currency: 'IDR',
        images: [
            {
                src: '/images/products/halo-pendant.png',
                width: 940,
                height: 940,
                alt: 'Round center stone in a halo, hanging from a fine pale chain'
            }
        ],
        metal: 'White Gold',
        metals: ['White Gold'],
        diamondShape: 'Round',
        stones: [
            { count: 1, shape: 'Round', detail: 'center stone' },
            { detail: 'Smaller stones in a halo' }
        ],
        featured: true,
        available: true,
        summary: 'A round center stone in a halo, on a fine chain.',
        description:
            'A round center stone in a halo, on a fine chain.',
        materials: ['Pale metal in the photograph', 'Round center stone', 'Halo of smaller stones']
    },
    {
        id: 'noor-collar',
        slug: 'noor-collar',
        code: 'NOR-009',
        name: 'Noor Collar',
        category: 'Necklaces',
        price: 31000000,
        currency: 'IDR',
        images: [
            {
                src: '/images/products/noor-collar.jpg',
                width: 1024,
                height: 1024,
                alt: 'Fine pale chain with a curved line of small stones at the front'
            }
        ],
        metal: 'White Gold',
        metals: ['White Gold'],
        diamondShape: 'Round',
        stones: [{ detail: 'Small stones along a curved front line' }],
        featured: false,
        available: true,
        summary: 'A fine chain with stones set along the front.',
        description:
            'A fine chain with a curved line of small stones at the front.',
        materials: ['Pale metal in the photograph', 'Small stones along the front line']
    },
    {
        id: 'linea-bracelet',
        slug: 'linea-bracelet',
        code: 'LIN-010',
        name: 'Linea Bangle',
        category: 'Bracelets and Bangles',
        price: 27500000,
        currency: 'IDR',
        images: [
            {
                src: '/images/products/linea-bangle.png',
                width: 940,
                height: 940,
                alt: 'Slim pale bangle with a line of small stones and a round cluster'
            }
        ],
        metal: 'White Gold',
        metals: ['White Gold'],
        diamondShape: 'Round',
        stones: [
            { detail: 'Small stones along one side' },
            { count: 1, shape: 'Round', detail: 'cluster at the front' }
        ],
        featured: true,
        available: true,
        summary: 'A slim bangle with a small round cluster.',
        description:
            'A slim bangle with a line of small stones and a round cluster at the front.',
        materials: ['Pale metal in the photograph', 'Small stones along one side', 'A round cluster at the front']
    },
    {
        id: 'lumen-chain',
        slug: 'lumen-chain',
        code: 'LMN-011',
        name: 'Lumen Chain',
        category: 'Bracelets and Bangles',
        price: 8900000,
        currency: 'IDR',
        images: [
            {
                src: '/images/products/aurelia-1.jpg',
                width: 1400,
                height: 1869,
                alt: 'Sample photograph of a polished gold chain bracelet lying on an open magazine'
            }
        ],
        metal: 'Yellow Gold',
        metals: ['Yellow Gold'],
        diamondShape: null,
        featured: false,
        available: false,
        summary: 'An oval-link chain for the wrist.',
        description:
            'An oval-link chain for the wrist.',
        materials: ['Sample metal tone: yellow gold', 'Polished oval links']
    },
    {
        id: 'orla-link',
        slug: 'orla-link',
        code: 'ORL-012',
        name: 'Orla Link Bracelet',
        category: 'Bracelets and Bangles',
        price: 11200000,
        currency: 'IDR',
        images: [
            {
                src: '/images/products/orla-link-bracelet.jpg',
                width: 1024,
                height: 1024,
                alt: 'Slim pale link bracelet with a small clasp'
            }
        ],
        metal: 'White Gold',
        metals: ['White Gold', 'Yellow Gold'],
        diamondShape: null,
        featured: false,
        available: true,
        summary: 'A slim link bracelet with a small clasp.',
        description:
            'A slim link bracelet with a small clasp.',
        materials: ['Pale metal in the photograph', 'Oval links']
    }
];

export const priceBands = [
    { id: 'All', label: 'All prices' },
    { id: 'under', label: 'Under Rp 15.000.000' },
    { id: 'mid', label: 'Rp 15.000.000 – 30.000.000' },
    { id: 'over', label: 'Over Rp 30.000.000' }
];

export const sortOptions = [
    { id: 'featured', label: 'Most relevant' },
    { id: 'price-asc', label: 'Price, low to high' },
    { id: 'price-desc', label: 'Price, high to low' },
    { id: 'newest', label: 'Newest' },
    { id: 'name', label: 'Name, A–Z' }
];
