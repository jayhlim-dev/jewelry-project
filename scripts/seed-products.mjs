// Writes only the `products` collection from data/products.js to Firestore.
// Each product document is replaced by the matching entry (id = slug). Other collections are not touched.
import { getDb } from 'lib/firebase-admin';
import { products } from 'data/products';

function toFirestore(value) {
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

function assertNoNestedArrays(value, path) {
    if (Array.isArray(value)) {
        value.forEach((item, index) => {
            if (Array.isArray(item)) throw new Error(`Nested array at ${path}[${index}]. Firestore cannot store that.`);
            assertNoNestedArrays(item, `${path}[${index}]`);
        });
        return;
    }
    if (value && typeof value === 'object') {
        for (const [key, item] of Object.entries(value)) assertNoNestedArrays(item, `${path}.${key}`);
    }
}

const db = getDb();
const batch = db.batch();

for (const product of products) {
    const id = String(product.slug || product.id);
    const data = toFirestore(product);
    assertNoNestedArrays(data, `products/${id}`);
    batch.set(db.collection('products').doc(id), data);
}

await batch.commit();
console.log(`Updated ${products.length} product documents.`);
