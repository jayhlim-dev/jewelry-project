import Image from 'next/image';

export function HoverImage({
    src,
    alt,
    className = '',
    sizes = '50vw',
    priority = false,
    zoomClass = 'group-hover:scale-[1.045]'
}) {
    return (
        <div className={`overflow-hidden bg-white ${className}`}>
            <Image
                src={src}
                alt={alt}
                fill
                priority={priority}
                sizes={sizes}
                className={`object-cover transition-transform duration-700 ease-out motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-hover/card:scale-100 ${zoomClass}`}
            />
        </div>
    );
}
