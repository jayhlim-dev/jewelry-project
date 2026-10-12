import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles } from 'data/articles';
import { paths, site } from 'data/site';
import { getArticle, getRelatedArticles } from 'lib/catalog';
import { formatDate } from 'lib/format';
import { Breadcrumb } from 'components/ui/Breadcrumb';
import { Button } from 'components/ui/Button';
import { Container } from 'components/ui/Container';
import { ImageReveal } from 'components/ui/ImageReveal';
import { ArticleCard } from 'components/editorial/ArticleCard';

export function generateStaticParams() {
    return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const article = getArticle(slug);
    if (!article) return { title: 'Article' };
    return {
        title: article.title,
        description: article.excerpt,
        alternates: { canonical: `${paths.articles}/${article.slug}` },
        openGraph: {
            title: article.title,
            description: article.excerpt,
            url: `${paths.articles}/${article.slug}`,
            type: 'article',
            images: [{ url: article.image.src, alt: article.image.alt }]
        }
    };
}

export default async function ArticlePage({ params }) {
    const { slug } = await params;
    const article = getArticle(slug);
    if (!article) notFound();
    const related = getRelatedArticles(article);
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.url}${paths.home}` },
            { '@type': 'ListItem', position: 2, name: 'Articles', item: `${site.url}${paths.articles}` },
            { '@type': 'ListItem', position: 3, name: article.title, item: `${site.url}${paths.articles}/${article.slug}` }
        ]
    };

    return (
        <article className="pb-20">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Container className="pt-8 md:pt-12">
                <Breadcrumb
                    items={[
                        { label: 'Home', href: paths.home },
                        { label: 'Articles', href: paths.articles },
                        { label: article.title }
                    ]}
                />
                <p className="mt-8 text-[11px] tracking-[0.16em] text-ash uppercase">
                    {article.category}
                    <span className="px-2 text-taupe">/</span>
                    <time dateTime={article.date}>{formatDate(article.date)}</time>
                </p>
                <h1 className="type-headline mt-4 max-w-3xl">{article.title}</h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-ash">{article.excerpt}</p>
            </Container>
            <Container className="mt-10">
                <ImageReveal src={article.image.src} alt={article.image.alt} priority sizes="100vw" className="aspect-[16/9] min-h-64" />
            </Container>
            <Container className="mt-12 max-w-3xl">
                <div className="max-w-[40rem]">
                    {article.body.map((block) => {
                        if (block.type === 'h2') {
                            return (
                                <h2 key={block.text} className="mt-10 font-serif text-[1.8rem] leading-tight font-medium">
                                    {block.text}
                                </h2>
                            );
                        }
                        if (block.type === 'quote') {
                            return (
                                <blockquote key={block.text} className="my-8 border-l border-champagne pl-5 font-serif text-2xl leading-snug">
                                    {block.text}
                                </blockquote>
                            );
                        }
                        return (
                            <p key={block.text} className="mt-5 text-[17px] leading-8 text-charcoal/90">
                                {block.text}
                            </p>
                        );
                    })}
                </div>
            </Container>
            <Container className="mt-16 border-t border-charcoal/10 pt-12">
                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                    <h2 className="type-title">Continue reading</h2>
                    <Link href={paths.articles} className="text-[11px] tracking-[0.16em] uppercase">
                        All articles
                    </Link>
                </div>
                <ul className="mt-8 grid gap-10 md:grid-cols-3">
                    {related.map((item) => (
                        <li key={item.slug}>
                            <ArticleCard article={item} />
                        </li>
                    ))}
                </ul>
                <div className="mt-14">
                    <Button href={paths.shop}>Explore the Collection</Button>
                </div>
            </Container>
        </article>
    );
}
