import { NextResponse } from 'next/server';
import { getQuotes } from 'lib/content';

export const dynamic = 'force-dynamic';

const dataSource = 'https://en.wikipedia.org/wiki/AFI%27s_100_Years...100_Movie_Quotes';

export async function GET() {
    try {
        const quotes = await getQuotes();
        const item = quotes[Math.floor(Math.random() * quotes.length)];

        return NextResponse.json({
            ...item,
            dataSource
        });
    } catch (error) {
        console.error('Firestore quotes GET failed:', error);
        return NextResponse.json(
            {
                error: 'Could not load a quote from Firebase.',
                detail: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
