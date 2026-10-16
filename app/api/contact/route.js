import { NextResponse } from 'next/server';
import { inquiryTopics } from 'data/contact';
import { sendContactEmail } from 'lib/mail';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
    let body;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').trim();
    const topicId = String(body.topicId ?? '').trim();
    const message = String(body.message ?? '').trim();

    if (name.length < 2) {
        return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
    }
    if (!emailPattern.test(email)) {
        return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }
    const topic = inquiryTopics.find((item) => item.id === topicId);
    if (!topic) {
        return NextResponse.json({ error: 'Please choose a valid topic.' }, { status: 400 });
    }
    if (message.length < 10) {
        return NextResponse.json({ error: 'Please write a message of at least 10 characters.' }, { status: 400 });
    }

    try {
        await sendContactEmail({
            name,
            email,
            topicLabel: topic.label,
            message
        });
        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('Contact email failed:', error);
        return NextResponse.json(
            { error: 'We could not send your message. Please try WhatsApp or email us directly.' },
            { status: 500 }
        );
    }
}
