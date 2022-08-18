import Link from "next/link";
import {isRoutePathname} from "../../lib/router";
import React from "react";

export function Menu(props) {
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
    return (
        <>
            {
                props.menus.map((menu, i) => {
                    return (
                        <div key={i}>
                            <Link href={menu.link}>
                                <a className={`${isRoutePathname(menu.path) ? "active-nav-link" : "opacity-75 hover:opacity-100"} flex items-center text-white -mx-2 py-2 pl-2 nav-item`}>
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

export function SidebarDropdown(props) {
    return (
        <>
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
        </>
    )
}