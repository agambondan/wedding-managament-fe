import {useRouter} from "next/router";
import {VerifyForgotPassword} from "../../components/layout/auth/verify";
import {AuthService} from "../../lib/http";
import CardRippleEffect from "../../components/layout/card";
import {useEffect, useState} from "react";

export default function VerifySlug() {
    const router = useRouter()
    const [data, setData] = useState({})
    useEffect(() => {
        switch (router.query.typeCode) {
            case "activation":
                (async () => {
                    verifyCode(router, "extract-token").then(res => {
                        if (res.data.status !== 200) {
                            router.push("/client/signup").then()
                        }
                        setData(res.data)
                        setTimeout(() => {
                            router.push("/client/login")
                        }, 10000)
                    })
                })();
                break
            case "reset-password":
                (async () => {
                    verifyCode().then(res => {
                        if (res.data.status !== 200) {
                            router.push("/client/signup").then()
                        }
                        setData(res.data)
                    })
                })();
                break
        }
    }, [router])
    switch (router.query.typeCode) {
        case "activation":
            return <CardRippleEffect/>
        case "reset-password":
            return (
                <VerifyForgotPassword/>
            )
    }
}

async function verifyCode(router, url) {
    const request = {
        url: `${url}`,
        headers: {
            Authorization: `Bearer ${router.query.token}`
        }
    }
    const res = await AuthService(request).then(res => {
        return res
    }).catch(err => {
        return err
    })
    request.url = `verify-code/${router.query.typeCode}`
    request.data = res.data
    request.method = "POST"
    return await AuthService(request).then(res => {
        return res
    }).catch(err => {
        if (err.response) {
            return err.response
        } else if (err.request) {
            return err.request
        } else {
            return err.message
        }
    })
}