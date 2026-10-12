export function Container({ children, className = '', as: Tag = 'div' }) {
    return <Tag className={`mx-auto w-full max-w-[90rem] px-5 md:px-10 lg:px-14 ${className}`}>{children}</Tag>;
}
