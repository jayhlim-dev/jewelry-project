import Link from 'next/link';
import { isPendingSpecificationValue } from 'lib/productSpecs';

function SpecExampleBlock({ block, index }) {
    const headingId = `article-spec-example-${index}`;

    return (
        <figure className="mt-8 border border-charcoal/12 bg-white p-5 sm:p-7" aria-labelledby={headingId}>
            {block.eyebrow ? <p className="eyebrow mb-2">{block.eyebrow}</p> : null}
            <h3 id={headingId} className="font-serif text-[1.35rem] leading-tight md:text-[1.5rem]">
                {block.title}
            </h3>
            {block.lead ? <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ash">{block.lead}</p> : null}

            {(block.sections || []).map((section, sectionIndex) => {
                const sectionId = `${headingId}-section-${sectionIndex}`;
                return (
                    <div key={section.title} className={sectionIndex === 0 ? 'mt-6' : 'mt-8'}>
                        <h4 id={sectionId} className="text-[11px] font-medium tracking-[0.2em] text-taupe uppercase">
                            {section.title}
                        </h4>
                        <div className="mt-3 overflow-x-auto border border-charcoal/10 bg-white">
                            <table
                                className="w-full min-w-[min(100%,28rem)] border-collapse text-left text-sm"
                                aria-labelledby={sectionId}
                            >
                                <thead>
                                    <tr className="border-b border-charcoal/10 bg-[#f7f5f1] text-[10px] tracking-[0.14em] text-ash uppercase">
                                        <th scope="col" className="w-[38%] px-4 py-3 font-medium sm:w-[42%]">
                                            Field
                                        </th>
                                        <th scope="col" className="px-4 py-3 font-medium">
                                            Specification
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(section.rows || []).map((row) => {
                                        const pending = isPendingSpecificationValue(row.value);
                                        return (
                                            <tr key={row.field} className="border-b border-charcoal/8 last:border-b-0">
                                                <th
                                                    scope="row"
                                                    className="px-4 py-3.5 align-top text-left text-[11px] leading-snug font-normal tracking-[0.1em] text-taupe uppercase"
                                                >
                                                    {row.field}
                                                </th>
                                                <td
                                                    className={`px-4 py-3.5 align-top leading-relaxed ${
                                                        pending ? 'text-ash italic' : 'text-charcoal/90'
                                                    }`}
                                                >
                                                    {row.value}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            })}

            {block.footnote ? (
                <figcaption className="mt-6 border-t border-charcoal/10 pt-4 text-xs leading-relaxed text-ash">
                    {block.footnote}
                </figcaption>
            ) : null}
            {block.link?.href && block.link?.label ? (
                <p className="mt-2 text-xs leading-relaxed text-ash">
                    <Link href={block.link.href} className="underline-offset-4 hover:text-charcoal hover:underline">
                        {block.link.label}
                    </Link>
                </p>
            ) : null}
        </figure>
    );
}

export function ArticleBody({ body }) {
    if (!body?.length) return null;

    return (
        <div className="max-w-[40rem]">
            {body.map((block, index) => {
                if (block.type === 'h2') {
                    return (
                        <h2 key={`h2-${index}`} className="mt-10 font-serif text-[1.65rem] leading-tight font-medium md:text-[1.8rem]">
                            {block.text}
                        </h2>
                    );
                }
                if (block.type === 'quote') {
                    return (
                        <blockquote key={`quote-${index}`} className="my-8 border-l border-champagne pl-5 font-serif text-xl leading-snug md:text-2xl">
                            {block.text}
                        </blockquote>
                    );
                }
                if (block.type === 'ul') {
                    return (
                        <ul key={`ul-${index}`} className="mt-5 list-disc space-y-2 pl-5 text-[17px] leading-8 text-charcoal/90">
                            {block.items.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    );
                }
                if (block.type === 'specExample') {
                    return <SpecExampleBlock key={`spec-${index}`} block={block} index={index} />;
                }
                return (
                    <p key={`p-${index}`} className="mt-5 text-[17px] leading-8 text-charcoal/90">
                        {block.text}
                    </p>
                );
            })}
        </div>
    );
}
