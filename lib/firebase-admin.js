import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

function readPrivateKey() {
    const raw = process.env.FIREBASE_PRIVATE_KEY;
    if (!raw) return null;
    // Env files often store newlines as `\n`
    return raw.replace(/\\n/g, '\n');
}

export function isFirebaseConfigured() {
    return Boolean(
        process.env.FIREBASE_PROJECT_ID &&
            process.env.FIREBASE_CLIENT_EMAIL &&
            process.env.FIREBASE_PRIVATE_KEY
    );
}

export function getFirebaseAdminApp() {
    if (getApps().length) return getApps()[0];

    if (!isFirebaseConfigured()) {
        throw new Error(
            'Firebase is not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.'
        );
    }

    return initializeApp({
        credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID.trim(),
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL.trim(),
            privateKey: readPrivateKey()
        })
    });
}

export function getDb() {
    getFirebaseAdminApp();
    return getFirestore();
}
