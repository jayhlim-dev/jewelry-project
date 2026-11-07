'use client';

import { useMemo, useState } from 'react';
import { ArticleGrid } from 'components/editorial/ArticleGrid';
import { useContent } from 'components/layout/ContentProvider';

const ALL = 'All';

export function ArticlesExperience({ articles, categories }) {
    const { articlesPage } = useContent();
    const [category, setCategory] = useState(ALL);

    const filtered = useMemo(() => {
        if (category === ALL) return articles;
        return articles.filter((article) => article.category === category);
    }, [articles, category]);

    const filterOptions = [ALL, ...categories];

    return (
        <div>
            <p className="eyebrow">{articlesPage.eyebrow}</p>
            <h1 className="type-headline mt-4">{articlesPage.title}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ash md:text-base">{articlesPage.lead}</p>

            <div className="mt-8">
                <p className="text-[11px] tracking-[0.16em] text-ash uppercase">{articlesPage.filterLabel}</p>
                <div className="mt-3 flex flex-wrap gap-2" role="tablist" aria-label={articlesPage.filterLabel}>
                    {filterOptions.map((option) => {
                        const selected = category === option;
                        return (
                            <button
                                key={option}
                                type="button"
                                role="tab"
                                aria-selected={selected}
                                onClick={() => setCategory(option)}
                                className={`min-h-10 rounded-md border px-4 text-[11px] tracking-[0.14em] uppercase transition-colors ${
                                    selected
                                        ? 'border-charcoal bg-charcoal text-ivory'
                                        : 'border-charcoal/15 bg-white text-charcoal hover:border-charcoal/35'
                                }`}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>
            </div>

            {filtered.length === 0 ? (
                <p className="mt-12 text-sm text-ash">{articlesPage.emptyFilter}</p>
            ) : (
                <div className="mt-12">
                    <ArticleGrid articles={filtered} />
                </div>
            )}
        </div>
    );
}
