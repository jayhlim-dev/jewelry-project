/** Human-readable lines from product.materials for PDP copy. */
export function productMaterialLines(product) {
    return (product.materials || [])
        .map((line) =>
            line
                .replace(/^sample metal tone:\s*/i, '')
                .replace(/\s+in the photograph\.?$/i, '')
                .replace(/\s+visible in the photograph\.?$/i, '')
                .trim()
        )
        .filter(Boolean)
        .map((line) => line.charAt(0).toUpperCase() + line.slice(1));
}
