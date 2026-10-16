'use client';

import { useEffect, useMemo, useState } from 'react';
import { contactPage, inquiryTopics, whatsappDraftForTopic } from 'data/contact';
import { paths, site } from 'data/site';
import { ContactSendingOverlay } from 'components/contact/ContactSendingOverlay';
import { Button } from 'components/ui/Button';
import Link from 'next/link';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm({ topicId: topicIdProp, onTopicIdChange, showTopicSelect = true }) {
    const [topicId, setTopicId] = useState(topicIdProp ?? inquiryTopics[0].id);
    const [values, setValues] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [done, setDone] = useState(false);
    const [sending, setSending] = useState(false);
    const [submitError, setSubmitError] = useState('');

    useEffect(() => {
        if (topicIdProp) setTopicId(topicIdProp);
    }, [topicIdProp]);

    const topic = useMemo(() => inquiryTopics.find((item) => item.id === topicId) ?? inquiryTopics[0], [topicId]);
    const whatsappHref = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(whatsappDraftForTopic(topic))}`;

    function setTopic(nextId) {
        setTopicId(nextId);
        onTopicIdChange?.(nextId);
        setDone(false);
    }

    function update(field, value) {
        setValues((current) => ({ ...current, [field]: value }));
        setDone(false);
    }

    async function onSubmit(event) {
        event.preventDefault();
        const next = {};
        if (values.name.trim().length < 2) next.name = 'Enter your name.';
        if (!emailPattern.test(values.email.trim())) next.email = 'Enter a valid email address.';
        if (!topic) next.topic = 'Choose a topic.';
        if (values.message.trim().length < 10) next.message = 'Write a message of at least 10 characters.';
        setErrors(next);
        setSubmitError('');
        if (Object.keys(next).length) {
            setDone(false);
            return;
        }

        setSending(true);
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: values.name.trim(),
                    email: values.email.trim(),
                    topicId: topic.id,
                    message: values.message.trim()
                })
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                setSubmitError(data.error || contactPage.formError);
                setDone(false);
                return;
            }
            setDone(true);
        } catch {
            setSubmitError(contactPage.formError);
            setDone(false);
        } finally {
            setSending(false);
        }
    }

    if (done) {
        return (
            <div role="status" className="border border-charcoal/12 bg-white p-8 md:p-10 lg:min-h-[28rem]">
                <p className="eyebrow mb-3">Sent</p>
                <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] leading-tight">{contactPage.formSuccessTitle}</h2>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ash">{contactPage.formSuccessLead}</p>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ash">
                    For availability on a specific piece, you may also{' '}
                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="border-b border-charcoal/25">
                        message us on WhatsApp
                    </a>
                    .
                </p>
                <button
                    type="button"
                    className="mt-8 text-[11px] tracking-[0.18em] text-charcoal uppercase transition-colors hover:text-ash"
                    onClick={() => setDone(false)}
                >
                    Edit the note
                </button>
            </div>
        );
    }

    return (
        <>
            <ContactSendingOverlay open={sending} />
            <div
                className="relative border border-charcoal/12 bg-white p-7 md:p-9 lg:min-h-[28rem]"
                aria-busy={sending}
            >
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-charcoal/8 pb-6">
                <div>
                    <h2 className="font-serif text-2xl">{contactPage.formTitle}</h2>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-ash">{contactPage.formLead}</p>
                </div>
                <p className="text-[11px] tracking-[0.12em] text-taupe uppercase">Topic: {topic.label}</p>
            </div>

            <form onSubmit={onSubmit} noValidate className={`mt-8 space-y-7 ${sending ? 'pointer-events-none opacity-60' : ''}`}>
                {showTopicSelect ? (
                    <Field id="inquiry-topic" label="Topic" error={errors.topic}>
                        <select
                            id="inquiry-topic"
                            name="topic"
                            value={topicId}
                            onChange={(event) => setTopic(event.target.value)}
                            className={inputClass}
                        >
                            {inquiryTopics.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.label}
                                </option>
                            ))}
                        </select>
                    </Field>
                ) : null}

                <div className="grid gap-7 sm:grid-cols-2">
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
                </div>

                <Field id="inquiry-message" label="Message" error={errors.message}>
                    <textarea
                        id="inquiry-message"
                        name="message"
                        rows={7}
                        value={values.message}
                        onChange={(event) => update('message', event.target.value)}
                        placeholder={topic.placeholder}
                        className={`${inputClass} resize-y`}
                        aria-invalid={errors.message ? 'true' : 'false'}
                        aria-describedby={errors.message ? 'inquiry-message-error' : undefined}
                    />
                </Field>

                {submitError ? (
                    <p role="alert" className="text-sm leading-relaxed text-charcoal">
                        {submitError}
                    </p>
                ) : null}

                <div className="flex flex-col gap-4 border-t border-charcoal/8 pt-8 sm:flex-row sm:flex-wrap sm:items-center">
                    <Button type="submit" disabled={sending}>
                        Send email
                    </Button>
                    <Button href={whatsappHref} external variant="secondary" className={sending ? 'pointer-events-none opacity-40' : ''}>
                        {contactPage.whatsapp.cta}
                    </Button>
                    <Link href={paths.shop} className="text-[11px] tracking-[0.16em] text-ash uppercase sm:ml-auto hover:text-charcoal">
                        Browse shop
                    </Link>
                </div>
            </form>
            </div>
        </>
    );
}

const inputClass =
    'mt-2 w-full border-0 border-b border-charcoal/18 bg-transparent py-3 text-[15px] outline-none transition-colors placeholder:text-ash/50 focus:border-charcoal';

function Field({ id, label, error, children }) {
    return (
        <div>
            <label htmlFor={id} className="text-[11px] tracking-[0.18em] text-ash uppercase">
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
