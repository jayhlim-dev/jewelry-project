export const inquiryTopics = [
    {
        id: 'stock',
        label: 'Stock & availability',
        summary: 'Availability',
        channel: 'whatsapp',
        hint: 'Tell us the piece name or link, metal, and size if you know them.',
        placeholder: 'e.g. Solenne Ring · White Gold · size 52 mm — is this in stock?'
    },
    {
        id: 'piece',
        label: 'A specific piece',
        summary: 'Product enquiry',
        channel: 'whatsapp',
        hint: 'Fastest from the product page (Inquire on WhatsApp). Or write here if you prefer email.',
        placeholder: 'Which piece? Your question about metal, stones, or timing.'
    },
    {
        id: 'order',
        label: 'Order & payment',
        summary: 'Orders',
        channel: 'both',
        hint: 'For after you have agreed on a piece — payment steps or order status.',
        placeholder: 'Piece name and what you need clarified about the order.'
    },
    {
        id: 'shipping',
        label: 'Shipping & delivery',
        summary: 'Delivery',
        channel: 'both',
        hint: 'City, order reference, and what you need to know about delivery.',
        placeholder: 'Order or piece name, destination, and your question.'
    },
    {
        id: 'partnership',
        label: 'Partnership or press',
        summary: 'Business',
        channel: 'email',
        hint: 'Wholesale, styled shoots, events, or press — include company and links.',
        placeholder: 'Company, proposal, timeline, and links we should see.'
    },
    {
        id: 'return',
        label: 'Return or exchange',
        summary: 'Post-purchase',
        channel: 'email',
        hint: 'We may ask for photos and reference your original chat.',
        placeholder: 'Piece name, reason, and when you received it.'
    },
    {
        id: 'other',
        label: 'Something else',
        summary: 'General',
        channel: 'both',
        hint: 'Write as much detail as you can — we will point you to the right channel.',
        placeholder: 'How can we help?'
    }
];

export function whatsappDraftForTopic(topic) {
    return `Good day. I would like to enquire regarding: ${topic.label}.`;
}

export const contactPage = {
    title: 'Contact',
    headline: 'We welcome your enquiry.',
    intro:
        'We attend clients online. You may browse the full collection here, then contact us regarding availability, specifications, orders, or partnerships.',
    note: 'A piece is reserved only after we confirm availability and terms with you, ordinarily via WhatsApp.',
    stepsEyebrow: 'Optional',
    stepsTitle: 'What is this about?',
    stepsLead: 'Pick a subject to refine your WhatsApp message and email placeholder. You can message us first without choosing.',
    quickReachTitle: 'Message on WhatsApp',
    quickReachLead: 'Fastest for stock, a specific piece, and ring sizing.',
    channelEyebrow: 'Recommended next step',
    whatsapp: {
        title: 'WhatsApp',
        lead: 'Best for quick, piece-by-piece questions.',
        bullets: [
            'Stock and availability',
            'Details on a piece you are viewing',
            'Ring size, metal, and timing',
            'Saving pieces and continuing one thread'
        ],
        cta: 'Message on WhatsApp',
        draft: 'Good day. I would like to enquire about your collection.'
    },
    email: {
        title: 'Email note',
        lead: 'Use the form when you want a longer message on record.',
        bullets: ['Partnership or press', 'Shipping after an order', 'Returns', 'Anything you prefer by email']
    },
    formTitle: 'Email the house',
    formLead: 'Send your enquiry below. We will receive it by email and reply to the address you provide.',
    formSuccessTitle: 'Your message has been sent.',
    formSuccessLead: 'Thank you for writing. We will reply to your email as soon as we can.',
    formSending: 'Sending your enquiry…',
    formSendingHint: 'Connecting to our mail server. This may take a few seconds.',
    formError: 'We could not send your message. Please try again or message us on WhatsApp.',
    faqTitle: 'Common questions',
    faqLead: 'Quick answers before you write.',
    highlights: [
        { label: 'Digital showroom', detail: 'The full collection online; no walk-in location' },
        { label: 'Personal assistance', detail: 'Availability and product enquiries via WhatsApp' },
        { label: 'Confirmed orders', detail: 'No online checkout; terms agreed with you directly' }
    ],
    channelCopy: {
        whatsapp: {
            title: 'We recommend WhatsApp',
            body: 'For this enquiry, a brief message allows us to confirm details promptly.'
        },
        email: {
            title: 'We recommend email',
            body: 'For this enquiry, please complete the form with as much detail as possible. We will reply by email.'
        },
        both: {
            title: 'WhatsApp or email',
            body: 'Either channel is welcome. Kindly include the piece name and any order reference.'
        }
    }
};

export const contactFaqs = [
    {
        question: 'How do I ask about stock?',
        answer:
            'Open the piece in the shop and tap Inquire on WhatsApp, or chat us from this page. Name the piece and metal. We reply with what is available — nothing is held until you confirm.'
    },
    {
        question: 'Can I buy directly on this website?',
        answer:
            'There is no checkout. You browse here, then we finish the order together on WhatsApp (or by email for some requests).'
    },
    {
        question: 'What is partnership or press?',
        answer:
            'Wholesale, collaborations, styled shoots, or media features. Choose “Partnership or press” in the form and include your company, timeline, and links.'
    },
    {
        question: 'How do I choose a ring size?',
        answer: 'Use the size guide to measure in millimetres, then tell us in WhatsApp. We confirm the fit before you decide.'
    },
    {
        question: 'Will WhatsApp include the product name?',
        answer: 'Yes. Inquire on a product page (or saved pieces) opens WhatsApp with that piece already named in the draft.'
    }
];
