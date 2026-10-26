import { paths, site } from 'data/site';
import { getArticleCategories, getArticlesSorted } from 'lib/catalog';
import { ArticlesExperience } from 'components/editorial/ArticlesExperience';
import { Breadcrumb } from 'components/ui/Breadcrumb';
import { Container } from 'components/ui/Container';

export const metadata = {
    title: 'Articles',
    description: site.seo.articles,
    alternates: { canonical: paths.articles },
    openGraph: { title: 'Articles', description: site.seo.articles, url: paths.articles }
};

export default function ArticlesPage() {
    const sorted = getArticlesSorted();
    const featuredFirst = [...sorted].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.date) - new Date(a.date);
    });
    const categories = getArticleCategories();

    return (
        <div className="pb-20">
            <Container className="pt-10 md:pt-14">
                <Breadcrumb items={[{ label: 'Home', href: paths.home }, { label: 'Articles' }]} />
                <div className="mt-6">
                    <ArticlesExperience articles={featuredFirst} categories={categories} />
                </div>
            </Container>
        </div>
    );
}
