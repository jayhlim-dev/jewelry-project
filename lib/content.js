import 'server-only';
import { cache } from 'react';
import { connection } from 'next/server';
import { unstable_cache } from 'next/cache';
import { collections as localCollections } from 'data/collections';
import { catalogBanner as localCatalogBanner } from 'data/products';
import { getDb, isFirebaseConfigured } from 'lib/firebase-admin';

const COLLECTION_ORDER = ['rings', 'necklaces', 'earrings', 'bracelets'];

/** Firebase console often saves `storage.cloud.google.com`; Next/Image prefers the public host. */
function normalizeGcsImageUrl(src) {
    if (typeof src !== 'string') return src;
    return src.replace('https://storage.cloud.google.com/', 'https://storage.googleapis.com/');
}

function normalizeCollectionImages(collections) {
    return collections.map((item) => {
        if (!item.image?.src) return item;
        const image = { ...item.image, src: normalizeGcsImageUrl(item.image.src) };
        const mobileRaw = image.mobileSrc || image.mobile_src;
        if (mobileRaw) image.mobileSrc = normalizeGcsImageUrl(mobileRaw);
        delete image.mobile_src;
        return { ...item, image };
    });
}

function normalizeCatalogBanner(catalog) {
    if (!catalog?.banner?.src) return catalog;
    return { ...catalog, banner: { ...catalog.banner, src: normalizeGcsImageUrl(catalog.banner.src) } };
}

function plain(value) {
    if (value == null) return value;
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return value;
    if (typeof value.toDate === 'function') return value.toDate().toISOString();
    if (Array.isArray(value)) return value.map((item) => plain(item));
    if (typeof value === 'object') {
        const out = {};
        for (const [key, item] of Object.entries(value)) {
            if (item === undefined) continue;
            out[key] = plain(item);
        }
        return out;
    }
    return null;
}

function fromDoc(doc) {
    const data = plain(doc.data()) || {};
    if (data.id == null) return data;
    return data;
}

function requireDb() {
    if (!isFirebaseConfigured()) {
        throw new Error(
            'Firebase is not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.'
        );
    }
    return getDb();
}

function requireDoc(data, collection, id) {
    if (!data || typeof data !== 'object' || !Object.keys(data).length) {
        throw new Error(`Missing Firestore document ${collection}/${id}.`);
    }
    return data;
}

function requireField(data, collection, id, field, check = (value) => value != null) {
    if (!check(data[field])) {
        throw new Error(`Firestore document ${collection}/${id} is missing ${field}.`);
    }
}

async function readDoc(db, collection, id) {
    const snapshot = await db.collection(collection).doc(id).get();
    if (!snapshot.exists) {
        throw new Error(`Missing Firestore document ${collection}/${id}.`);
    }
    return requireDoc(fromDoc(snapshot), collection, id);
}

async function readCollection(db, name) {
    const snapshot = await db.collection(name).get();
    if (snapshot.empty) {
        throw new Error(`Firestore collection ${name} is empty.`);
    }
    return snapshot.docs.map((doc) => fromDoc(doc));
}

