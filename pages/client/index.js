import React from "react";
import ClientLayout from "../../components/client";
import {ClientContext} from "../../lib/const";
import Profile from "./profile";
import Event from "./event";

export default function Index() {
    const user = React.useContext(ClientContext);
    const givenName = user.person !== undefined ? user.person.given_name : ""
    const middleName = user.person !== undefined ? user.person.middle_name : ""
    return (
        <>
            Dashboard
            <Profile/>
            <Event/>
        </>
    )
}

Index.layout = ClientLayout