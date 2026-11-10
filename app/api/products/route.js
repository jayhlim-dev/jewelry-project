import { NextResponse } from 'next/server';
import { getContent } from 'lib/content';

export const dynamic = 'force-dynamic';

/**
 * GET /api/products — full catalog.
 * PATCH one product: `/api/products/[slug]` with PRODUCTS_ADMIN_SECRET.
 */
export async function GET() {
    try {
        const { products } = await getContent();

        const cacheControl =
            process.env.NODE_ENV === 'development'
                ? 'no-store'
                : 'public, s-maxage=300, stale-while-revalidate=600';

        return NextResponse.json(
            {
                source: 'firestore',
                count: products.length,
                products
            },
            { headers: { 'Cache-Control': cacheControl } }
        );
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
