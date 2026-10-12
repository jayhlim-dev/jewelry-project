'use client';

import { useState } from 'react';

export function FaqList({ items }) {
    const [open, setOpen] = useState(0);

    return (
        <div className="border-t border-charcoal/10">
            {items.map((item, index) => {
                const expanded = open === index;
                const panelId = `faq-panel-${index}`;
                const buttonId = `faq-button-${index}`;
                return (
                    <div key={item.question} className="border-b border-charcoal/10">
                        <h3>
                            <button
                                id={buttonId}
                                type="button"
                                className="flex w-full items-start justify-between gap-6 py-5 text-left"
                                aria-expanded={expanded}
                                aria-controls={panelId}
                                onClick={() => setOpen(expanded ? -1 : index)}
                            >
                                <span className="font-serif text-[1.55rem] leading-snug font-medium">{item.question}</span>
                                <span aria-hidden="true" className="mt-2 text-ash">
                                    {expanded ? '–' : '+'}
                                </span>
                            </button>
                        </h3>
                        {expanded ? (
                            <p id={panelId} role="region" aria-labelledby={buttonId} className="max-w-2xl pb-6 text-[15px] leading-relaxed text-ash">
                                {item.answer}
                            </p>
                        ) : null}
                    </div>
                );
            })}
        </div>
    );
}
