import Link from 'next/link';
import Image from 'next/image';
import { products } from 'data/products';
import { home } from 'data/home';
import { paths } from 'data/site';

export function CampaignSelection({ slugs = home.campaign.slugs, label = 'Pieces', title = '', titleClassName = 'text-sm font-medium', columns = 4 }) {
    const pieces = slugs.map((slug) => products.find((product) => product.slug === slug)).filter(Boolean);

    if (!pieces.length) return null;

    return (
        <section className="bg-white py-8 md:py-10" aria-label={label}>
            <div className="mx-auto w-full max-w-[90rem] px-5 md:px-10 lg:px-14">
                {title ? (
                    <div className="mb-4 flex items-baseline justify-between">
                        <h2 className={titleClassName}>{title}</h2>
                        <Link href={paths.shop} className="text-xs text-ash hover:text-charcoal">
                            Show all
                        </Link>
                    </div>
                ) : null}
                <ul className={`grid grid-cols-2 gap-x-3 gap-y-5 md:gap-x-4 ${columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'}`}>
                    {pieces.map((product) => {
                        const image = product.images[0];
                        return (
                            <li key={product.slug}>
                                <Link href={`${paths.shop}/${product.slug}`} className="group block">
                                    <div className="relative aspect-square overflow-hidden">
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            sizes="(min-width: 768px) 22vw, 46vw"
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                                        />
                                    </div>
                                    <h3 className="mt-2 text-sm text-ash">{product.name}</h3>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
