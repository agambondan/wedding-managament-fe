import React, {useState} from "react";
import {useRouter} from "next/router";
import Swal from "sweetalert2";
import Link from "next/link";
import {UserContext} from "../../lib/protected_route";
import {NavMenu} from "../layout/menu";
import {navbarMenu, sidebarMenu} from "../../lib/const";
import axios from "axios";
import {useCookies} from "next/dist/client/components/hooks-server";

export default function Header() {
    const user = React.useContext(UserContext);
    const [click, setCLick] = useState(false)
    const [btnClick, setBtnClick] = useState(true)
    const handleClick = () => {
        click ? setCLick(false) : setCLick(true);
        btnClick ? setBtnClick(true) : setBtnClick(true);
    }
    const handleBtnClick = () => {
        btnClick ? setBtnClick(false) : setBtnClick(true);
    }
    return (
        <header className="w-full items-center bg-white py-2 px-6 hidden sm:flex">
            <div className="w-1/2"/>
            <div className="relative w-1/2 flex justify-end">
                <button className="relative z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300
                    focus:border-gray-300 focus:outline-none" onClick={handleClick}>
                    <img src={user.image_url} alt={""}/>
                </button>
                {click ? Dropdowns({click, btnClick, handleBtnClick}) : ''}
            </div>
        </header>
    )
}

function Dropdowns({click, btnClick, handleBtnClick}) {
    const router = useRouter()
    const btnClassName = click && btnClick ? "h-full w-full fixed inset-0 cursor-default" : ""
    return (
        <>
            <button onClick={handleBtnClick}
                    className={`${btnClick ? "h-full w-full fixed inset-0 cursor-default" : btnClassName}`}/>
            <div className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16">
                <Link href={"/admin/account"}><a
                    className="block px-4 py-2 account-link hover:text-white">Account</a></Link>
                <Link href={"/admin/support"}><a
                    className="block px-4 py-2 account-link hover:text-white">Support</a></Link>
                <Link href="#"><a href="#" className="block px-4 py-2 account-link hover:text-white"
                                  onClick={() => handleSignOut({router})}>Sign
                    Out</a></Link>
            </div>
        </>
    )
}

export function HeaderMobile() {
    const router = useRouter()
    const [click, setCLick] = useState(false)
    const handleClick = () => {
        click ? setCLick(false) : setCLick(true);
    }
    const icon = click ? <i className="fas fa-times"/> : <i className="fas fa-bars"/>
    return (
        <header className={"w-full bg-sidebar py-5 px-6 xl:hidden"}>
            <div className="flex items-center justify-between">
                <a href={"/admin"}
                   className="text-white text-3xl font-semibold uppercase hover:text-gray-300">Administrator</a>
                <button className="text-white text-3xl focus:outline-none" onClick={() => handleClick(router)}>
                    {icon}
                </button>
            </div>
            {click ? <NavHeader router={router}/> : <></>}
        </header>
    )
}

function NavHeader({router}) {
    let menus = sidebarMenu.concat(navbarMenu)
    return (
        <nav className="flex flex-col pt-4">
            <Link href={"/admin"}>
                <a className={`flex items-center text-white ${router.pathname === "/admin" ? "active-nav-link" : "opacity-75 hover:opacity-100"} -mx-2 py-2 pl-2 nav-item`}>
                    <i className="fas fa-tachometer-alt mr-3"/>
                    Dashboard
                </a>
            </Link>
            <NavMenu menus={menus}/>
            <Link href={"#"}>
                <a className="flex items-center text-white opacity-75 hover:opacity-100 -mx-2 py-2 pl-2 nav-item"
                   onClick={() => handleSignOut({router})}>
                    <i className="fas fa-sign-out-alt mr-3"/>
                    Sign Out
                </a>
            </Link>
        </nav>
    )
}

const handleSignOut = (props) => {
    Swal.fire({
        title: 'Do you want to logout?',
        showCancelButton: true,
        confirmButtonText: `Yes`,
    }).then((result) => {
        if (result.isConfirmed) {
            (async () => {
                const response = await axios.get(`${process.env.IP}/api/v1/auth/logout`, {
                    // disable with credentials if be not regis your ip to be cors
                    withCredentials: true,
                }).then(res => {
                    return res
                }).catch(err => {
                    return err
                })
                if (response.status === 200) {
                    Swal.fire({title: 'Success Logout!', icon: 'success', timer: 5000}).then(res => {
                        props.router.push("/login")
                    })
                }
                // do something to logout
            })()
        }
    })
}