import { ArticleCard } from 'components/editorial/ArticleCard';

export function ArticleGrid({ articles }) {
    return (
        <ul className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
                <li key={article.slug}>
                    <ArticleCard article={article} />
                </li>
            ))}
        </ul>
    );
}
