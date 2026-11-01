import { paths } from 'data/site';

export const searchCopy = {
    title: 'Search',
    inputLabel: 'Search the site',
    placeholder: 'Name, code, metal, or topic…',
    idleLead: 'Browse a form, or type a piece name, code (e.g. CEL-003), or topic.',
    noResultsTitle: 'No matches',
    noResultsBody: 'Check the spelling, try a piece code, or browse by category below.',
    sections: {
        pieces: 'Pieces',
        articles: 'Articles',
        pages: 'Help',
        collections: 'Shop by form',
        guides: 'Quick links',
        reads: 'Popular reads'
    }
};

/** Idle utility paths — no overlap with popular reads. */
export const searchQuickLinks = [
    { label: 'Size guide', href: paths.sizeGuide },
    { label: 'Contact & WhatsApp', href: paths.contact },
    { label: 'Understanding certification', href: `${paths.articles}/understanding-diamond-certification` }
];

/** Idle editorial picks — titles only; keep off quick links. */
export const searchPopularArticleSlugs = ['how-to-choose-a-diamond-ring', 'understanding-diamond-color'];
