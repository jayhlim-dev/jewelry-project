import { siteFeatures } from 'config/siteFeatures';

export function isDColorDiamondEnabled() {
    return siteFeatures.showDColorDiamondPage === true;
}

export function isCatalogPriceVisible() {
    return siteFeatures.showCatalogPrices === true;
}
