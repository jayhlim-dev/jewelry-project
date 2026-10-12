'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { products } from 'data/products';
import { paths } from 'data/site';
import { sortProducts, uniqueValues } from 'lib/catalog';
import { ProductFilters } from 'components/products/ProductFilters';
import { ProductGrid } from 'components/products/ProductGrid';
import { Container } from 'components/ui/Container';
import { Button } from 'components/ui/Button';

const PAGE_SIZE = 8;

export function ShopBrowser() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const category = searchParams.get('category') || 'All';
    const [metal, setMetal] = useState('All');
    const [shape, setShape] = useState('All');
    const [availability, setAvailability] = useState('All');
    const [sort, setSort] = useState('featured');
    const [visible, setVisible] = useState(PAGE_SIZE);

    useEffect(() => {
        setVisible(PAGE_SIZE);
    }, [category, metal, shape, availability, sort]);

    const metals = uniqueValues(products, 'metal');
    const shapes = uniqueValues(products, 'diamondShape');

    const filtered = useMemo(() => {
        const next = products.filter((product) => {
            if (category !== 'All' && product.category !== category) return false;
            if (metal !== 'All' && product.metal !== metal) return false;
            if (shape !== 'All' && product.diamondShape !== shape) return false;
            if (availability === 'available' && !product.available) return false;
            if (availability === 'unavailable' && product.available) return false;
            return true;
        });
        return sortProducts(next, sort);
    }, [category, metal, shape, availability, sort]);

    function onCategory(name) {
        const params = new URLSearchParams(searchParams.toString());
        if (name === 'All') params.delete('category');
        else params.set('category', name);
        const query = params.toString();
        router.replace(query ? `${paths.shop}?${query}` : paths.shop, { scroll: false });
    }

    const shown = filtered.slice(0, visible);

    return (
        <Container>
            <ProductFilters
                category={category}
                onCategory={onCategory}
                metal={metal}
                onMetal={setMetal}
                metals={metals}
                shape={shape}
                onShape={setShape}
                shapes={shapes}
                availability={availability}
                onAvailability={setAvailability}
                sort={sort}
                onSort={setSort}
                shown={Math.min(visible, filtered.length)}
                total={filtered.length}
            />
            <div className="py-10">
                <ProductGrid products={shown} />
                {visible < filtered.length ? (
                    <div className="mt-12 flex justify-center">
                        <Button variant="secondary" onClick={() => setVisible((count) => count + PAGE_SIZE)}>
                            Load more
                        </Button>
                    </div>
                ) : null}
            </div>
        </Container>
    );
}
