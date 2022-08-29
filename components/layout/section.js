export const Content = ({children}) => {
    return (
        <section className="w-full h-screen overflow-x-hidden border-t flex flex-col">
            <article className="w-full flex-grow p-6">
                {children}
            </article>
        </section>
    )
}