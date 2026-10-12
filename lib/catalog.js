import { products } from 'data/products';
import { articles } from 'data/articles';

export function getProduct(slug) {
    return products.find((product) => product.slug === slug) || null;
}

export function getRelatedProducts(product, limit = 4) {
    const sameCategory = products.filter((item) => item.slug !== product.slug && item.category === product.category);
    const rest = products.filter((item) => item.slug !== product.slug && item.category !== product.category);
    return [...sameCategory, ...rest].slice(0, limit);
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

export function getRelatedArticles(article, limit = 3) {
    return articles.filter((item) => item.slug !== article.slug).slice(0, limit);
}

export function matchesPrice(product, band) {
    if (band === 'under') return product.price < 15000000;
    if (band === 'mid') return product.price >= 15000000 && product.price <= 30000000;
    if (band === 'over') return product.price > 30000000;
    return true;
}

export function sortProducts(list, sort) {
    const next = [...list];
    if (sort === 'price-asc') next.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') next.sort((a, b) => b.price - a.price);
    else if (sort === 'name') next.sort((a, b) => a.name.localeCompare(b.name));
    else next.sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name));
    return next;
}
