import Link from "next/link";
import {isRoutePathname} from "../../../lib/router";
import React, {useState} from "react";

export function SidebarNav(props) {
    return (
        <>
            {props.menus.map((value, index) => {
                return (
                    <li key={index}>
                        <Link href={value.link}>
                            <a className={`${props.router.pathname === value.path ? "bg-gray-300" : "hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"} flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white`}>
                                <i className={`${value.icon} fa-fw`}/>
                                <span className={"ml-3"}>{value.name}</span>
                            </a>
                        </Link>
                    </li>
                )
            })}
        </>
    )
}

export function NavMenu(props) {
    return (
        <>
            {props.menus.map((value, i) => {
                return (
                    <li key={i}>
                        <Link href={value.link}>
                            <a className={`flex items-center text-black ${props.router.pathname === value.path ? "bg-gray-200" : "opacity-75 hover:opacity-100"} py-2 pl-2 hover:bg-gray-50`}>
                                <i className={value.icon}/>
                                <span className="ml-3">{value.name}</span>
                            </a>
                        </Link>
                    </li>
                )
            })}
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
            <ul id="sidebar-dropdown" className={`${click ? "block" : "hidden"} py-2 space-y-2`}>
                {
                    props.menus.map((menu, i) => {
                        return (
                            <li key={i}>
                                <Link href={menu.link}>
                                    <a className={`${isRoutePathname(props.router, menu.path) ? "bg-gray-300" : "hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"} flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group`}>
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