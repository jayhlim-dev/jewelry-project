import { NextResponse } from 'next/server';
import { getDb, isFirebaseConfigured } from 'lib/firebase-admin';
import { assertNoNestedArrays, toFirestore } from 'lib/firestorePayload';
import { authorizeProductWrite } from 'lib/productApiAuth';

export const dynamic = 'force-dynamic';

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/i;

function invalidSlug(slug) {
    return !slug || !slugPattern.test(slug);
}

function jsonError(message, status) {
    return NextResponse.json({ error: message }, { status });
}

async function loadProduct(slug) {
    if (!isFirebaseConfigured()) {
        throw new Error(
            'Firebase is not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.'
        );
    }
    const db = getDb();
    const ref = db.collection('products').doc(slug);
    const snap = await ref.get();
    if (!snap.exists) return null;
    return { id: snap.id, ...snap.data() };
}

/**
 * GET /api/products/:slug — one product from Firestore.
 */
export async function GET(_request, context) {
    const { slug } = await context.params;
    if (invalidSlug(slug)) {
        return jsonError('Invalid product slug.', 400);
    }

    try {
        const product = await loadProduct(slug);
        if (!product) {
            return jsonError('Product not found.', 404);
        }
        return NextResponse.json({ source: 'firestore', product });
    } catch (error) {
        console.error('Firebase product GET failed:', error);
        return NextResponse.json(
            {
                error: 'Could not load product from Firebase.',
                detail: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}

/**
 * PATCH /api/products/:slug — partial update (requires PRODUCTS_ADMIN_SECRET).
 */
export async function PATCH(request, context) {
    const auth = authorizeProductWrite(request);
    if (!auth.ok) {
        return jsonError(auth.error, auth.status);
    }

    const { slug } = await context.params;
    if (invalidSlug(slug)) {
        return jsonError('Invalid product slug.', 400);
    }

    let body;
    try {
        body = await request.json();
    } catch {
        return jsonError('Invalid request body.', 400);
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
        return jsonError('Body must be a JSON object.', 400);
    }

    if (Object.keys(body).length === 0) {
        return jsonError('Body must include at least one field to update.', 400);
    }

    if ('slug' in body && String(body.slug).trim() !== slug) {
        return jsonError('Cannot change slug via PATCH. Use the URL slug as the document id.', 400);
    }
    if ('id' in body && String(body.id).trim() !== slug) {
        return jsonError('Cannot change id via PATCH.', 400);
    }

    const patch = { ...body };
    delete patch.slug;
    delete patch.id;

    let data;
    try {
        data = toFirestore(patch);
        assertNoNestedArrays(data, `products/${slug}`);
    } catch (error) {
        return jsonError(error instanceof Error ? error.message : 'Invalid product data.', 400);
    }

    if (!data || typeof data !== 'object' || !Object.keys(data).length) {
        return jsonError('No valid fields to update after normalization.', 400);
    }

    try {
        const db = getDb();
        const ref = db.collection('products').doc(slug);
        const existing = await ref.get();
        if (!existing.exists) {
            return jsonError('Product not found.', 404);
        }

        await ref.set(
            {
                ...data,
                slug,
                id: slug
            },
            { merge: true }
        );

        const product = await loadProduct(slug);
        return NextResponse.json({ ok: true, slug, product });
    } catch (error) {
        console.error('Firebase product PATCH failed:', error);
        return NextResponse.json(
            {
                error: 'Could not update product in Firebase.',
                detail: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
