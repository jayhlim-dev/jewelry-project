import { getAnalytics, isSupported } from 'firebase/analytics';
import { getApps, initializeApp } from 'firebase/app';

// Public web config. Real values live in .env as NEXT_PUBLIC_FIREBASE_*.
// measurementId is optional.
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

export function isFirebaseClientConfigured() {
    return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);
}

export function getFirebaseApp() {
    if (getApps().length) return getApps()[0];
    if (!isFirebaseClientConfigured()) return null;
    return initializeApp(firebaseConfig);
}

// Analytics only works in the browser. Do not call this during server render.
export async function getFirebaseAnalytics() {
    const app = getFirebaseApp();
    if (!app || typeof window === 'undefined' || !firebaseConfig.measurementId) return null;
    if (!(await isSupported())) return null;
    return getAnalytics(app);
}
