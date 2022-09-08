import React from "react";
import Link from "next/link";
import ClientLayout from "../../components/client";
import {ClientContext} from "../../lib/const";

export default function Index() {
    const user = React.useContext(ClientContext);
    const givenName = user.person !== undefined ? user.person.given_name : ""
    const middleName = user.person !== undefined ? user.person.middle_name : ""
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

Index.layout = ClientLayout