import { timingSafeEqual } from 'crypto';

function safeEqual(provided, expected) {
    const a = Buffer.from(provided);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
}

/**
 * Server-only guard for PATCH /api/products/[slug].
 * Set PRODUCTS_ADMIN_SECRET in the environment (never expose to the client).
 */
export function authorizeProductWrite(request) {
    const secret = process.env.PRODUCTS_ADMIN_SECRET?.trim();
    if (!secret) {
        return {
            ok: false,
            status: 503,
            error: 'Product updates are not configured. Set PRODUCTS_ADMIN_SECRET on the server.'
        };
    }

    const auth = request.headers.get('authorization');
    const headerKey = request.headers.get('x-api-key');
    let provided = null;

    if (auth?.startsWith('Bearer ')) {
        provided = auth.slice('Bearer '.length).trim();
    } else if (headerKey) {
        provided = headerKey.trim();
    }

    if (!provided) {
        return { ok: false, status: 401, error: 'Missing API credentials. Use Authorization: Bearer … or x-api-key.' };
    }

    if (!safeEqual(provided, secret)) {
        return { ok: false, status: 403, error: 'Invalid API credentials.' };
    }

    return { ok: true };
}
