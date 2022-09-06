import Sidebar from "./layout/aside";
import {Main} from "./layout/article";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import {FormatDate} from "../lib/date";
import Link from "next/link";
import {SidebarDropdown} from "./layout/form/nav";
import {masterMenu, userMenu} from "../lib/const";
import Meta from "./layout/meta";
import Header, {HeaderMobile} from "./layout/header";
import {Content} from "./layout/section";
import {AdminContext} from "../lib/const"

function AdminLayout(props) {
    const router = useRouter()
    const [verified, setVerified] = useState(false);
    const [user, setUser] = useState({});
    // hooks when router change
    useEffect(() => {
        (async () => {
            const currentDatetime = new Date();
            axios.put(`${process.env.IP}/api/v1/users/token/ROLE_ADMIN`, {
                "last_access": FormatDate(currentDatetime),
                "last_page": router.pathname,
            }, {withCredentials: true}).then(res => {
                setVerified(true)
                setUser(res.data)
                return res
            }).catch(err => {
                setTimeout(() => {
                    router.push("/admin/login?redirect=true");
                }, 3000)
                return err
            })
        })();
    }, [router])
    if (verified) {
        return (
            <AdminContext.Provider value={user}>
                <Meta/>
                <div className="flex">
                    <div className="relative w-full flex flex-col h-screen overflow-y-hidden">
                        <div className="flex">
                            <Sidebar>
                                <ul className="space-y-2">
                                    <li>
                                        <Link href={"/admin"}>
                                            <a className={`${router.pathname === "/admin" ? "bg-gray-300" : "hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"} flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white`}>
                                                <i className="fas fa-chart-pie"/>
                                                <span className="ml-3">Dashboard</span>
                                            </a>
                                        </Link>
                                    </li>
                                    <SidebarDropdown router={router} label={"Master"} labelIcon={"fa-brands fa-buffer"}
                                                     menus={masterMenu}/>
                                    <SidebarDropdown router={router} label={"User"} labelIcon={"fas fa-user"}
                                                     menus={userMenu}/>
                                </ul>
                            </Sidebar>
                            <Main>
                                <Header layout={"admin"} url={"/admin/login"} router={router}/>
                                <HeaderMobile url={"/admin/login"} router={router}/>
                                <Content>
                                    {props.children}
                                </Content>
                            </Main>
                        </div>
                    </div>
                </div>
            </AdminContext.Provider>
        )
    } else {
        return <></>;
    }
}

export default AdminLayout