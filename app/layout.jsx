import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import { site } from 'data/site';
import { InquiryProvider } from 'components/layout/InquiryProvider';
import { Navbar } from 'components/layout/Navbar';
import { Footer } from 'components/layout/Footer';
import { MainShell } from 'components/layout/MainShell';
import { SmoothScroll } from 'components/layout/SmoothScroll';
import '../styles/globals.css';

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    style: ['normal', 'italic'],
    variable: '--font-cormorant',
    display: 'swap'
});

const dmSans = DM_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    variable: '--font-dm',
    display: 'swap'
});

export const metadata = {
    metadataBase: new URL(site.url),
    title: {
        default: `${site.name} · Fine Jewelry`,
        template: `%s · ${site.name}`
    },
    description: site.description,
    icons: { icon: '/favicon.svg' },
    openGraph: {
        siteName: site.name,
        type: 'website',
        title: `${site.name} · Fine Jewelry`,
        description: site.description,
        images: [{ url: '/images/hero/campaign.jpg', alt: 'Editorial jewelry campaign portrait' }]
    }
};

export default function RootLayout({ children }) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: site.name,
        description: site.description,
        url: site.url
    };

    return (
        <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
            <body className="overflow-x-clip bg-ivory font-sans text-charcoal antialiased">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
                <SmoothScroll />
                <InquiryProvider>
                    <Navbar />
                    <MainShell>{children}</MainShell>
                    <Footer />
                </InquiryProvider>
            </body>
        </html>
    );
}
