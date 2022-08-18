import {useRouter} from "next/router";
import Link from 'next/link'
import {SidebarDropdown} from "../layout/menu";
import {masterMenu, userMenu} from "../../lib/const";
import React, {useEffect, useState} from "react";

export default function Sidebar() {
    const router = useRouter()
    const [click, setCLick] = useState(false)
    const [click1, setCLick1] = useState(false)
    const handleClick = () => {
        setCLick(!click)
    }
    const handleClick1 = () => {
        setCLick1(!click1)
    }
    useEffect(() => {
        router.pathname.match("")
    })
    return (
        <aside className="w-64 hidden xl:block shadow-xl overflow-y-auto">
            <div className="h-screen py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
                <ul className="space-y-2">
                    <li>
                        <Link href={"/admin"}>
                            <a className={`${router.pathname === "/admin" ? "bg-gray-300" : "hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"} flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white`}>
                                <i className="fas fa-chart-pie"/>
                                <span className="ml-3">Dashboard</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <button type="button" onClick={handleClick} className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition
                                duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                            <i className="fa-brands fa-buffer"></i>
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">Master</span>
                            <i className="fas fa-chevron-down"/>
                        </button>
                        <ul id="dropdown-example" className={`${click ? "block" : "hidden"} py-2 space-y-2`}>
                            <SidebarDropdown menus={masterMenu}/>
                        </ul>
                    </li>
                    <li>
                        <button type="button" onClick={handleClick1} className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition
                                duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                            <i className="fas fa-user"/>
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">User</span>
                            <i className="fas fa-chevron-down"/>
                        </button>
                        <ul id="dropdown-example" className={`${click1 ? "block" : "hidden"} py-2 space-y-2`}>
                            <SidebarDropdown menus={userMenu}/>
                        </ul>
                    </li>
                </ul>
            </div>
        </aside>
    )
}
