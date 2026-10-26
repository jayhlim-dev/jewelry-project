import { ProductCard } from 'components/products/ProductCard';
import { cn } from 'lib/format';

export function ProductGrid({ products, titleAs = 'h2', className = 'lg:grid-cols-4', onClearFilters }) {
    if (!products.length) {
        return (
            <div className="py-16 text-center">
                <p className="text-ash">No pieces match these filters.</p>
                {onClearFilters ? (
                    <button
                        type="button"
                        onClick={onClearFilters}
                        className="mt-5 text-[11px] font-medium tracking-[0.18em] text-charcoal uppercase transition-colors hover:text-ash"
                    >
                        Clear all filters
                    </button>
                ) : null}
            </div>
        );
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
