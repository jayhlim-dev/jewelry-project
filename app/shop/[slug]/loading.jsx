import { PageSkeleton } from 'components/layout/PageSkeleton';

// Overrides app/shop/loading.jsx, which only fits the product list.
export default function ProductLoading() {
    return <PageSkeleton />;
}
