'use client';

import { createContext, useContext, useMemo } from 'react';

const ContentContext = createContext(null);

export function ContentProvider({ content, children }) {
    return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

/** Merge page-only content (contact, story, etc.) without putting it in the root layout payload. */
export function ContentScope({ value, children }) {
    const parent = useContext(ContentContext);
    const merged = useMemo(() => ({ ...parent, ...value }), [parent, value]);
    return <ContentContext.Provider value={merged}>{children}</ContentContext.Provider>;
}

export function useContent() {
    const content = useContext(ContentContext);
    if (!content) {
        throw new Error('Content is not loaded. useContent only works inside the site layout.');
    }
    return content;
}
