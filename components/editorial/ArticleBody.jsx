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
                return (
                    <p key={`p-${index}`} className="mt-5 text-[17px] leading-8 text-charcoal/90">
                        {block.text}
                    </p>
                );
            })}
        </div>
    );
}
