/**
 * Sample catalog for the design preview.
 * Replace this module with a Shopify Storefront client, or another commerce API, later.
 * Keep the same fields so the shop and product pages do not need to change.
 * `code` is a sample catalog code for this preview.
 * `stones` lists only facts already known. Use count, shape, caratEach, color, clarity, cut, role when known.
 * `totalCaratWeight` is total diamond weight (tw) when verified. `specs` holds composition, setting, certificate (`lab`, `number`, `url`), etc.
 * On a stone, optional `polish`, `symmetry`, `fluorescence`, `measurementsMm` show under Advanced grading when a certificate is listed.
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
        signature_images: [
            {
                // src: 'https://i.pinimg.com/1200x/24/6b/f1/246bf1800be0807bb923e77d99d6be2e.jpg',
                width: 940,
                height: 940,
                alt: 'Round center stone ring with smaller stones along a pale metal band'
            }
        ],
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
        fineness: '18K',
        diamondShape: 'Round',
        totalCaratWeight: 0.68,
        specs: {
            setting: 'Four-prong center with pavé shoulders',
            certificate: {
                lab: 'GIA',
                number: '2141987654',
                url: 'https://www.gia.edu/report-check-landing?reportno=2141987654'
            },
            identification: [
                { field: 'Jewelry Type', value: 'Diamond Halo-Shoulder Solitaire Ring' },
                { field: 'Metal', value: '18K White Gold' },
                { field: 'Gold Fineness', value: '750 (18K)' },
                { field: 'Metal Weight', value: '3.40 g' }
            ],
            diamondBreakdown: [
                { field: 'Shape & Cutting Style', value: 'Round brilliant (center)' },
                { field: 'Accent Shape', value: 'Round brilliant (pavé)' },
                { field: 'Total Diamond Quantity', value: '19 stones' },
                { field: 'Total Carat Weight', value: '0.68 ct tw' },
                { field: 'Color Grade', value: 'G' },
                { field: 'Clarity Grade', value: 'VS2 (center), VS (pavé)' },
                { field: 'Cut Grade', value: 'Excellent (center), Good (pavé)' },
                { field: 'Polish', value: 'Excellent' },
                { field: 'Symmetry', value: 'Excellent' }
            ]
        },
        stones: [
            {
                role: 'Center',
                count: 1,
                shape: 'Round',
                caratEach: 0.5,
                color: 'G',
                clarity: 'VS2',
                cut: 'Excellent',
                detail: 'center stone',
                polish: 'Excellent',
                symmetry: 'Excellent',
                fluorescence: 'None',
                measurementsMm: { length: 5.1, width: 5.08, depth: 3.12 }
            },
            {
                role: 'Pavé',
                count: 18,
                shape: 'Round',
                caratEach: 0.01,
                color: 'G',
                clarity: 'VS',
                cut: 'Good',
                detail: 'along the band'
            }
        ],
        featured: true,
        available: true,
        summary: 'A round center stone, with smaller stones along the band.',
        description: 'A round center stone, held low, with smaller stones along the band.',
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
                src: 'https://storage.googleapis.com/lilo-porto-picture/others/Uniform%20Grey%20Background%20Grid%20(1).jpeg',
                width: 1600,
                height: 1600,
                alt: 'Sample photograph of a cushion-cut pink stone ring with a diamond-set halo'
            }
        ],
        metal: 'Rose Gold',
        metals: ['Rose Gold', 'Yellow Gold'],
        fineness: '750',
        diamondShape: null,
        totalCaratWeight: 0.42,
        specs: {
            stonesConfirmOnInquiry: true,
            identification: [
                { field: 'Jewelry Type', value: 'Colored Stone Halo Ring' },
                { field: 'Metal', value: '18K Rose Gold' },
                { field: 'Gold Fineness', value: '750 (18K)' },
                { field: 'Metal Weight', value: '3.05 g' }
            ],
            diamondBreakdown: [
                { field: 'Center Stone', value: 'Pink cushion-cut stone (type confirmed on inquiry)' },
                { field: 'Halo Shape', value: 'Round brilliant' },
                { field: 'Total Diamond Quantity', value: '16 halo stones' },
                { field: 'Total Carat Weight', value: '0.42 ct tw (halo diamonds)' },
                { field: 'Color Grade', value: 'G to H' },
                { field: 'Clarity Grade', value: 'VS' },
                { field: 'Cut Grade', value: 'Very Good' },
                { field: 'Polish', value: 'Very Good' },
                { field: 'Symmetry', value: 'Very Good' }
            ]
        },
        stones: [{ count: 1, shape: 'Cushion', detail: 'colored center' }],
        featured: false,
        available: true,
        summary: 'A cushion-shaped colored center in a soft metal.',
        description: 'A pink cushion center in rose gold, with a pale halo.',
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
        signature_images: [
            {
                src: 'https://i.pinimg.com/1200x/a4/db/fd/a4dbfd433c3bd35c67c18b4894f6321a.jpg',
                width: 940,
                height: 940,
                alt: 'Round center stone ring with smaller stones along a pale metal band'
            }
        ],
        images: [
            {
                src: 'https://storage.googleapis.com/lilo-porto-picture/others/Uniform%20Grey%20Background%20Grid%20(2).jpeg',
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
        fineness: '18K',
        diamondShape: 'Round',
        totalCaratWeight: 0.34,
        specs: {
            composition: 'Three rings, sold as one stack',
            setting: 'Pavé rounds with flush heart and baguette motifs',
            stoneType: 'Diamond',
            stonesConfirmOnInquiry: true,
            identification: [
                { field: 'Jewelry Type', value: 'Diamond Stackable Ring Set (3 rings)' },
                { field: 'Metal', value: '18K Yellow Gold' },
                { field: 'Gold Fineness', value: '750 (18K)' },
                { field: 'Metal Weight', value: '5.60 g (set of three)' }
            ],
            diamondBreakdown: [
                { field: 'Shape & Cutting Style', value: 'Round brilliant, heart, baguette' },
                { field: 'Accent Shape', value: 'Heart and baguette motifs' },
                { field: 'Total Diamond Quantity', value: '28 stones' },
                { field: 'Total Carat Weight', value: '0.34 ct tw' },
                { field: 'Color Grade', value: 'G to H' },
                { field: 'Clarity Grade', value: 'VS to SI1' },
                { field: 'Cut Grade', value: 'Good to Very Good (per stone)' },
                { field: 'Polish', value: 'Very Good' },
                { field: 'Symmetry', value: 'Good' }
            ]
        },
        stones: [
            { role: 'Heart motif', count: 2, shape: 'Heart', caratEach: 0.03, detail: 'flush heart motifs' },
            { role: 'Bar motif', count: 2, shape: 'Baguette', caratEach: 0.02, detail: 'bar motifs' },
            { role: 'Pavé', count: 24, shape: 'Round', caratEach: 0.01, detail: 'along the bands' }
        ],
        featured: false,
        available: true,
        summary: 'Three low bands meant to be worn together.',
        description: 'Textured gold bands with small round, heart, and bar diamond motifs. Sold as a set of three.',
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
            }
        ],
        metal: 'White Gold',
        metals: ['White Gold'],
        fineness: '750',
        diamondShape: 'Emerald',
        totalCaratWeight: 1.44,
        specs: {
            stonesConfirmOnInquiry: true,
            identification: [
                { field: 'Jewelry Type', value: 'Diamond Eternity Ring' },
                { field: 'Metal', value: '18K White Gold' },
                { field: 'Gold Fineness', value: '750 (18K)' },
                { field: 'Metal Weight', value: '4.18 g' }
            ],
            diamondBreakdown: [
                { field: 'Shape & Cutting Style', value: 'Emerald cut' },
                { field: 'Accent Shape', value: 'Round brilliant' },
                { field: 'Total Diamond Quantity', value: '18 stones' },
                { field: 'Total Carat Weight', value: '1.44 ct tw' },
                { field: 'Color Grade', value: 'F' },
                { field: 'Clarity Grade', value: 'VVS2' },
                {
                    field: 'Cut Grade',
                    value: 'Very Good to Excellent (per stone; no single ring grade)'
                },
                { field: 'Polish', value: 'Excellent' },
                { field: 'Symmetry', value: 'Very Good' }
            ]
        },
        featured: true,
        available: true,
        summary: 'A continuous row of emerald-cut stones.',
        description: 'Emerald-cut stones set in a continuous row around a pale band.',
        materials: [
            'Pale metal in the photograph',
            'Emerald-cut stones around the band',
            'A 750 mark is visible inside the ring'
        ]
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
        fineness: '750',
        diamondShape: 'Oval',
        totalCaratWeight: 2.1,
        specs: {
            stonesConfirmOnInquiry: true,
            identification: [
                { field: 'Jewelry Type', value: 'Diamond Hinged Hoop Earrings' },
                { field: 'Metal', value: '18K White Gold' },
                { field: 'Gold Fineness', value: '750 (18K)' },
                { field: 'Metal Weight', value: '6.20 g (pair)' }
            ],
            diamondBreakdown: [
                { field: 'Shape & Cutting Style', value: 'Oval brilliant' },
                { field: 'Total Diamond Quantity', value: '12 stones (6 per earring)' },
                { field: 'Total Carat Weight', value: '2.10 ct tw (pair)' },
                { field: 'Color Grade', value: 'F to G' },
                { field: 'Clarity Grade', value: 'VS1' },
                { field: 'Cut Grade', value: 'Very Good' },
                { field: 'Polish', value: 'Excellent' },
                { field: 'Symmetry', value: 'Very Good' }
            ]
        },
        stones: [{ shape: 'Oval', detail: 'stones set along the hoop' }],
        featured: true,
        available: true,
        summary: 'Hoops set with a row of oval stones.',
        description: 'Oval stones set along a hinged hoop.',
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
        fineness: '750',
        diamondShape: null,
        specs: {
            stonesConfirmOnInquiry: true,
            identification: [
                { field: 'Jewelry Type', value: 'Heart Drop Hook Earrings' },
                { field: 'Metal', value: '18K Yellow Gold' },
                { field: 'Gold Fineness', value: '750 (18K)' },
                { field: 'Metal Weight', value: '2.30 g (pair)' }
            ],
            diamondBreakdown: [
                { field: 'Stone Type', value: 'Blue gemstone (type confirmed on inquiry)' },
                { field: 'Shape & Cutting Style', value: 'Heart, faceted' },
                { field: 'Total Stone Quantity', value: '2 stones (1 per earring)' },
                { field: 'Total Diamond Weight', value: 'No diamonds' },
                { field: 'Color Grade', value: 'Blue, grade confirmed on inquiry' },
                { field: 'Clarity Grade', value: 'Confirmed on inquiry' },
                { field: 'Cut Grade', value: 'Confirmed on inquiry' }
            ]
        },
        stones: [{ shape: 'Heart', detail: 'heart-shaped blue stones on gold hooks' }],
        featured: false,
        available: false,
        summary: 'Small heart drops on a simple hook.',
        description: 'Small heart drops on a simple hook, with blue heart-shaped stones.',
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
        fineness: '750',
        diamondShape: 'Pear',
        totalCaratWeight: 0.9,
        specs: {
            stonesConfirmOnInquiry: true,
            identification: [
                { field: 'Jewelry Type', value: 'Diamond Cluster Pendant Necklace' },
                { field: 'Metal', value: '18K White Gold' },
                { field: 'Gold Fineness', value: '750 (18K)' },
                { field: 'Chain Length', value: '45 cm' },
                { field: 'Metal Weight', value: '2.10 g' }
            ],
            diamondBreakdown: [
                { field: 'Shape & Cutting Style', value: 'Pear, oval, and baguette' },
                { field: 'Total Diamond Quantity', value: '3 stones' },
                { field: 'Total Carat Weight', value: '0.90 ct tw' },
                { field: 'Color Grade', value: 'F' },
                { field: 'Clarity Grade', value: 'VS1' },
                { field: 'Cut Grade', value: 'Very Good to Excellent (per stone)' },
                { field: 'Polish', value: 'Excellent' },
                { field: 'Symmetry', value: 'Very Good' }
            ]
        },
        stones: [{ detail: 'One pear, one oval, and one baguette in a cluster' }],
        featured: true,
        available: true,
        summary: 'A pear, an oval, and a baguette on a fine chain.',
        description: 'A pear, an oval, and a baguette grouped on a fine chain.',
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
        fineness: '750',
        diamondShape: 'Round',
        totalCaratWeight: 0.62,
        specs: {
            stonesConfirmOnInquiry: true,
            identification: [
                { field: 'Jewelry Type', value: 'Diamond Halo Pendant Necklace' },
                { field: 'Metal', value: '18K White Gold' },
                { field: 'Gold Fineness', value: '750 (18K)' },
                { field: 'Chain Length', value: '42 cm with 3 cm extender' },
                { field: 'Metal Weight', value: '2.65 g' }
            ],
            diamondBreakdown: [
                { field: 'Shape & Cutting Style', value: 'Round brilliant (center)' },
                { field: 'Accent Shape', value: 'Round brilliant (halo)' },
                { field: 'Total Diamond Quantity', value: '17 stones' },
                { field: 'Total Carat Weight', value: '0.62 ct tw' },
                { field: 'Color Grade', value: 'G' },
                { field: 'Clarity Grade', value: 'VS2' },
                { field: 'Cut Grade', value: 'Excellent (center), Very Good (halo)' },
                { field: 'Polish', value: 'Excellent' },
                { field: 'Symmetry', value: 'Very Good' }
            ]
        },
        stones: [{ count: 1, shape: 'Round', detail: 'center stone' }, { detail: 'Smaller stones in a halo' }],
        featured: true,
        available: true,
        summary: 'A round center stone in a halo, on a fine chain.',
        description: 'A round center stone in a halo, on a fine chain.',
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
        signature_images: [
            {
                src: 'https://i.pinimg.com/1200x/dd/da/83/ddda83e1342abedf7d753305ed03dfeb.jpg',
                width: 940,
                height: 940,
                alt: 'Fine pale chain with a curved line of small stones at the front'
            }
        ],
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
        fineness: '750',
        diamondShape: 'Round',
        totalCaratWeight: 1.8,
        specs: {
            stonesConfirmOnInquiry: true,
            identification: [
                { field: 'Jewelry Type', value: 'Diamond Curved Line Necklace' },
                { field: 'Metal', value: '18K White Gold' },
                { field: 'Gold Fineness', value: '750 (18K)' },
                { field: 'Chain Length', value: '40 cm with 5 cm extender' },
                { field: 'Metal Weight', value: '4.90 g' }
            ],
            diamondBreakdown: [
                { field: 'Shape & Cutting Style', value: 'Round brilliant' },
                { field: 'Total Diamond Quantity', value: '31 stones' },
                { field: 'Total Carat Weight', value: '1.80 ct tw' },
                { field: 'Color Grade', value: 'F to G' },
                { field: 'Clarity Grade', value: 'VS1 to VS2' },
                { field: 'Cut Grade', value: 'Very Good to Excellent (per stone)' },
                { field: 'Polish', value: 'Excellent' },
                { field: 'Symmetry', value: 'Very Good' }
            ]
        },
        stones: [{ detail: 'Small stones along a curved front line' }],
        featured: false,
        available: true,
        summary: 'A fine chain with stones set along the front.',
        description: 'A fine chain with a curved line of small stones at the front.',
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
        fineness: '750',
        diamondShape: 'Round',
        totalCaratWeight: 1.15,
        specs: {
            stonesConfirmOnInquiry: true,
            identification: [
                { field: 'Jewelry Type', value: 'Diamond Slim Bangle' },
                { field: 'Metal', value: '18K White Gold' },
                { field: 'Gold Fineness', value: '750 (18K)' },
                { field: 'Inner Diameter', value: '58 mm' },
                { field: 'Metal Weight', value: '9.80 g' }
            ],
            diamondBreakdown: [
                { field: 'Shape & Cutting Style', value: 'Round brilliant' },
                { field: 'Accent Shape', value: 'Round brilliant (front cluster)' },
                { field: 'Total Diamond Quantity', value: '34 stones' },
                { field: 'Total Carat Weight', value: '1.15 ct tw' },
                { field: 'Color Grade', value: 'G' },
                { field: 'Clarity Grade', value: 'VS2' },
                { field: 'Cut Grade', value: 'Very Good' },
                { field: 'Polish', value: 'Very Good' },
                { field: 'Symmetry', value: 'Very Good' }
            ]
        },
        stones: [
            { detail: 'Small stones along one side' },
            { count: 1, shape: 'Round', detail: 'cluster at the front' }
        ],
        featured: true,
        available: true,
        summary: 'A slim bangle with a small round cluster.',
        description: 'A slim bangle with a line of small stones and a round cluster at the front.',
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
        fineness: '750',
        diamondShape: null,
        specs: {
            stonesConfirmOnInquiry: true,
            identification: [
                { field: 'Jewelry Type', value: 'Oval Link Chain Bracelet' },
                { field: 'Metal', value: '18K Yellow Gold' },
                { field: 'Gold Fineness', value: '750 (18K)' },
                { field: 'Length', value: '18 cm' },
                { field: 'Metal Weight', value: '7.40 g' }
            ],
            diamondBreakdown: [
                { field: 'Total Diamond Quantity', value: 'None' },
                { field: 'Total Carat Weight', value: 'Not applicable (metal only)' },
                { field: 'Finish', value: 'Polished' }
            ]
        },
        featured: false,
        available: false,
        summary: 'An oval-link chain for the wrist.',
        description: 'An oval-link chain for the wrist.',
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
        signature_images: [
            {
                src: 'https://i.pinimg.com/736x/0e/37/df/0e37dfc4b58a088bb2c404774e580dd0.jpg',
                width: 940,
                height: 940,
                alt: 'Slim pale bangle with a line of small stones and a round cluster'
            }
        ],
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
        fineness: '750',
        diamondShape: null,
        specs: {
            stonesConfirmOnInquiry: true,
            identification: [
                { field: 'Jewelry Type', value: 'Slim Link Bracelet' },
                { field: 'Metal', value: '18K White Gold' },
                { field: 'Gold Fineness', value: '750 (18K)' },
                { field: 'Length', value: '17 cm with 2 cm extender' },
                { field: 'Metal Weight', value: '5.20 g' }
            ],
            diamondBreakdown: [
                { field: 'Total Diamond Quantity', value: 'None' },
                { field: 'Total Carat Weight', value: 'Not applicable (metal only)' },
                { field: 'Clasp', value: 'Lobster clasp' }
            ]
        },
        featured: false,
        available: true,
        summary: 'A slim link bracelet with a small clasp.',
        description: 'A slim link bracelet with a small clasp.',
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

/** Shop page hero — stored on Firestore doc `catalog/main` as `banner`. */
export const catalogBanner = {
    src: 'https://storage.googleapis.com/lilo-porto-picture/others/x2.png',
    alt: 'Jewelry worn in low light, ring and earring in focus'
};
