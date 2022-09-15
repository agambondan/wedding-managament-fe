import {useRouter} from "next/router";
import {VerifyForgotPassword} from "../../components/layout/auth/verify";
import {AuthService, MasterService} from "../../lib/http";
import CardRippleEffect from "../../components/layout/card";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";

export default function VerifySlug() {
    const router = useRouter()
    const [data, setData] = useState({})
    const [isValid, setIsValid] = useState(false)
    useEffect(() => {
        switch (router.query.typeCode) {
            case "activation":
                (async () => {
                    verifyCode(router).then(res => {
                        if (res.status === 200) {
                            setData(res.data)
                            setIsValid(true)
                            setTimeout(() => {
                                router.push("/client/login")
                            }, 10000)
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: res.data.message,
                                showConfirmButton: false,
                                timer: 5000,
                                allowOutsideClick: true
                            })
                        }
                    })
                })();
                break
            case "reset-password":
                (async () => {
                    await verifyCode(router).then(res => {
                        if (res.status === 200) {
                            setData(JSON.parse(res.config.data))
                            setIsValid(true)
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: res.data.message,
                                showConfirmButton: false,
                                timer: 5000,
                                allowOutsideClick: true
                            })
                        }
                    })
                })();
                break
        }
    }, [router])
    switch (router.query.typeCode) {
        case "activation":
            if (!isValid) return <></>
            return <CardRippleEffect/>
        case "reset-password":
            if (!isValid) return <></>
            return <VerifyForgotPassword data={data}/>
    }
}

async function verifyCode(router) {
    const request = {
        url: `extract-token`,
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
        setTimeout(() => {
            router.push("/client/signup")
        }, 10000)
        if (err.response) {
            return err.response
        } else if (err.request) {
            return err.request
        } else {
            return err.message
        }
    })
}