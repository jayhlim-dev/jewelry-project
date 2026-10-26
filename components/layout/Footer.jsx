import Link from 'next/link';
import { collections } from 'data/collections';
import { contactPage } from 'data/contact';
import { paths, site } from 'data/site';
import { Button } from 'components/ui/Button';
import { Container } from 'components/ui/Container';

const whatsappHref = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(contactPage.whatsapp.draft)}`;
const socialLinks = site.social.filter((item) => item.href);

export function Footer() {
    return (
        <footer className="border-t border-charcoal/10 bg-ivory text-charcoal">
            <Container className="py-12 md:py-16">
                <div className="max-w-md">
                    <Link
                        href={paths.home}
                        className="font-serif text-2xl tracking-[0.28em] uppercase md:tracking-[0.32em]"
                        aria-label={`${site.name} home`}
                    >
                        {site.name}
                    </Link>
                    <p className="mt-4 text-sm leading-relaxed text-ash">{site.footer.statement}</p>
                    <p className="mt-2 text-xs tracking-wide text-ash/90">{site.footer.onlineNote}</p>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <Button href={whatsappHref} external variant="primary" className="w-full sm:w-auto">
                        {site.contact.whatsappLabel}
                    </Button>
                    <Button href={paths.contact} variant="secondary" className="w-full sm:w-auto">
                        Contact
                    </Button>
                </div>

                <p className="mt-4 text-sm text-ash">
                    <a href={`mailto:${site.contact.email}`} className="border-b border-charcoal/20 text-charcoal hover:border-charcoal">
                        {site.contact.email}
                    </a>
                </p>

                <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-12 lg:gap-10">
                    <div className="col-span-2 sm:col-span-1 lg:col-span-3 lg:col-start-1">
                        <p className="eyebrow mb-3">Visit</p>
                        <ul className="space-y-2 text-sm">
                            {site.navigation.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="transition-colors hover:text-ash">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-span-2 sm:col-span-1 lg:col-span-4">
                        <p className="eyebrow mb-3">Collection</p>
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-1 sm:space-y-2">
                            {collections.map((collection) => (
                                <li key={collection.slug}>
                                    <Link href={collection.href} className="transition-colors hover:text-ash">
                                        {collection.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {socialLinks.length ? (
                        <div className="col-span-2 sm:col-span-1 lg:col-span-2 lg:col-start-11">
                            <p className="eyebrow mb-3">Follow</p>
                            <ul className="space-y-2 text-sm">
                                {socialLinks.map((item) => (
                                    <li key={item.label}>
                                        <a
                                            href={item.href}
                                            className="transition-colors hover:text-ash"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : null}
                </div>
            </Container>
            <Container className="flex flex-col gap-3 border-t border-charcoal/10 py-5 text-xs text-ash sm:flex-row sm:items-center sm:justify-between">
                <p>
                    © {new Date().getFullYear()} {site.name}. {site.footer.legalNote}
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-1">
                    <Link href={paths.sizeGuide} className="hover:text-charcoal">
                        Size guide
                    </Link>
                    <Link href={paths.privacy} className="hover:text-charcoal">
                        Privacy
                    </Link>
                    <Link href={paths.terms} className="hover:text-charcoal">
                        Terms
                    </Link>
                </div>
            </Container>
        </footer>
    );
}
