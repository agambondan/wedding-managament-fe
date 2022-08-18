import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {FormatDate} from "./date";

export const UserContext = React.createContext();

const WithAuth = (WrappedComponent) => {
    // eslint-disable-next-line react/display-name
    return (props) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const router = useRouter();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [user, setUser] = useState({})
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [verified, setVerified] = useState(false);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            (async () => {
                const response = await axios.get(`${process.env.IP}/api/v1/auth/verify/user`, {withCredentials: true}).then(res => {
                    return res
                }).catch(err => {
                    return err
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
                        router.push("/auth/login?redirect=true");
                    }, 3000)
                }
            })();
        }, [router]);
        if (verified) {
            return (
                <UserContext.Provider value={user}>
                    {WrappedComponent(props)}
                </UserContext.Provider>
            )
        } else {
            return null;
        }
    };
};

export default WithAuth;