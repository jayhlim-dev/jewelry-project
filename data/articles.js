export const articles = [
    {
        slug: 'reading-a-piece-specification',
        title: 'Reading a Piece Specification',
        category: 'Guides',
        date: '2026-03-28',
        readTimeMinutes: 4,
        featured: true,
        excerpt:
            'How to read the Piece specification sheet on a product page — Field, Specification, and what italic values mean before you inquire.',
        image: {
            src: 'https://i.pinimg.com/1200x/07/1d/64/071d641108e87e7aa55f9d1e8779245f.jpg',
            alt: 'Loose diamond shapes on a metal surface with jeweler tweezers holding a pear-cut stone'
        },
        keyTakeaways: [
            'The Piece specification sheet uses two columns: Field and Specification.',
            'Total Carat Weight with “tw” is the sum for the piece — not one stone unless the field says so.',
            'Italic values (Not determined / Not assessed) mean confirm on inquiry — not “bad.”',
            'A grading report belongs to one stone. Ask whether it matches the center you are buying.'
        ],
        nextSteps: [
            { label: 'Inquire about a piece', href: '/contact' },
            { label: 'Browse the shop', href: '/shop' },
            { label: 'Size guide', href: '/size-guide' }
        ],
        relatedSlugs: [
            'understanding-diamond-certification',
            'how-to-choose-a-diamond-ring',
            'understanding-diamond-color'
        ],
        body: [
            {
                type: 'p',
                text: 'On our product pages, the Piece specification sheet lists what is verified for that jewel. It reads like a form: each row has a Field on the left and a Specification on the right. Sections usually cover Identification (metal and type) and Diamond breakdown (shape, counts, total weight, grades).'
            },
            {
                type: 'h2',
                text: 'Field and Specification'
            },
            {
                type: 'p',
                text: 'Read both columns. The field name tells you what is being claimed. The specification is the value we are willing to put on that piece. Verified values sit in plain text. Values such as “Not determined” or “Not assessed” appear in italic — the same cue as on the product page — and are confirmed with you on inquiry.'
            },
            {
                type: 'ul',
                items: [
                    'Identification: jewelry type, metal, fineness, metal weight when known.',
                    'Diamond breakdown: shapes, total quantity, total carat weight (ct tw), color, clarity, cut when known.',
                    'Italic or missing grades: ask before you assume.'
                ]
            },
            {
                type: 'h2',
                text: 'A worked example'
            },
            {
                type: 'p',
                text: 'This sample mirrors the sheet you will see on a product page. Notice which lines are solid and which are italic.'
            },
            {
                type: 'specExample',
                eyebrow: 'Specification',
                title: 'Sample piece specification',
                lead: 'Illustrative example — not a live listing. Italic values are confirmed with you on inquiry.',
                sections: [
                    {
                        title: 'Identification',
                        rows: [
                            { field: 'Jewelry Type', value: 'Diamond Solitaire Ring' },
                            { field: 'Metal', value: '18K Yellow Gold' },
                            { field: 'Gold Fineness', value: '750 (18K)' },
                            { field: 'Metal Weight', value: 'Not determined' }
                        ]
                    },
                    {
                        title: 'Diamond breakdown',
                        rows: [
                            { field: 'Shape & Cutting Style', value: 'Round brilliant' },
                            { field: 'Accent Shape', value: 'Round brilliant' },
                            { field: 'Total Diamond Quantity', value: '19 stones' },
                            { field: 'Total Carat Weight', value: '0.68 ct tw' },
                            { field: 'Color Grade', value: 'Not assessed' },
                            { field: 'Clarity Grade', value: 'Not assessed' },
                            { field: 'Cut Grade', value: 'Excellent' }
                        ]
                    }
                ],
                footnote: 'We list only what is verified for a piece. Ask on inquiry for any italic line.',
                link: {
                    label: 'See a live Piece specification',
                    href: '/shop/mira-band'
                }
            },
            {
                type: 'h2',
                text: 'Total weight vs one stone'
            },
            {
                type: 'p',
                text: 'Total Carat Weight — often written with “ct tw” — is the combined weight of every diamond named for the piece. A 0.50 ct center with small accents might add up to 0.68 ct tw. That is normal. It does not mean the center is 0.68 ct.'
            },
            {
                type: 'ul',
                items: [
                    'If Total Diamond Quantity is 19 and Total Carat Weight is 0.68 ct tw, the weight is shared across those stones.',
                    'Center vs accent shapes may both be listed; the total still sums the piece.',
                    'If weight or grade is italic, confirm on inquiry rather than guessing.'
                ]
            },
            {
                type: 'h2',
                text: 'When a value is italic'
            },
            {
                type: 'p',
                text: 'An honest catalog marks unknown lines instead of inventing them. Italic does not mean a poor diamond. It means we have not attached that measurement or grade to the piece yet. Message us with the piece name or code and ask for the lines you need.'
            },
            {
                type: 'quote',
                text: 'Specifications are for the piece in front of you. A beautiful photograph is not a substitute for a line item.'
            },
            {
                type: 'p',
                text: 'If you see a certificate badge, open the report and check that the measurements and carat weight match the center stone described on the page. For stacks and multi-band pieces, ask how many rings are included and whether stones are set on every band.'
            }
        ]
    },
    {
        slug: 'understanding-diamond-color',
        title: 'Understanding Diamond Color',
        category: 'Diamonds',
        date: '2026-03-12',
        readTimeMinutes: 5,
        excerpt: 'D is the top of the D-to-Z scale. It describes body color under grading light — not the whole story of how a stone looks on your hand.',
        image: {
            src: 'https://i.pinimg.com/1200x/c4/34/5e/c4345e360ad34f31924ff286bc770f77.jpg',
            alt: 'Sample still life of gold jewelry, an open book, and dried flowers'
        },
        keyTakeaways: [
            'D, E, and F are colorless on the lab scale; G and below show more warmth when compared side by side.',
            'Cut and setting often change face-up brightness more than a one-step color difference.',
            'Yellow and rose gold can warm a stone; white metal shows body color more plainly.',
            'A color grade applies to one graded stone — name it on the piece only when it is known.'
        ],
        nextSteps: [
            { label: 'D color explained', href: '/d-color-diamond' },
            { label: 'Certification', href: '/articles/understanding-diamond-certification' },
            { label: 'Shop rings', href: '/shop' }
        ],
        body: [
            {
                type: 'p',
                text: 'Diamond color on the scale most jewelers use runs from D to Z. D shows the least body color. Z shows the most. The letters describe a tint that is often too faint to notice across a room.'
            },
            {
                type: 'p',
                text: 'D, E, and F are called colorless. A D diamond is not “more real” than an F diamond. It simply shows less body color when a grader compares it with master stones under controlled light.'
            },
            {
                type: 'h2',
                text: 'What the letter does not say'
            },
            {
                type: 'p',
                text: 'Color does not describe cut, clarity, or carat weight. A D diamond with a weak cut can look dull. A G diamond with an excellent cut can look bright. The letter is one line on a longer report.'
            },
            {
                type: 'quote',
                text: 'Look at the stone face-up, in the setting you would actually wear. A grade is a tool. It is not the view from across a table.'
            },
            {
                type: 'p',
                text: 'Yellow or rose metal can warm a stone and make a faint tint harder to see. White metal shows body color more plainly. That is a setting choice, not a trick — and it is worth seeing in person or on video before you decide.'
            },
            {
                type: 'p',
                text: 'This note is general. A grade belongs to a specific stone, and it is named on the piece only when it is known.'
            }
        ]
    },
    {
        slug: 'how-to-choose-a-diamond-ring',
        title: 'How to Choose a Diamond Ring',
        category: 'Guides',
        date: '2026-02-02',
        readTimeMinutes: 6,
        excerpt: 'Start with how the ring will feel on your hand, then metal and shape. Read color, clarity, and carat together — not as three separate trophies.',
        image: {
            src: 'https://i.pinimg.com/1200x/b9/ba/ed/b9baedf385606dbd73a6ab2e512ba9c5.jpg',
            alt: 'Sample photograph of a round diamond ring on a dark box'
        },
        keyTakeaways: [
            'Decide profile first: low and quiet vs taller and more visible on the finger.',
            'Shape changes both light and how the ring sits next to a wedding band.',
            'Ask what the quote includes: center, setting, side stones, and any report.',
            'If a detail is missing on the page, treat it as unknown until the seller confirms.'
        ],
        nextSteps: [
            { label: 'Read specifications', href: '/articles/reading-a-piece-specification' },
            { label: 'Size guide', href: '/size-guide' },
            { label: 'Contact', href: '/contact' }
        ],
        body: [
            {
                type: 'p',
                text: 'A ring has to live on a hand. Width, height, and how the metal meets the finger matter as much as the stone in the center. Try a similar profile before you fall in love with a photograph alone.'
            },
            {
                type: 'h2',
                text: 'A useful order'
            },
            {
                type: 'ul',
                items: [
                    'Feel: stackable band, statement center, or something in between.',
                    'Metal: what you already wear daily — white, yellow, or rose gold.',
                    'Shape: round, oval, emerald, pear, and cushion each catch light differently.',
                    'Grades: read color, clarity, and carat together with cut.',
                    'Proof: match any report to the actual center stone.'
                ]
            },
            {
                type: 'p',
                text: 'A heavier carat is not automatically a better diamond. Cut — how the stone returns light — often changes the face-up look more than a small step in color.'
            },
            {
                type: 'p',
                text: 'Ask what the price includes: the center stone, the setting, any side stones, and whether a grading report belongs to that center stone. If a detail is missing, treat it as unknown.'
            },
            {
                type: 'p',
                text: 'When you are ready, inquire with the piece name, metal, and finger size in millimetres. We confirm stones and timing in that conversation — nothing is reserved until you agree there.'
            }
        ]
    },
    {
        slug: 'caring-for-fine-jewelry',
        title: 'Caring for Fine Jewelry',
        category: 'Care',
        date: '2026-01-18',
        readTimeMinutes: 4,
        excerpt: 'Everyday care is simple: product last, store separately, clean gently, and check prongs when something feels loose.',
        image: {
            src: 'https://i.pinimg.com/736x/b1/06/8d/b1068d6c7f94829da53b601270f33586.jpg',
            alt: 'Sample photograph of a diamond-set bracelet on a pale background'
        },
        keyTakeaways: [
            'Put jewelry on after perfume, lotion, and hairspray.',
            'Take rings off for weights, gardening, and harsh cleaning.',
            'Store pieces so harder stones cannot scratch softer metal or gems.',
            'Skip ultrasonic and steam unless a jeweler who sees the piece approves.'
        ],
        nextSteps: [
            { label: 'Contact for care questions', href: '/contact' },
            { label: 'Shop', href: '/shop' }
        ],
        body: [
            {
                type: 'p',
                text: 'Fine jewelry is worn against skin, fabric, and daily life. Care does not need a ritual. It needs a few habits that keep stones seated and metal free of buildup.'
            },
            {
                type: 'h2',
                text: 'Everyday habits'
            },
            {
                type: 'p',
                text: 'Put jewelry on after perfume, lotion, and hairspray. Those products leave a film that dulls metal and can loosen residue around settings. Take rings off for weights, gardening, and rough washing.'
            },
            {
                type: 'p',
                text: 'Store pieces separately so a diamond, which is hard enough to scratch other gems and metal, does not rub against a neighbor. A soft pouch is enough. A jumble in a dish is how clasps bend.'
            },
            {
                type: 'p',
                text: 'Clean with lukewarm water, a drop of mild soap, and a soft brush, then rinse and dry. Skip ultrasonic machines and steam unless a jeweler who can see the piece says the setting can take it. Porous stones, pearls, and some treatments should not be soaked.'
            },
            {
                type: 'p',
                text: 'Have prongs and clasps looked at when you notice movement, a thin edge, or a catch that feels different. Ask us about the piece before you assume a repair.'
            }
        ]
    },
    {
        slug: 'jewelry-and-personal-milestones',
        title: 'Jewelry and Personal Milestones',
        category: 'Stories',
        date: '2025-11-20',
        readTimeMinutes: 3,
        excerpt: 'A piece can mark a promise or an ordinary Tuesday that mattered. Meaning comes from the wearer — the jewel only has to be well made enough to stay.',
        image: {
            src: 'https://i.pinimg.com/1200x/15/62/58/1562587dd60a24931c94f7785996c7f1.jpg',
            alt: 'Sample portrait of a person wearing a ring, cropped close to the face and hand'
        },
        keyTakeaways: [
            'The highest color grade is not required for a meaningful gift.',
            'Notice what the person already wears: metal, scale, and stack habits.',
            'Choose something they can return to often, not a piece that only works once.',
            'Stories on this site are illustrative — your story is yours.'
        ],
        nextSteps: [
            { label: 'Shop the collection', href: '/shop' },
            { label: 'Contact', href: '/contact' }
        ],
        body: [
            {
                type: 'p',
                text: 'People keep jewelry because it was there. A thin band from a first salary. Earrings worn at a wedding. A necklace that belonged to someone else and now sits differently on a new collarbone.'
            },
            {
                type: 'p',
                text: 'Milestones do not require a matching suite or the highest color grade. They require a piece you will still want in ten years, when the day itself has softened into memory.'
            },
            {
                type: 'h2',
                text: 'Choosing for a moment'
            },
            {
                type: 'p',
                text: 'If the jewel is a gift, learn how the person already dresses. A daily watch and a bare neck suggest a different piece than a stack of rings. When you are unsure, choose something they can return to often, not something that only works once.'
            },
            {
                type: 'quote',
                text: 'The story is added by the wearer. The jewel only has to be well made enough to stay.'
            },
            {
                type: 'p',
                text: 'None of the stories on this website belong to a real client. They are here to show how an editorial page can hold that kind of feeling.'
            }
        ]
    },
    {
        slug: 'understanding-diamond-certification',
        title: 'Understanding Diamond Certification',
        category: 'Diamonds',
        date: '2025-10-08',
        readTimeMinutes: 5,
        excerpt: 'A grading report describes one stone at one laboratory. It is documentation to match — not a promise about every diamond in a display case.',
        image: {
            src: 'https://i.pinimg.com/1200x/20/a9/f6/20a9f68fdea949f4534c24f85c3ae50d.jpg',
            alt: 'Sample photograph of a crystal-set bracelet against a black background'
        },
        keyTakeaways: [
            'Match report number, shape, and measurements to the stone you are buying.',
            'Read the full report — not just the color letter in an ad.',
            'Labs phrase grades differently; compare stones graded by the same lab when you can.',
            'A report is not insurance and not a guarantee of future resale value.'
        ],
        nextSteps: [
            { label: 'Read specifications', href: '/articles/reading-a-piece-specification' },
            { label: 'Diamond color', href: '/articles/understanding-diamond-color' },
            { label: 'Shop', href: '/shop' }
        ],
        body: [
            {
                type: 'p',
                text: 'A diamond grading report, often called a certificate, is a laboratory’s description of a particular stone. It usually identifies the stone, lists measurements, and grades characteristics such as color and clarity. For a standard round brilliant, many labs also grade cut.'
            },
            {
                type: 'h2',
                text: 'How to read one'
            },
            {
                type: 'p',
                text: 'Match the report to the stone. A printed page for a different diamond does not describe the jewel in front of you. Check the shape, the measurements, and the report number with the seller. If the stone is mounted, some numbers are harder to confirm without unsetting it. Ask what was verified.'
            },
            {
                type: 'p',
                text: 'Read the whole report. Color D is meaningful, and so are clarity, cut, proportions, and comments about treatments. A single letter pulled into an advertisement is not the document.'
            },
            {
                type: 'p',
                text: 'Labs differ in how they phrase grades. Compare stones graded by the same laboratory when you can. A report is not insurance, and it is not a promise about future value.'
            },
            {
                type: 'p',
                text: 'On a product page, a certificate badge should link to the report that belongs to the center stone — or tell you to ask for it. A photograph is not a certificate.'
            }
        ]
    }
];
