import Image from 'next/image';

export function ProductGallery({ images, name }) {
    return (
        <div className="flex flex-col gap-3" aria-label={`Photographs of ${name}`}>
            {images.map((image, index) => (
                <div key={`${image.src}-${index}`} className="bg-white">
                    <Image
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        priority={index === 0}
                        sizes="(min-width: 1024px) 54vw, 100vw"
                        className="h-auto w-full"
                    />
                </div>
            ))}
        </div>
    );
}
