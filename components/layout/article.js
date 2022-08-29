export const Main = (props) => {
    return (
        <main className="relative w-full flex flex-col h-screen overflow-y-auto">
            {props.children}
        </main>
    )
}