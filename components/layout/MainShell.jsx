'use client';

import { usePathname } from 'next/navigation';
import { useContent } from 'components/layout/ContentProvider';

export function MainShell({ children }) {
    const { site } = useContent();
    const pathname = usePathname();
    const onHome = pathname === site.paths.home;

    return (
        <main id="main" className={onHome ? '' : 'pt-[4.5rem]'}>
            {children}
        </main>
    );
}
