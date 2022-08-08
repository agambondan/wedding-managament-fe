import Link from "next/link";
import {isRoutePathname} from "../../lib/router";
import React from "react";

export function Menu(props) {
    return (
        <>
            {
                props.menus.map((menu, i) => {
                    return (
                        // eslint-disable-next-line react/jsx-key
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
                        // eslint-disable-next-line react/jsx-key
                        <div key={i}>
                            <Link href={menu.link}>
                                <a className={`${isRoutePathname(menu.path) ? "active-nav-link" : "opacity-75 hover:opacity-100"} flex items-center text-white -mx-2 py-2 pl-2 nav-item`}>
                                    {menu.icon.match("<") ? <i className={menu.icon}/> :
                                        <div dangerouslySetInnerHTML={{__html: menu.icon}}/>}
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