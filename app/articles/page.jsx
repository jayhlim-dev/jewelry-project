import { ArticlesExperience } from 'components/editorial/ArticlesExperience';
import { ContentScope } from 'components/layout/ContentProvider';
import { Breadcrumb } from 'components/ui/Breadcrumb';
import { Container } from 'components/ui/Container';
import { getArticleCategories, getArticlesSorted } from 'lib/catalog';
import { getContent } from 'lib/content';

export async function generateMetadata() {
    const { site } = await getContent();
    const paths = site.paths;
    return {
        title: 'Articles',
        description: site.seo.articles,
        alternates: { canonical: paths.articles },
        openGraph: { title: 'Articles', description: site.seo.articles, url: paths.articles }
    };
}

export default async function ArticlesPage() {
    const { site, articles, articlesPage } = await getContent();
    const paths = site.paths;
    const sorted = getArticlesSorted(articles);
    const featuredFirst = [...sorted].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.date) - new Date(a.date);
    });
    const categories = getArticleCategories(articles);

    return (
        <div className="pb-20">
            <Container className="pt-10 md:pt-14">
                <Breadcrumb items={[{ label: 'Home', href: paths.home }, { label: 'Articles' }]} />
                <div className="mt-6">
                    <ContentScope value={{ articlesPage }}>
                        <ArticlesExperience articles={featuredFirst} categories={categories} />
                    </ContentScope>
                </div>
            </Container>
        </div>
    );
}
