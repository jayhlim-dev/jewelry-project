import Link from 'next/link';

export function Breadcrumb({ items, className = '', variant = 'default' }) {
    const light = variant === 'light';
    const olClass = light
        ? 'flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] tracking-[0.16em] text-ivory/70 uppercase'
        : 'flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] tracking-[0.16em] text-ash uppercase';
    const linkClass = light
        ? 'text-ivory/80 transition-colors hover:text-ivory'
        : 'transition-colors hover:text-charcoal';
    const currentClass = light ? 'text-ivory' : 'text-charcoal';
    const sepClass = light ? 'text-ivory/45' : 'text-taupe';

    return (
        <nav aria-label="Breadcrumb" className={className}>
            <ol className={olClass}>
                {items.map((item, index) => (
                    <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                        {index > 0 ? (
                            <span aria-hidden="true" className={sepClass}>
                                /
                            </span>
                        ) : null}
                        {item.href ? (
                            <Link href={item.href} className={linkClass}>
                                {item.label}
                            </Link>
                        ) : (
                            <span aria-current="page" className={currentClass}>
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
