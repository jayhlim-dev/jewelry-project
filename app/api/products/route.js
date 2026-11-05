import { NextResponse } from 'next/server';
import { getContent } from 'lib/content';

export const dynamic = 'force-dynamic';

/**
 * GET /api/products
 * Reads the Firestore `products` collection.
 */
export async function GET() {
    try {
        const { products } = await getContent();

        return NextResponse.json({
            source: 'firestore',
            count: products.length,
            products
        }, {
            headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' }
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
