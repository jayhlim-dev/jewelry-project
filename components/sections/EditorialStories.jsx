import { articles } from 'data/articles';
import { home } from 'data/home';
import { Container } from 'components/ui/Container';
import { ArticleCard } from 'components/editorial/ArticleCard';
import { Button } from 'components/ui/Button';
import { Reveal } from 'components/ui/Reveal';

export function EditorialStories() {
    const content = home.stories;
    const [lead, ...rest] = articles.slice(0, 3);

    return (
        <section className="py-16 md:py-24">
            <Container>
                <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
                    <Reveal>
                        <p className="eyebrow mb-4">{content.eyebrow}</p>
                        <h2 className="type-headline max-w-md">{content.title}</h2>
                    </Reveal>
                    <Button href={content.href} variant="secondary" className="hidden sm:inline-flex">
                        {content.cta}
                    </Button>
                </div>
                <div className="grid gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                        <ArticleCard article={lead} featured />
                    </div>
                    <div className="flex flex-col gap-10 lg:col-span-4 lg:col-start-9">
                        {rest.map((article) => (
                            <ArticleCard key={article.slug} article={article} />
                        ))}
                    </div>
                </div>
                <div className="mt-10 sm:hidden">
                    <Button href={content.href} variant="secondary">
                        {content.cta}
                    </Button>
                </div>
            </Container>
        </section>
    );
}
