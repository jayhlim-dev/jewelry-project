'use client';

import { useState } from 'react';
import { metalViews } from 'lib/catalog';
import { ProductGallery } from 'components/products/ProductGallery';
import { ProductSummary } from 'components/products/ProductSummary';

export function ProductStage({ product }) {
    const views = metalViews(product);
    const [metal, setMetal] = useState(product.metal);
    const view = views.find((item) => item.metal === metal) || views[0];

    return (
        <div className="mt-6 grid items-start gap-8 lg:mt-8 lg:grid-cols-12 lg:gap-10">
            <div className="border border-charcoal/10 bg-white p-3 md:p-4 lg:col-span-7">
                <ProductGallery key={view.metal} images={view.images} name={product.name} />
            </div>
            <div className="lg:col-span-5">
                <ProductSummary
                    product={product}
                    metal={view.metal}
                    metalChoices={views.map((item) => item.metal)}
                    onMetalChange={setMetal}
                />
            </div>
        </div>
    );
}
