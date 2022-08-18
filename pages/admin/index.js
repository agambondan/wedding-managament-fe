import AdminLayout from "../../components/Layout/admin";
import {UserContext} from "../../lib/protected_route";
import React from "react";
import Link from "next/link";

export default function Index() {
    const user = React.useContext(UserContext);
    const givenName = user.person.given_name
    const middleName = user.person.middle_name
    return (
        <>
            <Link href={"https://go-blog.vercel.app/"}>
                <a>
                    https://go-blog.vercel.app/
                </a>

            </Link>
            <p>Selamat Datang, <b><i>{givenName} {middleName}</i></b> di web administrator !</p>
        </>
    )
}

Index.layout = AdminLayout