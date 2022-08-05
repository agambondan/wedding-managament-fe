export const Content = ({children}) => {
    return (
        <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
            <main className="w-full flex-grow p-6">
                {children}
            </main>
        </div>
    )
}