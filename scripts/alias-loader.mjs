const roots = ['data/', 'lib/', 'config/'];

export async function resolve(specifier, context, nextResolve) {
    const isAlias = roots.some((root) => specifier === root.slice(0, -1) || specifier.startsWith(root));
    if (!isAlias) return nextResolve(specifier, context);

    const file = new URL(`../${specifier}.js`, import.meta.url);
    return nextResolve(file.href, context);
}
