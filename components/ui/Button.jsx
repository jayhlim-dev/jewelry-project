import Link from 'next/link';
import { cn } from 'lib/format';

const styles = {
    primary: 'bg-charcoal text-ivory hover:bg-charcoal/85',
    secondary: 'border border-charcoal/25 bg-transparent text-charcoal hover:border-charcoal',
    light: 'bg-ivory text-charcoal hover:bg-white',
    ghost: 'border border-ivory/40 bg-transparent text-ivory hover:border-ivory',
    link: 'border-b border-charcoal/30 pb-1 text-charcoal hover:border-charcoal',
    linkLight: 'border-b border-ivory/50 pb-1 text-ivory hover:border-ivory'
};

export function Button({
    href,
    children,
    variant = 'primary',
    className = '',
    type = 'button',
    onClick,
    disabled = false,
    ariaLabel,
    external = false
}) {
    const textLink = variant === 'link' || variant === 'linkLight';
    const classes = cn(
        textLink
            ? 'inline-flex w-fit items-center text-[11px] font-medium tracking-[0.22em] uppercase transition-colors duration-300'
            : 'inline-flex min-h-11 items-center justify-center px-6 py-3 text-[11px] font-medium tracking-[0.18em] uppercase transition-colors duration-300',
        styles[variant] || styles.primary,
        disabled && 'pointer-events-none opacity-40',
        className
    );

    if (href && external) {
        return (
            <a href={href} className={classes} aria-label={ariaLabel} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        );
    }

    if (href) {
        return (
            <Link href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} className={classes} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
            {children}
        </button>
    );
}
