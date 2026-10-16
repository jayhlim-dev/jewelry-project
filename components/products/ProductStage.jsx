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
        <div className="mt-8 grid items-start gap-12 lg:mt-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
                <ProductGallery key={view.metal} images={view.images} name={product.name} />
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
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
