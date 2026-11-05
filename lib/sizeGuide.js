export function nearestRingRow(ringSizes, measurement) {
    if (!Number.isFinite(measurement) || !ringSizes?.length) return null;
    let best = ringSizes[0];
    let bestDelta = Math.abs(best.circumference - measurement);
    for (const row of ringSizes) {
        const delta = Math.abs(row.circumference - measurement);
        if (delta < bestDelta) {
            best = row;
            bestDelta = delta;
        }
    }
    return best;
}

export function whatsappWithSize(mm) {
    return `Good day. I measured ${mm} mm around my finger (home estimate). Please help me confirm the fit for a ring.`;
}
