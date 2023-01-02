import Sidebar from "./layout/aside";
import {Main} from "./layout/article";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import {FormatDate} from "../lib/date";
import Link from "next/link";
import {NavMenu, SidebarDropdown} from "./layout/form/nav";
import {adminMasterMenu, adminUserMenu, adminMobileMenu} from "../lib/const";
import Meta from "./layout/meta";
import Header, {HeaderMobile} from "./layout/header";
import {Content} from "./layout/section";
import {AdminContext} from "../lib/const"

function AdminLayout(props) {
    const router = useRouter()
    const [verified, setVerified] = useState(false);
    const [user, setUser] = useState({});
    const [click, setCLick] = useState(false)
    const handleClick = () => {
        click ? setCLick(false) : setCLick(true);
    }
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
            }).catch(() => {
                setTimeout(() => {
                    router.push("/admin/login?redirect=true");
                }, 3000)
            })
        })();
    }, [verified])
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
                                                     menus={adminMasterMenu}/>
                                    <SidebarDropdown router={router} label={"User"} labelIcon={"fas fa-user"}
                                                     menus={adminUserMenu}/>
                                </ul>
                            </Sidebar>
                            <Main>
                                <Header layout={"admin"} url={"/admin/login"} router={router}
                                        url_account={"/admin/user"} url_support={"/admin/support"}/>
                                <HeaderMobile url={"/admin/login"} router={router} handleClick={handleClick}
                                              click={click} url_dashboard={"/admin"}>
                                    <NavMenu router={router} menus={adminMobileMenu}/>
                                </HeaderMobile>
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