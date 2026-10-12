'use client';

import { usePathname } from 'next/navigation';
import { paths } from 'data/site';

export function MainShell({ children }) {
    const pathname = usePathname();
    const onHome = pathname === paths.home;

    return (
        <main id="main" className={onHome ? '' : 'pt-[4.5rem]'}>
            {children}
        </main>
    );
}
