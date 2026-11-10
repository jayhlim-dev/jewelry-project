import { NextResponse } from 'next/server';
import { getDb, isFirebaseConfigured } from 'lib/firebase-admin';

export const dynamic = 'force-dynamic';

/**
 * GET /api/health
 * Liveness + light readiness (Firestore `site/main`).
 */
export async function GET() {
    const timestamp = new Date().toISOString();

    if (!isFirebaseConfigured()) {
        return NextResponse.json({
            ok: true,
            status: 'healthy',
            timestamp,
            checks: {
                firebase: 'not_configured'
            }
        });
    }

    try {
        const db = getDb();
        const snap = await db.collection('site').doc('main').get();

        if (!snap.exists) {
            return NextResponse.json(
                {
                    ok: false,
                    status: 'degraded',
                    timestamp,
                    checks: { firebase: 'site_main_missing' }
                },
                { status: 503 }
            );
        }

        return NextResponse.json({
            ok: true,
            status: 'healthy',
            timestamp,
            checks: { firebase: 'ok' }
        });
    } catch (error) {
        console.error('Health check failed:', error);
        return NextResponse.json(
            {
                ok: false,
                status: 'unhealthy',
                timestamp,
                checks: {
                    firebase: 'error',
                    detail: error instanceof Error ? error.message : 'Unknown error'
                }
            },
            { status: 503 }
        );
    }
}
