export default function Sidebar(props) {
    return (
        <aside className="w-64 hidden xl:block shadow-xl overflow-y-auto">
            <div className="h-screen py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
                {props.children}
            </div>
        </aside>
    )
}
