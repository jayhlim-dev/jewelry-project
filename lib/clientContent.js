import 'server-only';
import { isDColorDiamondEnabled } from 'lib/features';
import { articleSearchHaystack } from 'lib/siteSearch';

function pickArticleForClient(article) {
    return {
        slug: article.slug,
        title: article.title,
        category: article.category,
        excerpt: article.excerpt,
        searchHaystack: articleSearchHaystack(article)
    };
}

/** Builds the JSON passed from the root layout into ContentProvider (client boundary). */
export function pickClientContent(content) {
    const client = {
        site: content.site,
        search: content.search,
        catalog: content.catalog,
        collections: content.collections,
        products: content.products,
        sizeGuide: content.sizeGuide,
        articles: (content.articles || []).map(pickArticleForClient)
    };

    if (isDColorDiamondEnabled(content.site?.features)) {
        client.diamond = content.diamond;
    }

    return client;
}
