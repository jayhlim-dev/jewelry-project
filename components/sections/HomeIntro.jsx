import { home } from 'data/home';

export function HomeIntro() {
    const content = home.intro;

    return (
        <section className="bg-white px-5 py-8 text-center md:py-10">
            <p className="font-serif text-[1.7rem] leading-none font-normal text-champagne md:text-[2.05rem]">{content.title}</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ash">{content.text}</p>
        </section>
    );
}
