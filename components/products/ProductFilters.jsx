import { collections } from 'data/collections';
import { sortOptions } from 'data/products';

const fieldClass = 'w-full border-b border-charcoal/20 bg-transparent py-2 text-sm outline-none';

export function ProductFilters({
    category,
    onCategory,
    metal,
    onMetal,
    metals,
    shape,
    onShape,
    shapes,
    availability,
    onAvailability,
    sort,
    onSort,
    shown,
    total
}) {
    const categories = ['All', ...collections.map((item) => item.name)];

    return (
        <div className="border-b border-charcoal/10">
            <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:overflow-visible md:px-0">
                <div className="flex w-max gap-x-6 gap-y-3 py-4 md:w-auto md:flex-wrap" role="group" aria-label="Categories">
                    {categories.map((name) => {
                        const active = category === name;
                        return (
                            <button
                                key={name}
                                type="button"
                                aria-pressed={active}
                                onClick={() => onCategory(name)}
                                className={`pb-1 text-[12px] tracking-[0.16em] uppercase ${active ? 'border-b border-charcoal' : 'text-ash'}`}
                            >
                                {name}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="grid gap-6 py-6 sm:grid-cols-2 lg:grid-cols-4">
                <label className="block text-[11px] tracking-[0.16em] text-ash uppercase">
                    Metal
                    <select className={fieldClass} value={metal} onChange={(event) => onMetal(event.target.value)}>
                        <option value="All">All metals</option>
                        {metals.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="block text-[11px] tracking-[0.16em] text-ash uppercase">
                    Diamond shape
                    <select className={fieldClass} value={shape} onChange={(event) => onShape(event.target.value)}>
                        <option value="All">All shapes</option>
                        {shapes.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="block text-[11px] tracking-[0.16em] text-ash uppercase">
                    Availability
                    <select className={fieldClass} value={availability} onChange={(event) => onAvailability(event.target.value)}>
                        <option value="All">All pieces</option>
                        <option value="available">Available samples</option>
                        <option value="unavailable">Unavailable samples</option>
                    </select>
                </label>
                <label className="block text-[11px] tracking-[0.16em] text-ash uppercase">
                    Sort
                    <select className={fieldClass} value={sort} onChange={(event) => onSort(event.target.value)}>
                        {sortOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <p className="pb-4 text-sm text-ash" aria-live="polite">
                Showing {shown} of {total}
            </p>
        </div>
    );
}
