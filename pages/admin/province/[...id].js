import AdminLayout from "../../../components/admin";
import {Form} from "../../../components/layout/form/form";
import {useEffect, useState} from "react";
import {MasterService} from "../../../lib/http";
import {useRouter} from "next/router";
import {Spinner1} from "../../../components/layout/spinner";

export default function StateProvinceEdit() {
    const router = useRouter()
    const {query} = router
    const [isLoading, setIsLoading] = useState(false)
    const [inputFields, setInputFields] = useState({})
    useEffect(() => {
        setIsLoading(true)

        async function fetch() {
            const request = {
                url: `state-provinces/${query.id[0]}`,
            }
            const stateProvince = await MasterService(request).then(res => {
                return res
            }).catch(err => {
                return err
            })
            if (stateProvince.status !== 200) {
                await router.push("/state-provinces")
            }
            setInputFields({
                ...inputFields, ...{
                    state_province_code: stateProvince.data.state_province_code,
                    state_province_name: stateProvince.data.state_province_name
                }
            })
        }

        fetch().then(() => setIsLoading(false));
    }, [router])
    const data = {
        url: `${process.env.ENDPOINT_MASTER}/state-provinces/${query.id[0]}`,
        redirects: `/admin/province`,
        module_name: `State Province`,
        title: `Update`,
        content_type: `application/json`,
        method: "PUT"
    }
    if (isLoading) return <Spinner1/>
    return (
        <>
            <Form
                inputFields={inputFields}
                setInputFields={setInputFields}
                data={data}
            />
        </>
    )
}

StateProvinceEdit.layout = AdminLayout