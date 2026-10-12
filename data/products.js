/**
 * Sample catalog for the design preview.
 * Replace this module with a Shopify Storefront client, or another commerce API, later.
 * Keep the same fields so the shop and product pages do not need to change.
 * `code` is a sample catalog code for this preview.
 * `stones` lists only facts already known. Leave color, clarity, and carat off when they are unknown.
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
                alt: 'Sample photograph of a round center stone ring with smaller stones along a pale metal band'
            },
            {
                src: '/images/products/celeste-1.jpg',
                width: 1400,
                height: 933,
                alt: 'Example photograph of gold rings worn on the hand'
            },
            {
                src: '/images/products/lino-1.jpg',
                width: 1400,
                height: 1592,
                alt: 'Example photograph of several gold rings on a pale stone'
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
            'The photograph shows a round center stone and a row of smaller round stones on a pale metal band. Carat weight, clarity, and color are not stated.',
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
        stoneNote: 'This is not a graded diamond, and no certificate is attached.',
        featured: false,
        available: true,
        summary: 'A cushion-shaped colored center in a soft metal.',
        description:
            'Sample imagery shows a pink cushion-cut center and a pale halo. This is not a graded diamond, and no certificate is attached.',
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
                alt: 'Example photograph of a diamond line bracelet'
            },
            {
                src: '/images/products/mira-2.jpg',
                width: 1400,
                height: 930,
                alt: 'Example photograph of two plain gold bands'
            }
        ],
        metal: 'Yellow Gold',
        metals: ['Yellow Gold', 'White Gold'],
        diamondShape: 'Round',
        stones: [{ detail: 'Small round, heart, and bar motifs on the bands' }],
        stoneNote: 'Exact stone counts are not listed. Color, clarity, and carat are not stated.',
        featured: false,
        available: true,
        summary: 'Three low bands meant to be worn together.',
        description:
            'A sample stack. The photograph shows textured gold bands with small round, heart, and bar motifs. Exact stone counts are not listed.',
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
            {
                src: '/images/products/mira-2.jpg',
                width: 1400,
                height: 930,
                alt: 'Example photograph of two plain gold bands'
            },
            {
                src: '/images/collections/rings.jpg',
                width: 1600,
                height: 1600,
                alt: 'Example photograph of a cushion-cut pink stone ring'
            }
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
            'The photograph shows emerald-cut stones set around a pale band. A 750 mark is visible inside the ring. Carat weight and color are not stated.',
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
                alt: 'Sample photograph of pale metal hoops set with oval stones, one shown from the side'
            },
            {
                src: '/images/collections/earrings.jpg',
                width: 1400,
                height: 2100,
                alt: 'Example photograph of earrings'
            },
            {
                src: '/images/hero/campaign.jpg',
                width: 2000,
                height: 3000,
                alt: 'Example photograph of hoop earrings worn in a portrait'
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
            'The photograph shows one hoop from the front and one from the side, including the hinge. The stones are oval. Carat weight and color are not stated.',
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
        stoneNote: 'Blue heart-shaped stones in the photograph.',
        featured: false,
        available: false,
        summary: 'Small heart drops on a simple hook.',
        description:
            'A sample pair marked unavailable in this preview. The photograph shows blue heart-shaped stones on gold hooks.',
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
                alt: 'Sample photograph of a fine chain with a pear, oval, and baguette stone cluster'
            },
            {
                src: '/images/products/lino-2.jpg',
                width: 1400,
                height: 933,
                alt: 'Example photograph of a heart pendant on a pale chain'
            },
            {
                src: '/images/products/orla-2.jpg',
                width: 1400,
                height: 2100,
                alt: 'Example photograph of several pendants hanging on chains'
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
            'The photograph shows three stones grouped on a fine pale chain: pear, oval, and baguette. Chain length and carat weight are not stated.',
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
                alt: 'Sample photograph of a round center stone in a halo, hanging from a fine pale chain'
            },
            {
                src: '/images/products/nola-1.jpg',
                width: 1200,
                height: 800,
                alt: 'Example photograph of a pearl strand in a box'
            },
            {
                src: '/images/products/aurelia-2.jpg',
                width: 1400,
                height: 970,
                alt: 'Example photograph of a gold collar necklace'
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
            'The photograph shows a round center stone circled by smaller stones, on a fine pale chain. Chain length, carat weight, and color are not stated.',
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
                src: '/images/products/aurelia-2.jpg',
                width: 1400,
                height: 970,
                alt: 'Sample photograph of an ornate gold collar necklace with red stones and matching earrings'
            }
        ],
        metal: 'Yellow Gold',
        metals: ['Yellow Gold'],
        diamondShape: null,
        stones: [{ detail: 'Red stones visible in the photograph' }],
        stoneNote: 'No certificate is attached.',
        featured: false,
        available: true,
        summary: 'A closer, more ornate gold collar.',
        description:
            'Sample photograph of a traditional gold collar with red stones. It is included so the grid has range. It is not a documented antique and has no certificate.',
        materials: ['Sample metal tone: yellow gold', 'Red stones visible in the photograph']
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
                alt: 'Sample photograph of a slim pale bangle with a line of small stones and a round cluster'
            },
            {
                src: '/images/products/celeste-2.jpg',
                width: 1400,
                height: 933,
                alt: 'Example photograph of a diamond line bracelet'
            },
            {
                src: '/images/products/aurelia-1.jpg',
                width: 1400,
                height: 1869,
                alt: 'Example photograph of a gold chain bracelet'
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
            'The photograph shows a pale bangle, a line of small stones along one side, and a round cluster at the front. Carat weight and color are not stated.',
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
            'Sample chain bracelet marked unavailable in this preview. No stone details apply. Link size is not specified.',
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
                src: '/images/products/orla-1.jpg',
                width: 1400,
                height: 2100,
                alt: 'Sample lifestyle photograph of a gold link bracelet worn on the wrist'
            },
            {
                src: '/images/products/aurelia-1.jpg',
                width: 1400,
                height: 1869,
                alt: 'Alternate sample photograph of a gold chain bracelet. It may show a related piece, not a second angle of one finished jewel.'
            }
        ],
        metal: 'Yellow Gold',
        metals: ['Yellow Gold', 'Rose Gold'],
        diamondShape: null,
        featured: false,
        available: true,
        summary: 'A light link bracelet with a small clasp.',
        description:
            'Sample bracelet. The two photographs are temporary and may show related gold links rather than one finished piece. Use them to preview the gallery, not as a catalog record.',
        materials: ['Sample metal tone: yellow gold', 'Link bracelet']
    }
];

export const priceBands = [
    { id: 'All', label: 'All prices' },
    { id: 'under', label: 'Under Rp 15.000.000' },
    { id: 'mid', label: 'Rp 15.000.000 – 30.000.000' },
    { id: 'over', label: 'Over Rp 30.000.000' }
];

export const sortOptions = [
    { id: 'featured', label: 'Featured' },
    { id: 'name', label: 'Name, A–Z' }
];
