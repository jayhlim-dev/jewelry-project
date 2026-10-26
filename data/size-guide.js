/**
 * Home ring chart in millimetres.
 * Inside diameter is the circumference divided by pi, rounded to 0.1 mm.
 * US labels are approximate conversions for reference — confirm fit with the house.
 */

function usSizeFromDiameter(diameterMm) {
    const size = (diameterMm - 11.63) / 0.8128;
    const rounded = Math.round(size * 2) / 2;
    if (rounded % 1 === 0) return String(rounded);
    return `${Math.floor(rounded)}½`;
}

export const ringSizes = [
    { circumference: 44, diameter: 14.0 },
    { circumference: 45, diameter: 14.3 },
    { circumference: 46, diameter: 14.6 },
    { circumference: 47, diameter: 15.0 },
    { circumference: 48, diameter: 15.3 },
    { circumference: 49, diameter: 15.6 },
    { circumference: 50, diameter: 15.9 },
    { circumference: 51, diameter: 16.2 },
    { circumference: 52, diameter: 16.6 },
    { circumference: 53, diameter: 16.9 },
    { circumference: 54, diameter: 17.2 },
    { circumference: 55, diameter: 17.5 },
    { circumference: 56, diameter: 17.8 },
    { circumference: 57, diameter: 18.1 },
    { circumference: 58, diameter: 18.5 },
    { circumference: 59, diameter: 18.8 },
    { circumference: 60, diameter: 19.1 },
    { circumference: 61, diameter: 19.4 },
    { circumference: 62, diameter: 19.7 },
    { circumference: 63, diameter: 20.1 },
    { circumference: 64, diameter: 20.4 },
    { circumference: 65, diameter: 20.7 },
    { circumference: 66, diameter: 21.0 },
    { circumference: 67, diameter: 21.3 },
    { circumference: 68, diameter: 21.6 },
    { circumference: 69, diameter: 22.0 },
    { circumference: 70, diameter: 22.3 }
].map((row) => ({
    ...row,
    us: usSizeFromDiameter(row.diameter)
}));

export const braceletSizes = [
    { wrist: 140, fit: 'Snug on a narrow wrist' },
    { wrist: 150, fit: 'Average wrist' },
    { wrist: 160, fit: 'Comfortable on most wrists' },
    { wrist: 170, fit: 'Looser drape' },
    { wrist: 180, fit: 'Generous — confirm with us' }
];

export const sizeGuide = {
    eyebrow: 'Rings & bracelets',
    title: 'Find the millimetres.',
    estimate:
        'Measure at home in millimetres. Send us the around-the-finger number for rings, or your wrist length for bracelets. We confirm the fit before you decide.',
    sendHint: 'Send the around number (circumference) unless we ask for across.',
    illustration: {
        src: 'https://i.pinimg.com/1200x/ad/c0/b7/adc0b787f85e1eed704ad7570d0f7c3b.jpg',
        alt: 'Hands wearing rings — use a paper strip to measure where the band will sit'
    },
    methods: [
        {
            title: 'Around the finger',
            steps: [
                'Cut a thin strip of paper.',
                'Wrap it where the ring will sit. Mark where it meets.',
                'Measure that length flat. Match the Around column in the chart (mm).'
            ]
        },
        {
            title: 'Across a ring you own',
            steps: [
                'Use a ring that already fits that finger.',
                'Measure straight across the inside, edge to edge.',
                'Match the Across column in the chart (mm).'
            ]
        }
    ],
    note: 'Measure at the end of the day. If you are between two sizes, choose the larger one.',
    chartTitle: 'Ring chart',
    chartLead: 'Millimetres only. US sizes are a reference — we still confirm on WhatsApp.',
    lookupLabel: 'I measured around my finger',
    lookupPlaceholder: 'e.g. 52',
    lookupHint: 'Type your measurement in mm, or tap a row in the chart.',
    bracelet: {
        eyebrow: 'Bracelets',
        title: 'Wrist length',
        lead: 'Wrap a tape or strip around the wrist bone where the bracelet will sit. Note the length in mm and tell us in chat — bangles and chains fit differently.',
        measureSteps: [
            'Keep the tape snug, not tight.',
            'Note the meeting point in millimetres.',
            'Tell us the piece you like; we advise on clasp or opening.'
        ],
        chartTitle: 'Typical wrist lengths',
        image: {
            src: 'https://i.pinimg.com/1200x/c8/49/90/c84990c12f4f4ee2ea9fb072eb20cab7.jpg',
            alt: 'Bracelet stack on wrist'
        }
    },
    cta: {
        whatsappWithSize: (mm) =>
            `Good day. I measured ${mm} mm around my finger (home estimate). Please help me confirm the fit for a ring.`,
        whatsappGeneric: 'Good day. I would like help confirming ring or bracelet size.',
        shopRings: 'Shop rings',
        shopBracelets: 'Shop bracelets'
    }
};

export function nearestRingRow(measurement) {
    if (!Number.isFinite(measurement)) return null;
    let best = ringSizes[0];
    let bestDelta = Math.abs(best.circumference - measurement);
    for (const row of ringSizes) {
        const delta = Math.abs(row.circumference - measurement);
        if (delta < bestDelta) {
            best = row;
            bestDelta = delta;
        }
    }
    return best;
}
