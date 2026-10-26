export function cn(...parts) {
    return parts.filter(Boolean).join(' ');
}

/** Canonical catalog values (filters, URLs) → softer labels for the UI. */
const METAL_LABELS = {
    'White Gold': 'White gold',
    'Yellow Gold': 'Yellow gold',
    'Rose Gold': 'Rose gold'
};

export function formatMetalLabel(metal) {
    if (!metal) return '';
    return METAL_LABELS[metal] ?? metal;
}

export function formatPrice(amount, currency = 'IDR') {
    if (typeof amount !== 'number') return '';
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency,
        maximumFractionDigits: 0
    }).format(amount);
}

export function formatRp(amount) {
    if (typeof amount !== 'number' || Number.isNaN(amount)) return 'Rp 0';
    return `Rp ${new Intl.NumberFormat('id-ID').format(amount)}`;
}

export function parseRp(value) {
    const digits = String(value).replace(/\D/g, '');
    return digits ? Number(digits) : 0;
}

export function formatPriceRange(product) {
    const min = formatPrice(product.price, product.currency);
    if (!product.priceMax) return min;
    return `${min} – ${formatPrice(product.priceMax, product.currency)}`;
}

export function formatStoneLine(stone) {
    const carat = stone.caratEach ?? stone.carat;
    const grades = [carat ? `${carat} ct` : '', stone.color, stone.clarity, stone.cut].filter(Boolean);
    let line = '';

    const shapeNamed = stone.shape && stone.detail?.toLowerCase().includes(stone.shape.toLowerCase());

    if (stone.count && stone.shape && stone.detail) line = `${stone.count} ${stone.shape.toLowerCase()} ${stone.detail}`;
    else if (stone.shape && stone.detail && !shapeNamed) line = `${stone.shape} ${stone.detail}`;
    else if (stone.detail) line = stone.detail;
    else if (stone.shape) line = stone.shape;

    if (grades.length) line = `${line} · ${grades.join(' · ')}`;
    if (!line) return '';
    return line.charAt(0).toUpperCase() + line.slice(1);
}

export function stoneFootnote(product) {
    if (!product.stones?.length) return '';
    return '';
}

export function formatDate(iso) {
    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(new Date(iso));
}
