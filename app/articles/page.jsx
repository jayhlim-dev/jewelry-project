import { articles } from 'data/articles';
import { paths, site } from 'data/site';
import { ArticleCard } from 'components/editorial/ArticleCard';
import { ArticleGrid } from 'components/editorial/ArticleGrid';
import { Breadcrumb } from 'components/ui/Breadcrumb';
import { Container } from 'components/ui/Container';

export const metadata = {
    title: 'Articles',
    description: site.seo.articles,
    alternates: { canonical: paths.articles },
    openGraph: { title: 'Articles', description: site.seo.articles, url: paths.articles }
};

export default function ArticlesPage() {
    const [featured, ...rest] = articles;
    const categories = [...new Set(articles.map((article) => article.category))];

    return (
        <div className="pb-20">
            <Container className="pt-10 md:pt-14">
                <Breadcrumb items={[{ label: 'Home', href: paths.home }, { label: 'Articles' }]} />
                <h1 className="type-headline mt-6">The journal</h1>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-ash md:text-base">
                    Short essays for the preview. They explain diamonds and care in plain language. They are not client stories.
                </p>
                <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[11px] tracking-[0.16em] text-ash uppercase">
                    {categories.map((category) => (
                        <li key={category}>{category}</li>
                    ))}
                </ul>
                <div className="mt-12">
                    <ArticleCard article={featured} featured />
                </div>
                <div className="mt-16">
                    <ArticleGrid articles={rest} />
                </div>
            </Container>
        </div>
    );
}
