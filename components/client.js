import Sidebar from "./layout/aside";
import {Main} from "./layout/article";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import {FormatDate} from "../lib/date";
import Link from "next/link";
import Header, {HeaderMobile} from "./layout/header";
import {Content} from "./layout/section";
import {ClientContext, clientUserMenu} from "../lib/const"
import {SidebarNav, NavMenu} from "./layout/form/nav";

function ClientLayout(props) {
    const router = useRouter()
    const [verified, setVerified] = useState(false);
    const [user, setUser] = useState({});
    const [click, setClick] = useState(false)
    const [click1, setClick1] = useState(true)
    // hooks when router change
    useEffect(() => {
        (async () => {
            const currentDatetime = new Date();
            axios.put(`${process.env.IP}/api/v1/users/token/ROLE_CLIENT`, {
                "last_access": FormatDate(currentDatetime),
                "last_page": router.pathname,
            }, {withCredentials: true}).then(res => {
                setVerified(true)
                setUser(res.data)
                return res
            }).catch(err => {
                setTimeout(() => {
                    router.push("/client/login?redirect=true");
                }, 3000)
                return err
            })
        })();
    }, [router])
    if (verified) {
        return (
            <ClientContext.Provider value={user}>
                <div className="flex">
                    <div className="relative w-full flex flex-col h-screen overflow-y-hidden">
                        <div className="flex">
                            <Sidebar click={click}>
                                <ul className="space-y-2">
                                    <li>
                                        <Link href={"/client"}>
                                            <a className={`${router.pathname === "/client" ? "bg-gray-300" : "hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"} flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white`}>
                                                <i className="fas fa-chart-pie fa-fw"/>
                                                {click ? "" : <span className="ml-3">Dashboard</span>}
                                            </a>
                                        </Link>
                                    </li>
                                    {click ?
                                        clientUserMenu.map((value, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link href={value.link}>
                                                        <a className={`${router.pathname === value.path ? "bg-gray-300" : "hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"} flex items-center pb-3 pt-3 pr-2 pl-2 text-base font-normal text-gray-900 rounded-lg dark:text-white`}
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
                                            )
                                        })
                                        :
                                        <SidebarNav router={router} menus={clientUserMenu}/>
                                    }
                                </ul>
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
                                <Header layout={"client"} url={"/client/login"} router={router}
                                        url_account={"/client/account"} url_support={"/client/support"}/>
                                <HeaderMobile url={"/client/login"} router={router} url_dashboard={"/client"}>
                                    <NavMenu router={router} menus={clientUserMenu}/>
                                </HeaderMobile>
                                <Content>
                                    {props.children}
                                </Content>
                            </Main>
                        </div>
                    </div>
                </div>
            </ClientContext.Provider>
        )
    } else {
        return <></>;
    }
}

export default ClientLayout