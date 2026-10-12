'use client';

import { useState } from 'react';

export function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [done, setDone] = useState(false);

    function onSubmit(event) {
        event.preventDefault();
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
        if (!valid) {
            setError('Enter a valid email address.');
            setDone(false);
            return;
        }
        setError('');
        setDone(true);
    }

    return (
        <form onSubmit={onSubmit} noValidate className="mt-6">
            <label htmlFor="newsletter-email" className="eyebrow">
                Notes by email
            </label>
            <div className="mt-3 flex items-end gap-3 border-b border-charcoal/25">
                <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                        setDone(false);
                    }}
                    placeholder="Email address"
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error || done ? 'newsletter-status' : undefined}
                    className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-ash"
                />
                <button type="submit" className="mb-3 shrink-0 text-[11px] tracking-[0.18em] uppercase">
                    Join
                </button>
            </div>
            <p id="newsletter-status" role={error ? 'alert' : 'status'} className="mt-3 min-h-5 text-xs leading-relaxed text-ash">
                {error || (done ? 'This is a demo. You were not added to a mailing list, and no email was sent.' : 'A preview only. Submitting does not subscribe you.')}
            </p>
        </form>
    );
}
