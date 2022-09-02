import Sidebar from "./layout/aside";
import {Main} from "./layout/article";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import {FormatDate} from "../lib/date";
import Link from "next/link";
import {SidebarDropdown} from "./layout/form/nav";
import {masterMenu, userMenu} from "../lib/const";
import Header, {HeaderMobile} from "./layout/header";
import {Content} from "./layout/section";
import {ClientContext} from "../lib/const"

function ClientLayout(props) {
    const router = useRouter()
    const [user, setUser] = useState({})
    const [verified, setVerified] = useState(false);
    useEffect(() => {
        (async () => {
            const response = await axios.get(`${process.env.IP}/api/v1/auth/verify-user`, {withCredentials: true}).then(res => {
                return res
            }).catch(err => {
                return err.response
            })
            if (response.status === 200) {
                setVerified(true)
                setUser(response.data)
                const currentDatetime = new Date();
                axios.put(`${process.env.IP}/api/v1/users/${response.data.id}`, {
                    "login": response.data.login,
                    "email": response.data.email,
                    "password": response.data.password,
                    "last_access": FormatDate(currentDatetime),
                    "last_page": router.pathname,
                }, {withCredentials: true}).then(res => {
                    return res
                }).catch(err => {
                    return err
                })
            } else {
                setTimeout(() => {
                    router.push("/client/login?redirect=true");
                }, 3000)
            }
        })();
    }, [router]);
    if (verified) {
        return (
            <ClientContext.Provider value={user}>
                <div className="flex">
                    <div className="relative w-full flex flex-col h-screen overflow-y-hidden">
                        <div className="flex">
                            <Sidebar>
                                <ul className="space-y-2">
                                    <li>
                                        <Link href={"/client"}>
                                            <a className={`${router.pathname === "/client" ? "bg-gray-300" : "hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"} flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white`}>
                                                <i className="fas fa-chart-pie"/>
                                                <span className="ml-3">Dashboard</span>
                                            </a>
                                        </Link>
                                    </li>
                                    <SidebarDropdown router={router} label={"Master"} labelIcon={"fa-brands fa-buffer"}
                                                     menus={masterMenu}/>
                                    <SidebarDropdown router={router} label={"User"} labelIcon={"fas fa-user"} menus={userMenu}/>
                                </ul>
                            </Sidebar>
                            <Main>
                                <Header layout={"client"} url={"/client/login"}/>
                                <HeaderMobile url={"/client/login"}/>
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