/**
 * Home ring chart in millimetres.
 * Inside diameter is the circumference divided by pi, rounded to 0.1 mm.
 * These rows are a measuring aid. They are not a fitting.
 */

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
];

export const sizeGuide = {
    eyebrow: 'Rings',
    title: 'Find the millimetres.',
    estimate: 'Two ways to measure. Both stay in millimetres. Ask us to confirm the fit before you decide.',
    methods: [
        {
            title: 'Around the finger',
            steps: [
                'Cut a thin strip of paper.',
                'Wrap it where the ring will sit. Mark the place it meets.',
                'Lay the strip flat and measure that length. The large number in the chart is this length.'
            ]
        },
        {
            title: 'Across a ring you own',
            steps: [
                'Choose a ring that already fits that finger.',
                'Measure straight across the inside, from one inner edge to the other.',
                'The small number in the chart is that width.'
            ]
        }
    ],
    note: 'Measure at the end of the day, when the finger is slightly larger. If you land between two numbers, choose the larger one.'
};
