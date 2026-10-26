'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { products, sortOptions } from 'data/products';
import { paths } from 'data/site';
import { isCatalogPriceVisible } from 'lib/features';
import { catalogPriceBounds, matchesPriceRange, sortProducts, uniqueValues } from 'lib/catalog';
import { CategoryTabs, ProductFilters } from 'components/products/ProductFilters';
import { ProductGrid } from 'components/products/ProductGrid';
import { Container } from 'components/ui/Container';
import { Button } from 'components/ui/Button';

const PAGE_SIZE = 9;
const bounds = catalogPriceBounds(products);
const shopSortOptions = isCatalogPriceVisible()
    ? sortOptions
    : sortOptions.filter((option) => !option.id.startsWith('price-'));

function readNumber(value, fallback) {
    if (value === null || value === undefined || value === '') return fallback;
    const next = Number(value);
    return Number.isFinite(next) ? next : fallback;
}

export function ShopBrowser() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const category = searchParams.get('category') || 'All';
    const metal = searchParams.get('metal') || 'All';
    const sortParam = searchParams.get('sort') || 'featured';
    const sort =
        !isCatalogPriceVisible() && sortParam.startsWith('price-') ? 'featured' : sortParam;
    const stockTokens = (searchParams.get('stock') || 'in').split(',');
    const inStock = stockTokens.includes('in');
    const outStock = stockTokens.includes('out');
    const priceMin = Math.max(bounds.min, readNumber(searchParams.get('min'), bounds.min));
    const priceMax = Math.min(bounds.max, readNumber(searchParams.get('max'), bounds.max));
    const shape = searchParams.get('shape') || 'All';
    const [visible, setVisible] = useState(PAGE_SIZE);
    const [filtersOpen, setFiltersOpen] = useState(false);

    useEffect(() => {
        setVisible(PAGE_SIZE);
    }, [category, metal, shape, inStock, outStock, priceMin, priceMax, sort]);

    const metals = uniqueValues(products, 'metal');
    const shapes = uniqueValues(products, 'diamondShape');

    const filtered = useMemo(() => {
        const next = products.filter((product) => {
            if (category !== 'All' && product.category !== category) return false;
            if (metal !== 'All' && product.metal !== metal) return false;
            if (shape !== 'All' && product.diamondShape !== shape) return false;
            if (!matchesPriceRange(product, priceMin, priceMax)) return false;
            if (inStock && outStock) return true;
            if (inStock) return product.available;
            if (outStock) return !product.available;
            return true;
        });
        return sortProducts(next, sort);
    }, [category, metal, shape, inStock, outStock, priceMin, priceMax, sort]);

    function setParams(updates) {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(updates).forEach(([key, value]) => {
            if (value === null || value === undefined || value === '' || value === 'All') params.delete(key);
            else params.set(key, String(value));
        });
        const query = params.toString();
        router.replace(query ? `${paths.shop}?${query}` : paths.shop, { scroll: false });
    }

    function onAvailability({ inStock: nextIn, outStock: nextOut }) {
        if (nextIn && !nextOut) setParams({ stock: null });
        else if (!nextIn && !nextOut) setParams({ stock: 'any' });
        else {
            const parts = [];
            if (nextIn) parts.push('in');
            if (nextOut) parts.push('out');
            setParams({ stock: parts.join(',') });
        }
    }

    function onPrice(min, max) {
        setParams({
            min: min === bounds.min ? null : min,
            max: max === bounds.max ? null : max
        });
    }

    const shown = filtered.slice(0, visible);
    const count = filtered.length;

    function clearFilters() {
        router.replace(paths.shop, { scroll: false });
    }

    return (
        <Container>
            <CategoryTabs category={category} onCategory={(name) => setParams({ category: name })} />

            <div className="mt-8 lg:mt-10 lg:grid lg:grid-cols-[17rem_minmax(0,1fr)] lg:items-start lg:gap-12 xl:grid-cols-[18rem_minmax(0,1fr)] xl:gap-16">
                <aside className="lg:pr-6 xl:pr-10">
                    <div className="flex items-center justify-between border-b border-charcoal/8 pb-4 lg:hidden">
                        <button
                            type="button"
                            onClick={() => setFiltersOpen((open) => !open)}
                            aria-expanded={filtersOpen}
                            className="flex items-center gap-2 text-[12px] tracking-[0.16em] uppercase"
                        >
                            <svg
                                viewBox="0 0 16 16"
                                className={`h-3.5 w-3.5 transition-transform ${filtersOpen ? 'rotate-180' : ''}`}
                                aria-hidden="true"
                            >
                                <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.25" />
                            </svg>
                            {filtersOpen ? 'Hide filters' : 'Filters'}
                        </button>
                        <p className="text-[13px] text-ash tabular-nums" aria-live="polite">
                            {count} {count === 1 ? 'result' : 'results'}
                        </p>
                    </div>
                    <div
                        className={`${filtersOpen ? 'block' : 'hidden'} border-b border-charcoal/8 pt-5 pb-2 lg:block lg:border-0 lg:pt-0 lg:pb-0`}
                    >
                        <ProductFilters
                            metal={metal}
                            onMetal={(name) => setParams({ metal: name })}
                            metals={metals}
                            shape={shape}
                            onShape={(name) => setParams({ shape: name })}
                            shapes={shapes}
                            inStock={inStock}
                            outStock={outStock}
                            onAvailability={onAvailability}
                            priceMin={priceMin}
                            priceMax={priceMax}
                            priceBoundMin={bounds.min}
                            priceBoundMax={bounds.max}
                            onPrice={onPrice}
                            sort={sort}
                            onSort={(value) => setParams({ sort: value === 'featured' ? null : value })}
                            sortOptions={shopSortOptions}
                            resultCount={count}
                        />
                    </div>
                </aside>

                <div className="pt-4 lg:pt-0">
                    <div className="pb-8 lg:pb-2">
                        <ProductGrid products={shown} className="lg:grid-cols-3" onClearFilters={clearFilters} />
                        {visible < filtered.length ? (
                            <div className="mt-12 flex justify-center">
                                <Button variant="secondary" onClick={() => setVisible((n) => n + PAGE_SIZE)}>
                                    Load more
                                </Button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </Container>
    );
}
