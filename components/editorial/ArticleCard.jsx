import Link from 'next/link';
import { paths } from 'data/site';
import { HoverImage } from 'components/ui/HoverImage';
import { formatDate } from 'lib/format';

export function ArticleCard({ article, featured = false }) {
    return (
        <article className={featured ? 'group' : 'group border-t border-charcoal/10 pt-6'}>
            <Link href={`${paths.articles}/${article.slug}`} className="block">
                <HoverImage
                    src={article.image.src}
                    alt={article.image.alt}
                    sizes={featured ? '(min-width: 1024px) 58vw, 100vw' : '(min-width: 1024px) 30vw, 100vw'}
                    className={`relative ${featured ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}
                />
                <p className="mt-4 text-[11px] tracking-[0.16em] text-ash uppercase">
                    {article.category}
                    <span className="px-2 text-taupe">/</span>
                    <time dateTime={article.date}>{formatDate(article.date)}</time>
                </p>
                <h3 className={`mt-2 font-serif leading-tight font-medium ${featured ? 'text-[2rem] md:text-[2.5rem]' : 'text-[1.6rem]'}`}>
                    {article.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-ash">{article.excerpt}</p>
                <span className="mt-4 inline-flex text-[11px] tracking-[0.18em] uppercase">
                    <span className="border-b border-transparent pb-0.5 transition-colors duration-300 group-hover:border-charcoal">Read article</span>
                </span>
            </Link>
        </article>
    );
}
