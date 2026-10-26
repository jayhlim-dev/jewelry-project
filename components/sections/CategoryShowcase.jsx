import Link from 'next/link';
import Image from 'next/image';
import { collections } from 'data/collections';
import { paths } from 'data/site';

export function CategoryShowcase() {
    return (
        <section className="bg-white" aria-label="Collections">
            <div className="mx-auto w-full max-w-[90rem] px-5 md:px-10 lg:px-14">
                <div className="mb-4 flex items-baseline justify-between">
                    <h2 className="text-base font-medium">Collections</h2>
                    <Link href={paths.shop} className="text-xs text-ash hover:text-charcoal">
                        Show all
                    </Link>
                </div>
                <ul className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-2.5">
                    {collections.map((item) => (
                        <li key={item.slug}>
                            <Link href={item.href} className="group relative block overflow-hidden rounded-lg">
                                <div className="relative aspect-[3/4] overflow-hidden bg-[#f3f3f3]">
                                    <Image
                                        src={item.image.src}
                                        alt={item.image.alt}
                                        fill
                                        sizes="(min-width: 768px) 22vw, 46vw"
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-charcoal/45 to-transparent" />
                                    <p className="absolute bottom-3 left-3 text-sm text-ivory md:bottom-4 md:left-4">
                                        {item.shortName || item.name}
                                    </p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
