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
    const [click, setClick] = useState(false)
    const [click1, setClick1] = useState(true)
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
    const menusSidebar = [{link: "/admin", path: "/admin", icon: "fas fa-chart-pie fa-1x fa-fw"}, {
        link: "",
        path: "",
        icon: "fa-brands fa-buffer fa-1x fa-fw"
    }, {
        link: "",
        path: "",
        icon: "fas fa-user fa-1x fa-fw"
    }]
    if (verified) {
        return (
            <AdminContext.Provider value={user}>
                <Meta/>
                <div className="flex">
                    <div className="relative w-full flex flex-col h-screen overflow-y-hidden">
                        <div className="flex">
                            <Sidebar click={click}>
                                {click ?
                                    menusSidebar.map((value, index) => {
                                        return (
                                            <ul className="space-y-2" key={index}>
                                                <li>
                                                    <Link href={value.link}>
                                                        <a className={`${router.pathname === value.path ? "bg-gray-300" : "hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"} flex items-center pb-3.5 pt-3.5 pr-2 pl-2 text-base font-normal text-gray-900 rounded-lg dark:text-white`}
                                                           onClick={() => {
                                                               if (value.link === "") {
                                                                   setClick1(true)
                                                                   setClick(false)
                                                               }
                                                           }}>
                                                            <i className={value.icon}/>
                                                        </a>
                                                    </Link>
                                                </li>
                                            </ul>
                                        )
                                    })
                                    :
                                    <ul className="space-y-2">
                                        <li>
                                            <Link href={"/admin"}>
                                                <a className={`${router.pathname === "/admin" ? "bg-gray-300" : "hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"} flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white`}>
                                                    <i className="fas fa-chart-pie"/>
                                                    <span className="ml-3">Dashboard</span>
                                                </a>
                                            </Link>
                                        </li>
                                        <SidebarDropdown router={router} label={"Master"}
                                                         labelIcon={"fa-brands fa-buffer"}
                                                         menus={adminMasterMenu}/>
                                        <SidebarDropdown router={router} label={"User"} labelIcon={"fas fa-user"}
                                                         menus={adminUserMenu}/>
                                    </ul>
                                }
                                <ul className={`fixed bottom-0 border-t-4`}>
                                    {click ?
                                        <button onClick={() => {
                                            setClick1(true)
                                            setClick(false)
                                        }}>
                                            <i className="fa-solid fa-angles-left fa-2x"/>
                                        </button> : <></>
                                    }
                                    {click1 ?
                                        <button onClick={() => {
                                            setClick(true)
                                            setClick1(false)
                                        }}>
                                            <i className="fa-solid fa-angles-right fa-2x"/>
                                            <i className="fa-solid fa-angles-right fa-2x"/>
                                            <i className="fa-solid fa-angles-right fa-2x"/>
                                            <i className="fa-solid fa-angles-right fa-2x"/>
                                            <i className="fa-solid fa-angles-right fa-2x"/>
                                            <i className="fa-solid fa-angles-right fa-2x"/>
                                            <i className="fa-solid fa-angles-right fa-2x"/>
                                        </button> :
                                        <></>
                                    }
                                </ul>
                            </Sidebar>
                            <Main>
                                <Header layout={"admin"} url={"/admin/login"} router={router}
                                        url_account={"/admin/user"} url_support={"/admin/support"}/>
                                <HeaderMobile url={"/admin/login"} router={router} url_dashboard={"/admin"}>
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