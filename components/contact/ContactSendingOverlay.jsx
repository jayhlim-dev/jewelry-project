'use client';

import { contactPage } from 'data/contact';
import { useLockBody } from 'components/layout/useOverlay';

export function ContactSendingOverlay({ open }) {
    useLockBody(open);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ivory/92 px-6 backdrop-blur-[2px]"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="contact-sending-title"
            aria-describedby="contact-sending-desc"
        >
            <div className="w-full max-w-sm border border-charcoal/12 bg-white px-8 py-10 text-center shadow-[0_24px_80px_rgba(32,32,30,0.08)]">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border border-charcoal/15 border-t-charcoal" aria-hidden="true" />
                <p id="contact-sending-title" className="mt-6 font-serif text-2xl leading-tight text-charcoal">
                    {contactPage.formSending}
                </p>
                <p id="contact-sending-desc" className="mt-3 text-sm leading-relaxed text-ash">
                    {contactPage.formSendingHint}
                </p>
            </div>
        </div>
    );
}
