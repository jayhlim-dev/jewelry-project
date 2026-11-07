import { ContactExperience } from 'components/contact/ContactExperience';
import { ContentScope } from 'components/layout/ContentProvider';
import { Breadcrumb } from 'components/ui/Breadcrumb';
import { Container } from 'components/ui/Container';
import { FaqList } from 'components/ui/FaqList';
import { getContent } from 'lib/content';

const CONTACT_HERO_BG =
    'https://storage.googleapis.com/lilo-porto-picture/lilo-project/jewelry/banner.png';

export async function generateMetadata() {
    const { site } = await getContent();
    const paths = site.paths;
    return {
        title: 'Contact',
        description: site.seo.contact,
        alternates: { canonical: paths.contact },
        openGraph: { title: 'Contact', description: site.seo.contact, url: paths.contact }
    };
}

export default async function ContactPage() {
    const { site, contact } = await getContent();
    const paths = site.paths;
    const contactPage = contact;
    const contactFaqs = contact.faqs;
    return (
        <div className="pb-10 md:pb-14">
            <section className="relative overflow-hidden border-b border-white/10 text-ivory">
                <div
                    className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${CONTACT_HERO_BG}')` }}
                    aria-hidden
                />
                <Container className="relative z-10 pt-10 pb-12 md:pt-14 md:pb-16">
                    <Breadcrumb
                        variant="light"
                        items={[{ label: 'Home', href: paths.home }, { label: 'Contact' }]}
                    />
                    <header className="mt-8 max-w-2xl">
                        <p className="eyebrow mb-4 text-champagne">{contactPage.title}</p>
                        <h1 className="type-headline max-w-[16ch] text-ivory">{contactPage.headline}</h1>
                        <p className="mt-5 max-w-lg text-[15px] leading-7 text-ivory/85 md:text-base">{contactPage.intro}</p>
                        <p className="mt-3 text-sm leading-relaxed text-ivory/75">{contactPage.note}</p>
                    </header>
                </Container>
            </section>

            <section className="bg-white py-12 md:py-16">
                <Container>
                    <ContentScope value={{ contact }}>
                        <ContactExperience />
                    </ContentScope>
                </Container>
            </section>

            <section className="border-t border-charcoal/8 py-10 pb-8 md:py-14 md:pb-10">
                <Container className="grid gap-8 lg:grid-cols-12 lg:gap-12">
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