function codeRank(item) {
    const match = String(item.code || '').match(/(\d+)\s*$/);
    return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

function sortProducts(products) {
    return [...products].sort((a, b) => codeRank(a) - codeRank(b) || String(a.name || '').localeCompare(String(b.name || '')));
}

function sortCollections(collections) {
    return [...collections].sort((a, b) => {
        const ai = COLLECTION_ORDER.indexOf(a.slug);
        const bi = COLLECTION_ORDER.indexOf(b.slug);
        const ar = ai === -1 ? 1000 : ai;
        const br = bi === -1 ? 1000 : bi;
        if (ar !== br) return ar - br;
        return String(a.name || a.slug).localeCompare(String(b.name || b.slug));
    });
}

/** Repo `data/collections.js` image.src wins so banner edits apply before Firestore re-seed. */
function applyLocalCollectionImages(collections) {
    const imagesBySlug = new Map(localCollections.map((item) => [item.slug, item.image]));
    return collections.map((item) => {
        const localImage = imagesBySlug.get(item.slug);
        if (!localImage?.src) return item;
        return { ...item, image: { ...(item.image || {}), ...localImage } };
    });
}

function applyLocalCatalogBanner(catalog) {
    if (!localCatalogBanner?.src) return catalog;
    return { ...catalog, banner: { ...(catalog.banner || {}), ...localCatalogBanner } };
}

function sortArticles(articles) {
    return [...articles].sort((a, b) => new Date(b.date) - new Date(a.date) || String(a.slug).localeCompare(String(b.slug)));
}

function applyFeatureFlags(site, search) {
    const showDiamond = site.features.showDColorDiamondPage === true;
    let navigation = site.navigation.filter((link) => showDiamond || link.href !== site.paths.diamond);
    if (showDiamond && site.paths.diamond && !navigation.some((link) => link.href === site.paths.diamond)) {
        const link = { label: 'D Color Diamond', href: site.paths.diamond };
        const contactIndex = navigation.findIndex((item) => item.href === site.paths.contact);
        if (contactIndex === -1) navigation = [...navigation, link];
        else navigation = [...navigation.slice(0, contactIndex), link, ...navigation.slice(contactIndex)];
    }

    const quickLinks = (search.quickLinks || []).filter((link) => showDiamond || link.href !== site.paths.diamond);
    return {
        site: { ...site, navigation },
        search: { ...search, quickLinks }
    };
}

function prepareSizeGuide(sizeGuide) {
    const cta = { ...(sizeGuide.cta || {}) };
    delete cta.whatsappWithSize;
    return { ...sizeGuide, cta };
}

// Firestore reads are cached across requests and refreshed in the background (production only).
// Dev: every request hits Firestore. Prod: 5 min. Clear disk cache with `npm run clear-cache`.
// Run revalidateTag(CONTENT_TAG, 'max') to refresh sooner after a seed or edit in production.
export const CONTENT_TAG = 'content';
const CONTENT_REVALIDATE_SECONDS = 300;
const contentCacheEnabled =
    process.env.NODE_ENV !== 'development' && process.env.CONTENT_DISABLE_CACHE !== '1';
/** When `1`, `data/collections.js` and `data/products.js` banner URLs override Firestore (seed workflow). */
const useLocalImageOverrides = process.env.CONTENT_LOCAL_IMAGE_OVERRIDES === '1';

async function fetchSiteContent() {
    const db = requireDb();
    const [products, collections, articles, site, home, story, contact, diamond, sizeGuide, articlesPage, search, catalog] =
        await Promise.all([
            readCollection(db, 'products'),
            readCollection(db, 'collections'),
            readCollection(db, 'articles'),
            readDoc(db, 'site', 'main'),
            readDoc(db, 'home', 'main'),
            readDoc(db, 'story', 'main'),
            readDoc(db, 'contact', 'main'),
            readDoc(db, 'diamond', 'main'),
            readDoc(db, 'sizeGuide', 'main'),
            readDoc(db, 'articlesPage', 'main'),
            readDoc(db, 'search', 'main'),
            readDoc(db, 'catalog', 'main')
        ]);

    requireField(site, 'site', 'main', 'paths', (value) => value && typeof value === 'object');
    requireField(site, 'site', 'main', 'features', (value) => value && typeof value === 'object');
    requireField(site, 'site', 'main', 'navigation', Array.isArray);
    requireField(site, 'site', 'main', 'name', (value) => typeof value === 'string' && value.length > 0);
    requireField(site, 'site', 'main', 'seo', (value) => value && typeof value === 'object');
    requireField(site, 'site', 'main', 'contact', (value) => value && typeof value === 'object');
    requireField(story, 'story', 'main', 'pillars', Array.isArray);
    requireField(contact, 'contact', 'main', 'inquiryTopics', Array.isArray);
    requireField(contact, 'contact', 'main', 'faqs', Array.isArray);
    requireField(sizeGuide, 'sizeGuide', 'main', 'ringSizes', Array.isArray);
    requireField(sizeGuide, 'sizeGuide', 'main', 'braceletSizes', Array.isArray);
    requireField(search, 'search', 'main', 'quickLinks', Array.isArray);
    requireField(search, 'search', 'main', 'popularArticleSlugs', Array.isArray);
    requireField(catalog, 'catalog', 'main', 'sortOptions', Array.isArray);
    requireField(catalog, 'catalog', 'main', 'priceBands', Array.isArray);

    const flagged = applyFeatureFlags(site, search);

    return {
        site: flagged.site,
        products: sortProducts(products),
        collections: sortCollections(
            normalizeCollectionImages(useLocalImageOverrides ? applyLocalCollectionImages(collections) : collections)
        ),
        articles: sortArticles(articles),
        home,
        story,
        contact,
        diamond,
        sizeGuide: prepareSizeGuide(sizeGuide),
        articlesPage,
        search: flagged.search,
        catalog: normalizeCatalogBanner(useLocalImageOverrides ? applyLocalCatalogBanner(catalog) : catalog)
    };
}

const loadContent = contentCacheEnabled
    ? unstable_cache(fetchSiteContent, ['site-content'], {
          revalidate: CONTENT_REVALIDATE_SECONDS,
          tags: [CONTENT_TAG]
      })
    : fetchSiteContent;

// React cache() dedupes repeated calls inside one render.
export const getContent = cache(async () => {
    await connection();
    return loadContent();
});

async function fetchQuotes() {
    const db = requireDb();
    const snapshot = await db.collection('quotes').get();
    if (snapshot.empty) {
        throw new Error('Firestore collection quotes is empty.');
    }
    return snapshot.docs.map((doc) => plain(doc.data()));
}

const loadQuotes = contentCacheEnabled
    ? unstable_cache(fetchQuotes, ['site-quotes'], { revalidate: 3600, tags: [CONTENT_TAG] })
    : fetchQuotes;

export const getQuotes = cache(async () => {
    await connection();
    return loadQuotes();
});
