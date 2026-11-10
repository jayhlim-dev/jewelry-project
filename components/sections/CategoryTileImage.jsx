import Image from 'next/image';

const mobileFallbackPosition = {
    rings: 'object-[center_42%]',
    necklaces: 'object-[center_38%]',
    earrings: 'object-[center_40%]',
    bracelets: 'object-[center_45%]'
};

function tileImageSrc(image) {
    const mobile = typeof image?.mobileSrc === 'string' ? image.mobileSrc.trim() : '';
    if (mobile.startsWith('http')) return mobile;
    return image?.src;
}

/**
 * Homepage tiles: `image.mobileSrc` from Firebase when set (GCS URL), else `image.src`.
 * Collection page banners always use `image.src` only.
 */
export function CategoryTileImage({ image, slug, sizes, className = '' }) {
    const alt = image?.alt || '';
    const tileSrc = tileImageSrc(image);
    const usingMobile = tileSrc === image?.mobileSrc?.trim();
    const shared = `object-cover transition-transform duration-700 ease-out ${className}`;

    if (!tileSrc) return null;

    const position = usingMobile ? 'object-center' : mobileFallbackPosition[slug] || 'object-center';

    return <Image src={tileSrc} alt={alt} fill sizes={sizes} className={`${shared} ${position}`} />;
}
