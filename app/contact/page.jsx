import { contactFaqs, contactPage } from 'data/contact';
import { paths, site } from 'data/site';
import { ContactExperience } from 'components/contact/ContactExperience';
import { Breadcrumb } from 'components/ui/Breadcrumb';
import { Container } from 'components/ui/Container';
import { FaqList } from 'components/ui/FaqList';

export const metadata = {
    title: 'Contact',
    description: site.seo.contact,
    alternates: { canonical: paths.contact },
    openGraph: { title: 'Contact', description: site.seo.contact, url: paths.contact }
};

export default function ContactPage() {
    return (
        <div className="pb-20 md:pb-28">
            <section className="border-b border-charcoal/8 bg-white">
                <Container className="pt-10 pb-12 md:pt-14 md:pb-16">
                    <Breadcrumb items={[{ label: 'Home', href: paths.home }, { label: 'Contact' }]} />
                    <header className="mt-8 max-w-2xl">
                        <p className="eyebrow mb-4">{contactPage.title}</p>
                        <h1 className="type-headline max-w-[16ch]">{contactPage.headline}</h1>
                        <p className="mt-5 max-w-lg text-[15px] leading-7 text-ash md:text-base">{contactPage.intro}</p>
                        <p className="mt-3 text-sm leading-relaxed text-ash/90">{contactPage.note}</p>
                    </header>
                </Container>
            </section>

            <section className="bg-ivory py-14 md:py-20">
                <Container>
                    <ContactExperience />
                </Container>
            </section>

            <section className="border-t border-charcoal/8 py-16 md:py-24">
                <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
                        <h2 className="type-title">{contactPage.faqTitle}</h2>
                        <p className="mt-4 text-[15px] leading-relaxed text-ash">{contactPage.faqLead}</p>
                    </div>
                    <div className="lg:col-span-7 lg:col-start-6">
                        <FaqList items={contactFaqs} />
                    </div>
                </Container>
            </section>
        </div>
    );
}
