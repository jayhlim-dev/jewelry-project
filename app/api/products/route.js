import { NextResponse } from 'next/server';
import { getDb } from 'lib/firebase-admin';

export const dynamic = 'force-dynamic';

/**
 * GET /api/products
 * Reads the Firestore `products` collection.
 */
export async function GET() {
    try {
        const snapshot = await getDb().collection('products').get();
        const products = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        return NextResponse.json({
            source: 'firestore',
            count: products.length,
            products
        });
    } catch (error) {
        console.error('Firebase products GET failed:', error);
        return NextResponse.json(
            {
                error: 'Could not load products from Firebase.',
                detail: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
