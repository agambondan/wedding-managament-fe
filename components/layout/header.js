import React, {useState} from "react";
import {useRouter} from "next/router";
import Swal from "sweetalert2";
import Link from "next/link";
import {NavMenu} from "./form/nav";
import {mobileMenu, navbarMenu} from "../../lib/const";
import axios from "axios";
import {AdminContext, ClientContext} from "../../lib/const";

export default function Header(props) {
    let user = {}
    if (props.layout === "admin") {
        user = AdminContext._currentValue
    } else if (props.layout === "client") {
        user = ClientContext._currentValue
    }
    const [click, setCLick] = useState(false)
    const [btnClick, setBtnClick] = useState(true)
    const handleClick = () => {
        click ? setCLick(false) : setCLick(true);
        btnClick ? setBtnClick(true) : setBtnClick(true);
    }
    const handleBtnClick = () => {
        btnClick ? setBtnClick(false) : setBtnClick(true);
    }
    let pictureUrl, pictureTitle
    if (user.picture) {
        pictureUrl = user.picture.url
        pictureTitle = user.picture.title
    }
    return (
        <header className="w-full items-center bg-gray-100 py-2 px-6 xl:flex">
            <div className="xl:w-1/2"/>
            <div className="relative xl:w-1/2 flex justify-end">
                <button className="relative z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300
                    focus:border-gray-300 focus:outline-none" onClick={handleClick}>
                    <img src={pictureUrl} alt={pictureTitle}/>
                </button>
                {click ?
                    <Dropdowns click={click} btnClick={btnClick} handleBtnClick={handleBtnClick}
                               url_account={props.url_account} url_support={props.url_support} url={props.url}
                               router={props.router}/>
                    :
                    <></>
                }
            </div>
        </header>
    )
}

function Dropdowns(props) {
    return (
        <>
            <button onClick={props.handleBtnClick}
                    className={`${props.btnClick ? "h-full w-full fixed inset-0 cursor-default" : ""}`}/>
            <div className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16">
                <Link href={props.url_account}><a
                    className="block px-4 py-2 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Account</a></Link>
                <Link href={props.url_support}><a
                    className="block px-4 py-2 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Support</a></Link>
                <label
                    className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    onClick={() => handleSignOut(props)}>
                    Sign Out
                </label>
            </div>
        </>
    )
}

// Mobile Phone
// Down
export function HeaderMobile(props) {
    const icon = props.click ? <i className="fas fa-times"/> : <i className="fas fa-bars"/>
    return (
        <header className={"w-full bg-sidebar py-5 px-6 xl:hidden overflow-y-auto"}>
            <div className="flex items-center justify-between">
                <a href={"/admin"}
                   className="text-white text-3xl font-semibold uppercase hover:text-gray-300">Administrator</a>
                <button className="text-white text-3xl focus:outline-none" onClick={props.handleClick}>
                    {icon}
                </button>
            </div>
            <div className={"overflow-auto"}>
                {props.click ? <NavHeader url_dashboard={props.url_dashboard} router={props.router} url={props.url}>
                    {props.children}
                </NavHeader> : <></>}
            </div>
        </header>
    )
}

export function NavHeader(props) {
    return (
        <nav className="flex flex-col pt-4 overflow-y-auto">
            <ul>
                <li>
                    <Link href={props.url_dashboard}>
                        <a className={`flex items-center text-white ${props.router.pathname === "/admin" ? "active-nav-link" : "opacity-75 hover:opacity-100"} py-2 pl-2 nav-item`}>
                            <i className="fas fa-tachometer-alt"/>
                            <span className="ml-3">Dashboard</span>
                        </a>
                    </Link>
                </li>
                {props.children}
            </ul>
        </nav>
    )
}
// Up
// Mobile Phone

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
                        props.router.push(`${props.url}`)
                    })
                }
            })()
        }
    })
}