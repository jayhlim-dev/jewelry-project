import Link from 'next/link';
import { collections } from 'data/collections';
import { paths, site } from 'data/site';
import { Container } from 'components/ui/Container';
import { NewsletterForm } from 'components/contact/NewsletterForm';

export function Footer() {
    return (
        <footer className="border-t border-charcoal/10 bg-ivory text-charcoal">
            <Container className="grid gap-14 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
                <div className="lg:col-span-4">
                    <Link href={paths.home} className="font-serif text-2xl tracking-[0.38em] uppercase" aria-label={`${site.name} home`}>
                        {site.name}
                    </Link>
                    <p className="mt-5 max-w-sm text-sm leading-relaxed text-ash">{site.footer.statement}</p>
                    <NewsletterForm />
                </div>
                <div className="lg:col-span-2 lg:col-start-6">
                    <p className="eyebrow mb-4">Visit</p>
                    <ul className="space-y-2 text-sm">
                        {site.navigation.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className="hover:text-ash">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="lg:col-span-3">
                    <p className="eyebrow mb-4">Collection</p>
                    <ul className="space-y-2 text-sm">
                        {collections.map((collection) => (
                            <li key={collection.slug}>
                                <Link href={collection.href} className="hover:text-ash">
                                    {collection.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="lg:col-span-2">
                    <p className="eyebrow mb-4">Contact</p>
                    <p className="text-sm leading-relaxed">{site.contact.email}</p>
                    <p className="mt-2 text-sm leading-relaxed">{site.contact.phone}</p>
                    <p className="mt-1 text-xs text-ash">{site.contact.phoneNote}</p>
                    {site.contact.addressLines.map((line) => (
                        <p key={line} className="mt-2 text-sm leading-relaxed">
                            {line}
                        </p>
                    ))}
                    <ul className="mt-4 space-y-1 text-xs text-ash">
                        {site.social.map((item) => (
                            <li key={item.label}>{item.label} · placeholder</li>
                        ))}
                    </ul>
                </div>
            </Container>
            <Container className="flex flex-col gap-3 border-t border-charcoal/10 py-6 text-xs text-ash sm:flex-row sm:items-center sm:justify-between">
                <p>
                    © {new Date().getFullYear()} {site.name}. {site.footer.legalNote}
                </p>
                <div className="flex gap-5">
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
