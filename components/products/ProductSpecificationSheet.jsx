import Link from 'next/link';
import { paths } from 'data/site';
import {
    hasSpecificationSheet,
    isPendingSpecificationValue,
    specificationSheetRows,
    specificationsFootnote
} from 'lib/productSpecs';

function SpecSheetTable({ title, rows, id }) {
    if (!rows.length) return null;

    return (
        <div className="mt-8 first:mt-0">
            <h3 id={id} className="text-[11px] font-medium tracking-[0.2em] text-taupe uppercase">
                {title}
            </h3>
            <div className="mt-3 overflow-x-auto border border-charcoal/10 bg-white">
                <table className="w-full min-w-[min(100%,28rem)] border-collapse text-left text-sm" aria-labelledby={id}>
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
                        {rows.map((row) => {
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
}

export function ProductSpecificationSheet({ product }) {
    if (!hasSpecificationSheet(product)) return null;

    const { identification, diamondBreakdown } = specificationSheetRows(product);
    const footnote = specificationsFootnote(product);

    return (
        <section
            className="border border-charcoal/12 bg-white p-5 sm:p-7 md:p-9"
            aria-labelledby="piece-specification-sheet-heading"
        >
            <p className="eyebrow mb-2">Specification</p>
            <h2 id="piece-specification-sheet-heading" className="font-serif text-[1.35rem] leading-tight md:text-[1.5rem]">
                Piece specification
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ash">
                All fields listed. Italic values are confirmed with you on inquiry.
            </p>

            <SpecSheetTable title="Identification" rows={identification} id="spec-identification" />
            <SpecSheetTable title="Diamond breakdown" rows={diamondBreakdown} id="spec-diamond-breakdown" />

            <p className="mt-6 border-t border-charcoal/10 pt-4 text-xs leading-relaxed text-ash">{footnote}</p>
            <p className="mt-2 text-xs leading-relaxed text-ash">
                <Link href={`${paths.articles}/reading-a-piece-specification`} className="underline-offset-4 hover:text-charcoal hover:underline">
                    How to read a specification
                </Link>
            </p>
        </section>
    );
}
