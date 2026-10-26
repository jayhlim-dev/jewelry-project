export function ArticleKeyTakeaways({ title, items }) {
    if (!items?.length) return null;

    return (
        <aside className="border border-charcoal/12 bg-[#f7f5f1] p-5 sm:p-6" aria-labelledby="article-takeaways-heading">
            <h2 id="article-takeaways-heading" className="text-[11px] tracking-[0.18em] text-taupe uppercase">
                {title}
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-charcoal/90">
                {items.map((item) => (
                    <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-taupe" aria-hidden="true" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
