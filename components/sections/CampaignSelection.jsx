import Link from 'next/link';
import { products } from 'data/products';
import { home } from 'data/home';
import { paths } from 'data/site';
import { ProductCard } from 'components/products/ProductCard';

export function CampaignSelection({
    products: productList,
    slugs = home.campaign.slugs,
    showAllHref = paths.shop,
    label = 'Pieces',
    title = '',
    titleClassName = 'text-base font-medium',
    columns = 4
}) {
    const pieces =
        productList || slugs.map((slug) => products.find((product) => product.slug === slug)).filter(Boolean);

    if (!pieces.length) return null;

    return (
        <section className="bg-white py-8 md:py-10" aria-label={label}>
            <div className="mx-auto w-full max-w-[90rem] px-5 md:px-10 lg:px-14">
                {title ? (
                    <div className="mb-4 flex items-baseline justify-between">
                        <h2 className={titleClassName}>{title}</h2>
                        <Link href={showAllHref} className="text-xs text-ash hover:text-charcoal">
                            Show all
                        </Link>
                    </div>
                ) : null}
                <ul
                    className={`grid grid-cols-2 gap-x-3 gap-y-5 md:gap-x-4 ${columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'}`}
                >
                    {pieces.map((product, index) => (
                        <li key={product.slug}>
                            <ProductCard product={product} titleAs="h3" priority={index === 0} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
