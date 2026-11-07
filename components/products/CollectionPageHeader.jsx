import { Breadcrumb } from 'components/ui/Breadcrumb';
import { Button } from 'components/ui/Button';
import { Container } from 'components/ui/Container';
import { ParallaxBannerSection } from 'components/ui/ParallaxBannerSection';

export function CollectionPageHeader({ collection, paths }) {
    const image = collection.image;

    return (
        <ParallaxBannerSection
            imageSrc={image?.src}
            imageAlt={image?.alt || ''}
            imagePriority
            className="border-b border-charcoal/10 text-ivory"
            gradientClassName="bg-gradient-to-r from-charcoal/58 via-charcoal/38 to-charcoal/18"
        >
            <Container className="relative z-10 flex h-full flex-col justify-center">
                <Breadcrumb
                    variant="light"
                    items={[
                        { label: 'Home', href: paths.home },
                        { label: 'Shop', href: paths.shop },
                        { label: `${collection.name} collection` }
                    ]}
                />
                {/* <p className="eyebrow mt-5 text-champagne">Collection</p> */}
                <h1 className="type-headline mt-5 whitespace-nowrap text-ivory">{collection.name}</h1>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-ivory/85 md:text-[15px]">{collection.description}</p>
                <div className="mt-6">
                    <Button href={paths.shop} variant="linkLight" ariaLabel="View all pieces in the shop">
                        All pieces
                    </Button>
                </div>
            </Container>
        </ParallaxBannerSection>
    );
}
