import { ProductCard } from 'components/products/ProductCard';
import { cn } from 'lib/format';

export function ProductGrid({ products, titleAs = 'h2', className = 'lg:grid-cols-4' }) {
    if (!products.length) {
        return <p className="py-16 text-ash">No pieces match these filters.</p>;
    }

    return (
        <ul className={cn('grid grid-cols-2 gap-x-3 gap-y-3 md:gap-x-5 md:gap-y-5', className)}>
            {products.map((product, index) => (
                <li key={product.slug}>
                    <ProductCard product={product} titleAs={titleAs} priority={index === 0} />
                </li>
            ))}
        </ul>
    );
}
