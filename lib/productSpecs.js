/**
 * PDP specification helpers. Only surface values present on the product;
 * never invent grades or weights.
 */

export function formatCaratWeight(value) {
    if (value == null || value === '') return '';
    const n = Number(value);
    if (Number.isNaN(n) || n <= 0) return '';
    const text = n >= 1 ? String(n) : n.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
    return `${text} ct`;
}

export function formatTotalCaratWeight(value) {
    const single = formatCaratWeight(value);
    if (!single) return '';
    return `${single} tw`;
}

export function stoneCaratEach(stone) {
    if (stone.caratEach != null) return stone.caratEach;
    if (stone.carat != null) return stone.carat;
    return null;
}

export function stoneHasStructuredFields(stone) {
    return Boolean(
        stone.role ||
        stone.count ||
        stone.caratEach != null ||
        stone.carat != null ||
        stone.color ||
        stone.clarity ||
        stone.cut
    );
}

export function shouldShowSpecifications(product) {
    const specs = product.specs || {};
    if (
        specs.composition ||
        specs.setting ||
        specs.bandWidthMm ||
        specs.certificate ||
        specs.stoneType ||
        specs.stonesConfirmOnInquiry
    ) {
        return true;
    }
    if (product.totalCaratWeight != null) return true;
    const stones = product.stones || [];
    return stones.some((stone) => stoneHasStructuredFields(stone) && (stone.count || stone.shape || stoneCaratEach(stone) != null));
}

export function computeTotalStoneCount(stones) {
    if (!stones?.length) return null;
    const withCount = stones.filter((stone) => stone.count);
    if (withCount.length !== stones.length) return null;
    return withCount.reduce((sum, stone) => sum + stone.count, 0);
}

export function computeTotalCaratFromStones(stones) {
    if (!stones?.length) return null;
    let total = 0;
    let complete = true;
    for (const stone of stones) {
        const each = stoneCaratEach(stone);
        if (each == null || !stone.count) {
            complete = false;
            break;
        }
        total += each * stone.count;
    }
    if (!complete || total <= 0) return null;
    return Math.round(total * 1000) / 1000;
}

export function effectiveTotalCaratWeight(product) {
    if (product.totalCaratWeight != null) return product.totalCaratWeight;
    return computeTotalCaratFromStones(product.stones);
}

export function lineCaratWeight(stone) {
    const each = stoneCaratEach(stone);
    if (each == null || !stone.count) return null;
    return each * stone.count;
}

/** Largest carat per stone first; then highest line total; stones without carat last. */
export function sortStonesForDisplay(stones) {
    if (!stones?.length) return [];
    return [...stones].sort((a, b) => {
        const eachA = stoneCaratEach(a);
        const eachB = stoneCaratEach(b);
        const hasA = eachA != null;
        const hasB = eachB != null;
        if (hasA && !hasB) return -1;
        if (!hasA && hasB) return 1;
        if (hasA && hasB && eachB !== eachA) return eachB - eachA;
        const lineA = lineCaratWeight(a);
        const lineB = lineCaratWeight(b);
        if (lineA != null && lineB != null && lineB !== lineA) return lineB - lineA;
        if (lineA != null && lineB == null) return -1;
        if (lineA == null && lineB != null) return 1;
        const countA = a.count || 0;
        const countB = b.count || 0;
        return countB - countA;
    });
}

export function stoneTableLabel(stone) {
    const genericRole = /^accent$/i.test(stone.role || '');
    if (stone.role && !genericRole) return stone.role;
    if (stone.detail) {
        const text = stone.detail.trim();
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
    if (stone.count && stone.shape) {
        const qty = stone.count === 1 ? '1' : String(stone.count);
        return `${qty} × ${stone.shape}`;
    }
    if (stone.shape) return stone.shape;
    return stone.role || 'Stone';
}

export function stoneHasAdvancedDetails(stone) {
    if (!stone) return false;
    if (stone.polish || stone.symmetry || stone.fluorescence) return true;
    const mm = stone.measurementsMm;
    return Boolean(mm && (mm.length != null || mm.width != null || mm.depth != null));
}

export function formatStoneMeasurements(stone) {
    const mm = stone?.measurementsMm;
    if (!mm) return '';
    const parts = [mm.length, mm.width, mm.depth].filter((value) => value != null && value !== '');
    if (!parts.length) return '';
    return `${parts.map((value) => Number(value).toFixed(2)).join(' × ')} mm`;
}

export function stonesWithAdvancedDetails(stones) {
    return (stones || []).filter(stoneHasAdvancedDetails);
}

/** Advanced grading block: only when a report is on file and at least one stone has extra fields. */
export function shouldShowAdvancedGrading(product) {
    const cert = product.specs?.certificate;
    if (!cert?.lab && !cert?.number) return false;
    return stonesWithAdvancedDetails(product.stones).length > 0;
}

export function specificationsFootnote(product) {
    const specs = product.specs || {};
    const tdw = effectiveTotalCaratWeight(product);
    if (specs.stonesConfirmOnInquiry && !tdw) {
        return 'Total diamond weight and grades for this preview piece are confirmed on inquiry.';
    }
    if (specs.stonesConfirmOnInquiry && tdw) {
        return 'Sample carat weights are for layout only. Color, clarity, and final totals are confirmed on inquiry.';
    }
    const stones = product.stones || [];
    const missingGrades = stones.some((stone) => stone.count && !stone.color && !stone.clarity && stoneCaratEach(stone) != null);
    if (missingGrades && !tdw) {
        return 'Stone grades and total weight are confirmed on inquiry when not listed here.';
    }
    return 'We list only what is verified for this piece.';
}
