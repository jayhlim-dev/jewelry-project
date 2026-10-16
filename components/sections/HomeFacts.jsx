import { home } from 'data/home';
import { Container } from 'components/ui/Container';

export function HomeFacts() {
    return (
        <section className="border-b border-charcoal/10" aria-label="How to read a piece">
            <Container className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:py-14">
                {home.facts.map((item) => (
                    <div key={item.title}>
                        <p className="font-serif text-[1.7rem] leading-none font-normal">{item.title}</p>
                        <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-ash">{item.text}</p>
                    </div>
                ))}
            </Container>
        </section>
    );
}
