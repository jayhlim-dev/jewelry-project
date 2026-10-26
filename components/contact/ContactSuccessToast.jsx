'use client';

import { useEffect } from 'react';
import { contactPage } from 'data/contact';

export function ContactSuccessToast({ open, onClose }) {
    useEffect(() => {
        if (!open) return undefined;

        const timer = window.setTimeout(() => onClose?.(), 5000);
        return () => window.clearTimeout(timer);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className="pointer-events-none fixed inset-x-0 bottom-0 z-[110] flex justify-center px-4 pb-6 sm:justify-end sm:px-6 sm:pb-8"
            role="status"
            aria-live="polite"
        >
            <div className="pointer-events-auto flex w-full max-w-sm items-start gap-3 border border-charcoal/12 bg-white px-4 py-3.5 shadow-[0_16px_48px_rgba(32,32,30,0.12)]">
                <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-charcoal text-[10px] text-ivory"
                    aria-hidden="true"
                >
                    ✓
                </span>
                <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium leading-snug text-charcoal">{contactPage.formSuccessTitle}</p>
                    <p className="mt-1 text-[12px] leading-relaxed text-ash">{contactPage.formSuccessLead}</p>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="shrink-0 text-[11px] tracking-[0.12em] text-ash uppercase transition-colors hover:text-charcoal"
                    aria-label="Dismiss"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
