import { paths } from 'data/site';

export const searchCopy = {
    title: 'Search',
    inputLabel: 'Search the site',
    placeholder: 'Name, code, metal, or topic…',
    idleLead: 'Find a piece, read a guide, or jump to sizing and contact.',
    idleHint: 'Try a catalog code (e.g. CEL-003), “certification”, or “stack”.',
    noResultsTitle: 'No matches',
    noResultsBody: 'Check the spelling, try a piece code, or browse by category below.',
    sections: {
        pieces: 'Pieces',
        articles: 'Articles',
        pages: 'Help',
        collections: 'Shop by form',
        guides: 'Quick links'
    }
};

/** Shown when the field is empty — editorial + utility paths. */
export const searchQuickLinks = [
    { label: 'Reading a piece specification', href: `${paths.articles}/reading-a-piece-specification` },
    { label: 'Understanding certification', href: `${paths.articles}/understanding-diamond-certification` },
    { label: 'Size guide', href: paths.sizeGuide },
    { label: 'Contact & WhatsApp', href: paths.contact }
];

export const searchPopularArticleSlugs = [
    'reading-a-piece-specification',
    'how-to-choose-a-diamond-ring',
    'understanding-diamond-color'
];
