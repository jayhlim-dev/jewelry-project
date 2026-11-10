/** Normalize values before writing to Firestore (no `undefined` fields). */
export function toFirestore(value) {
    if (value === undefined) return undefined;
    if (value === null || typeof value !== 'object') return value;

    if (Array.isArray(value)) {
        return value.map((item) => {
            const next = toFirestore(item);
            return next === undefined ? null : next;
        });
    }

    const out = {};
    for (const [key, item] of Object.entries(value)) {
        const next = toFirestore(item);
        if (next !== undefined) out[key] = next;
    }
    return out;
}

export function assertNoNestedArrays(value, path) {
    if (Array.isArray(value)) {
        value.forEach((item, index) => {
            if (Array.isArray(item)) {
                throw new Error(`Nested array at ${path}[${index}]. Firestore cannot store that.`);
            }
            assertNoNestedArrays(item, `${path}[${index}]`);
        });
        return;
    }
    if (value && typeof value === 'object') {
        for (const [key, item] of Object.entries(value)) assertNoNestedArrays(item, `${path}.${key}`);
    }
}
