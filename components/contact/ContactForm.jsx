'use client';

import { useState } from 'react';
import { inquiryTypes } from 'data/site';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        subject: inquiryTypes[0],
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [done, setDone] = useState(false);

    function update(field, value) {
        setValues((current) => ({ ...current, [field]: value }));
        setDone(false);
    }

    function onSubmit(event) {
        event.preventDefault();
        const next = {};
        if (values.name.trim().length < 2) next.name = 'Enter your name.';
        if (!emailPattern.test(values.email.trim())) next.email = 'Enter a valid email address.';
        if (!values.subject) next.subject = 'Choose a subject.';
        if (values.message.trim().length < 10) next.message = 'Write a message of at least 10 characters.';
        setErrors(next);
        setDone(Object.keys(next).length === 0);
    }

    if (done) {
        return (
            <div role="status" className="border border-charcoal/15 p-8">
                <p className="eyebrow mb-4">Demo only</p>
                <h2 className="font-serif text-3xl">Your note was not sent.</h2>
                <p className="mt-4 text-sm leading-relaxed text-ash">
                    This preview has no mail service. Nothing was delivered to {values.email.trim()}, and no one will reply. The form is here to show validation and a confirmation state.
                </p>
                <button type="button" className="mt-6 text-[11px] tracking-[0.18em] uppercase" onClick={() => setDone(false)}>
                    Edit the note
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={onSubmit} noValidate className="space-y-6">
            <Field id="inquiry-name" label="Name" error={errors.name}>
                <input
                    id="inquiry-name"
                    name="name"
                    autoComplete="name"
                    value={values.name}
                    onChange={(event) => update('name', event.target.value)}
                    className={inputClass}
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'inquiry-name-error' : undefined}
                />
            </Field>
            <Field id="inquiry-email" label="Email" error={errors.email}>
                <input
                    id="inquiry-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(event) => update('email', event.target.value)}
                    className={inputClass}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'inquiry-email-error' : undefined}
                />
            </Field>
            <Field id="inquiry-subject" label="Subject" error={errors.subject}>
                <select
                    id="inquiry-subject"
                    name="subject"
                    value={values.subject}
                    onChange={(event) => update('subject', event.target.value)}
                    className={inputClass}
                    aria-invalid={errors.subject ? 'true' : 'false'}
                    aria-describedby={errors.subject ? 'inquiry-subject-error' : undefined}
                >
                    {inquiryTypes.map((subject) => (
                        <option key={subject} value={subject}>
                            {subject}
                        </option>
                    ))}
                </select>
            </Field>
            <Field id="inquiry-message" label="Message" error={errors.message}>
                <textarea
                    id="inquiry-message"
                    name="message"
                    rows={6}
                    value={values.message}
                    onChange={(event) => update('message', event.target.value)}
                    className={`${inputClass} resize-y`}
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'inquiry-message-error' : undefined}
                />
            </Field>
            <button type="submit" className="inline-flex min-h-11 items-center justify-center bg-charcoal px-6 text-[11px] tracking-[0.18em] text-ivory uppercase">
                Send a note
            </button>
            <p className="text-xs leading-relaxed text-ash">
                This form is for other questions. It does not send an email. Ask about a piece on WhatsApp.
            </p>
        </form>
    );
}

const inputClass = 'mt-2 w-full border-b border-charcoal/20 bg-transparent py-3 text-sm outline-none';

function Field({ id, label, error, children }) {
    return (
        <div>
            <label htmlFor={id} className="text-[11px] tracking-[0.16em] text-ash uppercase">
                {label}
            </label>
            {children}
            {error ? (
                <p id={`${id}-error`} role="alert" className="mt-2 text-xs text-charcoal">
                    {error}
                </p>
            ) : null}
        </div>
    );
}
