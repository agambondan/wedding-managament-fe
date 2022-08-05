import AdminLayout from "../../components/Layout/admin";
import {UserContext} from "../../lib/protected_route";
import React from "react";
import Link from "next/link";

export default function Index(props) {
    const user = React.useContext(UserContext);
    return (
        <>
            <Link href={"https://go-blog.vercel.app/"}>
                <a>
                    https://go-blog.vercel.app/
                </a>

            </Link>
            {/*<Link href="https://www.flaticon.com/free-icons/theme">*/}
            {/*    <a title="theme icons">Theme icons created by monkik -*/}
            {/*        Flaticon</a>*/}
            {/*</Link>*/}
            <p>Selamat Datang, <b><i>{user.username}</i></b> di web administrator !</p>
        </>
    )
}

Index.layout = AdminLayout