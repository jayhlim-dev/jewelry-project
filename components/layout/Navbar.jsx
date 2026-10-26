'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site, paths } from 'data/site';
import { BagIcon, MenuIcon, SearchIcon } from 'components/ui/Icons';
import { cn } from 'lib/format';
import { MobileMenu } from 'components/layout/MobileMenu';
import { SearchDialog } from 'components/layout/SearchDialog';
import { BagDrawer } from 'components/layout/BagDrawer';
import { useInquiry } from 'components/layout/InquiryProvider';

export function Navbar() {
    const pathname = usePathname();
    const onHome = pathname === paths.home;
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [bagOpen, setBagOpen] = useState(false);
    const { items } = useInquiry();
    const solid = !onHome || scrolled || menuOpen;
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
        setSearchOpen(false);
        setBagOpen(false);
    }, [pathname]);

    useEffect(() => {
        const onKeyDown = (event) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                setMenuOpen(false);
                setBagOpen(false);
                setSearchOpen(true);
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    return (
        <>
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[80] focus:bg-ivory focus:px-4 focus:py-2"
            >
                Skip to content
            </a>
            <header
                className={cn(
                    'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
                    solid ? 'border-b border-charcoal/10 bg-ivory/90 text-charcoal backdrop-blur-md' : 'bg-transparent text-ivory'
                )}
            >
                <div className="mx-auto grid h-[4.5rem] w-full max-w-[90rem] grid-cols-[1fr_auto] items-center px-5 md:px-10 lg:grid-cols-[1fr_auto_1fr] lg:px-14">
                    <Link href={paths.home} className="justify-self-start" aria-label={`${site.name} home`}>
                        <span className="inline-block font-serif text-[1.15rem] tracking-[0.42em] uppercase sm:text-[1.35rem] -mr-[0.42em]">
                            {site.name}
                        </span>
                    </Link>
                    <nav className="hidden lg:block" aria-label="Primary">
                        <ul className="flex items-center gap-6 xl:gap-8">
                            {site.navigation.map((link) => {
                                const active = link.href === paths.home ? pathname === paths.home : pathname.startsWith(link.href);
                                return (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            aria-current={active ? 'page' : undefined}
                                            className={cn(
                                                'relative text-[11px] tracking-[0.16em] uppercase transition-opacity hover:opacity-60',
                                                active && 'after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:bg-current'
                                            )}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                    <div className="flex items-center justify-end gap-1">
                        <button
                            type="button"
                            className="inline-flex h-11 w-11 items-center justify-center"
                            aria-label="Search"
                            onClick={() => {
                                setMenuOpen(false);
                                setBagOpen(false);
                                setSearchOpen(true);
                            }}
                        >
                            <SearchIcon />
                        </button>
                        <button
                            type="button"
                            className="relative inline-flex h-11 w-11 items-center justify-center"
                            aria-label={`Saved pieces, ${items.length} items`}
                            onClick={() => {
                                setMenuOpen(false);
                                setSearchOpen(false);
                                setBagOpen(true);
                            }}
                        >
                            <BagIcon />
                            {items.length > 0 ? (
                                <span className="absolute top-2 right-1 min-w-4 px-1 text-center text-[10px]">{items.length}</span>
                            ) : null}
                        </button>
                        <button
                            type="button"
                            className="inline-flex h-11 w-11 items-center justify-center lg:hidden"
                            aria-label="Open menu"
                            aria-expanded={menuOpen}
                            aria-controls="mobile-menu"
                            onClick={() => {
                                setSearchOpen(false);
                                setBagOpen(false);
                                setMenuOpen(true);
                            }}
                        >
                            <MenuIcon />
                        </button>
                    </div>
                </div>
            </header>
            <div id="mobile-menu">
                <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
            </div>
            <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
            <BagDrawer open={bagOpen} onClose={() => setBagOpen(false)} />
        </>
    );
}
