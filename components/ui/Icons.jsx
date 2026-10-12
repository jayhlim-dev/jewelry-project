export function SearchIcon({ className = 'h-5 w-5' }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="6.25" stroke="currentColor" strokeWidth="1.25" />
            <path d="M16 16.5 20 20.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
    );
}

export function BagIcon({ className = 'h-5 w-5' }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6.5 8.5h11l-.7 11h-9.6l-.7-11Z" stroke="currentColor" strokeWidth="1.25" />
            <path d="M9 8.5V7.2A3 3 0 0 1 12 4a3 3 0 0 1 3 3.2v1.3" stroke="currentColor" strokeWidth="1.25" />
        </svg>
    );
}

export function MenuIcon({ className = 'h-5 w-5' }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.25" />
        </svg>
    );
}

export function CloseIcon({ className = 'h-5 w-5' }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6 18 18M18 6 6 18" stroke="currentColor" strokeWidth="1.25" />
        </svg>
    );
}
