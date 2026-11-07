import { readFile } from 'node:fs/promises';
import { getDb } from 'lib/firebase-admin';
import { articles } from 'data/articles';
import { articlesPage } from 'data/articlesPage';
import { collections } from 'data/collections';
import { contactFaqs, contactPage, inquiryTopics } from 'data/contact';
import { diamondPage } from 'data/diamond';
import { home } from 'data/home';
import { catalogBanner, priceBands, products, sortOptions } from 'data/products';
import { searchCopy, searchPopularArticleSlugs, searchQuickLinks } from 'data/search';
import { site, paths } from 'data/site';
import { siteFeatures } from 'config/siteFeatures';
import { braceletSizes, ringSizes, sizeGuide } from 'data/size-guide';
import { pillars, story } from 'data/story';

function toFirestore(value) {
    if (typeof value === 'function') return value.toString();
    if (value === undefined) return undefined;
    if (value === null || typeof value !== 'object') return value;

    if (Array.isArray(value)) {
        return value.map((item) => {
            const next = toFirestore(item);
            return next === undefined ? null : next;
        });
    }

    const out = {};
    for (const [key, item] of Object.entries(value)) {
        const next = toFirestore(item);
        if (next !== undefined) out[key] = next;
    }
    return out;
}

function assertNoNestedArrays(value, path = 'root') {
    if (Array.isArray(value)) {
        value.forEach((item, index) => {
            if (Array.isArray(item)) {
                throw new Error(`Nested array at ${path}[${index}]. Firestore cannot store that.`);
            }
            assertNoNestedArrays(item, `${path}[${index}]`);
        });
        return;
    }
    if (value && typeof value === 'object') {
        for (const [key, item] of Object.entries(value)) {
            assertNoNestedArrays(item, `${path}.${key}`);
        }
    }
}

function docsFromList(list, idKey) {
    return list.map((item, index) => {
        const id = String(item[idKey] || item.slug || item.id || index + 1);
        return { id, data: item };
    });
}

async function writeDocs(db, collection, docs) {
    const chunkSize = 400;
    for (let index = 0; index < docs.length; index += chunkSize) {
        const batch = db.batch();
        for (const doc of docs.slice(index, index + chunkSize)) {
            const data = toFirestore(doc.data);
            assertNoNestedArrays(data, `${collection}/${doc.id}`);
            batch.set(db.collection(collection).doc(doc.id), data);
        }
        await batch.commit();
    }
    return docs.length;
}

async function writeOne(db, collection, id, data) {
    const clean = toFirestore(data);
    assertNoNestedArrays(clean, `${collection}/${id}`);
    await db.collection(collection).doc(id).set(clean);
    return 1;
}

const quotes = JSON.parse(await readFile(new URL('../data/quotes.json', import.meta.url), 'utf8'));

const db = getDb();
const counts = {};

counts.products = await writeDocs(db, 'products', docsFromList(products, 'slug'));
counts.collections = await writeDocs(db, 'collections', docsFromList(collections, 'slug'));
counts.articles = await writeDocs(db, 'articles', docsFromList(articles, 'slug'));
counts.quotes = await writeDocs(
    db,
    'quotes',
    quotes.map((quote, index) => ({ id: String(index + 1).padStart(3, '0'), data: quote }))
);

counts.site = await writeOne(db, 'site', 'main', { ...site, paths, features: siteFeatures });
counts.home = await writeOne(db, 'home', 'main', home);
counts.story = await writeOne(db, 'story', 'main', { ...story, pillars });
counts.contact = await writeOne(db, 'contact', 'main', { ...contactPage, inquiryTopics, faqs: contactFaqs });
counts.diamond = await writeOne(db, 'diamond', 'main', diamondPage);
counts.sizeGuide = await writeOne(db, 'sizeGuide', 'main', { ...sizeGuide, ringSizes, braceletSizes });
counts.articlesPage = await writeOne(db, 'articlesPage', 'main', articlesPage);
counts.search = await writeOne(db, 'search', 'main', {
    ...searchCopy,
    quickLinks: searchQuickLinks,
    popularArticleSlugs: searchPopularArticleSlugs
});
counts.catalog = await writeOne(db, 'catalog', 'main', { priceBands, sortOptions, banner: catalogBanner });

console.log(JSON.stringify(counts, null, 2));
