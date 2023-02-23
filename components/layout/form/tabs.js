export function TabsNavigation(props) {
    return (
        <div className="border-b mb-4 border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                {props.tabs.map((value, index) => {
                    return (
                        <li className="mr-2 text-center" key={index}>
                            <button onClick={() => props.setActive(index)}
                                    className={`inline-flex p-4 rounded-t-lg group ${props.active === index ? "border-b-2 text-blue-600 border-blue-600 dark:text-blue-600 dark:border-blue-600" : "border-transparent"} `}>
                                <i className={`${value.icon} w-5 h-5 mr-2 mt-1 mb-0.5`}/>
                                {value.name}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}