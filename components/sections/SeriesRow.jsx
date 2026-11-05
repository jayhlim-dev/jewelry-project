import Link from 'next/link';
import Image from 'next/image';
import { getContent } from 'lib/content';

const metals = ['White Gold', 'Yellow Gold', 'Rose Gold'];

export async function SeriesRow() {
    const { products, site } = await getContent();
    const paths = site.paths;
    const series = metals
        .map((metal) => {
            const pieces = products.filter((product) => product.available && product.metal === metal);
            const image = pieces[0]?.images[0];
            if (!image) return null;
            return { metal, image, count: pieces.length };
        })
        .filter(Boolean);

    return (
        <section className="py-6 md:py-10" aria-label="Series">
            <div className="mx-auto w-full max-w-[90rem] px-5 md:px-10 lg:px-14">
                <h2 className="font-serif text-[1.35rem] leading-none font-normal md:text-[1.6rem]">Series</h2>
                <ul className="mt-6 grid gap-8 md:mt-8 md:grid-cols-3 md:gap-5">
                    {series.map((item) => (
                        <li key={item.metal}>
                            <Link href={`${paths.shop}?metal=${encodeURIComponent(item.metal)}`} className="group block">
                                <div className="relative aspect-[4/5] overflow-hidden bg-white">
                                    <Image
                                        src={item.image.src}
                                        alt={item.image.alt}
                                        fill
                                        sizes="(min-width: 768px) 30vw, 100vw"
                                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                                    />
                                </div>
                                <h3 className="mt-3 font-serif text-[1.05rem] leading-tight font-normal md:text-[1.2rem]">{item.metal}</h3>
                                <p className="mt-1 text-xs tracking-wide text-ash">
                                    {item.count} {item.count === 1 ? 'piece' : 'pieces'}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
