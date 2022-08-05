import {useRouter} from "next/router";
import Link from 'next/link'
import {Menu} from "../layout/menu";
import {sidebarMenu} from "../../lib/const";

export default function Sidebar() {
    const router = useRouter()
    return (
        <aside className="relative bg-sidebar h-screen w-64 hidden xl:block shadow-xl overflow-y-scroll">
            <div className="px-6 pt-5">
                <p className="text-white text-2xl font-semibold uppercase">Administrator</p>
            </div>
            <nav className="text-white text-base font-semibold pt-3">
                <Link href={"/admin"}>
                    <a className={`flex items-center text-white ${router.pathname === "/admin" ? "active-nav-link" : "opacity-75 hover:opacity-100"} py-4 pl-6 nav-item`}>
                        <i className="fas fa-tachometer-alt mr-3"/>
                        Dashboard
                    </a>
                </Link>
                <Menu menus={sidebarMenu}/>
            </nav>
        </aside>
    )
}
