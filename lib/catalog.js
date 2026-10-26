import { products } from 'data/products';
import { articles } from 'data/articles';
import { collections } from 'data/collections';

export function getProduct(slug) {
    return products.find((product) => product.slug === slug) || null;
}

export function metalViews(product) {
    const primary = { metal: product.metal, images: product.images };
    const extras = (product.metalViews || []).filter(
        (view) => view.metal && view.metal !== product.metal && view.images?.length
    );
    return [primary, ...extras];
}

export function getCollection(slug) {
    return collections.find((collection) => collection.slug === slug) || null;
}

export function getCollectionForCategory(category) {
    return collections.find((collection) => collection.name === category) || null;
}

export function getProductsInCollection(collection) {
    return products.filter((product) => product.category === collection.name);
}

export function getRelatedProducts(product, limit = 4) {
    return products.filter((item) => item.slug !== product.slug && item.category === product.category).slice(0, limit);
}

export function getFeaturedProducts() {
    return products.filter((product) => product.featured);
}

export function uniqueValues(list, key) {
    return [...new Set(list.map((item) => item[key]).filter(Boolean))].sort();
}

export function getArticle(slug) {
    return articles.find((article) => article.slug === slug) || null;
}

export function getArticlesSorted() {
    return [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getArticleCategories() {
    return [...new Set(articles.map((item) => item.category))].sort();
}

export function getRelatedArticles(article, limit = 3) {
    const others = articles.filter((item) => item.slug !== article.slug);
    const sameCategory = others.filter((item) => item.category === article.category);
    const rest = others.filter((item) => item.category !== article.category);
    return [...sameCategory, ...rest].slice(0, limit);
}

function codeRank(product) {
    const match = String(product.code || '').match(/(\d+)\s*$/);
    return match ? Number(match[1]) : 0;
}

export function getNewestProducts(limit = 4) {
    return products
        .filter((product) => product.available)
        .sort((a, b) => codeRank(b) - codeRank(a))
        .slice(0, limit);
}

export function getProductsInBand(band) {
    return products.filter((product) => product.available && matchesPrice(product, band));
}

export function matchesPrice(product, band) {
    if (band === 'under') return product.price < 15000000;
    if (band === 'mid') return product.price >= 15000000 && product.price <= 30000000;
    if (band === 'over') return product.price > 30000000;
    return true;
}

export function catalogPriceBounds(list = products) {
    const amounts = list.flatMap((product) => [product.price, product.priceMax].filter((value) => typeof value === 'number'));
    const max = Math.max(...amounts);
    return {
        min: 0,
        max: Math.ceil(max / 1_000_000) * 1_000_000
    };
}

export function matchesPriceRange(product, min, max) {
    const low = product.price;
    const high = product.priceMax || product.price;
    return high >= min && low <= max;
}

export function sortProducts(list, sort) {
    const next = [...list];
    if (sort === 'price-asc') next.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') next.sort((a, b) => b.price - a.price);
    else if (sort === 'name') next.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'newest') next.sort((a, b) => codeRank(b) - codeRank(a));
    else next.sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name));
    return next;
}
