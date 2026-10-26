import Link from 'next/link';
import Image from 'next/image';
import { articles } from 'data/articles';
import { paths } from 'data/site';

const noteSlugs = ['reading-a-piece-specification', 'understanding-diamond-color', 'caring-for-fine-jewelry'];

export function HomeJournal() {
    const notes = noteSlugs.map((slug) => articles.find((article) => article.slug === slug)).filter(Boolean);

    return (
        <section className="py-6 md:py-10" aria-label="Notes">
            <div className="mx-auto w-full max-w-[90rem] px-5 md:px-10 lg:px-14">
                <ul className="grid gap-8 md:grid-cols-3 md:gap-5">
                    {notes.map((article) => (
                        <li key={article.slug}>
                            <Link href={`${paths.articles}/${article.slug}`} className="group block">
                                <div className="relative aspect-[4/5] overflow-hidden bg-white">
                                    <Image
                                        src={article.image.src}
                                        alt={article.image.alt}
                                        fill
                                        sizes="(min-width: 768px) 30vw, 100vw"
                                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                                    />
                                </div>
                                <p className="mt-4 text-xs tracking-wide text-ash">{article.category}</p>
                                <h2 className="mt-2 font-serif text-[1.05rem] leading-tight font-normal md:text-[1.2rem]">{article.title}</h2>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
