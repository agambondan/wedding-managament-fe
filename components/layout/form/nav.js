import Link from "next/link";
import {isRoutePathname} from "../../../lib/router";
import React, {useState} from "react";
import {masterMenu} from "../../../lib/const";

export function Nav(props) {
    return (
        <>
            {
                props.menus.map((menu, i) => {
                    return (
                        <div key={i}>
                            <Link href={menu.link}>
                                <a className={`flex items-center text-white ${isRoutePathname(menu.path) ? "active-nav-link" : "opacity-75 hover:opacity-100"} py-4 pl-6 nav-item`}>
                                    {menu.icon.match("<") ? <div dangerouslySetInnerHTML={{__html: menu.icon}}/> :
                                        <i className={menu.icon}/>}
                                    {menu.name}
                                </a>
                            </Link>
                        </div>
                    )
                })
            }
        </>
    )
}

export function NavMenu(props) {
    const divStyle = {
        fontSize: "16px"
    }
    return (
        <>
            {
                props.menus.map((menu, i) => {
                    return (
                        <li key={i} style={divStyle}>
                            <Link href={menu.link}>
                                <a className={`${isRoutePathname(menu.path) ? "active-nav-link" : "opacity-75 hover:opacity-100"} flex items-center text-white py-2 pl-2 nav-item`}>
                                    {menu.icon.match("<") ?
                                        <div dangerouslySetInnerHTML={{__html: menu.icon}}/>
                                        :
                                        <i className={menu.icon}/>
                                    }
                                    <span className="pl-auto ml-3">{menu.name}</span>
                                </a>
                            </Link>
                        </li>
                    )
                })
            }
        </>
    )
}

export function SidebarDropdown(props) {
    const [click, setCLick] = useState(false)
    const handleClick = () => {
        setCLick(!click)
    }
    return (
        <li>
            <button type="button" onClick={handleClick} className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition
                                duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                <i className={props.labelIcon}></i>
                <span className="flex-1 ml-3 text-left whitespace-nowrap">{props.label}</span>
                <i className={"fas fa-chevron-down"}/>
            </button>
            <ul id="dropdown-example" className={`${click ? "block" : "hidden"} py-2 space-y-2`}>
                {
                    props.menus.map((menu, i) => {
                        return (
                            <li key={i}>
                                <Link href={menu.link}>
                                    <a className={`${isRoutePathname(menu.path) ? "bg-gray-300" : "hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"} flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group`}>
                                        {menu.icon.match("<") ? <div dangerouslySetInnerHTML={{__html: menu.icon}}/> :
                                            <i className={menu.icon}/>}
                                        <span className={"ml-3"}>
                                    {menu.name}
                                    </span>
                                    </a>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </li>
    )
}