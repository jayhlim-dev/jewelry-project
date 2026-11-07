'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useContent } from 'components/layout/ContentProvider';
import { whatsappDraftForTopic } from 'lib/contactDraft';
import { ContactForm } from 'components/contact/ContactForm';
import { Button } from 'components/ui/Button';

function reachEyebrow(contactPage) {
    const raw = contactPage.asideEyebrow ?? contactPage.channelEyebrow;
    if (!raw || raw === 'Recommended next step') return 'How to reach us';
    return raw;
}

export function ContactExperience() {
    const { site, contact } = useContent();
    const contactPage = contact;
    const inquiryTopics = contact.inquiryTopics;
    const paths = site.paths;

    const defaultTopic = useMemo(
        () => inquiryTopics.find((item) => item.id === 'other') ?? inquiryTopics[0],
        [inquiryTopics]
    );

    const whatsappHref = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(whatsappDraftForTopic(defaultTopic))}`;

    const asideEyebrow = reachEyebrow(contactPage);
    const asideTitle =
        contactPage.asideTitle ?? contactPage.channelCopy?.both?.title ?? 'WhatsApp or email';
    const asideBody =
        contactPage.asideBody ??
        contactPage.channelCopy?.both?.body ??
        'WhatsApp is fastest for stock, sizing, and piece-by-piece questions. Email suits longer notes and partnership enquiries — name the piece or reference when you can.';
    const asideHint =
        contactPage.asideHint ??
        (Array.isArray(site.contact.hours) ? site.contact.hours[0] : null) ??
        'Replies during business hours.';

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-7">
            <aside className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
                <div className="flex h-full flex-col rounded-md border border-charcoal/12 bg-white p-5 sm:p-6 md:p-7">
                    <p className="eyebrow mb-2">{asideEyebrow}</p>
                    <h2 className="font-serif text-xl leading-tight text-charcoal sm:text-2xl">{asideTitle}</h2>
                    <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ash">{asideBody}</p>
                    <p className="mt-2 text-sm text-ash/90">{asideHint}</p>

                    <div className="mt-5">
                        <Button href={whatsappHref} external variant="secondary" className="w-full sm:w-auto">
                            {contactPage.whatsapp.cta}
                        </Button>
                    </div>

                    <div className="mt-auto w-full pt-6 sm:pt-7">
                        <dl className="border-t border-charcoal/10 pt-4 text-sm">
                            <div className="flex justify-between gap-4">
                                <dt className="text-ash">Email</dt>
                                <dd>
                                    <a href={`mailto:${site.contact.email}`} className="border-b border-charcoal/25 pb-0.5">
                                        {site.contact.email}
                                    </a>
                                </dd>
                            </div>
                            <div className="mt-2.5 flex justify-between gap-4">
                                <dt className="text-ash">Ring size</dt>
                                <dd>
                                    <Link href={paths.sizeGuide} className="border-b border-charcoal/25 pb-0.5">
                                        Size guide
                                    </Link>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </aside>

            <div id="contact-email-form" className="scroll-mt-28 lg:col-span-7 lg:col-start-6">
                <ContactForm topicId="other" showTopicSelect={false} showWhatsappButton={false} compact />
            </div>
        </div>
    );
}
