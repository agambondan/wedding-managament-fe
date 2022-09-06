import AdminLayout from "../../../components/admin";
import {Form} from "../../../components/layout/form/form";
import {useEffect, useState} from "react";
import {MasterService} from "../../../lib/http";
import {useRouter} from "next/router";
import {Spinner1} from "../../../components/layout/spinner";

export default function ReligionEdit() {
    const router = useRouter()
    const {query} = router
    const [isLoading, setIsLoading] = useState(false)
    const [inputFields, setInputFields] = useState({})
    useEffect(() => {
        setIsLoading(true)

        async function fetch() {
            const request = {
                url: `religions/${query.id[0]}`,
            }
            const religion = await MasterService(request).then(res => {
                return res
            }).catch(err => {
                return err
            })
            if (religion.status !== 200) {
                await router.push("/religion")
            }
            setInputFields({
                ...inputFields, ...{
                    "religion_code": religion.data.religion_code,
                    "religion_name": religion.data.religion_name,
                }
            })
        }

        fetch().then(() => setIsLoading(false));
    }, [router])
    const data = {
        url: `${process.env.ENDPOINT_MASTER}/religions/${query.id[0]}`,
        redirects: `/admin/religion`,
        module_name: `Religion`,
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

ReligionEdit.layout = AdminLayout