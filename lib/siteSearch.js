import { articles } from 'data/articles';
import { products } from 'data/products';
import { paths, site } from 'data/site';
import { isDColorDiamondEnabled } from 'lib/features';

function normalize(text) {
    return String(text || '')
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '');
}

function tokens(query) {
    return normalize(query)
        .split(/\s+/)
        .map((part) => part.trim())
        .filter((part) => part.length > 0);
}

function matchesHaystack(haystack, queryTokens) {
    if (!queryTokens.length) return false;
    const normalized = normalize(haystack);
    return queryTokens.every((token) => normalized.includes(token));
}

function productHaystack(product) {
    const stoneBits = (product.stones || []).flatMap((stone) => [
        stone.role,
        stone.shape,
        stone.detail,
        stone.color,
        stone.clarity,
        stone.caratEach,
        stone.count
    ]);
    const spec = product.specs || {};
    const cert = spec.certificate || {};
    return [
        product.name,
        product.slug,
        product.code,
        product.category,
        product.metal,
        product.metals?.join(' '),
        product.fineness,
        product.diamondShape,
        product.summary,
        product.description,
        spec.composition,
        spec.setting,
        spec.stoneType,
        cert.lab,
        cert.number,
        ...stoneBits
    ]
        .filter(Boolean)
        .join(' ');
}

function articleHaystack(article) {
    const bodyText = (article.body || [])
        .map((block) => {
            if (block.type === 'ul') return block.items?.join(' ');
            return block.text;
        })
        .filter(Boolean)
        .join(' ');
    return [
        article.title,
        article.slug,
        article.category,
        article.excerpt,
        bodyText,
        ...(article.keyTakeaways || [])
    ].join(' ');
}

function getSitePages() {
    const pages = [
        {
            title: 'Size guide',
            subtitle: 'Finger size in millimetres',
            href: paths.sizeGuide,
            keywords: 'ring size mm finger circumference measure fit'
        },
        {
            title: 'Contact',
            subtitle: 'WhatsApp and email',
            href: paths.contact,
            keywords: 'contact whatsapp email inquiry ask question'
        },
        {
            title: 'Articles',
            subtitle: 'Diamond and care guides',
            href: paths.articles,
            keywords: 'articles journal guides read learn certification color'
        },
        {
            title: 'Shop',
            subtitle: 'All pieces',
            href: paths.shop,
            keywords: 'shop catalog collection browse jewelry'
        },
        {
            title: `Why ${site.name}`,
            subtitle: 'How we work',
            href: paths.why,
            keywords: 'why about story inquiry honest'
        }
    ];
    if (isDColorDiamondEnabled()) {
        pages.push({
            title: 'D color diamond',
            subtitle: 'Colorless grades explained',
            href: paths.diamond,
            keywords: 'd color diamond colorless grade'
        });
    }
    return pages;
}

export function searchProducts(query, { includeUnavailable = false } = {}) {
    const queryTokens = tokens(query);
    if (!queryTokens.length) return [];
    return products.filter((product) => {
        if (!includeUnavailable && !product.available) return false;
        return matchesHaystack(productHaystack(product), queryTokens);
    });
}

export function searchArticles(query) {
    const queryTokens = tokens(query);
    if (!queryTokens.length) return [];
    return articles.filter((article) => matchesHaystack(articleHaystack(article), queryTokens));
}

export function searchPages(query) {
    const queryTokens = tokens(query);
    if (!queryTokens.length) return [];
    return getSitePages().filter((page) => matchesHaystack(`${page.title} ${page.subtitle} ${page.keywords}`, queryTokens));
}

export function searchSite(query) {
    const trimmed = query.trim();
    if (!trimmed) {
        return { products: [], articles: [], pages: [], hasQuery: false };
    }
    return {
        hasQuery: true,
        products: searchProducts(trimmed),
        articles: searchArticles(trimmed),
        pages: searchPages(trimmed)
    };
}

export function hasSearchResults(result) {
    return result.products.length + result.articles.length + result.pages.length > 0;
}
