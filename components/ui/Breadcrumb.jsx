import Link from 'next/link';

export function Breadcrumb({ items, className = '' }) {
    return (
        <nav aria-label="Breadcrumb" className={className}>
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] tracking-[0.16em] text-ash uppercase">
                {items.map((item, index) => (
                    <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                        {index > 0 ? (
                            <span aria-hidden="true" className="text-taupe">
                                /
                            </span>
                        ) : null}
                        {item.href ? (
                            <Link href={item.href} className="transition-colors hover:text-charcoal">
                                {item.label}
                            </Link>
                        ) : (
                            <span aria-current="page" className="text-charcoal">
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
