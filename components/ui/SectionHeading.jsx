import { Reveal } from 'components/ui/Reveal';
import { cn } from 'lib/format';

export function SectionHeading({ eyebrow, title, text, className = '', align = 'left' }) {
    return (
        <Reveal className={cn(align === 'center' && 'mx-auto max-w-2xl text-center', className)}>
            {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
            <h2 className="type-headline max-w-[14ch] text-balance sm:max-w-xl">{title}</h2>
            {text ? <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ash">{text}</p> : null}
        </Reveal>
    );
}
