import { contactFaqs, paths, site } from 'data/site';
import { Breadcrumb } from 'components/ui/Breadcrumb';
import { Container } from 'components/ui/Container';
import { ContactForm } from 'components/contact/ContactForm';
import { FaqList } from 'components/ui/FaqList';

export const metadata = {
    title: 'Contact',
    description: site.seo.contact,
    alternates: { canonical: paths.contact },
    openGraph: { title: 'Contact', description: site.seo.contact, url: paths.contact }
};

export default function ContactPage() {
    return (
        <div className="pb-20">
            <Container className="pt-10 md:pt-14">
                <Breadcrumb items={[{ label: 'Home', href: paths.home }, { label: 'Contact' }]} />
                <div className="mt-8 grid gap-14 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <h1 className="type-headline">Write to the house.</h1>
                        <p className="mt-5 max-w-md text-sm leading-relaxed text-ash md:text-base">
                            Use this form for an order, shipping, a return, or something else. Ask about a piece on WhatsApp. Every detail below is a placeholder, and the form does not send.
                        </p>
                        <dl className="mt-10 space-y-6 text-sm">
                            <div>
                                <dt className="eyebrow">Email</dt>
                                <dd className="mt-2">{site.contact.email}</dd>
                            </div>
                            <div>
                                <dt className="eyebrow">Phone</dt>
                                <dd className="mt-2">{site.contact.phone}</dd>
                                <dd className="mt-1 text-xs text-ash">{site.contact.phoneNote}</dd>
                            </div>
                            <div>
                                <dt className="eyebrow">{site.contact.whatsappLabel}</dt>
                                <dd className="mt-2">
                                    <a
                                        href={`https://wa.me/${site.contact.whatsapp}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="border-b border-charcoal/30 pb-0.5"
                                    >
                                        {site.contact.phone}
                                    </a>
                                </dd>
                                <dd className="mt-1 text-xs text-ash">{site.contact.whatsappNote}</dd>
                            </div>
                            <div>
                                <dt className="eyebrow">Boutique</dt>
                                {site.contact.addressLines.map((line) => (
                                    <dd key={line} className="mt-2">
                                        {line}
                                    </dd>
                                ))}
                            </div>
                            <div>
                                <dt className="eyebrow">Hours</dt>
                                {site.contact.hours.map((line) => (
                                    <dd key={line} className="mt-2">
                                        {line}
                                    </dd>
                                ))}
                                <dd className="mt-1 text-xs text-ash">{site.contact.hoursNote}</dd>
                            </div>
                        </dl>
                    </div>
                    <div className="lg:col-span-6 lg:col-start-7">
                        <ContactForm />
                    </div>
                </div>
                <section className="mt-20 max-w-3xl">
                    <h2 className="type-title mb-8">Before you write</h2>
                    <FaqList items={contactFaqs} />
                </section>
            </Container>
        </div>
    );
}
