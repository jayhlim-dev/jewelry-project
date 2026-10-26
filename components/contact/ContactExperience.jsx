'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { contactPage, inquiryTopics, whatsappDraftForTopic } from 'data/contact';
import { paths, site } from 'data/site';
import { ContactForm } from 'components/contact/ContactForm';
import { Button } from 'components/ui/Button';

export function ContactExperience() {
    const [topicId, setTopicId] = useState(inquiryTopics[0].id);
    const nextStepRef = useRef(null);

    const topic = useMemo(() => inquiryTopics.find((item) => item.id === topicId) ?? inquiryTopics[0], [topicId]);
    const channel = contactPage.channelCopy[topic.channel] ?? contactPage.channelCopy.both;
    const whatsappHref = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(whatsappDraftForTopic(topic))}`;

    function selectTopic(nextId) {
        setTopicId(nextId);

        // On small screens, jump down to WhatsApp / email after picking a topic.
        if (typeof window === 'undefined' || window.matchMedia('(min-width: 1024px)').matches) return;

        requestAnimationFrame(() => {
            nextStepRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    return (
        <div className="space-y-12 md:space-y-16">
            <div>
                <p className="eyebrow mb-3">{contactPage.stepsEyebrow}</p>
                <h2 className="font-serif text-[clamp(1.75rem,3vw,2.35rem)] leading-tight">{contactPage.stepsTitle}</h2>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ash">{contactPage.stepsLead}</p>
                <div
                    className="mt-5 grid grid-cols-2 gap-1.5 sm:mt-8 sm:gap-2 lg:grid-cols-3 xl:grid-cols-4"
                    role="radiogroup"
                    aria-label="Contact topic"
                >
                    {inquiryTopics.map((item) => {
                        const selected = item.id === topicId;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                role="radio"
                                aria-checked={selected}
                                onClick={() => selectTopic(item.id)}
                                className={`group min-h-0 border px-3 py-3.5 text-left transition-colors sm:min-h-[5.5rem] sm:px-4 sm:py-4 ${
                                    selected
                                        ? 'border-charcoal bg-charcoal text-ivory'
                                        : 'border-charcoal/12 bg-white text-charcoal hover:border-charcoal/30'
                                }`}
                            >
                                <span
                                    className={`block text-[10px] tracking-[0.14em] uppercase sm:text-[11px] ${selected ? 'text-champagne' : 'text-taupe'}`}
                                >
                                    {item.summary}
                                </span>
                                <span className="mt-1.5 block text-[13px] leading-snug sm:mt-2 sm:text-[15px]">{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div
                ref={nextStepRef}
                className="scroll-mt-28 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12 xl:gap-16"
            >
                <aside className="flex flex-col lg:col-span-5 lg:sticky lg:top-28">
                    <div className="flex flex-1 flex-col border border-charcoal/12 bg-white p-5 sm:p-7 md:p-8">
                        <p className="eyebrow mb-2">{contactPage.channelEyebrow}</p>
                        <h3 className="font-serif text-xl leading-tight text-charcoal sm:text-2xl">{channel.title}</h3>
                        <p className="mt-3 text-[15px] leading-relaxed text-ash">{channel.body}</p>
                        <p className="mt-4 text-[14px] leading-relaxed text-ash">{topic.hint}</p>

                        <div className="mt-6 flex flex-col gap-3 sm:mt-8">
                            <Button href={whatsappHref} external variant="primary" className="w-full sm:w-auto">
                                {contactPage.whatsapp.cta}
                            </Button>
                            <Link
                                href={paths.shop}
                                className="text-[11px] tracking-[0.18em] text-ash uppercase transition-colors hover:text-charcoal"
                            >
                                View the collection
                            </Link>
                        </div>

                        <dl className="mt-6 border-t border-charcoal/10 pt-5 text-sm sm:mt-auto sm:pt-6">
                            <div className="flex justify-between gap-4">
                                <dt className="text-ash">Email</dt>
                                <dd>
                                    <a href={`mailto:${site.contact.email}`} className="border-b border-charcoal/25 pb-0.5">
                                        {site.contact.email}
                                    </a>
                                </dd>
                            </div>
                            <div className="mt-3 flex justify-between gap-4">
                                <dt className="text-ash">Ring size</dt>
                                <dd>
                                    <Link href={paths.sizeGuide} className="border-b border-charcoal/25 pb-0.5">
                                        Size guide
                                    </Link>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </aside>

                <div className="lg:col-span-6 lg:col-start-7">
                    <ContactForm topicId={topicId} onTopicIdChange={selectTopic} showTopicSelect={false} />
                </div>
            </div>
        </div>
    );
}
